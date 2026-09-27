import Link from "next/link";

// Enlace de footer con 44px de área táctil (el texto solo ocupa ~20px de alto).
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex items-center min-h-11 hover:text-primary transition">
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="bg-background border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="text-lg font-semibold text-primary mb-3 font-[family-name:var(--font-dm-serif)]">
              Galador
            </div>
            {/* El nombre propio se mantiene aquí: la marca es Galador, pero
                «Paula Gallego» tiene recorrido de búsqueda y firma el servicio. */}
            <p className="text-sm text-text-muted leading-relaxed">
              Dirección comercial externa de Paula Gallego, para negocios que ya venden. Para que
              vendáis porque sabéis vender.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted mb-2">Navegación</div>
            <ul className="flex flex-col text-sm text-text-muted">
              <FooterLink href="/">Inicio</FooterLink>
              <FooterLink href="/direccion-comercial-externa">Dirección comercial externa</FooterLink>
              <FooterLink href="/consultoria-comercial">Consultoría comercial</FooterLink>
              <FooterLink href="/sistema-de-ventas">Sistema de ventas</FooterLink>
              <FooterLink href="/entrenamiento-comercial">Entrenamiento comercial</FooterLink>
              <FooterLink href="/ventas-por-sector">Por sector</FooterLink>
              <FooterLink href="/casos">Casos de éxito</FooterLink>
              <FooterLink href="/videos">Vídeos</FooterLink>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted mb-2">Legal</div>
            <ul className="flex flex-col text-sm text-text-muted">
              <FooterLink href="/aviso-legal">Aviso legal</FooterLink>
              <FooterLink href="/politica-privacidad">Política de privacidad</FooterLink>
            </ul>
          </div>
        </div>
        <div className="border-t border-line pt-6 text-sm text-text-muted">
          © {new Date().getFullYear()} Galador. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
