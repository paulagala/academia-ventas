import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import { fechaLegible } from "../videos/videos";
import { ARTICULOS } from "./articulos";

const titulo = "Artículos de ventas";
const descripcion =
  "Cómo se monta y se dirige un departamento comercial en una empresa pequeña: proceso, cualificación, seguimiento y números. Por Paula Gallego, de Galador.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/articulos" },
  openGraph: {
    title: `${titulo} | Galador`,
    description: descripcion,
    url: "/articulos",
    siteName: "Galador",
    locale: "es_ES",
    type: "website",
  },
};

export default function ArticulosPage() {
  return (
    <>
      <PageHeader
        tag="Artículos"
        title="Cómo se construye un sistema comercial, por escrito."
        description="Guías largas sobre lo que hay detrás de vender bien con equipo: el recorrido de cada lead, quién hace qué y qué números mirar."
      />
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-col gap-8">
            {ARTICULOS.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articulos/${a.slug}`}
                  className="group block rounded-[var(--radius-card)] border border-border bg-surface p-6 hover:border-secondary/30 hover:shadow-[var(--shadow-sm)] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="inline-block text-xs bg-secondary/10 text-secondary-dark px-2.5 py-1 rounded-full font-medium">
                    {a.tema}
                  </span>
                  <h2 className="text-xl text-primary mt-3 group-hover:text-accent transition">{a.titulo}</h2>
                  <p className="text-text-muted text-sm mt-2 leading-relaxed">{a.descripcion}</p>
                  <span className="block text-xs text-muted mt-3">{fechaLegible(a.fecha)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
