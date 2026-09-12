"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/cursos", label: "Cursos" },
  { href: "/formacion-ventas", label: "Formación" },
  { href: "/recursos", label: "Recursos" },
  { href: "/webinar/ventas-consultivas", label: "Masterclass" },
  { href: "/testimonios", label: "Testimonios" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur border-t-2 border-t-secondary border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-primary font-[family-name:var(--font-dm-serif)]">
            AcademiaVentas
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 label-mono text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            est. consultiva
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="label-mono text-text-muted hover:text-primary transition"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="label-mono bg-accent text-surface px-5 py-2.5 rounded-[var(--radius-button)] hover:bg-accent-hover transition"
          >
            Contactar
          </Link>
        </div>
        <button className="md:hidden p-2 text-text" onClick={() => setOpen(!open)} aria-label="Menú">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-background px-4 pb-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="label-mono text-text-muted py-3 border-b border-line/60"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="label-mono bg-accent text-surface px-5 py-3 rounded-[var(--radius-button)] text-center hover:bg-accent-hover transition mt-3"
            onClick={() => setOpen(false)}
          >
            Contactar
          </Link>
        </div>
      )}
    </nav>
  );
}
