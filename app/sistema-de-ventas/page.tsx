import type { Metadata } from "next";
import SeoLanding from "../components/SeoLanding";
import { enlacesMenos } from "../components/enlacesCluster";

// Intención informativa sobre el término «sistema de ventas».
// El sufijo « | Galador» lo añade el template del layout.
export const metadata: Metadata = {
  title: "Cómo construir un sistema de ventas que escale",
  description:
    "Proceso, cualificación, guiones, seguimiento y métricas: cómo se construye un sistema de ventas que no dependa de quién coja el teléfono ni del día.",
  alternates: { canonical: "/sistema-de-ventas" },
};

export default function Page() {
  return (
    <SeoLanding
      ruta="/sistema-de-ventas"
      kicker="Sistema de ventas"
      h1="Cómo construir un sistema de ventas que escale."
      intro="Un sistema de ventas es lo que hace que el resultado no dependa de quién coja el teléfono ni del día que tenga. Esta página explica de qué piezas se compone, cómo saber si te falta alguna y en qué orden se construyen."
      bloques={[
        {
          h2: "Qué es exactamente un sistema de ventas",
          parrafos: [
            "Es el conjunto de decisiones ya tomadas sobre cómo se vende en un negocio: a quién se atiende y a quién no, qué se pregunta y en qué orden, qué se hace después de cada conversación y qué números se miran para saber si va bien.",
            "La diferencia práctica es esta: sin sistema, cada venta depende del criterio de quien la lleve, y cuando ese criterio es bueno no se puede copiar. Con sistema, se puede enseñar, medir y corregir.",
          ],
        },
        {
          h2: "Las cinco piezas que lo componen",
          lista: [
            "Proceso por etapas: qué tiene que pasar para que una oportunidad avance, definido de forma que dos personas lo interpreten igual.",
            "Criterios de cualificación: en qué casos merece la pena dedicar una hora de llamada y en cuáles no. Es la pieza que más tiempo devuelve.",
            "Estructura de conversación: el orden de la llamada y las preguntas de indagación. No un texto para recitar, sino un mapa para no dejarse lo importante.",
            "Seguimiento: qué se manda, cuándo y con qué motivo, después de cada conversación que no cierra en el momento.",
            "Métricas: cuatro o cinco números que enseñan en qué etapa se pierde la gente. No un panel de treinta indicadores que nadie mira.",
          ],
        },
        {
          h2: "Antes del sistema: una oferta que se entienda",
          parrafos: [
            "Un sistema perfecto no salva una oferta que el cliente no entiende o un precio que nadie sabe defender. Si en tus llamadas el problema aparece siempre al hablar de dinero, o si te comparan con otros y eliges bajar el precio, hay que mirar eso primero. El proceso se construye encima.",
          ],
        },
        {
          h2: "Cómo saber si no tienes sistema",
          parrafos: [
            "Casi ningún negocio dice «no tenemos sistema de ventas». Lo que se ve son los síntomas:",
          ],
          lista: [
            "Cada llamada es distinta y no sabrías explicar por qué unas cierran y otras no.",
            "Te dicen «me lo pienso», se acaba la conversación y no hay nada previsto para que vuelvan.",
            "Se agendan reuniones a las que luego no aparece la mitad.",
            "Cuando delegas una llamada, la tasa de cierre baja y nadie sabe explicar por qué.",
            "El seguimiento vive en la cabeza de alguien, en un WhatsApp o en una hoja de cálculo desactualizada.",
            "Sabes cuánto facturas, pero no en qué paso concreto se pierde la mayoría de oportunidades.",
            "Cierras clientes a los que no puedes cobrar bien, porque el precio acaba negociándose al final y a la defensiva.",
          ],
        },
        {
          h2: "En qué orden se construye",
          parrafos: [
            "El orden importa más de lo que parece. Primero se escuchan llamadas reales grabadas y se anotan una a una contra un banco de criterios, porque el proceso hay que diseñarlo sobre cómo compra tu cliente y sobre cómo vendéis de verdad, no sobre una plantilla genérica. Después se fijan las etapas y los criterios de cualificación, que son los que condicionan todo lo demás.",
            "Con eso claro se escriben la estructura de conversación y el seguimiento, y solo entonces se decide qué tiene que quedar registrado en el CRM: definir campos antes de tener el proceso es la forma más habitual de acabar con un CRM que nadie rellena.",
            "Lo último es entrenar al equipo, porque un sistema que nadie sabe ejecutar no es un sistema. En un proyecto completo esto lleva unos tres meses.",
          ],
        },
        {
          h2: "Escalar no es vender más a cualquier precio",
          parrafos: [
            "Un sistema bien construido permite incorporar gente sin que baje la calidad de las conversaciones. Ese es el punto: que crecer no signifique empezar a presionar, sino hacer más veces bien lo que ya funcionaba.",
          ],
        },
      ]}
      faq={[
        {
          p: "¿Un CRM es un sistema de ventas?",
          r: "No. El CRM es la herramienta donde se apoya el sistema, no el sistema. Si no hay un proceso definido detrás, el CRM acaba siendo una agenda de contactos con campos vacíos.",
        },
        {
          p: "¿Sirve de algo si vendo yo sola, sin equipo?",
          r: "Sí, y suele ser el mejor momento. Construir el sistema antes de contratar evita el escenario habitual: incorporar a alguien y descubrir que no hay nada que enseñarle porque todo estaba en tu cabeza.",
        },
        {
          p: "¿Cuánto se tarda en construir uno?",
          r: "Un proyecto completo —diagnóstico, construcción y entrenamiento del equipo— son unos tres meses. Las piezas sueltas se pueden montar antes, pero sin la fase de entrenamiento el sistema no llega a usarse.",
        },
        {
          p: "¿No se vuelve rígido el equipo con un proceso así?",
          r: "Pasa cuando se confunde sistema con guion cerrado. La estructura marca qué hay que cubrir en una conversación, no las palabras exactas. Bien hecho, da más margen: quien no tiene que improvisar el orden puede concentrarse en escuchar.",
        },
      ]}
      caso={{
        etiqueta: "Caso real · Farma Leaders Talento, formación",
        titulo: "De vender por el producto a vender porque saben vender.",
        cifras: [
          { valor: "8 %", texto: "Conversión al empezar" },
          { valor: "10 %", texto: "Conversión con el sistema" },
          { valor: "40.000 €", texto: "Netos más" },
        ],
        parrafos: [
          "Farma Leaders Talento vendía bien gracias a un buen producto, pero sin sistema detrás, justo cuando iba a ampliar el equipo comercial. Se construyó el guion de ventas, un protocolo de seguimiento y la revisión de las llamadas de cada comercial, también de quien empezaba en ventas desde cero.",
          "«Hemos pasado de vender porque tenemos un buen producto a vender porque realmente sabemos vender», explica José, su responsable de ventas.",
        ],
      }}
      relacionados={enlacesMenos("/sistema-de-ventas")}
      cierre="¿Miramos qué piezas te faltan en tu sistema de ventas?"
    />
  );
}
