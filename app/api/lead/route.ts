// Recepción de candidaturas del formulario de diagnóstico.
//
// Envía cada lead por email a Paula usando la API REST de Resend (sin
// dependencias: fetch directo). Si el envío falla o falta la API key, el lead
// se escribe entero en los logs con console.error — así queda recuperable
// desde Vercel → Logs — y se devuelve error al cliente. Nunca se finge éxito.

const DESTINO = "paula@galador.es";
const REMITENTE_POR_DEFECTO = "Candidaturas Galador <candidaturas@galador.es>";

// Límites de longitud: cortan payloads absurdos sin molestar a nadie real.
const MAX = {
  nombre: 120,
  email: 160,
  telefono: 40,
  empresa: 160,
  facturacion: 60,
  equipo: 60,
  problema: 4000,
} as const;

type Campo = keyof typeof MAX;

type Lead = Record<Campo, string>;

const ETIQUETAS: Record<Campo, string> = {
  nombre: "Nombre",
  email: "Email",
  telefono: "Teléfono",
  empresa: "Web o empresa",
  facturacion: "Facturación mensual",
  equipo: "Equipo comercial",
  problema: "Principal problema comercial",
};

// ── Rate limit básico en memoria ──
// Vercel recicla las instancias, así que esto no es una defensa fuerte: solo
// corta ráfagas del mismo origen. El filtro real contra bots es el honeypot.
const VENTANA_MS = 10 * 60 * 1000;
const MAX_ENVIOS = 5;
const envios = new Map<string, number[]>();

function superaLimite(ip: string): boolean {
  const ahora = Date.now();
  const previos = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  previos.push(ahora);
  envios.set(ip, previos);

  // Limpieza oportunista para que el Map no crezca sin freno.
  if (envios.size > 500) {
    for (const [clave, marcas] of envios) {
      if (marcas.every((t) => ahora - t >= VENTANA_MS)) envios.delete(clave);
    }
  }

  return previos.length > MAX_ENVIOS;
}

function textoPlano(valor: unknown, limite: number): string {
  if (typeof valor !== "string") return "";
  return valor.replace(/\s+/g, " ").trim().slice(0, limite);
}

function multilinea(valor: unknown, limite: number): string {
  if (typeof valor !== "string") return "";
  return valor.trim().slice(0, limite);
}

// Suficiente para descartar erratas evidentes; la validación de verdad es que
// el email reciba respuesta.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapar(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cuerpoHtml(lead: Lead): string {
  const filas = (Object.keys(ETIQUETAS) as Campo[])
    .map((campo) => {
      const valor = lead[campo] || "—";
      return `<tr>
        <td style="padding:8px 16px 8px 0;vertical-align:top;color:#5A4F48;font-size:14px;white-space:nowrap;">${escapar(
          ETIQUETAS[campo],
        )}</td>
        <td style="padding:8px 0;vertical-align:top;color:#2B231F;font-size:15px;white-space:pre-wrap;">${escapar(
          valor,
        )}</td>
      </tr>`;
    })
    .join("");

  return `<div style="font-family:system-ui,sans-serif;max-width:640px;">
    <h1 style="font-size:20px;color:#2B231F;margin:0 0 4px;">Nueva candidatura</h1>
    <p style="font-size:14px;color:#5A4F48;margin:0 0 20px;">Responde a este correo para contestar directamente a ${escapar(
      lead.nombre,
    )}.</p>
    <table style="border-collapse:collapse;width:100%;">${filas}</table>
  </div>`;
}

function cuerpoTexto(lead: Lead): string {
  return (Object.keys(ETIQUETAS) as Campo[])
    .map((campo) => `${ETIQUETAS[campo]}: ${lead[campo] || "—"}`)
    .join("\n");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "desconocida";

  if (superaLimite(ip)) {
    return Response.json(
      { error: "Has enviado varias solicitudes seguidas. Inténtalo de nuevo en unos minutos." },
      { status: 429 },
    );
  }

  let datos: Record<string, unknown>;
  try {
    datos = await request.json();
  } catch {
    return Response.json({ error: "No hemos podido leer el formulario." }, { status: 400 });
  }

  // Honeypot: invisible para personas, irresistible para bots.
  if (textoPlano(datos.fax, 200)) {
    // Respondemos 200 para no darle pistas al bot; no se envía nada.
    return Response.json({ ok: true });
  }

  const lead: Lead = {
    nombre: textoPlano(datos.nombre, MAX.nombre),
    email: textoPlano(datos.email, MAX.email),
    telefono: textoPlano(datos.telefono, MAX.telefono),
    empresa: textoPlano(datos.empresa, MAX.empresa),
    facturacion: textoPlano(datos.facturacion, MAX.facturacion),
    equipo: textoPlano(datos.equipo, MAX.equipo),
    problema: multilinea(datos.problema, MAX.problema),
  };

  const errores: Record<string, string> = {};
  if (!lead.nombre) errores.nombre = "Dinos cómo te llamas.";
  if (!lead.email) errores.email = "Necesitamos un email para responderte.";
  else if (!EMAIL_RE.test(lead.email)) errores.email = "Ese email no parece válido.";

  if (Object.keys(errores).length > 0) {
    return Response.json({ error: "Revisa los campos marcados.", errores }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const remitente = process.env.LEAD_FROM_EMAIL || REMITENTE_POR_DEFECTO;
  const asunto = `Nueva candidatura: ${lead.nombre}${lead.empresa ? ` — ${lead.empresa}` : ""}`;

  // El lead siempre acaba en los logs antes de intentar el envío: si Resend
  // falla, sigue siendo recuperable desde Vercel.
  const registro = `[LEAD] ${asunto}\n${cuerpoTexto(lead)}`;

  if (!apiKey) {
    console.error(
      `${registro}\n[LEAD] NO ENVIADO: falta RESEND_API_KEY en las variables de entorno. Ver SETUP-FORMULARIO.md`,
    );
    return Response.json(
      {
        error:
          "Ahora mismo no podemos registrar tu solicitud. Escríbeme a paula@galador.es y la atiendo igualmente.",
      },
      { status: 500 },
    );
  }

  try {
    const respuesta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: remitente,
        to: [DESTINO],
        reply_to: lead.email,
        subject: asunto,
        html: cuerpoHtml(lead),
        text: cuerpoTexto(lead),
      }),
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.text().catch(() => "");
      console.error(`${registro}\n[LEAD] Resend respondió ${respuesta.status}: ${detalle}`);
      return Response.json(
        {
          error:
            "No hemos podido enviar tu solicitud. Inténtalo de nuevo o escríbeme a paula@galador.es.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error(`${registro}\n[LEAD] Fallo de red al llamar a Resend:`, error);
    return Response.json(
      {
        error:
          "No hemos podido enviar tu solicitud. Inténtalo de nuevo o escríbeme a paula@galador.es.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
