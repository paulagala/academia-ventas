import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TextoConEnlaces, { textoPlano } from "../../components/TextoConEnlaces";
import VideoYoutube from "../../components/VideoYoutube";
import {
  CANAL_YOUTUBE,
  duracionLegible,
  fechaLegible,
  getVideo,
  miniatura,
  relacionados,
  videosPublicados,
} from "../videos";

// Todas las páginas de vídeo se generan en el build: son contenido fijo.
export function generateStaticParams() {
  return videosPublicados.map((v) => ({ slug: v.slug }));
}

// Un slug que no existe no debe devolver 200 con una página vacía: 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) return {};

  return {
    title: video.articulo?.tituloSeo ?? video.titulo,
    description: video.descripcion,
    alternates: { canonical: `/videos/${slug}` },
    openGraph: {
      title: `${video.titulo} | Galador`,
      description: video.descripcion,
      url: `/videos/${slug}`,
      siteName: "Galador",
      locale: "es_ES",
      type: "video.other",
      images: [{ url: miniatura(video.youtubeId), width: 480, height: 360 }],
      // La fecha de publicación no cabe en un Open Graph de tipo "video.other":
      // va en el JSON-LD de abajo (uploadDate), que es lo que lee Google.
    },
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) notFound();

  const articulo = video.articulo;
  const otros = relacionados(video);
  const url = `https://www.galador.es/videos/${video.slug}`;

  // Ficha de vídeo para Google. Solo datos verificables del propio vídeo:
  // título, descripción, miniatura, fecha y duración. Sin visualizaciones ni
  // valoraciones, que cambian cada día y aquí quedarían desactualizadas.
  const fichaVideo = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.titulo,
    description: video.descripcion,
    thumbnailUrl: [miniatura(video.youtubeId)],
    uploadDate: video.fecha,
    duration: video.duracion,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
    url,
    publisher: {
      "@type": "Organization",
      name: "Galador",
      url: "https://www.galador.es",
    },
    creator: {
      "@type": "Person",
      name: "Paula Gallego",
      jobTitle: "Consultora comercial",
    },
    inLanguage: "es",
  };

  // Con artículo, la página es también un artículo para Google, con su vídeo
  // dentro y sus preguntas frecuentes. Sin artículo, solo la ficha del vídeo.
  const datosEstructurados: object[] = [fichaVideo];
  if (articulo) {
    datosEstructurados.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: video.titulo,
      description: video.descripcion,
      keywords: [articulo.palabraClave, ...video.etiquetas].join(", "),
      image: [miniatura(video.youtubeId)],
      datePublished: video.fecha,
      mainEntityOfPage: url,
      video: { "@type": "VideoObject", name: video.titulo, embedUrl: fichaVideo.embedUrl },
      author: { "@type": "Person", name: "Paula Gallego", url: "https://www.galador.es" },
      publisher: fichaVideo.publisher,
      inLanguage: "es",
    });
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
          <Link href="/videos" className="text-sm text-accent hover:underline inline-block mb-5">
            ← Todos los vídeos
          </Link>
          <span className="block w-fit text-xs bg-secondary/10 text-secondary-dark px-2.5 py-1 rounded-full font-medium">
            {video.tema}
          </span>
          <h1 className="text-3xl sm:text-4xl text-primary mt-4">{video.titulo}</h1>
          <p className="text-sm text-muted mt-4 num-mono">
            {fechaLegible(video.fecha)} · {duracionLegible(video.duracion)}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoYoutube youtubeId={video.youtubeId} titulo={video.titulo} prioridad />

          {articulo ? (
            <div className="mt-8 flex flex-col gap-5">
              {articulo.intro.map((p) => (
                <p key={p} className="text-text leading-relaxed text-lg">
                  <TextoConEnlaces texto={p} />
                </p>
              ))}
            </div>
          ) : (
            <p className="text-text-muted leading-relaxed mt-8">{video.descripcion}</p>
          )}

          {video.puntos.length > 0 && (
            <>
              <h2 className="text-2xl text-primary mt-12 mb-5">Lo que vas a ver</h2>
              <ul className="flex flex-col gap-3">
                {video.puntos.map((p) => (
                  <li key={p} className="flex gap-3 text-text-muted leading-relaxed">
                    <svg
                      className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l5 5L19 7" />
                    </svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {articulo?.secciones.map((sec) => (
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

          {articulo && articulo.faq.length > 0 && (
            <>
              <h2 className="text-2xl text-primary mt-12 mb-5">Preguntas frecuentes</h2>
              {/* <details> nativo, como el FAQ de la home: sin JavaScript e indexable. */}
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
              Un vídeo explica el concepto; el sistema hay que construirlo sobre tus llamadas
              reales. Si quieres que revisemos cómo vende hoy tu negocio, empieza por el
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
                {otros.map((v) => (
                  <li key={v.slug}>
                    <Link
                      href={`/videos/${v.slug}`}
                      className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-3 hover:border-secondary/30 hover:shadow-[var(--shadow-sm)] transition"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={miniatura(v.youtubeId)}
                        alt=""
                        loading="lazy"
                        className="w-28 aspect-video object-cover rounded-lg flex-shrink-0"
                      />
                      <span className="text-sm font-medium text-text group-hover:text-accent transition">
                        {v.titulo}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-10 text-sm text-text-muted">
            Los vídeos nuevos salen antes en{" "}
            <a href={CANAL_YOUTUBE} className="text-accent font-semibold hover:underline">
              el canal de YouTube
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
