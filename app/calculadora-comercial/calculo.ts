// Cálculo de la calculadora comercial: ¿te sale rentable contratar a alguien
// que te consiga citas (un SDR)? Compara contratarlo sin sistema y con sistema.
//
// Lo usan la página (para enseñar el resultado) y la ruta /api/calculadora
// (que lo vuelve a calcular en el servidor antes de mandar el informe, para no
// fiarse de los números que llegan del navegador).
//
// De dónde salen las cifras (investigación del 18/10/2026):
// - Bridge Group, «SDR Models, Motions & Metrics» 2025 (351 empresas, sobre
//   todo de EE. UU. y software): cuota mediana de 10 reuniones celebradas al
//   mes, que solo alcanza el 60 % de los SDR; rampa media de 3 meses. Por eso
//   las cifras por sector son más prudentes que 10.
// - Coste: cotización de empresa 2026 ≈ 30,65 % + accidentes de trabajo
//   ≈ 31,6 %. SDR junior en España: 20–28 k€ fijo + 3–6 k€ variable.
// - Sin sistema: supuestos de Galador, no un estudio. Referencia: CSO Insights
//   (2019), 55 % de cierre con programa formal de ventas frente a 39 % sin él.

export const CAL_URL = "https://cal.com/paula-gallego-lazaro-hhzchd/diagnostico-comercial";

export type Sector = {
  id: string;
  nombre: string;
  reuniones: number;
  rampa: number;
  ciclo: number;
};

export const SECTORES: Sector[] = [
  { id: "consultoria", nombre: "Consultoría y asesoría a empresas", reuniones: 8, rampa: 3, ciclo: 1 },
  { id: "marketing", nombre: "Agencia de marketing y publicidad", reuniones: 10, rampa: 3, ciclo: 1 },
  { id: "rrhh", nombre: "RR. HH., selección y headhunting", reuniones: 10, rampa: 3, ciclo: 1 },
  { id: "formacion_empresas", nombre: "Formación para empresas", reuniones: 8, rampa: 3, ciclo: 1 },
  { id: "particulares", nombre: "Academia, coaching o formación a particulares", reuniones: 15, rampa: 2, ciclo: 0 },
  { id: "saas", nombre: "Software y SaaS B2B", reuniones: 8, rampa: 3, ciclo: 2 },
  { id: "it", nombre: "Desarrollo, IT y ciberseguridad", reuniones: 7, rampa: 3, ciclo: 2 },
  { id: "industria", nombre: "Industria, energía y servicios técnicos", reuniones: 6, rampa: 3, ciclo: 2 },
  { id: "otro", nombre: "Otro servicio", reuniones: 8, rampa: 3, ciclo: 1 },
];

// Sin sistema frente a con sistema (supuestos de Galador).
export const SUPUESTOS = {
  sinReuniones: 0.7, // un 30 % menos de reuniones que cuentan
  sinCierre: 0.8, // un cierre un 20 % peor
  sinRampaExtra: 2, // 2 meses más hasta rendir
  sinHoras: 5, // horas a la semana del dueño encima del comercial
  conHoras: 2,
  // Becario en prácticas: rinde menos, tarda más y necesita más de ti.
  becarioReuniones: 0.7,
  becarioRampaExtra: 1,
  becarioHorasExtra: 2,
};

// Perfiles que se pueden contratar. Coste total para la empresa al mes.
// Becario: ayuda al estudio de unos 700 € más la cotización obligatoria desde 2024.
export const PERFILES = [
  { id: "becario", titulo: "Becario en prácticas", importe: 800, detalle: "Ayuda al estudio de unos 700 € más Seguridad Social. Rinde menos y necesita más de ti" },
  { id: "junior", titulo: "Junior", importe: 3100, detalle: "24.000 € fijos + 4.500 € de variable al año" },
  { id: "senior", titulo: "Con experiencia", importe: 3900, detalle: "30.000 € fijos + 6.000 € de variable al año" },
] as const;

export const SEMANAS = 4.33;
export const HORAS_REUNION = 1.5; // la reunión, su preparación y su seguimiento
export const HERRAMIENTAS = 250; // base de datos, CRM y teléfono, €/mes
const MESES_GRAFICO = 18;

export type Modo = "primero" | "otro";

export type Entrada = {
  modo: Modo;
  sector: string;
  ticket: number; // € por venta
  cierre: number; // de 0 a 1
  margen: number; // de 0 a 1
  ciclo: number; // meses que tardan en decidir
  prospeccion: number; // h/semana que el dueño dedica hoy a buscar citas (modo primero)
  actual: number; // reuniones/mes que trae el comercial actual (modo otro)
  capacidadTotal: number; // reuniones/mes que pueden atender en total (modo otro)
  hora: number; // € que vale una hora del dueño
  coste: number; // € al mes que cuesta el comercial a la empresa
  becario: boolean;
};

export const ENTRADA_INICIAL: Entrada = {
  modo: "primero",
  sector: "",
  ticket: 0,
  cierre: 0,
  margen: 0,
  ciclo: 1,
  prospeccion: 0,
  actual: 0,
  capacidadTotal: 0,
  hora: 50,
  coste: 3100,
  becario: false,
};

const acotar = (v: unknown, min: number, max: number, defecto: number) => {
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : defecto;
};

// Deja la entrada en rangos razonables. La ruta del servidor la pasa por aquí
// antes de calcular nada.
export function normalizar(raw: unknown): Entrada {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const sector = SECTORES.some((s) => s.id === r.sector) ? String(r.sector) : "otro";
  return {
    modo: r.modo === "otro" ? "otro" : "primero",
    sector,
    ticket: acotar(r.ticket, 0, 10_000_000, 0),
    cierre: acotar(r.cierre, 0, 1, 0),
    margen: acotar(r.margen, 0, 1, 0),
    ciclo: Math.round(acotar(r.ciclo, 0, 12, 1)),
    prospeccion: acotar(r.prospeccion, 0, 80, 0),
    actual: acotar(r.actual, 0, 500, 0),
    capacidadTotal: acotar(r.capacidadTotal, 0, 1000, 0),
    hora: acotar(r.hora, 0, 2000, 50),
    coste: acotar(r.coste, 0, 50_000, 3100),
    becario: r.becario === true,
  };
}

export const sectorDe = (id: string) => SECTORES.find((s) => s.id === id) ?? SECTORES[SECTORES.length - 1];

// Reuniones nuevas que caben en la agenda del dueño con las horas que libera.
export const reunionesQueCaben = (horasSemana: number) => Math.round((horasSemana * SEMANAS) / HORAS_REUNION);

export type Estado = "faltan" | "mal" | "justo" | "bien";

export type Escenario = {
  reuniones: number;
  cierre: number;
  rampa: number;
  horas: number;
  coste: number;
  ventasMes: number;
  equilibrio: number; // ventas al mes para pagarlo
  sobra: number; // veces que cubre su coste
  payback: number | null; // mes en que recuperas lo invertido
  anio: number; // lo que te deja el primer año
  acumulados: number[]; // dinero acumulado mes a mes (18 meses)
  estado: Estado;
};

type Base = {
  reuniones: number;
  rampa: number;
  capacidad: number;
  margenVenta: number;
};

function escenario(e: Entrada, b: Base, conSistema: boolean): Escenario {
  const perfil = e.becario ? SUPUESTOS.becarioReuniones : 1;
  const pedidas = (conSistema ? b.reuniones : b.reuniones * SUPUESTOS.sinReuniones) * perfil;
  const reuniones = Math.min(pedidas, b.capacidad);
  const cierre = conSistema ? e.cierre : e.cierre * SUPUESTOS.sinCierre;
  const rampaExtra = (conSistema ? 0 : SUPUESTOS.sinRampaExtra) + (e.becario ? SUPUESTOS.becarioRampaExtra : 0);
  const rampa = Math.min(12, b.rampa + rampaExtra);
  const horas = (conSistema ? SUPUESTOS.conHoras : SUPUESTOS.sinHoras) + (e.becario ? SUPUESTOS.becarioHorasExtra : 0);
  const coste = e.coste + HERRAMIENTAS + horas * SEMANAS * e.hora;

  // Mes a mes: reuniones según la rampa, ventas que llegan `ciclo` meses después.
  const acumulados: number[] = [];
  let acumulado = 0;
  let payback: number | null = null;
  let anio = 0;
  for (let m = 1; m <= 36; m++) {
    const origen = m - e.ciclo;
    const ventas = origen >= 1 ? reuniones * Math.min(1, origen / rampa) * cierre : 0;
    acumulado += ventas * b.margenVenta - coste;
    if (m <= MESES_GRAFICO) acumulados.push(acumulado);
    if (payback === null && acumulado >= 0 && m > 1) payback = m;
    if (m === 12) anio = acumulado;
  }

  const ventasMes = reuniones * cierre;
  const equilibrio = b.margenVenta > 0 ? coste / b.margenVenta : Infinity;
  const sobra = Number.isFinite(equilibrio) && equilibrio > 0 ? ventasMes / equilibrio : 0;
  const estado: Estado = !Number.isFinite(equilibrio)
    ? "faltan"
    : sobra < 1 || payback === null
      ? "mal"
      : payback && payback <= 12 && sobra >= 1.5
        ? "bien"
        : "justo";

  return { reuniones, cierre, rampa, horas, coste, ventasMes, equilibrio, sobra, payback, anio, acumulados, estado };
}

export type Veredicto = {
  estado: Estado;
  chip: string;
  titular: [string, string, string]; // antes, lo destacado, después
  explica: string;
};

export type Resultado = {
  entrada: Entrada;
  sector: Sector;
  reunionesPedidas: number; // las que traería con sistema, antes de mirar la agenda
  capacidad: number;
  sin: Escenario;
  con: Escenario;
  diferencia: number; // lo que te juegas el primer año
  horasSupervisionAhorradas: number; // h/mes que te ahorras con sistema
  horasProspeccion: number; // h/mes que dejas de dedicar a buscar citas (modo primero)
  veredicto: Veredicto;
  palanca: string;
  aviso: string | null;
  notaBecario: string | null;
};

export function calcular(e: Entrada): Resultado {
  const sector = sectorDe(e.sector);
  const otro = e.modo === "otro";
  const reuniones = otro ? e.actual : sector.reuniones;
  const capacidad = otro
    ? e.capacidadTotal > 0
      ? Math.max(0, e.capacidadTotal - e.actual)
      : Infinity
    : e.prospeccion > 0
      ? reunionesQueCaben(e.prospeccion)
      : Infinity;
  const b: Base = { reuniones, rampa: sector.rampa, capacidad, margenVenta: e.ticket * e.margen };

  const sin = escenario(e, b, false);
  const con = escenario(e, b, true);
  const diferencia = con.anio - sin.anio;

  return {
    entrada: e,
    sector,
    reunionesPedidas: reuniones,
    capacidad,
    sin,
    con,
    diferencia,
    horasSupervisionAhorradas: (SUPUESTOS.sinHoras - SUPUESTOS.conHoras) * SEMANAS,
    horasProspeccion: otro ? 0 : e.prospeccion * SEMANAS,
    veredicto: veredicto(sin, con, diferencia),
    palanca: palanca(con, b.margenVenta),
    aviso: aviso(e, reuniones, capacidad),
    notaBecario: e.becario
      ? "Con un becario contamos un 30 % menos de reuniones, un mes más hasta rendir y 2 horas tuyas más a la semana. Y unas prácticas suelen durar entre 6 y 12 meses: si se va al acabar, vuelves a empezar la rampa con otra persona."
      : null,
  };
}

// Lo que dice la franja de la diferencia: si con sistema también pierde, es pérdida evitada.
export const textoDiferencia = (r: Resultado) =>
  r.con.anio < 0
    ? "es lo que pierdes de más el primer año si lo contratas sin sistema."
    : "es lo que te juegas el primer año entre hacerlo con sistema o sin él.";

const recupera = (r: Escenario) =>
  r.payback ? `recuperas lo invertido en el mes ${r.payback}` : "tardarías más de tres años en recuperar lo invertido";

function veredicto(sin: Escenario, con: Escenario, diferencia: number): Veredicto {
  if (con.estado === "faltan")
    return {
      estado: "faltan",
      chip: "Faltan datos",
      titular: ["", "Faltan tu ticket o tu margen", "."],
      explica: "Sin ellos no hay forma de calcular si el comercial se paga.",
    };
  if (con.estado === "mal")
    return {
      estado: "mal",
      chip: "No te sale",
      titular: ["Con estos números, ", "no te sale", "."],
      explica:
        "Ni con un comercial bien formado te compensa: contando tu tiempo, no recuperas lo invertido en tres años. Antes de llenar la agenda, hay que mejorar lo que pasa en la reunión.",
    };
  if (sin.estado === "mal")
    return {
      estado: con.estado,
      chip: "Solo con sistema",
      titular: ["Te sale, ", "pero solo si lo montas bien", "."],
      explica: `Con sistema te trae ${dec(con.sobra)} veces lo que cuesta y ${recupera(con)}. Sin sistema no llega a pagarse: menos reuniones, peor cualificadas y tú encima cada semana.`,
    };
  if (con.estado === "bien" && sin.estado === "justo")
    return {
      estado: "bien",
      chip: "Mejor con sistema",
      titular: ["Te sale, pero ", "sin sistema va muy justo", "."],
      explica: `Con sistema te trae ${dec(con.sobra)} veces lo que cuesta y ${recupera(con)}. Sin sistema apenas cubre lo que cuesta, y cualquier mes flojo lo pone en negativo.`,
    };
  if (con.estado === "bien")
    return {
      estado: "bien",
      chip: "Te sale rentable",
      titular: ["Sí, ", "te sale rentable", "."],
      explica: `Con sistema te trae ${dec(con.sobra)} veces lo que cuesta y ${recupera(con)}. Sin sistema también sale, pero el primer año te deja ${eur(diferencia)} menos.`,
    };
  return {
    estado: "justo",
    chip: "Muy justo",
    titular: ["Sale, pero ", "muy justo", "."],
    explica: `Te trae casi lo mismo que cuesta, así que cualquier mes flojo lo pone en negativo. Con sistema ${recupera(con)}.`,
  };
}

function palanca(con: Escenario, margenVenta: number): string {
  const cierreMin = con.reuniones * margenVenta > 0 ? con.coste / (con.reuniones * margenVenta) : Infinity;
  if (!Number.isFinite(cierreMin)) return "Con tu ticket y tu margen podremos ver qué número te conviene mover primero.";
  if (con.cierre >= cierreMin) {
    const extra = con.reuniones * con.cierre * 0.05 * margenVenta * 12;
    return `Tu tasa de cierre. Con un ${dec(cierreMin * 100)} % ya se paga solo y tú estás en un ${dec(con.cierre * 100)} %. Cada punto que subas es casi todo beneficio: si cierras un 5 % más, ganas unos ${eur(extra)} más al año sin pagar más.`;
  }
  const reunionesMin = con.cierre > 0 ? con.equilibrio / con.cierre : Infinity;
  return `Necesitas cerrar al menos un ${dec(cierreMin * 100)} % de las reuniones${Number.isFinite(reunionesMin) ? ` o que el comercial ponga ${dec(reunionesMin)} reuniones buenas al mes` : ""}. Hoy estás en un ${dec(con.cierre * 100)} % y ${dec(con.reuniones)}. Lo más rápido suele ser mejorar la llamada de venta antes de llenar la agenda.`;
}

function aviso(e: Entrada, reuniones: number, capacidad: number): string | null {
  if (reuniones <= capacidad) return null;
  return e.modo === "otro"
    ? `Entre tu comercial actual y el nuevo os traerían ${dec(e.actual + reuniones)} reuniones al mes y podéis atender ${dec(e.capacidadTotal)}. Al nuevo solo le caben ${dec(capacidad)}, y la cuenta usa esas.`
    : `Con sistema te traería ${dec(reuniones)} reuniones al mes, pero con las horas que liberas solo te caben unas ${dec(capacidad)}. La cuenta usa ${dec(capacidad)}.`;
}

// ── Formato ──
const miles = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const eur = (v: number) => (v < 0 ? "−" : "") + miles(Math.abs(v)) + " €";
export const eurConSigno = (v: number) => (v > 0 ? "+" : "") + eur(v);
export const dec = (v: number) => v.toLocaleString("es-ES", { maximumFractionDigits: 1 });
export const horasTxt = (h: number) => `${miles(h)} h`;
export const mesTxt = (p: number | null) => (p ? `Mes ${p}` : "Más de 3 años");
