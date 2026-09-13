"use client";

import { usePathname } from "next/navigation";

// Rutas que se renderizan como landing (traen su propia cabecera/pie),
// así que ocultamos el navbar/footer global en ellas.
const HIDE_PREFIX = [
  "/diagnostico-comercial",
  "/consultoria-comercial",
  "/sistema-de-ventas",
  "/entrenamiento-comercial",
  "/webinar/ventas-consultivas",
];

export default function HideChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hide =
    pathname === "/" || HIDE_PREFIX.some((p) => pathname?.startsWith(p));
  if (hide) return null;
  return <>{children}</>;
}
