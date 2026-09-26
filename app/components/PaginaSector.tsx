import type { Metadata } from "next";
import SeoLanding from "./SeoLanding";
import { SECTORES, getSector } from "../ventas-por-sector/sectores";
import { ENLACES_CLUSTER } from "./enlacesCluster";

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
    ...ENLACES_CLUSTER.filter((e) =>
      ["/direccion-comercial-externa", "/entrenamiento-comercial", "/ventas-por-sector"].includes(e.href),
    ),
  ];

  const datosEstructurados = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Dirección comercial externa para ${s.nombre.toLowerCase()}`,
        serviceType: "Dirección comercial externa",
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
