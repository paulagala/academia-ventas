"use client";

import { useState } from "react";

/**
 * Testimonio en vídeo alojado en YouTube.
 *
 * CÓMO SACAR EL ID DE UN VÍDEO:
 * abre el vídeo en YouTube y mira la barra de direcciones. En
 * https://www.youtube.com/watch?v=dQw4w9WgXcQ el id es lo que va
 * después de "v=", es decir: dQw4w9WgXcQ. Si lo compartes desde el móvil
 * te dará algo como https://youtu.be/dQw4w9WgXcQ: el id es la parte final.
 * Pega solo ese trozo (sin la URL entera) en la lista de casos.
 *
 * Mientras no haya id, el componente no pinta nada: así la web nunca
 * muestra un hueco roto por un vídeo que todavía no existe.
 *
 * Al cargar la página solo se descarga la miniatura. El reproductor de
 * YouTube (≈1 MB de JavaScript de terceros) se monta únicamente cuando
 * alguien pulsa play.
 */
export default function VideoTestimonio({
  youtubeId,
  empresa,
}: {
  youtubeId?: string;
  empresa: string;
}) {
  const [reproduciendo, setReproduciendo] = useState(false);

  if (!youtubeId) return null;

  if (reproduciendo) {
    return (
      <div className="aspect-video rounded-xl overflow-hidden bg-[#2B231F]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={`Testimonio de ${empresa}`}
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
      aria-label={`Ver el testimonio de ${empresa}`}
      className="group relative block w-full aspect-video rounded-xl overflow-hidden bg-[#2B231F] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#791E2A]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
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
