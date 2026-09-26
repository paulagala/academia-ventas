import type { MetadataRoute } from "next";
import { videosPublicados } from "./videos/videos";
import { SECTORES } from "./ventas-por-sector/sectores";

// Dominio canónico CON www: https://galador.es responde 308 hacia
// https://www.galador.es. Con el host sin www, cada URL del sitemap era una
// redirección y Google tenía que dar un salto de más para llegar a la buena.
const BASE = "https://www.galador.es";

// Solo rutas vivas. El resto del sitio antiguo («/cursos», «/recursos»,
// «/formacion-ventas*», «/sobre-mi»…) redirige a la home desde next.config.ts
// y por eso no entra aquí: un sitemap no debe listar redirecciones.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const rutas: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/consultoria-comercial", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sistema-de-ventas", priority: 0.8, changeFrequency: "monthly" },
    { path: "/entrenamiento-comercial", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ventas-por-sector", priority: 0.7, changeFrequency: "monthly" },
    // Una página por sector publicado (app/ventas-por-sector/sectores.ts).
    ...SECTORES.map((s) => ({
      path: `/ventas-para-${s.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    // El índice cambia cada vez que se publica un vídeo nuevo.
    { path: "/videos", priority: 0.7, changeFrequency: "weekly" },
    { path: "/aviso-legal", priority: 0.1, changeFrequency: "yearly" },
    { path: "/politica-privacidad", priority: 0.1, changeFrequency: "yearly" },
  ];
  const fijas = rutas.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Una entrada por vídeo, sacada de la misma lista que pinta las páginas
  // (app/videos/videos.ts). Publicar un vídeo lo mete en el sitemap solo.
  // La fecha es la de publicación del vídeo, no la de hoy: es la que de
  // verdad indica cuándo cambió esa página.
  const videos = videosPublicados.map((v) => ({
    url: `${BASE}/videos/${v.slug}`,
    lastModified: new Date(`${v.fecha}T12:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...fijas, ...videos];
}
