import type { Metadata } from "next";
import Link from "next/link";
import TextoConEnlaces, { textoPlano } from "../components/TextoConEnlaces";
import articulo from "./articulo.json";

// Artículo pilar de la serie «Estructura comercial desde cero». Se publica
// antes que su vídeo: cuando el vídeo esté en YouTube, el artículo pasa a
// /videos/{slug} (videos.json) y esta ruta redirige allí desde next.config.ts.
const RUTA = "/como-montar-un-departamento-comercial";
const URL = `https://www.galador.es${RUTA}`;

export const metadata: Metadata = {
  title: articulo.tituloSeo,
  description: articulo.descripcion,
  alternates: { canonical: RUTA },
  openGraph: {
    title: `${articulo.titulo} | Galador`,
    description: articulo.descripcion,
    url: RUTA,
    siteName: "Galador",
    locale: "es_ES",
    type: "article",
  },
};

export default function Page() {
  const datosEstructurados = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: articulo.titulo,
      description: articulo.descripcion,
      keywords: [articulo.palabraClave, ...articulo.etiquetas].join(", "),
      datePublished: articulo.fecha,
      mainEntityOfPage: URL,
      author: { "@type": "Person", name: "Paula Gallego", url: "https://www.galador.es" },
      publisher: { "@type": "Organization", name: "Galador", url: "https://www.galador.es" },
      inLanguage: "es",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: articulo.faq.map((f) => ({
        "@type": "Question",
        name: f.pregunta,
        acceptedAnswer: { "@type": "Answer", text: textoPlano(f.respuesta) },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datosEstructurados).replace(/</g, "\\u003c"),
        }}
      />

      <section className="bg-surface border-b border-line py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="block w-fit text-xs bg-secondary/10 text-secondary-dark px-2.5 py-1 rounded-full font-medium">
            Departamento comercial
          </span>
          <h1 className="text-3xl sm:text-4xl text-primary mt-4">{articulo.titulo}</h1>
          <p className="text-sm text-muted mt-4">Paula Gallego · Galador</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5">
            {articulo.intro.map((p) => (
              <p key={p} className="text-text leading-relaxed text-lg">
                <TextoConEnlaces texto={p} />
              </p>
            ))}
          </div>

          {/* El diagrama es ancho: en móvil se desplaza dentro de su caja, nunca la página. */}
          <figure className="mt-10 -mx-4 sm:mx-0">
            <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border bg-surface p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/recorrido-comercial.svg"
                alt="El recorrido comercial en siete estaciones: entrada del lead, primer contacto, cualificación, reunión agendada, reunión de venta, seguimiento y cierre con traspaso. Cada estación tiene una puerta para pasar, un destino para lo que no pasa y un número."
                className="block min-w-[820px] w-full h-auto"
              />
            </div>
            <figcaption className="text-sm text-muted mt-3 px-4 sm:px-0">
              Las siete estaciones del recorrido comercial, con lo que tiene que cumplir cada una para
              pasar a la siguiente y el número con el que se mide.
            </figcaption>
          </figure>

          {articulo.secciones.map((sec) => (
            <section key={sec.titulo}>
              <h2 className="text-2xl text-primary mt-12 mb-5">{sec.titulo}</h2>
              <div className="flex flex-col gap-5">
                {sec.parrafos.map((p) => (
                  <p key={p} className="text-text-muted leading-relaxed">
                    <TextoConEnlaces texto={p} />
                  </p>
                ))}
              </div>
            </section>
          ))}

          <h2 className="text-2xl text-primary mt-12 mb-5">Preguntas frecuentes</h2>
          <div className="flex flex-col gap-3">
            {articulo.faq.map((f) => (
              <details
                key={f.pregunta}
                className="group rounded-[var(--radius-card)] border border-border bg-surface p-5"
              >
                <summary className="cursor-pointer font-medium text-primary list-none flex justify-between gap-4">
                  {f.pregunta}
                  <span aria-hidden="true" className="text-accent transition group-open:rotate-45">+</span>
                </summary>
                <p className="text-text-muted leading-relaxed mt-3">
                  <TextoConEnlaces texto={f.respuesta} />
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 bg-surface rounded-[var(--radius-card)] p-8 border border-border">
            <h2 className="text-xl text-primary mb-3">¿Y en tu negocio?</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              Dibujar el recorrido es el primer paso; saber en qué estación se te pierden las ventas
              exige mirar tus números y tus llamadas reales. Si quieres que lo revisemos, empieza por
              el diagnóstico.
            </p>
            <Link
              href="/#formulario"
              className="inline-flex items-center justify-center gap-2 bg-accent text-surface font-semibold px-7 py-3 rounded-[var(--radius-button)] hover:bg-accent-hover transition"
            >
              Pedir diagnóstico
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
