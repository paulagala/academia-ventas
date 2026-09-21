// Acordeón de preguntas frecuentes con <details>/<summary> nativos:
// funciona sin JavaScript, es navegable por teclado y Google lo indexa como texto.
const preguntas = [
  {
    q: "¿Cuánto dura el proyecto y qué dedicación exige?",
    a: [
      "Tres meses. Las dos primeras semanas las dedico a diagnosticar sobre tus llamadas reales; hasta la sexta, a construir el sistema; las seis últimas, a entrenar hasta que lo ejecutas sin mí.",
      "Nos vemos una vez por semana. Entre sesión y sesión me pasas las llamadas grabadas y te las devuelvo anotadas, así que el trabajo se hace sobre conversaciones que ibas a tener de todas formas. Nadie deja de vender durante el proyecto.",
    ],
  },
  {
    q: "¿Qué entregables recibo exactamente?",
    a: [
      "La auditoría de tus llamadas reales y el mapa de fugas: en qué punto exacto se pierde cada oportunidad y por qué.",
      "El sistema completo: proceso, criterios de cualificación, guiones de llamada, árbol de objeciones y un seguimiento que no dependa de acordarse. Con ello, el cuadro de métricas y qué tiene que registrar tu CRM para que puedas dirigir con datos. No te monto ni administro el CRM: defino qué hay que medir en el que ya uses.",
      "Y tus llamadas revisadas una a una contra mi banco de criterios, con el feedback por escrito. Al terminar te queda el manual de venta de tu negocio, que es con lo que entrenas a la siguiente persona que entre.",
    ],
  },
  {
    q: "¿Cuánto cuesta una consultoría comercial?",
    a: [
      "No publico tarifas porque el alcance cambia mucho de un negocio a otro: no es lo mismo ordenar la venta de una persona que la de un equipo de seis, ni un ciclo de venta que se resuelve en una llamada que otro de cuatro meses.",
      "En la llamada de diagnóstico revisamos tu caso y sales con una cifra cerrada, no con un rango. Y si veo que el retorno no te compensa, te lo digo en esa misma llamada.",
    ],
  },
  {
    q: "¿Funciona si vendo yo sola, sin equipo comercial?",
    a: [
      "Sí, y es donde antes se nota. Cuando vendes tú, el resultado deja de depender de cómo te hayas levantado ese día: dejas de improvisar cada llamada y empiezas a saber por qué cierras cuando cierras.",
      "Si más adelante contratas, la primera persona que entre se encuentra un proceso, unos guiones y unas métricas esperándola, en vez de tener que adivinar cómo vendías tú.",
      "Lo que no hago es trabajar con quien todavía no tiene un flujo constante de oportunidades. Sin llamadas que analizar no hay nada que ordenar, y ahí tu problema es de captación, no de sistema.",
    ],
  },
  {
    q: "¿Qué pasa cuando termina el proyecto? ¿Se sostiene sin ti?",
    a: [
      "Un sistema que solo sabe ejecutar quien lo diseñó no es un sistema, es una dependencia. Por eso las seis últimas semanas son de entrenamiento y no de entrega: tú o tu equipo lleváis las llamadas con el proceso nuevo mientras yo las reviso contra el banco de criterios y corrijo, hasta que el criterio está en las personas y no en un documento.",
      "Terminas con el manual de venta y con un cuadro de métricas que te avisa si algo se desvía antes de que lo notes en la facturación.",
    ],
  },
  {
    q: "¿Cuándo empiezo a ver resultados?",
    a: [
      "Los cambios en las conversaciones se notan en las primeras semanas de entrenamiento: se cualifica antes de coger la llamada, se indaga más y dejan de enfriarse oportunidades en el seguimiento. Es cuando empiezan a bajar los «me lo pienso» que nunca vuelven.",
      "El efecto en la facturación llega después, cuando ha pasado un ciclo de venta completo con el sistema ya funcionando. Si tu ciclo es de seis semanas, lo ves dentro del proyecto; si es de cuatro meses, lo ves al acabarlo. No te voy a prometer una cifra ni una fecha.",
    ],
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-16 sm:py-24 border-b border-[#DBD5C9] scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[360px_1fr] gap-10 lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#E3E5DC] text-[#3F5E53] text-sm font-semibold tracking-[0.06em] px-3.5 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3F5E53]" aria-hidden="true" />
            Preguntas frecuentes
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] font-[family-name:var(--font-dm-serif)] leading-tight">
            Lo que todo el mundo pregunta antes de escribirme.
          </h2>
          <p className="text-[#5A4F48] mt-5 leading-relaxed">
            Si tu duda no está aquí, pregúntamela en el formulario: la respondo yo.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {preguntas.map((p, i) => (
            <details
              key={p.q}
              open={i === 0}
              className="group bg-[#FFFDF9] border border-[#DBD5C9] rounded-2xl overflow-hidden"
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 text-[#2B231F] font-semibold text-base sm:text-lg focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#791E2A] [&::-webkit-details-marker]:hidden">
                {p.q}
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#791E2A] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 flex flex-col gap-3">
                {p.a.map((parrafo) => (
                  <p key={parrafo} className="text-[#5A4F48] text-base leading-relaxed">
                    {parrafo}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
