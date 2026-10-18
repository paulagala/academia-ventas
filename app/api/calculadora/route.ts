// Informe de la calculadora comercial (/calculadora-comercial).
//
// Recibe las respuestas y los datos de contacto, vuelve a hacer el cálculo en
// el servidor (no se fía de los números del navegador) y envía dos correos con
// la API REST de Resend (fetch directo, sin dependencias):
//   1. A la persona: su informe personalizado, con el CTA al análisis comercial.
//   2. A Paula: el lead con sus números, para preparar la llamada.
// Si falta la API key o Resend falla, el lead se escribe entero en los logs con
// console.error (recuperable desde Vercel → Logs) y se devuelve error. Nunca se
// finge éxito.

import { informeHtml, informeTexto, leadHtml, leadTexto, type Contacto } from "./informe";
import { calcular, normalizar } from "../../calculadora-comercial/calculo";

const DESTINO_PAULA = "paula@galador.es";
const REMITENTE_POR_DEFECTO = "Paula Gallego · Galador <paula@galador.es>";

const MAX = { nombre: 120, empresa: 160, email: 160, telefono: 40 } as const;

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function enviar(apiKey: string, correo: Record<string, unknown>): Promise<string | null> {
  try {
    const respuesta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(correo),
    });
    if (respuesta.ok) return null;
    return `Resend respondió ${respuesta.status}: ${await respuesta.text().catch(() => "")}`;
  } catch (error) {
    return `Fallo de red al llamar a Resend: ${String(error)}`;
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "desconocida";

  if (superaLimite(ip)) {
    return Response.json({ error: "Has pedido varios informes seguidos. Inténtalo de nuevo en unos minutos." }, { status: 429 });
  }

  let datos: Record<string, unknown>;
  try {
    datos = await request.json();
  } catch {
    return Response.json({ error: "No hemos podido leer tus respuestas." }, { status: 400 });
  }

  const c = (datos.contacto && typeof datos.contacto === "object" ? datos.contacto : {}) as Record<string, unknown>;

  // Honeypot: respondemos 200 para no darle pistas al bot; no se envía nada.
  if (textoPlano(c.fax, 200)) return Response.json({ ok: true });

  const contacto: Contacto = {
    nombre: textoPlano(c.nombre, MAX.nombre),
    empresa: textoPlano(c.empresa, MAX.empresa),
    email: textoPlano(c.email, MAX.email),
    telefono: textoPlano(c.telefono, MAX.telefono),
  };

  const errores: Record<string, string> = {};
  if (!contacto.nombre) errores.nombre = "Dime cómo te llamas.";
  if (!contacto.empresa) errores.empresa = "El informe va a nombre de tu empresa.";
  if (!EMAIL_RE.test(contacto.email)) errores.email = "Revisa el email: ahí te llega el informe.";
  if (c.consentimiento !== true) errores.consentimiento = "Necesito tu permiso para enviártelo.";
  if (Object.keys(errores).length > 0) {
    return Response.json({ error: "Revisa los campos marcados.", errores }, { status: 400 });
  }

  const resultado = calcular(normalizar(datos.entrada));
  const asuntoPaula = `Calculadora: ${contacto.nombre} — ${contacto.empresa} (${resultado.veredicto.chip})`;

  // El lead siempre acaba en los logs antes de intentar el envío.
  const registro = `[CALCULADORA] ${asuntoPaula}\n${leadTexto(contacto, resultado)}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(`${registro}\n[CALCULADORA] NO ENVIADO: falta RESEND_API_KEY. Ver SETUP-CALCULADORA.md`);
    return Response.json(
      { error: "Ahora mismo no podemos enviar el informe. Escríbeme a paula@galador.es y te lo mando igualmente." },
      { status: 500 },
    );
  }
  const remitente = process.env.CALCULADORA_FROM_EMAIL || REMITENTE_POR_DEFECTO;

  const fallo = await enviar(apiKey, {
    from: remitente,
    to: [contacto.email],
    reply_to: DESTINO_PAULA,
    subject: `${contacto.empresa}: ¿te sale rentable un comercial que te consiga citas?`,
    html: informeHtml(contacto, resultado),
    text: informeTexto(contacto, resultado),
  });
  if (fallo) {
    console.error(`${registro}\n[CALCULADORA] Informe NO enviado. ${fallo}`);
    return Response.json(
      { error: "No hemos podido enviar el informe. Inténtalo de nuevo o escríbeme a paula@galador.es." },
      { status: 502 },
    );
  }

  // La copia para Paula no debe tumbar la respuesta: la persona ya tiene su informe.
  const falloPaula = await enviar(apiKey, {
    from: remitente,
    to: [DESTINO_PAULA],
    reply_to: contacto.email,
    subject: asuntoPaula,
    html: leadHtml(contacto, resultado),
    text: leadTexto(contacto, resultado),
  });
  if (falloPaula) console.error(`${registro}\n[CALCULADORA] Copia a Paula NO enviada. ${falloPaula}`);

  return Response.json({ ok: true });
}
