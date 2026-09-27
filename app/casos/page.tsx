import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import { CASOS } from "./casos";

const titulo = "Casos de éxito";
const descripcion =
  "Negocios reales que ordenaron su venta con Galador: de dónde partían, qué construimos y qué cambió en sus números, contado por sus responsables.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/casos" },
  openGraph: {
    title: `${titulo} | Galador`,
    description: descripcion,
    url: "/casos",
    siteName: "Galador",
    locale: "es_ES",
    type: "website",
  },
};

const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: titulo,
  itemListElement: CASOS.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.galador.es/casos/${c.slug}`,
    name: c.titulo,
  })),
};

export default function CasosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datosEstructurados).replace(/</g, "\\u003c"),
        }}
      />
      <PageHeader
        tag="Casos de éxito"
        title="Lo que cambió en su venta, contado por ellos."
        description="Cada caso empieza igual: escuchar sus llamadas reales. De ahí sale qué construir y, después, qué cambia en los números."
      />
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-6 sm:grid-cols-2">
            {CASOS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/casos/${c.slug}`}
                  className="group flex flex-col gap-4 h-full bg-surface border border-border rounded-[var(--radius-card)] p-7 hover:border-secondary/30 hover:shadow-[var(--shadow-sm)] transition"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-4xl text-accent num-mono whitespace-nowrap">{c.cifraDestacada}</span>
                    <span className="text-xs bg-secondary/10 text-secondary-dark px-2.5 py-1 rounded-full font-medium">
                      {c.sector.nombre}
                    </span>
                  </div>
                  <h2 className="text-xl text-primary group-hover:text-accent transition">{c.titulo}</h2>
                  <p className="text-sm text-text-muted leading-relaxed">{c.resumen}</p>
                  <span className="mt-auto text-sm font-semibold text-accent">Leer el caso →</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-xs text-text-muted max-w-2xl">
            Resultados de clientes concretos. Cada negocio es diferente, por lo que no constituyen una
            garantía de resultados futuros.
          </p>
        </div>
      </section>
    </>
  );
}
