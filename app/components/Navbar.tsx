import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav
      aria-label="Principal"
      className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-line"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="inline-flex items-center min-h-11"
        >
          <Logo className="h-6 sm:h-7 w-auto text-[#791E2A]" />
        </Link>
        <div className="flex items-center gap-6 text-sm text-text-muted">
          {/* min-h-11 = 44px de área táctil, aunque el texto ocupe menos. */}
          <Link href="/" className="hidden sm:inline-flex items-center min-h-11 hover:text-primary transition">
            Inicio
          </Link>
          <Link href="/casos" className="hidden sm:inline-flex items-center min-h-11 hover:text-primary transition">
            Casos
          </Link>
          <Link href="/videos" className="hidden sm:inline-flex items-center min-h-11 hover:text-primary transition">
            Vídeos
          </Link>
          <Link
            href="/#formulario"
            className="inline-flex items-center min-h-11 bg-accent text-surface px-5 rounded-[var(--radius-button)] font-semibold hover:bg-accent-hover transition"
          >
            <span className="sm:hidden">Diagnóstico</span>
            <span className="hidden sm:inline">Solicitar diagnóstico</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
