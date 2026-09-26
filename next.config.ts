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
      // La antigua página de infoproductores tiene ya su sucesora en el clúster
      // por sector: mejor mandarla ahí que a la home.
      {
        source: "/formacion-ventas-para-infoproductores",
        destination: "/ventas-para-infoproductores",
        permanent: true,
      },
      ...toHome.map((source) => ({
        source,
        destination: "/",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
