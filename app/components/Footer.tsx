import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="text-lg font-semibold text-primary mb-3 font-[family-name:var(--font-dm-serif)]">
              Paula Gallego
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Sistemas comerciales que escalan sin perder el foco en el cliente.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-4">Navegación</div>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
              <li><Link href="/" className="hover:text-primary transition">Inicio</Link></li>
              <li><Link href="/consultoria-comercial" className="hover:text-primary transition">Consultoría comercial</Link></li>
              <li><Link href="/sistema-de-ventas" className="hover:text-primary transition">Sistema de ventas</Link></li>
              <li><Link href="/entrenamiento-comercial" className="hover:text-primary transition">Entrenamiento comercial</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-4">Legal</div>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
              <li><Link href="/aviso-legal" className="hover:text-primary transition">Aviso legal</Link></li>
              <li><Link href="/politica-privacidad" className="hover:text-primary transition">Política de privacidad</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-line pt-6 text-xs text-muted">
          © {new Date().getFullYear()} Paula Gallego · Galador. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
