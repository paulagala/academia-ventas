import type { Metadata } from "next";
import SeoLanding from "../components/SeoLanding";

export const metadata: Metadata = {
  title: "Entrenamiento comercial para equipos de ventas | Paula Gallego",
  description:
    "Entrenamiento comercial para que tu equipo venda con método, criterio y consistencia. Integro el sistema en la conversación real: indagación, objeciones y acompañamiento de la decisión.",
  alternates: { canonical: "/entrenamiento-comercial" },
};

export default function Page() {
  return (
    <SeoLanding
      kicker="Entrenamiento comercial"
      h1="Entrenamiento comercial para que tu equipo venda con método."
      intro="Un buen sistema de ventas solo escala si el equipo sabe ejecutarlo. El entrenamiento comercial integra el método en la conversación real, para que tus comerciales vendan con criterio y consistencia, no de memoria."
      bloques={[
        {
          h2: "Por qué formar guiones no basta",
          parrafos: [
            "Dar un guion a un equipo no cambia cómo vende. Lo que cambia los resultados es entrenar la conversación: el tono, la escucha, las preguntas y cómo se acompaña al cliente hasta la decisión.",
            "Por eso no dejo un manual y desaparezco. Trabajo sobre llamadas reales para que el método se note en cada conversación.",
          ],
        },
        {
          h2: "Qué entrenamos",
          parrafos: [
            "Indagación: preguntar en profundidad para diagnosticar el problema real, no quedarse en la superficie.",
            "Gestión de objeciones: trabajar “me lo pienso” o “es caro” sin presionar ni ponerse a la defensiva.",
            "Estructura de la llamada: un orden claro que da control sin sonar rígido ni guionizado.",
            "Acompañamiento de la decisión: ayudar al cliente a decidir con criterio, manteniendo la calidad de la venta.",
          ],
        },
        {
          h2: "Para equipos que crecen",
          parrafos: [
            "Especialmente útil si estás incorporando comerciales o quieres que la venta deje de depender del fundador. El entrenamiento hace que el nivel se mantenga a medida que el equipo se amplía.",
            "El resultado: más conversaciones que avanzan y cierran, con un equipo que vende de forma consultiva y repetible.",
          ],
        },
      ]}
      cierre="Preparemos a tu equipo comercial."
    />
  );
}
