import type { SeoBloque, SeoCaso } from "../components/SeoLanding";

/**
 * ── Las páginas por sector (/ventas-para-{slug}) ──
 *
 * Cada sector es una página del clúster. Para que Google no las trate como la
 * misma página con el nombre cambiado, cada una tiene que contar CÓMO SE VENDE
 * en ese sector: quién compra, qué frena la decisión, dónde se cae la venta.
 * Si un sector no tiene material propio (llamadas, casos, conversaciones), no
 * se publica: se queda fuera de la lista.
 *
 * Publicar un sector nuevo:
 *   1. Añadir aquí su objeto.
 *   2. Crear la carpeta app/ventas-para-{slug}/page.tsx copiando otra (3 líneas).
 * El índice /ventas-por-sector y el sitemap lo recogen solos.
 */

export type Sector = {
  slug: string;
  /** Nombre corto para el índice y los enlaces: «Externalización de RRHH». */
  nombre: string;
  /** Una frase para la tarjeta del índice. */
  resumen: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  intro: string;
  destacados: string[];
  bloques: SeoBloque[];
  caso?: SeoCaso;
  faq: { p: string; r: string }[];
  /** Slugs de otros sectores cercanos, para enlazar dentro del clúster. */
  cercanos: string[];
  cierre: string;
};

export const SECTORES: Sector[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "empresas-de-formacion",
    nombre: "Empresas de formación",
    resumen:
      "Academias, centros de formación y escuelas: compiten por precio y venden con asesores que empiezan desde cero.",
    title: "Ventas para empresas de formación y academias",
    description:
      "Para academias, centros de formación y escuelas que venden por llamada. Cómo dejar de competir por precio, ordenar la venta cuando el equipo crece y entrenar a asesores que empiezan desde cero. Con dos casos reales.",
    kicker: "Empresas de formación",
    h1: "Tu formación es buena. Tus alumnos no lo saben hasta que la compran.",
    intro:
      "En formación casi todo el mundo vende igual: el alumno pide información, alguien le llama, le cuenta el temario y le da el precio. Y el alumno hace lo lógico: compara con otras tres academias y elige la más barata. El problema no es tu precio. Es que la llamada no le ha dado ninguna razón para pagar más.",
    destacados: [
      "Si el alumno solo puede comparar temario y precio, siempre gana el más barato.",
      "Un asesor que empieza desde cero improvisa, se bloquea con las objeciones y pierde alumnos buenos.",
      "Cuando el equipo crece sin proceso, cada persona vende a su manera y nadie sabe qué funciona.",
    ],
    bloques: [
      {
        h2: "Cómo decide un alumno",
        parrafos: [
          "Quien se apunta a una formación no compra horas de clase. Compra aprobar, conseguir el trabajo o cambiar de sector. Y llega con miedo: a gastar dinero en algo que no termine, a no tener tiempo, a volver a fallar. Muchas veces decide con alguien más, su pareja o su familia, que no ha estado en la llamada.",
          "Por eso las llamadas que se dedican a explicar el temario acaban en «me lo tengo que pensar». La llamada que vende es la que entiende qué le ha pasado hasta ahora, qué necesita para conseguirlo esta vez y por qué tu formación, y no otra, se lo va a dar.",
        ],
      },
      {
        h2: "Dónde se escapan las matrículas",
        lista: [
          "Se contesta a «¿cuánto cuesta?» en el primer minuto, y a partir de ahí todo es una negociación de precio.",
          "Se presenta el temario en vez de preguntar por el objetivo, los intentos anteriores y el miedo real.",
          "«Me lo tengo que pensar» y «lo tengo que hablar en casa» se aceptan sin más, y el alumno no vuelve.",
          "El seguimiento depende de acordarse: los leads se enfrían entre una convocatoria y la siguiente.",
          "Los asesores nuevos aprenden escuchando a otro un par de días, y cada uno acaba vendiendo distinto.",
        ],
      },
      {
        h2: "Qué hacemos",
        lista: [
          "Revisar la oferta y el precio: cómo explicar por qué tu formación vale lo que cuesta.",
          "Un guion de llamada que empieza por el alumno, no por el temario.",
          "Respuestas trabajadas a las objeciones de tu público, sacadas de tus llamadas reales.",
          "Un protocolo de seguimiento que no dependa de la memoria de nadie.",
          "Revisión de las llamadas de cada asesor, con feedback directo, y un sistema para formar a cada persona nueva.",
        ],
      },
    ],
    caso: {
      etiqueta: "Dos casos reales en formación",
      titulo: "De competir por precio a no tener techo comercial.",
      cifras: [
        { valor: "x4", texto: "Facturación anual de ISYFU en dos años" },
        { valor: "250.000 €", texto: "Facturación anual de ISYFU hoy" },
        { valor: "8 → 10 %", texto: "Conversión de Farma Leaders Talento" },
        { valor: "40.000 €", texto: "Netos más para Farma Leaders" },
      ],
      parrafos: [
        "ISYFU, una empresa de formación, facturaba unos 60.000 € al año compitiendo por precio, como el resto de su sector. Tras dos años trabajando la dirección comercial —oferta, precio, cómo diferenciarse y un sistema para formar a cada persona nueva del equipo— factura unos 250.000 € al año. «Nos ha permitido quitarle el techo que teníamos, que era de dirección comercial», explica su CEO, Samuel Acera.",
        "Farma Leaders Talento, un centro de formación para profesionales del sector salud, vendía bien gracias a su producto, pero sin sistema, justo cuando iba a ampliar el equipo. Con guion, protocolo de seguimiento y revisión de las llamadas de cada comercial, la conversión subió del 8 % al 10 %: unos 40.000 € netos más. «Hemos pasado de vender porque tenemos un buen producto a vender porque realmente sabemos vender», resume José, su responsable de ventas.",
      ],
    },
    faq: [
      {
        p: "¿Funciona si vendemos a particulares y no a empresas?",
        r: "Sí. Los dos casos de esta página venden a alumnos particulares. La llamada es distinta a una venta entre empresas, y por eso el guion y las objeciones se trabajan sobre tus propias llamadas.",
      },
      {
        p: "¿Cómo se deja de competir por precio?",
        r: "Dando al alumno algo más que comparar. Si la llamada saca su objetivo, lo que ha intentado antes y lo que le ha fallado, tu formación deja de ser «otra academia más» y el precio se mide contra lo que va a conseguir.",
      },
      {
        p: "Tenemos asesores que nunca han vendido. ¿Sirve?",
        r: "Es uno de los mejores momentos. Con un guion claro y la revisión de sus llamadas desde la primera semana, alguien que empieza desde cero deja de improvisar y de bloquearse con las objeciones mucho antes.",
      },
      {
        p: "¿Nos traéis alumnos?",
        r: "No. No hacemos marketing ni captación. Trabajamos desde que alguien pide información hasta que se matricula o dice que no.",
      },
    ],
    cercanos: ["empresas-de-externalizacion-rrhh"],
    cierre: "¿Quieres saber dónde se te están escapando las matrículas?",
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "empresas-de-externalizacion-rrhh",
    nombre: "Externalización de RRHH",
    resumen:
      "Cuota mensual, venta de confianza y una fundadora que vende sola y ha tocado techo.",
    title: "Ventas para empresas de externalización de RRHH",
    description:
      "Para empresas de RRHH externalizado que venden por reunión y cobran una cuota mensual. Dónde se escapa la venta, cómo responder a «ya lo lleva la gestoría» y un caso real: de 5.000 € a más de 10.000 € al mes.",
    kicker: "Externalización de RRHH",
    h1: "Sabes de RRHH. Vender tu servicio es otra cosa.",
    intro:
      "En una empresa de externalización de RRHH casi siempre vende quien la fundó. Conoce el oficio y el cliente lo nota, pero cada reunión es distinta: unos meses cierras varios clientes y otros ninguno, y no sabes explicar por qué. Con una cuota mensual por cliente, cada venta que se escapa se nota durante todo el año.",
    destacados: [
      "Tu cliente no compra un servicio: te deja ver nóminas, bajas y despidos. Compra confianza.",
      "Tu competencia real no es otra empresa de RRHH: es «ya lo lleva la gestoría».",
      "Cada cliente es una cuota de todos los meses: un cierre más al mes cambia el año.",
    ],
    bloques: [
      {
        h2: "Cómo se compra un servicio de RRHH externalizado",
        parrafos: [
          "Quien te llama suele ser la gerencia de una empresa que ha crecido más rápido que su organización: ya no le da la vida para la selección, la rotación le cuesta dinero o ha tenido un susto con una inspección o un conflicto laboral. Llega con un problema concreto y urgente, no con ganas de «externalizar RRHH».",
          "Y aun así no decide rápido. Contratarte significa sacar información sensible de la empresa, cambiar la forma de hacer las cosas (normalmente, la gestoría más alguien de administración que «lo va llevando») y, a veces, convencer a un socio. Si la reunión no deja claro cuánto les cuesta seguir como están, lo más cómodo es no cambiar nada.",
        ],
      },
      {
        h2: "Dónde se escapa la venta",
        lista: [
          "Se responde al problema urgente y no se busca el de fondo: se vende un proceso de selección y se pierde la cuota mensual.",
          "No se pone cifra a lo que cuesta seguir igual: horas de gerencia, rotación, riesgo laboral. Sin esa cifra, la cuota siempre parece cara.",
          "«Ya lo lleva la gestoría» se toma como un no, cuando es la objeción más previsible del sector.",
          "No se detecta a tiempo quién más decide, y la reunión que iba bien acaba en «lo tengo que hablar con mi socio».",
          "Cada reunión se improvisa, así que lo que funciona un día no se puede repetir al siguiente.",
        ],
      },
      {
        h2: "Qué hacemos",
        lista: [
          "Analizar tus reuniones de venta, una a una, para ver qué haces cuando cierras y qué cuando no.",
          "Un guion de reunión que saca el problema de fondo y lo que les cuesta seguir igual.",
          "Respuestas preparadas a «ya lo lleva la gestoría», «es caro para lo que es» y «tengo que consultarlo».",
          "Revisar cómo presentas la cuota, para que se compare con el problema y no con otra empresa.",
          "Feedback directo cada semana, y todo por escrito para que el día que contrates a alguien tenga con qué empezar.",
        ],
      },
    ],
    caso: {
      etiqueta: "Caso real · Hotlist, RRHH para hostelería",
      titulo: "De 5.000 € a más de 10.000 € al mes, vendiendo ella misma.",
      cifras: [
        { valor: "5.000 €", texto: "Ingresos recurrentes al mes, al empezar" },
        { valor: "0", texto: "Clientes nuevos en enero y febrero" },
        { valor: "+10.000 €", texto: "Ingresos recurrentes al mes desde marzo" },
        { valor: "x2", texto: "En menos de un año" },
      ],
      parrafos: [
        "Hotlist es una startup de RRHH para hostelería. Su CEO, Lucía, llevaba ella misma las reuniones y todo el proceso de venta, sin equipo comercial. Entre enero y febrero de 2026 no cerró ningún cliente nuevo.",
        "Trabajamos con mentorías y seguimiento semanal, analizando sus reuniones de venta una a una hasta dar con un guion que funcionaba. Desde que lo aplica, en marzo de 2026, ha pasado de unos 5.000 € a más de 10.000 € de ingresos recurrentes al mes.",
        "«Como emprendedora parece que tienes que saber de todos los palos, pero no eres especialista en nada. Yo sigo sin ser especialista en ventas, pero tengo a Paula, que me ayuda para ello.»",
      ],
      enlace: { href: "/casos/hotlist", texto: "Leer el caso completo de Hotlist" },
    },
    faq: [
      {
        p: "¿Me vais a traer clientes?",
        r: "No. Galador no hace captación ni llama a tus leads. Trabajamos desde que alguien pide una reunión hasta que firma o dice que no. Si lo que te falta son leads, te lo diremos en el diagnóstico antes de empezar.",
      },
      {
        p: "¿Sirve si todavía vendo yo, sin comercial?",
        r: "Es justo el caso de Hotlist. Se escuchan tus reuniones, se escribe lo que funciona y se convierte en un guion. Y cuando contrates, tendrás algo que entregarle desde el primer día.",
      },
      {
        p: "¿Cómo se responde a «ya lo lleva la gestoría»?",
        r: "No se responde en ese momento: se prepara antes. Si en la reunión has preguntado qué hace hoy la gestoría, qué se queda sin hacer y cuántas horas le dedica la gerencia a lo que falta, la objeción casi no aparece. Cuando aparece, es señal de que las preguntas se quedaron cortas.",
      },
      {
        p: "¿Cuánto tiempo hace falta?",
        r: "Tres meses para dejarlo funcionando: diagnóstico, guion y proceso, y entrenamiento sobre reuniones reales. Es lo que tarda el cambio en notarse en cómo hablas con el cliente, no solo en un documento.",
      },
    ],
    cercanos: ["empresas-de-formacion"],
    cierre: "¿Quieres saber por qué unos meses cierras y otros no?",
  },
];

export function getSector(slug: string): Sector {
  const s = SECTORES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Sector no encontrado: ${slug}`);
  return s;
}
