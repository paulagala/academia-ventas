import Link from "next/link";
import PageHeader from "../components/PageHeader";

const recursos = [
  { title: "Cómo tratar objeciones en ventas", desc: "Guía práctica con las 15 objeciones más comunes y cómo responder a cada una.", slug: "como-tratar-objeciones-en-ventas", tag: "Objeciones" },
  { title: "Venta consultiva: guía completa", desc: "Todo lo que necesitas saber para aplicar la venta consultiva en tu negocio.", slug: "venta-consultiva", tag: "Metodología" },
  { title: "Guión de ventas: cómo crearlo", desc: "Plantilla y estructura para crear un guión de ventas efectivo paso a paso.", slug: "guion-de-ventas", tag: "Herramientas" },
  { title: "Cierre de ventas: técnicas y ejemplos", desc: "12 técnicas de cierre con ejemplos reales para aplicar en tu próxima reunión.", slug: "cierre-de-ventas", tag: "Cierre" },
  { title: "Preguntas de indagación", desc: "Las mejores preguntas para descubrir necesidades reales del cliente.", slug: "preguntas-de-indagacion", tag: "Diagnóstico" },
];

export default function RecursosPage() {
  return (
    <>
      <PageHeader
        tag="Recursos gratuitos"
        title="Guías y recursos de ventas"
        description="Contenido práctico para mejorar tus habilidades comerciales"
      />
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
          {recursos.map((r) => (
            <Link key={r.slug} href={`/recursos/${r.slug}`} className="block p-6 rounded-[var(--radius-card)] border border-border hover:shadow-[var(--shadow-soft)] hover:border-secondary/30 transition group bg-surface">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium">{r.tag}</span>
                  <h3 className="text-lg font-semibold text-text mt-2 mb-1 group-hover:text-accent transition font-[family-name:var(--font-dm-serif)]">{r.title}</h3>
                  <p className="text-text-muted text-sm">{r.desc}</p>
                </div>
                <svg className="w-5 h-5 text-muted group-hover:text-accent transition flex-shrink-0 mt-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
