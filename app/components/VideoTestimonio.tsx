"use client";

import { useState } from "react";

/**
 * Testimonio en vídeo de un caso: la portada es la frase del cliente con su
 * retrato pequeño, y al pulsarla se abre el vídeo vertical en su sitio.
 *
 * No se usa un fotograma grande como portada: en un vídeo hablado casi todos
 * pillan a la persona a medio gesto, y la miniatura de YouTube de un Short
 * sale encajonada entre franjas borrosas. En un círculo pequeño, el gesto no
 * se nota.
 *
 * Al cargar la página solo se descarga el retrato. El reproductor de YouTube
 * (≈1 MB de JavaScript de terceros) se monta únicamente cuando alguien pulsa.
 */
export default function VideoTestimonio({
  youtubeId,
  cita,
  autor,
  retrato,
  duracion,
}: {
  youtubeId: string;
  /** Literal del vídeo, sin comillas. */
  cita: string;
  /** Nombre y cargo: «Lucía, CEO de Hotlist». */
  autor: string;
  retrato: string;
  /** Ya legible: «2:19». */
  duracion: string;
}) {
  const [reproduciendo, setReproduciendo] = useState(false);

  if (reproduciendo) {
    return (
      <div className="aspect-[9/16] rounded-xl overflow-hidden bg-[#2B231F]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={`Testimonio de ${autor}`}
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
      aria-label={`Ver el vídeo de ${autor} (${duracion} min)`}
      className="group w-full min-h-80 flex flex-col justify-between gap-6 rounded-xl bg-[#2B231F] p-6 text-left cursor-pointer transition hover:bg-[#3A2F29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#791E2A]"
    >
      <blockquote className="m-0 text-lg leading-snug text-[#FAFAFA] font-[family-name:var(--font-dm-serif)]">
        «{cita}»
      </blockquote>
      <span className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={retrato}
          alt=""
          loading="lazy"
          width={56}
          height={56}
          className="w-14 h-14 flex-shrink-0 rounded-full object-cover ring-2 ring-[#FAFAFA]/20"
        />
        <span className="flex-1 min-w-0 leading-tight">
          <span className="block text-sm text-[#FAFAFA]/75">{autor}</span>
          <span className="mt-1.5 inline-flex items-center gap-2 text-sm font-semibold text-[#FAFAFA]">
            <span className="w-7 h-7 rounded-full bg-[#791E2A] flex items-center justify-center transition group-hover:scale-110">
              <svg aria-hidden="true" className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Ver vídeo · <span className="num-mono">{duracion}</span>
          </span>
        </span>
      </span>
    </button>
  );
}
