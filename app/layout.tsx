import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingButton from "./components/FloatingButton";
import HideChrome from "./components/HideChrome";

// Titulares: serif cálida con carácter. Mantiene el nombre de variable
// --font-dm-serif para no tener que tocar el resto del código.
// Solo pesos normales: la itálica de Fraunces no se usa en ninguna página viva
// (las tres que la usaban redirigen a la home) y duplicaba los ficheros a descargar.
const fraunces = Fraunces({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Cuerpo, navegación y botones: sans neutra y legible.
const inter = Inter({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Base para que los canonical relativos de cada página se resuelvan solos.
  // El dominio canónico es CON www: galador.es responde 308 hacia www.galador.es.
  metadataBase: new URL("https://www.galador.es"),
  title: {
    // Título de cualquier página que no defina el suyo (los legales, por ejemplo).
    default: "Galador | Consultoría comercial y sistemas de venta",
    // Sufijo de marca automático para las páginas hijas (las landings SEO).
    // Ojo: NO se aplica a app/page.tsx, que es el mismo segmento de ruta que
    // este layout, así que la home escribe su título completo.
    template: "%s | Galador",
  },
  description:
    "Construimos tu sistema comercial completo: proceso, guiones, CRM y entrenamiento del equipo. Para negocios de servicios que ya venden y quieren escalar.",
  // La marca es Galador, pero el nombre propio tiene recorrido de búsqueda
  // y sigue siendo la señal de autoría del sitio.
  authors: [{ name: "Paula Gallego" }],
  creator: "Paula Gallego",
  publisher: "Galador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <HideChrome>
          <Navbar />
        </HideChrome>
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <HideChrome>
          <Footer />
        </HideChrome>
        <HideChrome>
          <FloatingButton />
        </HideChrome>
      </body>
    </html>
  );
}
