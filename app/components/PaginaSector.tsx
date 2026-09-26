import type { Metadata } from "next";
import SeoLanding from "./SeoLanding";
import { SECTORES, getSector } from "../ventas-por-sector/sectores";

const BASE = "https://www.galador.es";

export function metadataSector(slug: string): Metadata {
  const s = getSector(slug);
  const path = `/ventas-para-${s.slug}`;
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: path },
    openGraph: {
      title: s.title,
      description: s.description,
      url: path,
      siteName: "Galador",
      locale: "es_ES",
      type: "website",
    },
  };
}

export default function PaginaSector({ slug }: { slug: string }) {
  const s = getSector(slug);
  const url = `${BASE}/ventas-para-${s.slug}`;

  // Solo sectores publicados: un «cercano» que aún no existe no se enlaza.
  const cercanos = s.cercanos
    .map((c) => SECTORES.find((x) => x.slug === c))
    .filter((x) => x !== undefined);

  const relacionados = [
    ...cercanos.map((c) => ({
      href: `/ventas-para-${c.slug}`,
      texto: `Ventas para ${c.nombre.toLowerCase()}`,
      detalle: c.resumen,
    })),
    {
      href: "/consultoria-comercial",
      texto: "Qué es una consultoría comercial",
      detalle: "Qué incluye, qué no y para qué negocios tiene sentido.",
    },
    {
      href: "/videos/objeciones-de-ventas",
      texto: "Vídeo: objeciones de ventas",
      detalle: "Por qué aparecen «es caro» y «me lo pienso», y cómo responderlas.",
    },
    {
      href: "/ventas-por-sector",
      texto: "Todos los sectores",
      detalle: "Cómo se vende en cada tipo de negocio con el que trabajamos.",
    },
  ];

  const datosEstructurados = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Consultoría comercial para ${s.nombre.toLowerCase()}`,
        serviceType: "Consultoría comercial",
        description: s.description,
        url,
        areaServed: "ES",
        audience: { "@type": "BusinessAudience", name: s.nombre },
        provider: {
          "@type": "ProfessionalService",
          name: "Galador",
          url: BASE,
          founder: { "@type": "Person", name: "Paula Gallego" },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faq.map((f) => ({
          "@type": "Question",
          name: f.p,
          acceptedAnswer: { "@type": "Answer", text: f.r },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: BASE },
          { "@type": "ListItem", position: 2, name: "Por sector", item: `${BASE}/ventas-por-sector` },
          { "@type": "ListItem", position: 3, name: s.nombre, item: url },
        ],
      },
    ],
  };

  return (
    <SeoLanding
      kicker={s.kicker}
      h1={s.h1}
      intro={s.intro}
      destacados={s.destacados}
      bloques={s.bloques}
      caso={s.caso}
      faq={s.faq}
      relacionados={relacionados}
      datosEstructurados={datosEstructurados}
      cierre={s.cierre}
    />
  );
}
