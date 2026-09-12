import Link from "next/link";
import PageHeader from "../components/PageHeader";

const courses = [
  { title: "Fundamentos de la Venta", desc: "Domina las bases: prospección, cualificación y primer contacto con el cliente.", tags: ["Principiante", "8 lecciones"], color: "bg-secondary", slug: "fundamentos-venta" },
  { title: "Técnicas de Cierre", desc: "Aprende 12 técnicas de cierre probadas en entornos B2B y B2C.", tags: ["Intermedio", "10 lecciones"], color: "bg-secondary", slug: "tecnicas-cierre" },
  { title: "Programa de Ventas Consultivas", desc: "Posiciónate como asesor de confianza. Vende soluciones, no productos.", tags: ["Avanzado", "12 lecciones"], color: "bg-accent", slug: "programa-ventas-consultivas" },
  { title: "Negociación Estratégica", desc: "Gestiona objeciones y negocia condiciones sin ceder en precio.", tags: ["Intermedio", "9 lecciones"], color: "bg-muted", slug: "negociacion-estrategica" },
  { title: "Social Selling", desc: "Usa LinkedIn y redes sociales para generar oportunidades de negocio.", tags: ["Principiante", "7 lecciones"], color: "bg-secondary", slug: "social-selling" },
  { title: "Liderazgo Comercial", desc: "Gestiona equipos de ventas, KPIs y pipelines como un verdadero líder.", tags: ["Avanzado", "14 lecciones"], color: "bg-secondary", slug: "liderazgo-comercial" },
];

export default function CursosPage() {
  return (
    <>
      <PageHeader tag="Formación" title="Todos los cursos" description="Elige el curso que mejor se adapte a tu nivel y objetivos comerciales" />
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <Link key={c.slug} href={`/cursos/${c.slug}`} className="rounded-[var(--radius-card)] border border-border overflow-hidden hover:shadow-[var(--shadow-soft)] transition group block bg-surface">
              <div className={`${c.color} h-2`} />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-accent transition font-[family-name:var(--font-dm-serif)]">{c.title}</h3>
                <p className="text-text-muted text-sm mb-4 leading-relaxed">{c.desc}</p>
                <div className="flex gap-2">
                  {c.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-surface-muted text-muted px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
