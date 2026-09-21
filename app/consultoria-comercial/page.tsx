import type { Metadata } from "next";
import SeoLanding from "../components/SeoLanding";

// Intención informativa: esta página explica qué es una consultoría comercial.
// La consulta transaccional («consultoría comercial para negocios de servicios»)
// la trabaja la home, que es la página con el formulario. El sufijo « | Galador»
// lo añade el template del layout.
export const metadata: Metadata = {
  title: "Qué es una consultoría comercial y para quién",
  description:
    "Qué es una consultoría comercial, qué incluye y qué no: diagnóstico sobre llamadas reales, construcción del proceso y entrenamiento de quien vende.",
  alternates: { canonical: "/consultoria-comercial" },
};

export default function Page() {
  return (
    <SeoLanding
      kicker="Consultoría comercial"
      h1="Qué es una consultoría comercial y cuándo merece la pena."
      intro="Es entrar en un negocio que ya vende, ver cómo vende de verdad —no cómo cree que vende— y dejar esa forma de vender convertida en algo que se pueda repetir, enseñar y medir. Ni formación, ni un informe con recomendaciones: un sistema en funcionamiento."
      destacados={[
        "Se trabaja sobre llamadas reales grabadas, no sobre un caso de manual.",
        "Cada llamada vuelve anotada contra un banco de criterios propio, por escrito.",
        "Empieza donde la oportunidad ya existe: no genera leads ni hace marketing.",
        "Termina con quien vende ejecutando el sistema, no con un documento entregado.",
      ]}
      fases={[
        {
          plazo: "Semanas 1–2",
          titulo: "Diagnosticar",
          texto:
            "Se escuchan las llamadas grabadas, se revisa el pipeline y se habla con quien vende hoy. La pregunta que hay que contestar es concreta: en qué paso exacto se caen las oportunidades. Casi nunca está donde se cree.",
        },
        {
          plazo: "Semanas 3–6",
          titulo: "Construir",
          texto:
            "Con el diagnóstico encima de la mesa se diseña el proceso completo: etapas, criterios para decir que sí y para decir que no, guion de conversación, secuencia de seguimiento, qué tiene que quedar registrado en cada etapa y las pocas métricas que de verdad indican algo.",
        },
        {
          plazo: "Semanas 7–12",
          titulo: "Entrenar",
          texto:
            "Sesiones con quien vende y revisión de llamadas reales cada semana, hasta que el sistema se nota en cómo se habla con el cliente. Sin esta fase, lo construido antes se queda en un PDF que nadie abre.",
        },
      ]}
      bloques={[
        {
          h2: "Qué incluye y qué no",
          parrafos: [
            "Incluye lo que pasa desde que existe una oportunidad hasta que hay una decisión: a quién se dedica el tiempo, qué se pregunta en la llamada, cómo se explica el precio y qué se hace con quien dice «me lo pienso».",
            "No incluye captación. Ni campañas, ni contenido, ni anuncios, ni prospectar o llamar a tus leads por ti. Si el problema es que no entran oportunidades, una consultoría comercial no lo va a resolver y conviene saberlo antes de empezar.",
            "Tampoco se monta ni se administra un CRM, ni se cierran llamadas en tu nombre. El sistema es tuyo y lo ejecuta tu gente: ese es justamente el objetivo.",
          ],
        },
        {
          h2: "Qué se llevan los negocios que la contratan",
          lista: [
            "Una auditoría de sus propias llamadas, con lo que funciona y el error que se repite.",
            "El mapa de fugas: en qué etapa se pierde cada oportunidad y por qué.",
            "El proceso por etapas y los criterios de cualificación puestos por escrito.",
            "Guion de conversación y secuencia de seguimiento adaptados a lo que venden.",
            "Sus llamadas del trimestre revisadas y anotadas, una a una, con feedback por escrito.",
            "Qué tiene que quedar registrado en el CRM que ya usan, y un cuadro de métricas que se lee en cinco minutos.",
            "Un manual de venta propio, para que quien entre mañana aprenda sin depender de nadie en concreto.",
          ],
        },
        {
          h2: "Para qué negocios tiene sentido",
          parrafos: [
            "Para negocios de servicios que ya venden de forma estable, que venden por llamada o reunión y que tienen flujo constante de oportunidades. El momento suele reconocerse solo: cada conversación depende de quién la lleve y del día que tenga, y nadie sabría explicar por qué unas cierran y otras no.",
            "Da igual si vendes tú o si ya hay un equipo. Cambia con quién se entrena, no el trabajo.",
            "No tiene sentido si aún se están buscando los primeros clientes, si lo que hace falta es más tráfico, o si lo que se espera es una técnica de cierre que compense un proceso que no existe. En esos casos, lo honesto es decirlo en la primera llamada y no cobrar tres meses.",
          ],
        },
      ]}
      faq={[
        {
          p: "¿En qué se diferencia de una formación de ventas?",
          r: "Una formación entrega contenido y se acaba. Aquí el contenido es lo último: primero se audita el proceso real y se construye el sistema, y solo entonces se entrena al equipo sobre lo que se ha construido. Por eso son tres meses y no una tarde.",
        },
        {
          p: "¿Funciona si vendo yo, sin equipo?",
          r: "Sí. El diagnóstico se hace sobre tus llamadas y el entrenamiento es contigo. De hecho suele ser el mejor momento: construir el sistema antes de contratar evita incorporar a alguien y descubrir que no hay nada que enseñarle porque todo estaba en tu cabeza.",
        },
        {
          p: "¿Se puede aprovechar el CRM que ya hay?",
          r: "Se trabaja con el que ya tengas: no montamos ni administramos CRM. Lo que se define es qué tiene que quedar registrado en cada etapa para poder dirigir con datos en lugar de con intuición. Si el que usas impide medir lo básico se dice, pero cambiarlo es decisión tuya.",
        },
        {
          p: "¿Qué queda cuando terminan los tres meses?",
          r: "El proceso, los guiones, los criterios con los que se revisan las llamadas y el manual de venta, en manos de quien vende. La idea es exactamente esa: que siga funcionando sin nosotros dentro.",
        },
      ]}
      cierre="¿Quieres saber en qué paso se está cayendo tu proceso comercial?"
    />
  );
}
