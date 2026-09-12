import Link from "next/link";
import PageHeader from "../components/PageHeader";

export default function FormacionServicios() {
  return (
    <>
      <PageHeader
        tag="Servicios"
        title="Formación en Ventas para Servicios"
        description="Vende consultoría, coaching o cualquier servicio profesional con confianza y sistema"
      />
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl text-text mb-6 font-[family-name:var(--font-dm-serif)]">¿Qué aprenderás?</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              "Vender sin sentir que vendes",
              "Diagnóstico de necesidades del cliente",
              "Propuestas de valor para servicios intangibles",
              "Pricing y packaging de servicios",
              "Gestión de objeciones sobre precio",
              "Retención y cuenta de resultados",
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
      </section>
    </>
  );
}
