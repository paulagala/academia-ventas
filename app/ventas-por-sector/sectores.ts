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
    slug: "empresas-de-externalizacion-rrhh",
    nombre: "Externalización de RRHH",
    resumen:
      "Cuota mensual, venta de confianza y un fundador que cierra mejor que su comercial.",
    title: "Ventas para empresas de externalización de RRHH",
    description:
      "Cómo vender servicios de RRHH externalizados cuando el fundador ya no puede llevar todas las reuniones: dónde se cae la venta, por qué el comercial no cierra lo mismo y un caso real.",
    kicker: "Externalización de RRHH",
    h1: "Vender RRHH externalizado cuando ya no vendes tú.",
    intro:
      "En una empresa de externalización de RRHH, la primera etapa suele ir sola: la fundadora conoce el oficio, el cliente lo nota y cierra. El problema llega cuando entra un comercial y los números se desploman con los mismos leads. Casi nunca es que la persona sea mala. Es que la venta que funcionaba vivía en la cabeza de quien la hacía.",
    destacados: [
      "Tu cliente no compra un servicio: te deja ver nóminas, bajas y despidos. Compra confianza.",
      "Tu competencia real no es otra empresa de RRHH: es «ya lo lleva la gestoría».",
      "Cada cliente es una cuota de todos los meses: un cierre de más al mes cambia el año.",
    ],
    bloques: [
      {
        h2: "Cómo se compra un servicio de RRHH externalizado",
        parrafos: [
          "Quien te llama suele ser la gerencia de una pyme que ha crecido más rápido que su organización: ya no le cabe en la agenda la selección, la rotación le cuesta dinero o ha tenido un susto con una inspección o un conflicto laboral. Llega con un problema concreto y urgente, no con ganas de «externalizar RRHH».",
          "Y aun así la decisión no es rápida. Contratarte significa sacar información sensible de casa, cambiar la forma en que se hacen las cosas hoy (normalmente, la gestoría más alguien de administración que «lo va llevando») y, a menudo, convencer a un socio. Si la reunión no deja claro cuánto les está costando la situación actual, lo más cómodo para ellos es no cambiar nada.",
        ],
      },
      {
        h2: "Dónde se cae la venta en este sector",
        lista: [
          "Se responde al problema urgente y no se indaga el de fondo. Se vende «un proceso de selección» y se pierde la cuota mensual.",
          "No se cuantifica el coste de seguir igual: horas de gerencia, rotación, riesgo laboral. Sin esa cifra, la cuota siempre parece cara.",
          "«Ya lo lleva la gestoría» se trata como un no, cuando es la objeción más previsible del sector y la que más se puede preparar.",
          "No se detecta a tiempo quién más decide. La reunión va bien, pero luego «lo tengo que hablar con mi socio» y el lead se enfría.",
          "No-shows: se agenda por agendar, sin confirmar el problema ni el compromiso, y media agenda no aparece.",
        ],
      },
      {
        h2: "Por qué tu comercial no cierra lo que cerrabas tú",
        parrafos: [
          "Cuando vendías tú, hacías sin darte cuenta cosas que no estaban escritas en ningún sitio: contabas un caso parecido en el momento justo, sabías qué preguntar cuando alguien mencionaba una baja larga, explicabas la cuota comparándola con lo que ya pagaban. Eso no es talento: es un proceso que nadie ha documentado.",
          "Un comercial no puede copiar lo que no ve. Si le entregas los leads y una presentación, va a improvisar, y cada llamada dependerá del día que tenga. Lo que hay que hacer primero es escuchar tus llamadas buenas y las suyas, y poner por escrito la diferencia: qué pregunta, en qué orden y con qué criterio se decide que un lead sí vale.",
        ],
      },
      {
        h2: "Qué se trabaja en una consultoría comercial para RRHH",
        lista: [
          "Revisión de las llamadas reales del comercial, anotadas por fases: dónde se pierde cada una.",
          "Guion de la reunión de diagnóstico, con las preguntas que sacan el coste de seguir como están.",
          "Respuesta preparada a «ya lo lleva la gestoría», «es caro para lo que es» y «tengo que consultarlo».",
          "Criterios para agendar (y para no agendar), y una confirmación que baje los no-shows.",
          "Tres números que se miran cada lunes, para dirigir la venta con datos y no por sensación.",
        ],
      },
    ],
    caso: {
      etiqueta: "Caso real · en curso (sep–dic 2026)",
      titulo: "Mismos leads, otra persona vendiendo: de 5 cierres a 0.",
      cifras: [
        { valor: "5", texto: "Cierres en abril, vendiendo la fundadora" },
        { valor: "0", texto: "Cierres en mayo, con el nuevo comercial" },
        { valor: "8 de 18", texto: "Reuniones de mayo que no se presentaron" },
        { valor: "0", texto: "Datos registrados desde junio" },
      ],
      parrafos: [
        "Una empresa de externalización de RRHH con cuota mensual por cliente. En abril, con la fundadora al frente de las reuniones, 102 leads se convirtieron en 20 reuniones y 5 clientes nuevos. En mayo entró un comercial para liberarla. Con más leads (140), se agendaron 18 reuniones, 8 no se presentaron y no se cerró ninguna.",
        "La primera lectura era «el comercial no funciona». Al revisar las llamadas y el registro salieron tres fugas distintas: asistencia (casi la mitad de la agenda no aparecía), conversión dentro de la llamada (el comercial improvisaba lo que la fundadora hacía de memoria) y medición (el registro se había dejado de actualizar, así que nadie podía saber qué estaba pasando).",
        "Por eso el trabajo no empezó por formar al comercial, sino por las tres cosas a la vez: una sesión mensual de dirección comercial con la fundadora, revisión de las llamadas reales del comercial cada semana y tres números que se envían cada lunes.",
      ],
      nota: "Este caso está en marcha. El resultado se publicará aquí cuando termine el trimestre, en diciembre de 2026.",
    },
    faq: [
      {
        p: "¿Me vais a traer clientes?",
        r: "No. Galador no hace captación ni llama a tus leads. Trabajamos lo que pasa desde que alguien pide una reunión hasta que firma o dice que no. Si lo que te falta son leads, te lo diremos en el diagnóstico antes de empezar.",
      },
      {
        p: "¿Sirve si todavía vendo yo, sin comercial?",
        r: "Es el mejor momento. Se escuchan tus llamadas, se pone por escrito lo que haces bien y se convierte en un guion y unos criterios. Así, cuando contrates, tendrás algo que entregarle desde el primer día.",
      },
      {
        p: "¿Cómo se responde a «ya lo lleva la gestoría»?",
        r: "No se responde en ese momento: se prepara antes. Si en la reunión has preguntado qué hace hoy la gestoría, qué se queda sin hacer y cuántas horas le dedica la gerencia a lo que falta, la objeción casi no aparece. Cuando aparece, es una señal de que la indagación se quedó corta.",
      },
      {
        p: "¿Cuánto dura?",
        r: "Tres meses: diagnóstico, construcción del proceso y entrenamiento sobre llamadas reales. Es el tiempo que hace falta para que el cambio se vea en cómo se habla con el cliente, no solo en un documento.",
      },
    ],
    cercanos: ["asesorias-y-gestorias", "consultoras", "agencias"],
    cierre: "¿Quieres saber por qué tu comercial no cierra lo que cerrabas tú?",
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "infoproductores",
    nombre: "Infoproductores",
    resumen:
      "Programas high ticket vendidos por llamada: setters, closers, no-shows y «me lo tengo que pensar».",
    title: "Ventas para infoproductores: llamadas de cierre y closers",
    description:
      "Para infoproductores que venden programas high ticket por llamada. Por qué se agendan llamadas que no cierran, cómo bajar los no-shows y cómo entrenar a tu closer con sus propias llamadas.",
    kicker: "Infoproductores",
    h1: "Tienes agenda llena y las llamadas no cierran.",
    intro:
      "Si vendes un programa high ticket por llamada, el embudo parece sencillo: anuncio o contenido, formulario, llamada, cierre. Cuando no funciona, casi todo el mundo toca lo de arriba: más anuncios, otro lead magnet, otro setter. Pero con agenda llena y conversión baja, el problema no está en el tráfico. Está en lo que pasa entre que alguien agenda y que alguien cuelga.",
    destacados: [
      "Con pocas llamadas al mes, cada cierre perdido pesa mucho: afinar la llamada rinde más que doblar el tráfico.",
      "Un closer que improvisa vende según el día que tenga. Uno con guion y revisión, no.",
      "Presionar en la llamada cierra hoy y devuelve mañana: reembolsos, impagos y mala fama.",
    ],
    bloques: [
      {
        h2: "Cómo se compra un programa high ticket",
        parrafos: [
          "Quien agenda contigo ya te conoce: ha visto tus vídeos o tus anuncios y ha rellenado un formulario. Llega con una mezcla de ganas y desconfianza, porque ha visto muchos programas prometer lo mismo. La llamada no está para explicarle el programa; eso ya lo intuye. Está para que entienda por qué no ha conseguido su objetivo solo y si esto es lo que le falta.",
          "Por eso las llamadas que se convierten en una presentación larga del temario suelen acabar en «me lo tengo que pensar». Y las que se basan en urgencia y presión cierran, pero luego se pagan en reembolsos, impagos de cuotas y alumnos que no terminan.",
        ],
      },
      {
        h2: "Dónde se cae la venta en un infoproducto",
        lista: [
          "No-shows: se agenda a cualquiera, sin confirmar el problema ni el compromiso, y la agenda se llena de gente que no aparece.",
          "Cualificación débil: el setter pasa llamadas que el closer no puede cerrar, y el closer pierde la mitad de su tiempo.",
          "La llamada se convierte en presentación: se habla del programa antes de entender a la persona.",
          "Objeciones de manual («lo tengo que hablar con mi pareja», «ahora no es buen momento») que en realidad nacen veinte minutos antes, en la indagación.",
          "Nadie escucha las llamadas: el closer se evalúa por su tasa de cierre y nadie sabe qué hace distinto en las que cierra.",
        ],
      },
      {
        h2: "Qué se trabaja con tu closer",
        parrafos: [
          "El entrenamiento se hace sobre sus propias llamadas, no sobre un curso de cierre. Cada semana se escuchan grabaciones reales, se anotan por fases (apertura, indagación, diagnóstico, presentación, objeciones, cierre) y se trabaja la frase exacta que cambia la llamada. Así el closer sabe qué repetir y qué dejar de hacer.",
        ],
        lista: [
          "Criterios de agenda compartidos entre setter y closer: qué tiene que pasar para que una llamada merezca la pena.",
          "Una secuencia de confirmación que baja los no-shows sin perseguir a nadie.",
          "Guion de llamada con las preguntas que llevan a la persona a ver su propio problema.",
          "Respuestas trabajadas a las objeciones reales de tu público, sacadas de tus grabaciones.",
          "Un cuadro con asistencia, cierre por llamada realizada y motivos de pérdida.",
        ],
      },
      {
        h2: "Para quién no es",
        parrafos: [
          "Si aún no tienes llamadas de venta (vendes solo con un lanzamiento o una página), esto no te sirve todavía. Tampoco si buscas técnicas de cierre agresivas: aquí se trabaja una venta que el alumno no se arrepienta de haber comprado.",
        ],
      },
    ],
    faq: [
      {
        p: "¿Revisáis las llamadas de mi closer?",
        r: "Sí, es el centro del trabajo. Se escuchan las grabaciones, se anotan contra un banco de criterios por fases y cada semana se trabajan con el closer las que más enseñan.",
      },
      {
        p: "¿Qué pasa si vendo yo y no tengo closer?",
        r: "Se hace lo mismo con tus llamadas. Y de paso queda escrito lo que funciona, que es lo que necesitarás para que un closer arranque rápido el día que lo contrates.",
      },
      {
        p: "¿Me ayudáis con los anuncios o el embudo?",
        r: "No. Galador trabaja desde que alguien agenda hasta que compra o dice que no. Si el diagnóstico muestra que el problema está en el volumen o en la calidad del lead, te lo diremos.",
      },
      {
        p: "¿Cómo bajo los no-shows?",
        r: "Casi siempre empieza antes de la llamada: qué se le pregunta a la persona al agendar, cuánto tiempo pasa hasta la cita y qué recibe mientras. Se revisa ese tramo entero, no solo el recordatorio.",
      },
    ],
    cercanos: ["agencias", "empresas-de-externalizacion-rrhh", "consultoras"],
    cierre: "¿Quieres saber en qué minuto se están perdiendo tus llamadas?",
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "agencias",
    nombre: "Agencias",
    resumen:
      "Propuestas que nadie contesta, clientes que comparan tres presupuestos y la venta en manos del fundador.",
    title: "Ventas para agencias: propuestas que sí se cierran",
    description:
      "Para agencias de marketing, diseño o desarrollo que venden por reunión y propuesta. Por qué las propuestas se quedan sin respuesta, cómo dejar de competir por precio y cómo sacar la venta de la agenda del fundador.",
    kicker: "Agencias",
    h1: "Mandas la propuesta y el cliente desaparece.",
    intro:
      "En una agencia, la venta suele seguir el mismo camino: primera reunión, «mándame una propuesta», días preparándola, y luego silencio o un «nos quedamos con otra, más económica». La respuesta habitual es mejorar la propuesta: más bonita, más detallada, más barata. Pero la propuesta casi nunca es el problema. Es lo que se hizo, o no se hizo, en la reunión anterior.",
    destacados: [
      "Una propuesta enviada sin diagnóstico es un presupuesto más para comparar por precio.",
      "Lo que se promete en la venta decide cuánto dura el cliente después.",
      "Si solo vende el fundador, la agencia crece al ritmo de su agenda.",
    ],
    bloques: [
      {
        h2: "Cómo compra un cliente a una agencia",
        parrafos: [
          "Quien busca agencia casi siempre ha tenido otra antes, o lo ha intentado por su cuenta. Llega con desconfianza y con un encargo concreto («queremos una web», «necesitamos llevar redes»), que no es su problema real. Su problema real es de negocio: no le entran clientes, no sabe si lo que invierte funciona o ha perdido la confianza en la agencia anterior.",
          "Si la reunión se queda en el encargo, lo único que el cliente puede comparar es el precio y el portfolio. Si la reunión saca el problema de negocio y lo que le está costando, la propuesta deja de ser un presupuesto y se convierte en un plan que ya ha aceptado a medias.",
        ],
      },
      {
        h2: "Dónde se cae la venta en una agencia",
        lista: [
          "La primera reunión es una presentación de la agencia, no un diagnóstico del cliente.",
          "Se hacen propuestas gratis, largas y a ciegas, que el cliente usa para comparar o para hacerlo él mismo.",
          "No se pregunta por presupuesto, plazos ni quién decide, y luego la propuesta llega a quien no firma.",
          "«Es caro» aparece cuando no se ha puesto una cifra al problema que se va a resolver.",
          "Se promete de más para cerrar, y el cliente se va al tercer mes porque esperaba otra cosa.",
        ],
      },
      {
        h2: "Qué cambia cuando hay un proceso",
        parrafos: [
          "La propuesta deja de ser el momento de vender y pasa a confirmar lo que ya se ha hablado. Hay una reunión de diagnóstico con preguntas preparadas, se acuerda en esa misma reunión qué va a llevar la propuesta y cuánto cuesta aproximadamente, y se presenta en una llamada, no por correo.",
          "Eso también es lo que permite que venda alguien más que el fundador. Mientras la venta dependa de su intuición, nadie más puede hacerla igual. Cuando está escrita (qué se pregunta, qué se promete, qué no), se puede enseñar.",
        ],
        lista: [
          "Revisión de reuniones reales de venta, grabadas y anotadas por fases.",
          "Guion de la reunión de diagnóstico y criterios para decidir a quién se le hace propuesta y a quién no.",
          "Estructura de propuesta y cómo presentarla en una llamada.",
          "Respuestas trabajadas a «es caro» y «lo estamos comparando».",
          "Qué se puede prometer en la venta para que el cliente se quede.",
        ],
      },
    ],
    faq: [
      {
        p: "¿Nos conseguís clientes?",
        r: "No. Galador no hace captación: trabaja lo que pasa desde que un posible cliente pide reunión hasta que firma. Si lo que falta son oportunidades, te lo diremos en el diagnóstico.",
      },
      {
        p: "¿Hay que dejar de hacer propuestas?",
        r: "No, hay que dejar de hacerlas a ciegas. La propuesta llega después de un diagnóstico, con el alcance y la cifra ya hablados, y se presenta en una llamada. Así se hacen menos y se cierran más.",
      },
      {
        p: "¿Sirve si somos una agencia pequeña?",
        r: "Sí. En una agencia de pocas personas suele vender el fundador. Poner su forma de vender por escrito es justo lo que permite, más adelante, que otra persona lleve las reuniones.",
      },
      {
        p: "¿Cómo se deja de competir por precio?",
        r: "Siendo la única agencia que ha entendido el problema. Si la reunión saca lo que le cuesta al cliente seguir como está, tu propuesta ya no se compara con otras por precio, porque las otras no responden a lo mismo.",
      },
    ],
    cercanos: ["consultoras", "infoproductores", "empresas-de-externalizacion-rrhh"],
    cierre: "¿Quieres saber qué está pasando en la reunión antes de la propuesta?",
  },
];

export function getSector(slug: string): Sector {
  const s = SECTORES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Sector no encontrado: ${slug}`);
  return s;
}
