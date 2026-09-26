import type { Metadata } from "next";
import SeoLanding from "../components/SeoLanding";
import { SECTORES } from "./sectores";

const BASE = "https://www.galador.es";

export const metadata: Metadata = {
  title: "Dirección comercial por sector",
  description:
    "Cómo se vende en cada tipo de negocio con el que trabaja Galador: empresas de formación y externalización de RRHH. Dónde se cae la venta en cada uno.",
  alternates: { canonical: "/ventas-por-sector" },
};

export default function Page() {
  const datosEstructurados = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dirección comercial por sector",
    itemListElement: SECTORES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Ventas para ${s.nombre.toLowerCase()}`,
      url: `${BASE}/ventas-para-${s.slug}`,
    })),
  };

  return (
    <SeoLanding
      kicker="Por sector"
      h1="Cada sector pierde la venta en un sitio distinto."
      intro="El método es el mismo: escuchar llamadas reales, encontrar dónde se cae la venta y dejar un proceso que se pueda repetir. Lo que cambia es quién compra, qué le frena y qué objeción va a salir. Aquí está cómo se vende en los sectores donde tenemos casos reales."
      bloques={[
        {
          h2: "Lo que tienen en común",
          parrafos: [
            "Todos venden por llamada o reunión, todos tienen ya oportunidades entrando, y en todos la venta depende demasiado de quién la haga y del día que tenga. Casi siempre, el negocio cree que tiene un problema de leads y lo que tiene es un problema de proceso.",
          ],
        },
      ]}
      relacionadosTitulo="Elige tu sector"
      relacionados={SECTORES.map((s) => ({
        href: `/ventas-para-${s.slug}`,
        texto: `Ventas para ${s.nombre.toLowerCase()}`,
        detalle: s.resumen,
      }))}
      datosEstructurados={datosEstructurados}
      cierre="¿Tu sector no está en la lista? El diagnóstico funciona igual."
    />
  );
}
