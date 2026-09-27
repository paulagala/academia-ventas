import type { Metadata } from "next";
import DiagnosticoLanding from "./components/DiagnosticoLanding";
import { CASOS, portada } from "./casos/casos";
import { CANAL_YOUTUBE } from "./videos/videos";

// La home escribe su título entero: el `template` del layout solo se aplica a
// los segmentos hijos, no a la página del mismo segmento de ruta.
const titulo = "Dirección comercial externa para negocios que ya venden | Galador";
const descripcion =
  "Dirección comercial externa de Paula Gallego: auditoría del embudo, oferta y precio, proceso y entrenamiento de quien vende con sus llamadas reales. Pide tu diagnóstico.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/" },
  openGraph: {
    title: titulo,
    description: descripcion,
    url: "/",
    siteName: "Galador",
    locale: "es_ES",
    type: "website",
  },
};

// Datos estructurados. Solo información verificable en el propio sitio:
// marca (aviso legal), fundadora, idioma y ámbito. Sin dirección, teléfono,
// valoraciones ni tamaño de equipo, que no constan en ninguna parte.
const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Galador",
  url: "https://www.galador.es",
  // Logo oficial (el vertical de Paula sobre blanco), para Google.
  logo: "https://www.galador.es/logo-galador.png",
  image: "https://www.galador.es/logo-galador.png",
  // Logo que Google puede mostrar junto a la marca en los resultados:
  // cuadrado y sobre blanco, como pide su guía para logotipos.
  logo: "https://www.galador.es/logo-galador.png",
  image: "https://www.galador.es/logo-galador.png",
  description:
    "Dirección comercial externa para negocios que ya venden: auditoría del embudo, estrategia comercial (oferta, precio, diferenciación), proceso de venta y entrenamiento de quien vende sobre sus llamadas reales.",
  founder: {
    "@type": "Person",
    name: "Paula Gallego",
    jobTitle: "Consultora comercial",
    // Perfiles que confirman que es la misma persona en todas partes: es lo
    // que usan Google y los asistentes de IA para unir la marca con su autora.
    sameAs: [CANAL_YOUTUBE, "https://www.linkedin.com/in/paula-gallego-ventas"],
  },
  sameAs: [CANAL_YOUTUBE, "https://www.linkedin.com/in/paula-gallego-ventas"],
  areaServed: "ES",
  availableLanguage: "es",
  serviceType: [
    "Dirección comercial externa",
    "Consultoría comercial",
    "Sistema de ventas",
    "Entrenamiento comercial",
  ],
};

// Los vídeos de los casos que se ven en la home, para que Google los asocie
// también a esta página (cada uno tiene además su propia página en /casos).
const videosCasos = CASOS.filter((c) => c.youtubeId).map((c) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: `Testimonio de ${c.empresa}: ${c.titulo}`,
  description: c.descripcion,
  thumbnailUrl: [`https://www.galador.es${portada(c)}`],
  uploadDate: c.fecha,
  duration: c.duracion,
  embedUrl: `https://www.youtube-nocookie.com/embed/${c.youtubeId}`,
  url: `https://www.galador.es/casos/${c.slug}`,
  inLanguage: "es",
}));

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([datosEstructurados, ...videosCasos]).replace(/</g, "\\u003c"),
        }}
      />
      <DiagnosticoLanding />
    </>
  );
}
