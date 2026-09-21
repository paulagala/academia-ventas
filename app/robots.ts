import type { MetadataRoute } from "next";

// Mismo dominio canónico que el sitemap: con www.
const BASE = "https://www.galador.es";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // El endpoint del formulario no tiene nada que indexar.
      disallow: ["/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
