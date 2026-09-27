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
  fecha: string;
  titulo: string;
  tituloSeo?: string;
  descripcion: string;
  /** Una frase para la tarjeta del índice. */
  resumen: string;
  cifras: { valor: string; texto: string }[];
  cita: string;
  /** Conceptos que trata: enlaza con los vídeos que comparten etiqueta. */
  etiquetas: string[];
  /** «Este caso es para ti si…»: la situación de partida, en general. */
  paraQuien: string[];
  articulo: Articulo;
};

export const CASOS: Caso[] = datos as Caso[];

export function getCaso(slug: string): Caso | undefined {
  return CASOS.find((c) => c.slug === slug);
}
