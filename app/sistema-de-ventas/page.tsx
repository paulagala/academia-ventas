import type { Metadata } from "next";
import SeoLanding from "../components/SeoLanding";

export const metadata: Metadata = {
  title: "Sistema de ventas: cómo construir uno que escale | Paula Gallego",
  description:
    "Un sistema de ventas convierte la venta en un proceso claro, medible y entrenable. Te ayudo a construir el tuyo para escalar sin depender de la intuición ni del fundador.",
  alternates: { canonical: "/sistema-de-ventas" },
};

export default function Page() {
  return (
    <SeoLanding
      kicker="Sistema de ventas"
      h1="Un sistema de ventas para dejar de depender de la intuición."
      intro="Cuando la venta depende de quién haga la llamada o del día que tengas, no hay forma de escalar. Un sistema de ventas convierte ese proceso en algo claro, medible y que cualquier persona del equipo puede ejecutar."
      bloques={[
        {
          h2: "Qué es un sistema de ventas",
          parrafos: [
            "Es la estructura que ordena todo lo que ocurre entre una oportunidad y un cliente: cómo se cualifica, cómo se lleva la conversación, cómo se comunica el valor, cómo se hace el seguimiento y cómo se mide.",
            "Sin sistema, cada venta es una lotería. Con sistema, sabes dónde estás ganando, dónde pierdes oportunidades y qué mejorar.",
          ],
        },
        {
          h2: "Qué incluye el sistema que construyo",
          parrafos: [
            "Proceso comercial y recorrido del cliente definidos por etapas.",
            "Cualificación e ICP para dedicar tiempo a las oportunidades correctas.",
            "Guiones y preguntas de indagación que ayudan a diagnosticar, no a presionar.",
            "CRM y métricas que reflejan el recorrido real del cliente, no campos que nadie usa.",
          ],
        },
        {
          h2: "Por qué escala (sin perder calidad)",
          parrafos: [
            "Un sistema bien construido se puede entrenar. Eso significa incorporar comerciales nuevos sin que baje la calidad de la venta ni dependas del fundador para cerrar.",
            "El objetivo no es vender a cualquier precio: es vender más manteniendo conversaciones que ayudan al cliente a decidir bien.",
          ],
        },
      ]}
      cierre="Construyamos tu sistema de ventas."
    />
  );
}
