/**
 * ── Los vídeos de YouTube de la web ──
 *
 * Los datos viven en videos.json, y es el ÚNICO sitio que hay que tocar para
 * publicar un vídeo. Normalmente ni eso: el robot de .github/workflows/
 * videos-a-articulos.yml detecta cada vídeo nuevo del canal, escribe su
 * artículo y abre un PR que añade la entrada aquí (ver VIDEOS-AUTOMATICOS.md).
 *
 * Con una entrada en la lista, el vídeo aparece solo en:
 *   · el bloque «En YouTube» de la home (los 3 primeros),
 *   · el índice /videos,
 *   · su propia página /videos/{slug}: reproductor + artículo, con su ficha
 *     para Google,
 *   · el bloque «Sigue leyendo» de los artículos del mismo tema,
 *   · el sitemap.
 *
 * Si añades uno a mano, el youtubeId es lo que va después de «v=» en
 * https://www.youtube.com/watch?v=1Mb5B6FHrW4 → 1Mb5B6FHrW4 (o la parte final
 * de https://youtu.be/1Mb5B6FHrW4). Nunca la URL entera.
 *
 * Los vídeos se pintan en el orden de la lista: el más nuevo, arriba.
 */

import datos from "./videos.json";

export const CANAL_YOUTUBE = "https://www.youtube.com/@paulagallegoventas";

/**
 * Los párrafos admiten enlaces internos con la sintaxis [texto](/ruta).
 * Solo rutas de la propia web: el generador descarta cualquier otra.
 */
export type Articulo = {
  /** Búsqueda principal a la que responde el artículo, en minúsculas. */
  palabraClave: string;
  /** <title> para Google si el título de YouTube no sirve (máx. ~60 caracteres). */
  tituloSeo?: string;
  /** Párrafos antes de la primera sección. */
  intro: string[];
  secciones: { titulo: string; parrafos: string[] }[];
  faq: { pregunta: string; respuesta: string }[];
};

export type Video = {
  /** Id del vídeo en YouTube. Sin él la ficha no se publica. */
  youtubeId: string;
  /** Trozo final de la URL en la web: /videos/{slug}. Solo minúsculas y guiones. */
  slug: string;
  /** Título tal cual sale en YouTube. Es el h1 de la página. */
  titulo: string;
  /** Etiqueta de tema. Agrupa visualmente el índice y decide los relacionados. */
  tema: string;
  /** Dos o tres frases. Es lo que Google enseña bajo el título en el buscador. */
  descripcion: string;
  /** Fecha de publicación en YouTube, en formato AAAA-MM-DD. */
  fecha: string;
  /** Duración en formato ISO 8601: PT6M38S = 6 minutos y 38 segundos. */
  duracion: string;
  /** Conceptos que trata. Dos vídeos que comparten etiquetas se enlazan entre sí. */
  etiquetas: string[];
  /** Lo que se lleva quien lo vea. Se pinta como lista bajo el reproductor. */
  puntos: string[];
  /** El artículo escrito a partir de la transcripción. Opcional. */
  articulo?: Articulo;
};

export const VIDEOS: Video[] = datos as Video[];

/** Los vídeos publicados, en orden. Un id vacío no se pinta: nunca un hueco roto. */
export const videosPublicados = VIDEOS.filter((v) => v.youtubeId);

export function getVideo(slug: string): Video | undefined {
  return videosPublicados.find((v) => v.slug === slug);
}

/**
 * Los artículos que se enlazan al final de cada página. Se calculan al
 * publicar, así que cuando entra un artículo nuevo los antiguos del mismo tema
 * empiezan a enlazarlo sin tocarlos. Pesa más compartir tema que etiqueta;
 * a igualdad, gana el más reciente (la lista ya viene ordenada así).
 */
export function relacionados(video: Video, cuantos = 3): Video[] {
  const etiquetas = new Set(video.etiquetas.map((e) => e.toLowerCase()));
  return videosPublicados
    .filter((v) => v.slug !== video.slug)
    .map((v, orden) => ({
      v,
      orden,
      puntos:
        (v.tema === video.tema ? 3 : 0) +
        v.etiquetas.filter((e) => etiquetas.has(e.toLowerCase())).length,
    }))
    .sort((a, b) => b.puntos - a.puntos || a.orden - b.orden)
    .slice(0, cuantos)
    .map((x) => x.v);
}

/** Miniatura de YouTube. hqdefault existe siempre; maxres no, en vídeos antiguos. */
export function miniatura(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

/** «PT6M38S» → «6:38», que es como lo lee una persona. */
export function duracionLegible(iso: string): string {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m) return "";
  const [h, min, s] = [m[1], m[2], m[3]].map((x) => Number(x ?? 0));
  const mm = h ? String(min).padStart(2, "0") : String(min);
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** «2026-09-13» → «13 de septiembre de 2026». */
export function fechaLegible(fecha: string): string {
  return new Date(`${fecha}T12:00:00Z`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
