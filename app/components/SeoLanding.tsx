import Link from "next/link";

export type SeoLandingProps = {
  kicker: string;
  h1: string;
  intro: string;
  bloques: { h2: string; parrafos: string[] }[];
  cierre: string;
};

function CtaButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/#formulario"
      className={`inline-flex items-center justify-center gap-2 bg-[#791E2A] text-[#FAFAFA] font-semibold rounded-lg hover:bg-[#611722] transition ${className}`}
    >
      {children}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  );
}

export default function SeoLanding({ kicker, h1, intro, bloques, cierre }: SeoLandingProps) {
  return (
    <div className="bg-[#F9F5EF] text-[#2B231F]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F3EEE4]/90 backdrop-blur border-b border-[#DBD5C9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-[#2B231F] font-[family-name:var(--font-dm-serif)]">
            Paula Gallego
          </Link>
          <CtaButton className="px-4 sm:px-5 py-2.5 text-sm">
            <span className="sm:hidden">Diagnóstico</span>
            <span className="hidden sm:inline">Solicitar diagnóstico</span>
          </CtaButton>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#DBD5C9]">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#61948F]/20 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 bg-[#E3E5DC] text-[#4a5a54] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#61948F]" />
            {kicker}
          </div>
          <h1 className="text-[2rem] leading-tight sm:text-5xl sm:leading-[1.08] text-[#2B231F] mb-6 font-[family-name:var(--font-dm-serif)]">
            {h1}
          </h1>
          <p className="text-lg sm:text-xl text-[#7A6F66] leading-relaxed mb-8">{intro}</p>
          <CtaButton className="w-full sm:w-auto px-7 py-4 text-lg">Solicitar diagnóstico comercial</CtaButton>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          {bloques.map((b) => (
            <div key={b.h2}>
              <h2 className="text-2xl sm:text-3xl text-[#2B231F] mb-4 font-[family-name:var(--font-dm-serif)]">
                {b.h2}
              </h2>
              <div className="space-y-4 text-[#7A6F66] leading-relaxed">
                {b.parrafos.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 sm:py-20 bg-[#61948F]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl sm:text-3xl text-[#FAFAFA] mb-6 leading-snug font-[family-name:var(--font-dm-serif)]">
            {cierre}
          </p>
          <Link
            href="/#formulario"
            className="inline-flex items-center justify-center gap-2 bg-[#FAFAFA] text-[#791E2A] font-semibold rounded-lg px-8 py-4 text-lg hover:bg-white transition"
          >
            Solicitar diagnóstico comercial
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F9F5EF] border-t border-[#DBD5C9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold text-[#2B231F] font-[family-name:var(--font-dm-serif)]">
            Paula Gallego
          </Link>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#7A6F66]">
            <Link href="/consultoria-comercial" className="hover:text-[#2B231F] transition">Consultoría comercial</Link>
            <Link href="/sistema-de-ventas" className="hover:text-[#2B231F] transition">Sistema de ventas</Link>
            <Link href="/entrenamiento-comercial" className="hover:text-[#2B231F] transition">Entrenamiento comercial</Link>
            <Link href="/aviso-legal" className="hover:text-[#2B231F] transition">Aviso legal</Link>
            <Link href="/politica-privacidad" className="hover:text-[#2B231F] transition">Privacidad</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
