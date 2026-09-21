import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import {
  CANAL_YOUTUBE,
  duracionLegible,
  fechaLegible,
  miniatura,
  videosPublicados,
} from "./videos";

const titulo = "Vídeos de ventas";
const descripcion =
  "Vídeos cortos sobre cómo se vende de verdad: objeciones, indagación, seguimiento y sistema comercial. Explicado con llamadas reales por Paula Gallego.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/videos" },
  openGraph: {
    title: `${titulo} | Galador`,
    description: descripcion,
    url: "/videos",
    siteName: "Galador",
    locale: "es_ES",
    type: "website",
  },
};

// Lista ordenada para Google: le dice qué vídeos hay y en qué orden, para que
// pueda enseñar el carrusel de vídeos de la marca en los resultados.
const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: titulo,
  itemListElement: videosPublicados.map((v, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.galador.es/videos/${v.slug}`,
    name: v.titulo,
  })),
};

export default function VideosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datosEstructurados).replace(/</g, "\\u003c"),
        }}
      />
      <PageHeader
        tag="Vídeos"
        title="Cómo trabajamos la venta, explicado en abierto."
        description="Piezas cortas sobre lo que pasa dentro de una llamada de ventas: por qué aparecen las objeciones, qué preguntar y qué hacer con quien dice «me lo pienso»."
      />
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {videosPublicados.length === 0 ? (
            <p className="text-text-muted">
              Todavía no hay vídeos publicados.{" "}
              <a href={CANAL_YOUTUBE} className="text-accent hover:underline">
                Suscríbete al canal
              </a>{" "}
              para enterarte del primero.
            </p>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2">
              {videosPublicados.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/videos/${v.slug}`}
                    className="group block rounded-[var(--radius-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-muted border border-line">
                      {/* Miniatura de i.ytimg.com: no pasa por el optimizador de
                          imágenes de Next, así que <img> en vez de <Image>. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={miniatura(v.youtubeId)}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition group-hover:opacity-90"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-surface shadow-lg transition group-hover:scale-110">
                          <svg aria-hidden="true" className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </span>
                      <span className="absolute bottom-2 right-2 rounded bg-primary/85 text-surface text-xs font-medium px-1.5 py-0.5 num-mono">
                        {duracionLegible(v.duracion)}
                      </span>
                    </div>
                    <span className="mt-4 inline-block text-xs bg-secondary/10 text-secondary-dark px-2.5 py-1 rounded-full font-medium">
                      {v.tema}
                    </span>
                    <h2 className="text-xl text-primary mt-2 group-hover:text-accent transition">
                      {v.titulo}
                    </h2>
                    <p className="text-text-muted text-sm mt-2 leading-relaxed">{v.descripcion}</p>
                    <span className="block text-xs text-muted mt-3">{fechaLegible(v.fecha)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-14 border-t border-line pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-text-muted text-sm">
              Los vídeos nuevos salen antes en YouTube.
            </p>
            <a
              href={CANAL_YOUTUBE}
              className="text-accent font-semibold text-sm hover:underline inline-flex items-center whitespace-nowrap"
            >
              Ver el canal en YouTube →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
