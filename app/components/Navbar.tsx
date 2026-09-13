import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-lg font-semibold text-primary font-[family-name:var(--font-dm-serif)]">
          Paula Gallego
        </Link>
        <div className="flex items-center gap-6 text-sm text-text-muted">
          <Link href="/" className="hidden sm:inline hover:text-primary transition">Inicio</Link>
          <Link
            href="/#formulario"
            className="bg-accent text-surface px-5 py-2.5 rounded-[var(--radius-button)] font-semibold hover:bg-accent-hover transition"
          >
            Solicitar diagnóstico
          </Link>
        </div>
      </div>
    </nav>
  );
}
