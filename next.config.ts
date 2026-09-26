import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Redirigimos las páginas antiguas de "Academia Ventas" a la home (landing comercial).
    const toHome = [
      "/diagnostico-comercial",
      "/cursos",
      "/cursos/:path*",
      "/formacion-ventas",
      "/formacion-ventas-b2b",
      "/formacion-ventas-b2c",
      "/formacion-ventas-para-closers",
      "/formacion-ventas-para-equipos-comerciales",
      "/formacion-ventas-para-infoproductores",
      "/formacion-ventas-para-servicios",
      "/recursos",
      "/recursos/:path*",
      "/newsletter",
      "/testimonios",
      "/contacto",
      "/sobre-mi",
      "/webinar/ventas-consultivas",
      "/webinar/lista-espera",
    ];
    return [
      ...toHome.map((source) => ({
        source,
        destination: "/",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
