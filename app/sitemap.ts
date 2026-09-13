import type { MetadataRoute } from "next";

const BASE = "https://galador.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const rutas = [
    { path: "/", priority: 1 },
    { path: "/consultoria-comercial", priority: 0.9 },
    { path: "/sistema-de-ventas", priority: 0.9 },
    { path: "/entrenamiento-comercial", priority: 0.9 },
    { path: "/aviso-legal", priority: 0.2 },
    { path: "/politica-privacidad", priority: 0.2 },
  ];
  return rutas.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
