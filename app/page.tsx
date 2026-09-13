import type { Metadata } from "next";
import DiagnosticoLanding from "./components/DiagnosticoLanding";

export const metadata: Metadata = {
  title: "Consultoría de sistema comercial | Paula Gallego",
  description:
    "Ayudo a negocios de servicios online que ya venden a construir un sistema comercial que escala sin perder calidad en la venta. Solicita tu diagnóstico comercial.",
};

export default function HomePage() {
  return <DiagnosticoLanding />;
}
