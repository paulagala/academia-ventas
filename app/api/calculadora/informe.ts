// Correos de la calculadora comercial: el informe para la persona y el aviso
// del lead para Paula. HTML de correo: tablas y estilos en línea, que es lo
// único que Gmail y Outlook respetan. Colores de la web (app/globals.css).

import {
  CAL_URL,
  HERRAMIENTAS,
  dec,
  eur,
  eurConSigno,
  horasTxt,
  mesTxt,
  PERFILES,
  textoDiferencia,
  type Escenario,
  type Resultado,
} from "../../calculadora-comercial/calculo";

export type Contacto = { nombre: string; empresa: string; email: string; telefono: string };

const C = {
  crema: "#f3ede3",
  superficie: "#fffdf9",
  arena: "#e7ded0",
  linea: "#ddd2c2",
  texto: "#2b2320",
  suave: "#5a4f48",
  burdeos: "#7a1828",
  teal: "#3f5e53",
};
const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

function escapar(texto: string): string {
  return texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const primerNombre = (nombre: string) => nombre.trim().split(" ")[0];

const CICLOS: Record<number, string> = {
  0: "en el mismo mes",
  1: "alrededor de un mes",
  2: "dos o tres meses",
  4: "más de tres meses",
};

// Las respuestas de la persona, en el orden en que las dio.
function respuestas(r: Resultado): Array<[string, string]> {
  const e = r.entrada;
  const filas: Array<[string, string]> = [
    ["Tu caso", e.modo === "otro" ? "Ya tienes un comercial y valoras otro" : "Sería tu primer comercial"],
    ["Sector", r.sector.nombre],
    ["Ticket medio", eur(e.ticket)],
    ["Tasa de cierre", `${dec(e.cierre * 10)} de cada 10 reuniones (${dec(e.cierre * 100)} %)`],
    ["Margen bruto", `${dec(e.margen * 100)} %`],
    ["Tardan en decidir", CICLOS[e.ciclo] ?? `${e.ciclo} meses`],
  ];
  if (e.modo === "otro") {
    filas.push(["Reuniones que trae tu comercial", `${dec(e.actual)} al mes`]);
    filas.push(["Reuniones que podéis atender", e.capacidadTotal > 0 ? `${dec(e.capacidadTotal)} al mes` : "Sin límite"]);
  } else {
    filas.push(["Horas que dedicas a buscar citas", `${dec(e.prospeccion)} a la semana`]);
  }
  filas.push(["Lo que vale tu hora", eur(e.hora)]);
  const perfil = e.becario ? `${PERFILES[0].titulo}: ` : "";
  filas.push(["Coste del comercial", `${perfil}${eur(e.coste)} al mes, más ${eur(HERRAMIENTAS)} de herramientas`]);
  return filas;
}

function comparacion(r: Resultado): Array<[string, string, string]> {
  const { sin, con } = r;
  return [
    ["Reuniones al mes", dec(sin.reuniones), dec(con.reuniones)],
    ["Tasa de cierre", `${dec(sin.cierre * 100)} %`, `${dec(con.cierre * 100)} %`],
    ["Meses hasta rendir", String(sin.rampa), String(con.rampa)],
    ["Horas tuyas a la semana", dec(sin.horas), dec(con.horas)],
    ["Coste al mes, con tu tiempo", eur(sin.coste), eur(con.coste)],
    ["Ventas al mes", dec(sin.ventasMes), dec(con.ventasMes)],
    ["Recuperas lo invertido", mesTxt(sin.payback), mesTxt(con.payback)],
    ["Te deja el primer año", eurConSigno(sin.anio), eurConSigno(con.anio)],
  ];
}

const recuperaTxt = (r: Escenario) =>
  r.payback ? `recuperas lo invertido en el mes ${r.payback}` : "no recuperas lo invertido en 3 años";

function ahorros(r: Resultado): string[] {
  const lista: string[] = [];
  if (r.horasProspeccion > 0)
    lista.push(`${horasTxt(r.horasProspeccion)} al mes que dejas de pasar buscando clientes y puedes dedicar a cerrar.`);
  lista.push(
    `${horasTxt(r.horasSupervisionAhorradas)} al mes que no pasas corrigiendo al comercial sobre la marcha: unos ${eur(r.horasSupervisionAhorradas * r.entrada.hora)} de tu tiempo.`,
  );
  lista.push(`${dec(r.con.ventasMes - r.sin.ventasMes)} ventas más al mes con sistema, cuando el comercial está rodado.`);
  return lista;
}

// ── Piezas HTML ──

const h2 = (texto: string) =>
  `<h2 style="margin:0 0 12px;font-family:${SERIF};font-weight:normal;font-size:22px;line-height:1.25;color:${C.texto};">${texto}</h2>`;

const p = (texto: string, estilo = "") =>
  `<p style="margin:0 0 14px;font-family:${SANS};font-size:16px;line-height:1.6;color:${C.texto};${estilo}">${texto}</p>`;

const bloque = (contenido: string, fondo = C.superficie) =>
  `<tr><td style="padding:28px 32px;background:${fondo};">${contenido}</td></tr>`;

function tablaDos(filas: Array<[string, string]>): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${filas
    .map(
      ([k, v]) => `<tr>
      <td style="padding:9px 12px 9px 0;border-bottom:1px solid ${C.linea};font-family:${SANS};font-size:14px;color:${C.suave};vertical-align:top;">${escapar(k)}</td>
      <td style="padding:9px 0;border-bottom:1px solid ${C.linea};font-family:${SANS};font-size:15px;color:${C.texto};text-align:right;vertical-align:top;">${escapar(v)}</td>
    </tr>`,
    )
    .join("")}</table>`;
}

function tablaComparacion(r: Resultado): string {
  const cab = (t: string, color: string, alin = "right") =>
    `<td style="padding:0 0 8px;font-family:${SANS};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${color};text-align:${alin};">${t}</td>`;
  const filas = comparacion(r)
    .map(([k, s, c], i, todas) => {
      const ultima = i === todas.length - 1;
      const cifra = ultima ? `font-family:${SERIF};font-size:20px;` : `font-family:${SANS};font-size:15px;`;
      return `<tr>
        <td style="padding:9px 12px 9px 0;border-bottom:1px solid ${C.linea};font-family:${SANS};font-size:14px;color:${C.suave};">${k}</td>
        <td style="padding:9px 12px;border-bottom:1px solid ${C.linea};${cifra}color:${C.texto};text-align:right;white-space:nowrap;">${s}</td>
        <td style="padding:9px 0 9px 12px;border-bottom:1px solid ${C.linea};${cifra}color:${ultima ? C.burdeos : C.texto};font-weight:${ultima ? "normal" : "600"};text-align:right;white-space:nowrap;">${c}</td>
      </tr>`;
    })
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr>${cab("", C.suave, "left")}${cab("Sin sistema", C.suave)}${cab("Con sistema", C.burdeos)}</tr>${filas}</table>`;
}

function tarjeta(etiqueta: string, valor: string, detalle: string, color: string): string {
  return `<td width="50%" valign="top" style="padding:20px;background:${C.superficie};border:1px solid ${C.linea};">
    <div style="font-family:${SANS};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.suave};">${etiqueta}</div>
    <div style="margin:8px 0 6px;font-family:${SERIF};font-size:32px;line-height:1.1;color:${color};">${valor}</div>
    <div style="font-family:${SANS};font-size:14px;line-height:1.5;color:${C.suave};">${detalle}</div>
  </td>`;
}

const boton = (texto: string, url: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:${C.burdeos};border-radius:8px;">
    <a href="${url}" style="display:inline-block;padding:14px 26px;font-family:${SANS};font-size:16px;font-weight:600;color:${C.superficie};text-decoration:none;">${texto}</a>
  </td></tr></table>`;

function envoltorio(contenido: string, preheader: string): string {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${C.crema};">
<div style="display:none;max-height:0;overflow:hidden;">${escapar(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.crema};"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border-collapse:collapse;">
<tr><td style="padding:8px 32px 20px;font-family:${SERIF};font-size:18px;letter-spacing:.2em;color:${C.burdeos};">GALADOR</td></tr>
${contenido}
</table></td></tr></table></body></html>`;
}

// ── Informe para la persona ──

export function informeHtml(contacto: Contacto, r: Resultado): string {
  const v = r.veredicto;
  const empresa = escapar(contacto.empresa);
  const sinColor = r.sin.anio < 0 ? C.burdeos : C.texto;
  const conColor = r.con.anio < 0 ? C.burdeos : C.teal;

  const cabecera = bloque(`
    <div style="font-family:${SANS};font-size:12px;letter-spacing:.13em;text-transform:uppercase;color:${C.suave};margin-bottom:10px;">Informe para ${empresa}</div>
    <h1 style="margin:0 0 16px;font-family:${SERIF};font-weight:normal;font-size:32px;line-height:1.15;color:${C.texto};">${escapar(v.titular[0])}<span style="color:${C.burdeos};">${escapar(v.titular[1])}</span>${escapar(v.titular[2])}</h1>
    ${p(`Hola, ${escapar(primerNombre(contacto.nombre))}:`)}
    ${p(`Con los números que me has dado, esto es lo que pasaría si en ${empresa} contratas a alguien que te consiga citas. ${escapar(v.explica)}`)}
    ${[r.aviso, r.notaBecario]
      .filter((t): t is string => !!t)
      .map((t) => p(escapar(t), `padding:12px 14px;border-left:3px solid ${C.burdeos};background:${C.crema};`))
      .join("")}
  `);

  const juego = `<tr><td style="padding:0 32px 0;background:${C.superficie};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr>
      ${tarjeta("Sin sistema", eurConSigno(r.sin.anio), `el primer año · ${recuperaTxt(r.sin)}`, sinColor)}
      ${tarjeta("Con sistema", eurConSigno(r.con.anio), `el primer año · ${recuperaTxt(r.con)}`, conColor)}
    </tr></table>
  </td></tr>
  <tr><td style="padding:16px 32px 28px;background:${C.superficie};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:20px 24px;background:${C.burdeos};">
      <span style="font-family:${SERIF};font-size:34px;color:${C.superficie};">${eur(Math.max(0, r.diferencia))}</span>
      <span style="font-family:${SANS};font-size:16px;color:${C.superficie};">&nbsp; ${textoDiferencia(r)}</span>
    </td></tr></table>
  </td></tr>`;

  const ahorro = bloque(`${h2("Lo que te ahorras con sistema")}
    <ul style="margin:0;padding:0 0 0 18px;">${ahorros(r)
      .map((t) => `<li style="margin:0 0 8px;font-family:${SANS};font-size:16px;line-height:1.55;color:${C.texto};">${escapar(t)}</li>`)
      .join("")}</ul>`, C.crema);

  const detalle = bloque(`${h2("Sin sistema y con sistema, cifra a cifra")}${tablaComparacion(r)}`);
  const palanca = bloque(`${h2("La palanca que más te conviene mover")}${p(escapar(r.palanca), "margin:0;")}`, C.crema);
  const tus = bloque(`${h2("Tus respuestas")}${tablaDos(respuestas(r))}`);

  const cta = bloque(`
    ${h2(`¿Lo revisamos con el caso real de ${empresa}?`)}
    ${p("Esta cuenta es una estimación. En el análisis comercial miro tus números reales, cómo son tus llamadas de venta y tu proceso, y te digo qué cambiaría antes de contratar a nadie: a quién buscar, qué guion darle y qué medir cada semana.")}
    ${boton("Reservar mi análisis comercial", CAL_URL)}
    <p style="margin:24px 0 0;font-family:${SANS};font-size:16px;line-height:1.6;color:${C.texto};">Un saludo,<br>Paula Gallego<br><span style="color:${C.suave};">Galador · Analizo. Estructuro. Entreno.</span></p>
  `);

  const pie = `<tr><td style="padding:20px 32px;font-family:${SANS};font-size:12px;line-height:1.55;color:${C.suave};">
    De dónde salen las cifras: el informe de Bridge Group de 2025 sobre equipos de SDR sitúa la cuota mediana en 10 reuniones celebradas al mes (solo la alcanza el 60 %) y la rampa media en 3 meses; las cifras por sector son más prudentes, adaptadas a pymes de servicios en España. Sin sistema contamos un 30 % menos de reuniones que cuentan, un cierre un 20 % peor, 2 meses más hasta rendir y 5 h tuyas a la semana frente a 2: son supuestos de Galador. No cuenta impuestos, financiación ni el coste de sustituir al comercial.<br><br>
    Recibes este correo porque pediste este informe en galador.es. Para cualquier cosa, responde a este correo.
  </td></tr>`;

  return envoltorio(
    cabecera + juego + ahorro + detalle + palanca + tus + cta + pie,
    `${v.titular.join("")} Con sistema, ${eurConSigno(r.con.anio)} el primer año; sin sistema, ${eurConSigno(r.sin.anio)}.`,
  );
}

export function informeTexto(contacto: Contacto, r: Resultado): string {
  const v = r.veredicto;
  return [
    `INFORME PARA ${contacto.empresa.toUpperCase()}`,
    "",
    `Hola, ${primerNombre(contacto.nombre)}:`,
    "",
    v.titular.join(""),
    v.explica,
    r.aviso ?? "",
    r.notaBecario ?? "",
    "",
    `Sin sistema: ${eurConSigno(r.sin.anio)} el primer año (${recuperaTxt(r.sin)}).`,
    `Con sistema: ${eurConSigno(r.con.anio)} el primer año (${recuperaTxt(r.con)}).`,
    `${eur(Math.max(0, r.diferencia))} ${textoDiferencia(r)}`,
    "",
    "LO QUE TE AHORRAS CON SISTEMA",
    ...ahorros(r).map((t) => `- ${t}`),
    "",
    "SIN SISTEMA Y CON SISTEMA",
    ...comparacion(r).map(([k, s, c]) => `${k}: ${s} / ${c}`),
    "",
    "LA PALANCA QUE MÁS TE CONVIENE MOVER",
    r.palanca,
    "",
    "TUS RESPUESTAS",
    ...respuestas(r).map(([k, x]) => `${k}: ${x}`),
    "",
    `¿Lo revisamos con el caso real de ${contacto.empresa}? Reserva tu análisis comercial: ${CAL_URL}`,
    "",
    "Un saludo,",
    "Paula Gallego · Galador",
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");
}

// ── Aviso del lead para Paula ──

function contactoFilas(contacto: Contacto): Array<[string, string]> {
  return [
    ["Nombre", contacto.nombre],
    ["Empresa", contacto.empresa],
    ["Email", contacto.email],
    ["Teléfono", contacto.telefono || "—"],
  ];
}

export function leadHtml(contacto: Contacto, r: Resultado): string {
  const v = r.veredicto;
  return envoltorio(
    bloque(`
      ${h2(`Nuevo lead de la calculadora: ${escapar(contacto.nombre)} (${escapar(contacto.empresa)})`)}
      ${p(`Resultado: <strong>${escapar(v.chip)}</strong>. Con sistema ${eurConSigno(r.con.anio)} el primer año; sin sistema ${eurConSigno(r.sin.anio)}. Se juega ${eur(Math.max(0, r.diferencia))}.`)}
      ${p(`Responde a este correo para escribirle directamente. Ya ha recibido su informe.`, `color:${C.suave};`)}
      ${tablaDos(contactoFilas(contacto))}
    `) +
      bloque(`${h2("Sus respuestas")}${tablaDos(respuestas(r))}`, C.crema) +
      bloque(`${h2("Sin sistema y con sistema")}${tablaComparacion(r)}${p(escapar(r.palanca), "margin:16px 0 0;")}`),
    `${contacto.nombre} (${contacto.empresa}): ${v.chip}`,
  );
}

export function leadTexto(contacto: Contacto, r: Resultado): string {
  return [
    ...contactoFilas(contacto).map(([k, x]) => `${k}: ${x}`),
    "",
    `Resultado: ${r.veredicto.chip}. Con sistema ${eurConSigno(r.con.anio)}; sin sistema ${eurConSigno(r.sin.anio)}.`,
    "",
    ...respuestas(r).map(([k, x]) => `${k}: ${x}`),
    "",
    ...comparacion(r).map(([k, s, c]) => `${k}: ${s} / ${c}`),
  ].join("\n");
}
