import type { Metadata } from "next";
import Calculadora from "./Calculadora";

export const metadata: Metadata = {
  title: "¿Te sale rentable contratar un SDR? Calculadora",
  description:
    "Responde unas preguntas sobre tu negocio y descubre si te sale rentable contratar a alguien que te consiga citas, cuánto pierdes sin sistema y cuándo recuperas lo invertido.",
  alternates: { canonical: "/calculadora-comercial" },
};

export default function CalculadoraComercialPage() {
  return <Calculadora />;
}
