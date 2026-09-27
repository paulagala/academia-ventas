import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TextoConEnlaces, { textoPlano } from "../../components/TextoConEnlaces";
import VideoTestimonio from "../../components/VideoTestimonio";
import { duracionLegible, videosPublicados } from "../../videos/videos";
import { CASOS, getCaso, portada, retrato } from "../casos";

// Todas las páginas de caso se generan en el build: son contenido fijo.
export function generateStaticParams() {
  return CASOS.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caso = getCaso(slug);
  if (!caso) return {};
  return {
    title: caso.tituloSeo ?? caso.titulo,
    description: caso.descripcion,
    alternates: { canonical: `/casos/${slug}` },
    openGraph: {
      title: `${caso.titulo} | Galador`,
      description: caso.descripcion,
      url: `/casos/${slug}`,
      siteName: "Galador",
      locale: "es_ES",
      type: "article",
      images: [{ url: portada(caso), width: 720, height: 1280 }],
    },
  };
}

export default async function CasoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caso = getCaso(slug);
  if (!caso) notFound();
  const { articulo } = caso;
  const url = `https://www.galador.es/casos/${caso.slug}`;

  // Los vídeos que comparten etiqueta con el caso: la teoría detrás del resultado.
  const etiquetas = new Set(caso.etiquetas.map((e) => e.toLowerCase()));
  const lecturas = videosPublicados
    .map((v) => ({ v, n: v.etiquetas.filter((e) => etiquetas.has(e.toLowerCase())).length }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .map((x) => x.v);

  const datosEstructurados = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: caso.titulo,
      description: caso.descripcion,
      keywords: [articulo.palabraClave, ...caso.etiquetas].join(", "),
      image: [`https://www.galador.es${portada(caso)}`],
      datePublished: caso.fecha,
      mainEntityOfPage: url,
      about: { "@type": "Organization", name: caso.empresa },
      video: {
        "@type": "VideoObject",
        name: caso.titulo,
        description: caso.descripcion,
        thumbnailUrl: [`https://www.galador.es${portada(caso)}`],
        uploadDate: caso.fecha,
        duration: caso.duracion,
        embedUrl: `https://www.youtube-nocookie.com/embed/${caso.youtubeId}`,
      },
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
          <Link href="/casos" className="text-sm text-accent hover:underline inline-block mb-5">
            ← Todos los casos
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href={caso.sector.href}
              className="text-xs bg-secondary/10 text-secondary-dark px-2.5 py-1 rounded-full font-medium hover:bg-secondary/20 transition"
            >
              {caso.sector.nombre}
            </Link>
            <Link
              href={caso.servicio.href}
              className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium hover:bg-accent/20 transition"
            >
              {caso.servicio.nombre}
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl text-primary mt-4">{caso.titulo}</h1>
          <p className="text-text-muted mt-4">
            {caso.persona}, {caso.cargo}. {caso.queHace}.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {caso.cifras.map((c) => (
              <div key={c.texto} className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
                <dt className="sr-only">{c.texto}</dt>
                <dd className="m-0">
                  <span className="block text-3xl text-accent num-mono">{c.valor}</span>
                  <span className="block text-xs text-text-muted mt-1 leading-snug">{c.texto}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start">
            <VideoTestimonio
              youtubeId={caso.youtubeId}
              cita={caso.cita}
              autor={`${caso.persona}, ${caso.cargo}`}
              retrato={retrato(caso)}
              duracion={duracionLegible(caso.duracion)}
            />
            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
              <h2 className="text-lg text-primary mb-4">Este caso es para ti si…</h2>
              <ul className="flex flex-col gap-3">
                {caso.paraQuien.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-text-muted leading-relaxed">
                    <svg className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l5 5L19 7" />
                    </svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5">
            {articulo.intro.map((p) => (
              <p key={p} className="text-text leading-relaxed text-lg">
                <TextoConEnlaces texto={p} />
              </p>
            ))}
          </div>

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

          <figure className="mt-12 border-l-4 border-accent pl-6 m-0">
            <blockquote className="m-0 text-xl text-primary italic leading-relaxed">«{caso.cita}»</blockquote>
            <figcaption className="mt-3 text-sm text-text-muted">
              {caso.persona}, {caso.cargo}
            </figcaption>
          </figure>

          {articulo.faq.length > 0 && (
            <>
              <h2 className="text-2xl text-primary mt-12 mb-5">Preguntas frecuentes</h2>
              <div className="flex flex-col gap-3">
                {articulo.faq.map((f) => (
                  <details key={f.pregunta} className="group rounded-[var(--radius-card)] border border-border bg-surface p-5">
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
            <h2 className="text-xl text-primary mb-3">¿Estás en una situación parecida?</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              Cada negocio es distinto y este resultado no es una garantía. Lo que sí puedo hacer es
              escuchar cómo vendes hoy y decirte dónde se te escapa la venta.
            </p>
            <Link
              href="/#formulario"
              className="inline-flex items-center justify-center gap-2 bg-accent text-surface font-semibold px-7 py-3 rounded-[var(--radius-button)] hover:bg-accent-hover transition"
            >
              Pedir diagnóstico
            </Link>
          </div>

          <div className="mt-14 border-t border-line pt-8">
            <h2 className="text-xl text-primary mb-5">Sigue leyendo</h2>
            <ul className="flex flex-col gap-3">
              {[
                { href: caso.sector.href, texto: `Cómo se vende en ${caso.sector.nombre.toLowerCase()}` },
                { href: caso.servicio.href, texto: caso.servicio.nombre },
                ...lecturas.map((v) => ({ href: `/videos/${v.slug}`, texto: v.titulo })),
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-[var(--radius-card)] border border-border bg-surface p-4 text-sm font-medium text-text hover:border-secondary/30 hover:text-accent transition"
                  >
                    {l.texto} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
