"use client";

import { useState } from "react";

/**
 * Reproductor de YouTube con carga diferida, para las páginas de /videos.
 *
 * Al cargar la página solo se descarga la miniatura. El reproductor de YouTube
 * (≈1 MB de JavaScript de terceros) se monta únicamente cuando alguien pulsa
 * play, así que un vídeo incrustado no penaliza la velocidad de la página.
 *
 * Hermano de VideoTestimonio, que hace lo mismo para los vídeos de los casos.
 * Están separados a propósito: aquel lleva el texto pensado para testimonios
 * («Ver el testimonio de X») y este el de una pieza de contenido.
 */
export default function VideoYoutube({
  youtubeId,
  titulo,
  prioridad = false,
  vertical = false,
}: {
  youtubeId: string;
  titulo: string;
  /** true en la página del propio vídeo: la miniatura es la imagen principal. */
  prioridad?: boolean;
  /** true para un Short: el reproductor pasa a formato vertical. */
  vertical?: boolean;
}) {
  const [reproduciendo, setReproduciendo] = useState(false);

  if (!youtubeId) return null;

  const formato = vertical ? "aspect-[9/16] max-w-sm mx-auto" : "aspect-video";

  if (reproduciendo) {
    return (
      <div className={`${formato} rounded-xl overflow-hidden bg-[#2B231F]`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setReproduciendo(true)}
      aria-label={`Reproducir: ${titulo}`}
      className={`group relative block w-full ${formato} rounded-xl overflow-hidden bg-[#2B231F] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#791E2A]`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        loading={prioridad ? "eager" : "lazy"}
        fetchPriority={prioridad ? "high" : "auto"}
        className="absolute inset-0 w-full h-full object-cover transition group-hover:opacity-90"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-16 h-16 rounded-full bg-[#791E2A] flex items-center justify-center text-[#FAFAFA] shadow-lg transition group-hover:scale-110">
          <svg aria-hidden="true" className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
