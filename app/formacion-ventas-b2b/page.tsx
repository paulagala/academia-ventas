import Link from "next/link";
import PageHeader from "../components/PageHeader";

export default function FormacionB2B() {
  return (
    <>
      <PageHeader
        tag="B2B"
        title="Formación en Ventas B2B"
        description="Domina la venta entre empresas: ciclos largos, múltiples decisores y propuestas de alto valor"
      />
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl text-text mb-6 font-[family-name:var(--font-dm-serif)]">¿Qué aprenderás?</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {[
                "Identificar y mapear a los decisores clave",
                "Construir propuestas de valor para comités",
                "Gestionar ciclos de venta de 3-12 meses",
                "Negociar contratos corporativos",
                "Usar CRM para gestionar pipeline B2B",
                "Presentar ROI de forma convincente",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-surface rounded-[var(--radius-button)]">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-text">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-primary/5 rounded-[var(--radius-card)] p-8 text-center">
              <h3 className="text-xl text-text mb-3 font-[family-name:var(--font-dm-serif)]">¿Quieres más información?</h3>
              <p className="text-text-muted text-sm mb-6">Cuéntanos tu situación y te recomendamos el mejor itinerario</p>
              <Link href="/contacto" className="inline-block bg-accent text-surface font-semibold px-8 py-3 rounded-[var(--radius-button)] hover:bg-accent-hover transition">
                Solicitar información
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
