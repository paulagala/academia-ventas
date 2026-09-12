import Link from "next/link";

const columns = [
  {
    title: "Formación",
    links: [
      { href: "/cursos", label: "Cursos" },
      { href: "/formacion-ventas-b2b", label: "Ventas B2B" },
      { href: "/formacion-ventas-b2c", label: "Ventas B2C" },
      { href: "/formacion-ventas-para-closers", label: "Para Closers" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { href: "/recursos", label: "Todos los recursos" },
      { href: "/webinar/ventas-consultivas", label: "Masterclass" },
      { href: "/newsletter", label: "Newsletter" },
      { href: "/testimonios", label: "Testimonios" },
    ],
  },
  {
    title: "Estudio",
    links: [
      { href: "/sobre-mi", label: "Sobre mí" },
      { href: "/contacto", label: "Contacto" },
      { href: "/politica-privacidad", label: "Privacidad" },
      { href: "/aviso-legal", label: "Aviso legal" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="text-surface font-bold text-lg mb-2 font-[family-name:var(--font-dm-serif)]">
              AcademiaVentas
            </div>
            <div className="label-mono text-surface/50 mb-4">est. consultiva</div>
            <p className="text-sm leading-relaxed text-surface/70">
              Venta consultiva con diagnóstico, estructura y criterio. Sin presión.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="label-mono text-surface/50 mb-4 pb-2 border-b border-surface/15">
                {col.title}
              </div>
              <ul className="flex flex-col gap-2.5 text-sm text-surface/70">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-surface transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-surface/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="label-mono text-surface/40">
            © {new Date().getFullYear()} AcademiaVentas
          </span>
          <span className="label-mono text-surface/40">Madrid · Online</span>
        </div>
      </div>
    </footer>
  );
}
