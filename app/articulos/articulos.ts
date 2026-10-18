/**
 * ── Los artículos de la web que no salen de un vídeo ──
 *
 * Los datos viven en articulos.json, y es el ÚNICO sitio que hay que tocar para
 * publicar un artículo. Con una entrada en la lista, el artículo aparece solo en:
 *   · el índice /articulos,
 *   · su propia página /articulos/{slug}, con su ficha para Google,
 *   · el bloque «Sigue leyendo» de los artículos y vídeos del mismo tema,
 *   · el sitemap.
 *
 * Si más adelante se graba el vídeo de un artículo, NO se crea otra página:
 * se pone su youtubeId aquí y el reproductor aparece arriba del artículo. El
 * PR que abra el robot de vídeos para ese mismo vídeo se cierra sin publicar.
 *
 * Los artículos se pintan en el orden de la lista: el más nuevo, arriba.
 */

import datos from "./articulos.json";
import { videosPublicados, type Articulo } from "../videos/videos";

export type EntradaArticulo = {
  /** Trozo final de la URL: /articulos/{slug}. Solo minúsculas y guiones. */
  slug: string;
  /** El h1 de la página. */
  titulo: string;
  /** Etiqueta de tema. Agrupa el índice y decide los relacionados. */
  tema: string;
  /** Meta description: 140–155 caracteres. */
  descripcion: string;
  /** Fecha de publicación, AAAA-MM-DD. */
  fecha: string;
  /** Conceptos que trata. Comparte etiquetas = se enlazan entre sí. */
  etiquetas: string[];
  /** Imagen opcional tras la intro (ruta de /public), con su texto alternativo y pie. */
  imagen?: string;
  imagenAlt?: string;
  imagenPie?: string;
  /** Id de YouTube si el artículo ya tiene vídeo. Vacío = artículo solo. */
  youtubeId?: string;
  articulo: Articulo;
};

export const ARTICULOS: EntradaArticulo[] = datos as EntradaArticulo[];

export function getArticulo(slug: string): EntradaArticulo | undefined {
  return ARTICULOS.find((a) => a.slug === slug);
}

/**
 * Lo que se enlaza al final de un artículo: otros artículos y vídeos, mezclados.
 * Pesa más compartir tema que etiqueta; a igualdad, gana el que va antes en su
 * lista (el más reciente).
 */
export function relacionadosDeArticulo(
  actual: EntradaArticulo,
  cuantos = 3,
): { href: string; titulo: string }[] {
  const etiquetas = new Set(actual.etiquetas.map((e) => e.toLowerCase()));
  const puntos = (tema: string, tags: string[]) =>
    (tema === actual.tema ? 3 : 0) + tags.filter((e) => etiquetas.has(e.toLowerCase())).length;

  return [
    ...ARTICULOS.filter((a) => a.slug !== actual.slug).map((a) => ({
      href: `/articulos/${a.slug}`,
      titulo: a.titulo,
      p: puntos(a.tema, a.etiquetas),
    })),
    ...videosPublicados.map((v) => ({
      href: `/videos/${v.slug}`,
      titulo: v.titulo,
      p: puntos(v.tema, v.etiquetas),
    })),
  ]
    .map((x, orden) => ({ ...x, orden }))
    .sort((a, b) => b.p - a.p || a.orden - b.orden)
    .slice(0, cuantos)
    .map(({ href, titulo }) => ({ href, titulo }));
}
