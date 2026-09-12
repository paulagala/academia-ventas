"use client";

import { usePathname } from "next/navigation";

// Rutas que se renderizan como landing de conversión, sin navbar/footer global.
const LANDING_PATHS = ["/webinar/ventas-consultivas", "/diagnostico-comercial"];

export default function HideChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = LANDING_PATHS.some((p) => pathname?.startsWith(p));
  if (isLanding) return null;
  return <>{children}</>;
}
