import Link from "next/link";
import PageHeader from "../components/PageHeader";

const formaciones = [
  { title: "Formación Ventas B2B", desc: "Venta entre empresas: ciclos largos, múltiples decisores y propuestas de alto valor.", href: "/formacion-ventas-b2b" },
  { title: "Formación Ventas B2C", desc: "Venta al consumidor final: rapidez, emoción y conversión en el punto de contacto.", href: "/formacion-ventas-b2c" },
  { title: "Para Infoproductores", desc: "Aprende a vender cursos, mentorías y productos digitales con estrategia.", href: "/formacion-ventas-para-infoproductores" },
  { title: "Para Servicios", desc: "Vende consultoría, coaching o cualquier servicio profesional sin sentirte incómodo.", href: "/formacion-ventas-para-servicios" },
  { title: "Para Closers", desc: "Conviértete en closer profesional: cierra ventas de alto ticket para otros negocios.", href: "/formacion-ventas-para-closers" },
  { title: "Para Equipos Comerciales", desc: "Formación a medida para empresas que quieren elevar el rendimiento de su equipo.", href: "/formacion-ventas-para-equipos-comerciales" },
];

export default function FormacionVentasPage() {
  return (
    <>
      <PageHeader
        tag="Especialización"
        title="Formación en ventas por sector"
        description="Programas diseñados para tu tipo de negocio y cliente"
      />
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {formaciones.map((f) => (
            <Link key={f.href} href={f.href} className="block p-8 rounded-[var(--radius-card)] border border-border hover:shadow-[var(--shadow-soft)] hover:border-secondary/30 transition group bg-surface">
              <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-accent transition font-[family-name:var(--font-dm-serif)]">{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
              <span className="inline-block mt-4 text-accent text-sm font-medium">Ver programa &rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
