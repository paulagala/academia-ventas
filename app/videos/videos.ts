/**
 * ── Los vídeos de YouTube de la web ──
 *
 * Esta es la ÚNICA lista que hay que tocar para publicar un vídeo nuevo.
 * Con añadir un objeto aquí arriba aparece solo en tres sitios:
 *   · el bloque «En YouTube» de la home (los 3 primeros),
 *   · el índice /videos,
 *   · su propia página /videos/{slug}, con su ficha para Google.
 * Y entra en el sitemap sin tocar nada más.
 *
 * CÓMO SACAR EL youtubeId: en https://www.youtube.com/watch?v=1Mb5B6FHrW4
 * es lo que va después de «v=» → 1Mb5B6FHrW4. Si lo compartes desde el móvil
 * te dará https://youtu.be/1Mb5B6FHrW4: el id es la parte final. Pega solo ese
 * trozo, nunca la URL entera (y quita el «&t=1s» si lo lleva).
 *
 * Los vídeos se pintan en el orden de esta lista: el más nuevo, arriba.
 */

export const CANAL_YOUTUBE = "https://www.youtube.com/@paulagallegoventas";

export type Video = {
  /** Id del vídeo en YouTube. Sin él la ficha no se publica. */
  youtubeId: string;
  /** Trozo final de la URL en la web: /videos/{slug}. Solo minúsculas y guiones. */
  slug: string;
  /** Título tal cual sale en YouTube. Es el h1 de la página. */
  titulo: string;
  /** Etiqueta de tema. Agrupa visualmente el índice. */
  tema: string;
  /** Dos o tres frases. Es lo que Google enseña bajo el título en el buscador. */
  descripcion: string;
  /** Fecha de publicación en YouTube, en formato AAAA-MM-DD. */
  fecha: string;
  /** Duración en formato ISO 8601: PT6M38S = 6 minutos y 38 segundos. */
  duracion: string;
  /** Lo que se lleva quien lo vea. Se pinta como lista bajo el reproductor. */
  puntos: string[];
};

export const VIDEOS: Video[] = [
  {
    youtubeId: "1Mb5B6FHrW4",
    slug: "objeciones-de-ventas",
    titulo: "Objeciones de ventas: por qué aparecen y cómo responderlas",
    tema: "Objeciones",
    descripcion:
      "«Es caro», «me lo tengo que pensar», «mándame la propuesta». Por qué aparecen esas frases —casi siempre porque la indagación se quedó corta— y cómo resolverlas preguntando en lugar de justificándote, con ejemplos de llamadas reales.",
    fecha: "2026-09-13",
    duracion: "PT6M38S",
    puntos: [
      "Por qué una objeción casi nunca empieza en el momento en que la escuchas, sino mucho antes en la conversación.",
      "La diferencia entre contestar a la palabra que dice el cliente y entender qué hay detrás de ella.",
      "Cómo responder con una pregunta en vez de con un argumento, sin que suene a técnica.",
      "Ejemplos sacados de llamadas reales, no de un caso de manual.",
    ],
  },
];

/** Los vídeos publicados, en orden. Un id vacío no se pinta: nunca un hueco roto. */
export const videosPublicados = VIDEOS.filter((v) => v.youtubeId);

export function getVideo(slug: string): Video | undefined {
  return videosPublicados.find((v) => v.slug === slug);
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
