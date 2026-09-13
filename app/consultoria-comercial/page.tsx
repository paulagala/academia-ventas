import type { Metadata } from "next";
import SeoLanding from "../components/SeoLanding";

export const metadata: Metadata = {
  title: "Consultoría comercial para negocios de servicios | Paula Gallego",
  description:
    "Consultoría comercial para negocios de servicios online que ya venden: diagnostico tu proceso, construyo tu sistema de ventas y entreno a tu equipo para escalar sin perder calidad.",
  alternates: { canonical: "/consultoria-comercial" },
};

export default function Page() {
  return (
    <SeoLanding
      kicker="Consultoría comercial"
      h1="Consultoría comercial para negocios que ya venden y quieren escalar."
      intro="Si tu negocio de servicios online ya factura pero la venta depende de la intuición, del fundador o de un par de personas clave, una consultoría comercial ordena ese proceso y lo convierte en un sistema que puede crecer."
      bloques={[
        {
          h2: "Qué es (y qué no) una consultoría comercial",
          parrafos: [
            "Una consultoría comercial no es un curso ni un documento que se queda en un cajón. Es entrar en tu negocio, entender cómo vendes de verdad y rediseñar el proceso para que convierta mejor y pueda escalar.",
            "No genero leads ni hago marketing. Trabajo lo que pasa cuando la oportunidad ya existe: la conversación, el diagnóstico, la comunicación de valor y el seguimiento hasta la decisión.",
          ],
        },
        {
          h2: "Cómo trabajo tu proceso comercial",
          parrafos: [
            "Diagnostico: analizo llamadas, recorrido del cliente, objeciones y puntos de fuga para ver dónde se pierden ventas que deberían cerrarse.",
            "Construyo: diseño el sistema de principio a fin —proceso, cualificación, guiones, CRM y métricas— para que la venta se pueda medir, repetir y mejorar.",
            "Entreno: preparo a tu equipo para ejecutarlo con criterio, manteniendo la calidad de la venta a medida que el negocio crece.",
          ],
        },
        {
          h2: "Para quién tiene sentido",
          parrafos: [
            "Para consultorías, academias, agencias y negocios de servicios de alto valor que venden por llamada o reunión, ya tienen oportunidades y quieren convertirlas mejor sin sonar agresivos.",
            "Si aún no vendes o buscas un truco rápido de cierre, no es para ti. Esto es método y sistema, no atajos.",
          ],
        },
      ]}
      cierre="¿Hablamos de tu proceso comercial?"
    />
  );
}
