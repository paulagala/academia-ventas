/**
 * ── Los casos de éxito ──
 *
 * Los datos viven en casos.json. Cada caso con artículo tiene su página
 * /casos/{slug}, aparece en el índice /casos y entra en el sitemap.
 *
 * Las cifras y las citas salen literalmente del vídeo o de lo que el cliente
 * ha autorizado. No se cambia una cifra sin que el cliente la haya dicho.
 */

import type { Articulo } from "../videos/videos";
import datos from "./casos.json";

export type Caso = {
  slug: string;
  empresa: string;
  persona: string;
  cargo: string;
  /** A qué se dedica, en palabras del cliente. */
  queHace: string;
  /** Página del sector y del servicio que recibió: el caso es su prueba. */
  sector: { href: string; nombre: string };
  servicio: { href: string; nombre: string };
  youtubeId: string;
  /** true si el vídeo es vertical (un Short). */
  vertical: boolean;
  /** Duración del vídeo en ISO 8601 («PT2M19S»), para Google. */
  duracion: string;
  fecha: string;
  titulo: string;
  tituloSeo?: string;
  descripcion: string;
  /** Una frase para la tarjeta del índice. */
  resumen: string;
  /** La cifra grande de la tarjeta en /casos y en la home (una de `cifras`). */
  cifraDestacada: string;
  cifras: { valor: string; texto: string }[];
  cita: string;
  /** Conceptos que trata: enlaza con los vídeos que comparten etiqueta. */
  etiquetas: string[];
  /** «Este caso es para ti si…»: la situación de partida, en general. */
  paraQuien: string[];
  articulo: Articulo;
};

export const CASOS: Caso[] = datos as Caso[];

/**
 * Fotograma del vídeo original, en public/casos/{slug}.jpg (720×1280,
 * vertical, sin subtítulos). Es la imagen que ven Google y las redes al
 * compartir; en la web solo se enseña su recorte redondo (ver `retrato`).
 *
 * No se usa la miniatura de YouTube porque en los Shorts sale apaisada, con el
 * vídeo encajonado entre dos franjas borrosas.
 * Para un caso nuevo: saca el fotograma con
 *   ffmpeg -ss <segundo> -i video.mp4 -frames:v 1 -vf scale=720:1280 -q:v 4 public/casos/<slug>.jpg
 */
export function portada(caso: Caso): string {
  return `/casos/${caso.slug}.jpg`;
}

/**
 * Retrato cuadrado (240×240) para el círculo del testimonio. Sale de la
 * portada del vídeo en YouTube (https://i.ytimg.com/vi/{id}/maxresdefault.jpg),
 * recortando la cara por encima del rótulo «Caso de éxito».
 */
export function retrato(caso: Caso): string {
  return `/casos/${caso.slug}-retrato.jpg`;
}

export function getCaso(slug: string): Caso | undefined {
  return CASOS.find((c) => c.slug === slug);
}
