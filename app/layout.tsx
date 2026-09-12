import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingButton from "./components/FloatingButton";
import HideChrome from "./components/HideChrome";

// Titulares: serif cálida con carácter. Mantiene el nombre de variable
// --font-dm-serif para no tener que tocar el resto del código.
const fraunces = Fraunces({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Cuerpo, navegación y botones: sans neutra y legible.
const inter = Inter({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Academia de Ventas | Aprende a vender con metodología",
  description:
    "Formación práctica en ventas: cursos, guías y recursos para dominar el arte de vender. Metodología probada, resultados reales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <HideChrome>
          <Navbar />
        </HideChrome>
        <main className="flex-1">{children}</main>
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
