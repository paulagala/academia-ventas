import type { Metadata } from "next";
import DiagnosticoLanding from "./components/DiagnosticoLanding";
import { CANAL_YOUTUBE } from "./videos/videos";

// La home escribe su título entero: el `template` del layout solo se aplica a
// los segmentos hijos, no a la página del mismo segmento de ruta.
const titulo = "Consultoría comercial para negocios de servicios | Galador";
const descripcion =
  "Diseñamos y entrenamos el sistema comercial de negocios que ya venden: proceso, guiones, CRM y métricas. Consultoría de Paula Gallego. Pide tu diagnóstico.";

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
  description:
    "Consultoría comercial para negocios de servicios: diagnóstico del proceso de venta, construcción del sistema comercial y entrenamiento del equipo.",
  founder: {
    "@type": "Person",
    name: "Paula Gallego",
    jobTitle: "Consultora comercial",
    // Perfiles que confirman que es la misma persona en todas partes: es lo
    // que usan Google y los asistentes de IA para unir la marca con su autora.
    // Pendiente: añadir la URL del perfil de LinkedIn.
    sameAs: [CANAL_YOUTUBE],
  },
  sameAs: [CANAL_YOUTUBE],
  areaServed: "ES",
  availableLanguage: "es",
  serviceType: [
    "Consultoría comercial",
    "Sistema de ventas",
    "Entrenamiento comercial",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datosEstructurados).replace(/</g, "\\u003c"),
        }}
      />
      <DiagnosticoLanding />
    </>
  );
}
