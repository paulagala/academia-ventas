import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TextoConEnlaces, { textoPlano } from "../../components/TextoConEnlaces";
import VideoYoutube from "../../components/VideoYoutube";
import { fechaLegible } from "../../videos/videos";
import { ARTICULOS, getArticulo, relacionadosDeArticulo } from "../articulos";

// Todas las páginas de artículo se generan en el build: son contenido fijo.
export function generateStaticParams() {
  return ARTICULOS.map((a) => ({ slug: a.slug }));
}

// Un slug que no existe devuelve 404, no una página vacía.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticulo(slug);
  if (!a) return {};

  return {
    title: a.articulo.tituloSeo || a.titulo,
    description: a.descripcion,
    alternates: { canonical: `/articulos/${slug}` },
    openGraph: {
      title: `${a.titulo} | Galador`,
      description: a.descripcion,
      url: `/articulos/${slug}`,
      siteName: "Galador",
      locale: "es_ES",
      type: "article",
    },
  };
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticulo(slug);
  if (!a) notFound();

  const { articulo } = a;
  const otros = relacionadosDeArticulo(a);
  const url = `https://www.galador.es/articulos/${a.slug}`;

  const datosEstructurados: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: a.titulo,
      description: a.descripcion,
      keywords: [articulo.palabraClave, ...a.etiquetas].join(", "),
      datePublished: a.fecha,
      mainEntityOfPage: url,
      ...(a.youtubeId && {
        video: {
          "@type": "VideoObject",
          name: a.titulo,
          embedUrl: `https://www.youtube-nocookie.com/embed/${a.youtubeId}`,
        },
      }),
      author: { "@type": "Person", name: "Paula Gallego", url: "https://www.galador.es" },
      publisher: { "@type": "Organization", name: "Galador", url: "https://www.galador.es" },
      inLanguage: "es",
    },
  ];
  if (articulo.faq.length > 0) {
    datosEstructurados.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: articulo.faq.map((f) => ({
        "@type": "Question",
        name: f.pregunta,
        acceptedAnswer: { "@type": "Answer", text: textoPlano(f.respuesta) },
      })),
    });
  }

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
          <Link href="/articulos" className="text-sm text-accent hover:underline inline-block mb-5">
            ← Todos los artículos
          </Link>
          <span className="block w-fit text-xs bg-secondary/10 text-secondary-dark px-2.5 py-1 rounded-full font-medium">
            {a.tema}
          </span>
          <h1 className="text-3xl sm:text-4xl text-primary mt-4">{a.titulo}</h1>
          <p className="text-sm text-muted mt-4">
            Paula Gallego · {fechaLegible(a.fecha)}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {a.youtubeId && (
            <div className="mb-8">
              <VideoYoutube youtubeId={a.youtubeId} titulo={a.titulo} prioridad />
            </div>
          )}

          <div className="flex flex-col gap-5">
            {articulo.intro.map((p) => (
              <p key={p} className="text-text leading-relaxed text-lg">
                <TextoConEnlaces texto={p} />
              </p>
            ))}
          </div>

          {a.imagen && (
            // Una imagen ancha (un diagrama) se desplaza dentro de su caja en móvil, nunca la página.
            <figure className="mt-10 -mx-4 sm:mx-0">
              <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border bg-surface p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.imagen}
                  alt={a.imagenAlt ?? ""}
                  className="block min-w-[820px] w-full h-auto"
                />
              </div>
              {a.imagenPie && (
                <figcaption className="text-sm text-muted mt-3 px-4 sm:px-0">{a.imagenPie}</figcaption>
              )}
            </figure>
          )}

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

          {articulo.faq.length > 0 && (
            <>
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
            </>
          )}

          <div className="mt-12 bg-surface rounded-[var(--radius-card)] p-8 border border-border">
            <h2 className="text-xl text-primary mb-3">¿Y en tu negocio?</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              Un artículo explica el concepto; el sistema hay que construirlo sobre tus números y tus
              llamadas reales. Si quieres que revisemos cómo vende hoy tu negocio, empieza por el
              diagnóstico.
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

          {otros.length > 0 && (
            <div className="mt-14 border-t border-line pt-8">
              <h2 className="text-xl text-primary mb-5">Sigue leyendo</h2>
              <ul className="flex flex-col gap-3">
                {otros.map((o) => (
                  <li key={o.href}>
                    <Link
                      href={o.href}
                      className="block rounded-[var(--radius-card)] border border-border bg-surface p-4 text-sm font-medium text-text hover:text-accent hover:border-secondary/30 transition"
                    >
                      {o.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
