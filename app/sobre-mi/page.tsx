import Link from "next/link";
import PageHeader from "../components/PageHeader";

export default function SobreMiPage() {
  return (
    <>
      <PageHeader title="Sobre mí" description="La persona detrás de AcademiaVentas" />
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 text-text-muted leading-relaxed">
            <p>
              Llevo más de 10 años dedicándome a las ventas. He vendido puerta a puerta, por teléfono,
              en reuniones de directivos y en webinars para cientos de personas. He pasado por todas las
              fases: desde no saber qué decir en una llamada hasta liderar equipos comerciales.
            </p>
            <p>
              AcademiaVentas nació de una frustración: la mayoría de formaciones en ventas son teóricas,
              genéricas y desconectadas de la realidad. Yo quería crear algo diferente: formación práctica,
              con casos reales, ejercicios aplicables y acompañamiento real.
            </p>
            <p>
              Mi metodología se basa en la venta consultiva: posicionarte como asesor, diagnosticar antes
              de prescribir y construir relaciones de confianza que generan ventas recurrentes.
            </p>
            <p>
              He formado a más de 500 profesionales de ventas en sectores como tecnología, servicios
              profesionales, infoproductos y consultoría. El 98% recomendaría la formación.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { value: "+10 años", label: "De experiencia en ventas" },
              { value: "+500", label: "Profesionales formados" },
              { value: "98%", label: "Tasa de recomendación" },
            ].map((s) => (
              <div key={s.label} className="text-center p-6 bg-surface rounded-[var(--radius-card)] border border-border">
                <div className="text-2xl font-bold text-primary font-[family-name:var(--font-dm-serif)]">{s.value}</div>
                <div className="text-sm text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contacto" className="inline-block bg-accent text-surface font-semibold px-8 py-3 rounded-[var(--radius-button)] hover:bg-accent-hover transition">
              Hablemos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
