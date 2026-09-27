"use client";

import { useState } from "react";

/**
 * Testimonio en vídeo de un caso, para las tarjetas de la home.
 *
 * Los datos (id de YouTube, portada, duración) salen de app/casos/casos.json:
 * la home no guarda ids propios, así que un vídeo nuevo aparece aquí solo con
 * añadirlo al caso.
 *
 * La portada es un fotograma elegido a mano (ver `portada()` en casos.ts), no
 * la miniatura de YouTube, que en los Shorts sale encajonada entre franjas
 * borrosas. Se recorta a 4:5 por arriba para que la tarjeta no crezca de más;
 * al pulsar play el reproductor pasa al formato vertical completo.
 *
 * Al cargar la página solo se descarga la portada. El reproductor de YouTube
 * (≈1 MB de JavaScript de terceros) se monta únicamente cuando alguien pulsa
 * play.
 */
export default function VideoTestimonio({
  youtubeId,
  empresa,
  persona,
  portada,
  duracion,
}: {
  youtubeId: string;
  empresa: string;
  /** Quien habla en el vídeo, solo el nombre: «Lucía». */
  persona: string;
  portada: string;
  /** Ya legible: «2:19». */
  duracion: string;
}) {
  const [reproduciendo, setReproduciendo] = useState(false);

  if (reproduciendo) {
    return (
      <div className="aspect-[9/16] rounded-xl overflow-hidden bg-[#2B231F]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={`Testimonio de ${persona}, de ${empresa}`}
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
      aria-label={`Ver el testimonio de ${persona}, de ${empresa} (${duracion})`}
      className="group relative block w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#2B231F] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#791E2A]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={portada}
        alt=""
        loading="lazy"
        width={720}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
      />
      {/* Degradado para que el texto se lea sobre cualquier fotograma */}
      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#2B231F]/85 to-transparent" />
      <span className="absolute left-4 right-4 bottom-4 flex items-center gap-3 text-left">
        <span className="w-12 h-12 flex-shrink-0 rounded-full bg-[#791E2A] flex items-center justify-center text-[#FAFAFA] shadow-lg transition group-hover:scale-110">
          <svg aria-hidden="true" className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="text-[#FAFAFA] leading-tight">
          <span className="block text-sm font-semibold">{persona} lo cuenta</span>
          <span className="block text-xs opacity-80 num-mono">{duracion} min</span>
        </span>
      </span>
    </button>
  );
}
