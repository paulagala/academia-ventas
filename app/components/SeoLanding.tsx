import Link from "next/link";

// Bloque de contenido: o párrafos, o lista, o ambos. Tener las dos formas
// evita lo que pasaba antes, que había listas escritas como párrafos sueltos.
export type SeoBloque = {
  h2: string;
  parrafos?: string[];
  lista?: string[];
};

export type SeoLandingProps = {
  kicker: string;
  h1: string;
  intro: string;
  /** 3 frases cortas bajo el intro. Solo donde aporten: no todas las páginas las llevan. */
  destacados?: string[];
  /** Línea temporal del proyecto (3 meses). Solo en la página de servicio. */
  fases?: { plazo: string; titulo: string; texto: string }[];
  bloques: SeoBloque[];
  /** Preguntas propias de cada página: es lo que hace que no sean la misma página repetida. */
  faq?: { p: string; r: string }[];
  /** Caso real, anonimizado. Solo hechos: cifras que constan, nada inventado. */
  caso?: SeoCaso;
  /** Enlaces internos del clúster: servicios, otros sectores, vídeos. */
  relacionados?: { href: string; texto: string; detalle?: string }[];
  /** Título del bloque de enlaces. Por defecto, «Sigue leyendo». */
  relacionadosTitulo?: string;
  /** Datos estructurados propios de la página. Si no se pasan, se generan
   *  solos: FAQPage con las preguntas y BreadcrumbList con `ruta`. */
  datosEstructurados?: object;
  /** Ruta de la página («/sistema-de-ventas»), para las migas de pan. */
  ruta?: string;
  cierre: string;
};

export type SeoCaso = {
  etiqueta: string;
  titulo: string;
  parrafos: string[];
  cifras?: { valor: string; texto: string }[];
  /** Qué falta por contar (p. ej. el resultado de un caso en curso). */
  nota?: string;
};

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#791E2A]";

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
      className={`inline-flex items-center justify-center gap-2 bg-[#791E2A] text-[#FFFDF9] font-semibold rounded-lg hover:bg-[#611722] transition ${FOCUS} ${className}`}
    >
      {children}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  );
}

function Check() {
  return (
    <svg
      className="w-4 h-4 text-[#3F5E53] flex-shrink-0 mt-1.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l5 5L19 7" />
    </svg>
  );
}

export default function SeoLanding({
  kicker,
  h1,
  intro,
  destacados,
  fases,
  bloques,
  faq,
  caso,
  relacionados,
  relacionadosTitulo = "Sigue leyendo",
  datosEstructurados,
  ruta,
  cierre,
}: SeoLandingProps) {
  const BASE = "https://www.galador.es";
  const ld =
    datosEstructurados ??
    (ruta
      ? {
          "@context": "https://schema.org",
          "@graph": [
            ...(faq
              ? [
                  {
                    "@type": "FAQPage",
                    mainEntity: faq.map((f) => ({
                      "@type": "Question",
                      name: f.p,
                      acceptedAnswer: { "@type": "Answer", text: f.r },
                    })),
                  },
                ]
              : []),
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: BASE },
                { "@type": "ListItem", position: 2, name: kicker, item: `${BASE}${ruta}` },
              ],
            },
          ],
        }
      : undefined);
  return (
    <div className="bg-[#F9F5EF] text-[#2B231F]">
      {ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ld).replace(/</g, "\\u003c"),
          }}
        />
      )}
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F3EEE4]/90 backdrop-blur border-b border-[#DBD5C9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
          <Link
            href="/"
            className={`text-lg font-semibold text-[#2B231F] font-[family-name:var(--font-dm-serif)] ${FOCUS}`}
          >
            Galador
          </Link>
          <CtaButton className="px-4 sm:px-5 py-2.5 text-sm">
            <span className="sm:hidden">Diagnóstico</span>
            <span className="hidden sm:inline">Pedir diagnóstico</span>
          </CtaButton>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#DBD5C9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <span className="inline-flex items-center gap-2 bg-[#E3E5DC] text-[#3F5E53] text-sm font-semibold tracking-[0.06em] px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3F5E53]" aria-hidden="true" />
            {kicker}
          </span>
          <h1 className="text-[2rem] leading-[1.1] sm:text-5xl sm:leading-[1.08] text-balance text-[#2B231F] mt-6 mb-6 font-[family-name:var(--font-dm-serif)]">
            {h1}
          </h1>
          <p className="text-lg sm:text-xl text-[#5A4F48] leading-relaxed">{intro}</p>

          {destacados && (
            <ul className="mt-7 flex flex-col gap-3">
              {destacados.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[#2B231F] leading-relaxed">
                  <Check />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-9">
            <CtaButton className="w-full sm:w-auto px-7 py-4 text-base">
              Pedir diagnóstico (30 min, sin coste)
            </CtaButton>
            <p className="text-sm text-[#5A4F48] mt-4">
              Lo revisa Paula personalmente, no un equipo de ventas. Respuesta en 24–48 h.
            </p>
          </div>
        </div>
      </section>

      {/* Fases del proyecto: solo en la página de servicio */}
      {fases && (
        <section className="py-14 sm:py-16 bg-[#F3EEE4] border-b border-[#DBD5C9]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl text-[#2B231F] mb-8 font-[family-name:var(--font-dm-serif)]">
              Tres meses, tres fases
            </h2>
            <ol className="flex flex-col gap-5 list-none p-0 m-0">
              {fases.map((f) => (
                <li
                  key={f.plazo}
                  className="bg-[#FFFDF9] border border-[#DBD5C9] rounded-2xl p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-xl text-[#2B231F] font-[family-name:var(--font-dm-serif)]">
                      {f.titulo}
                    </h3>
                    <span className="text-sm font-semibold text-[#791E2A] bg-[#F2E4E4] px-3 py-1 rounded-md whitespace-nowrap">
                      {f.plazo}
                    </span>
                  </div>
                  <p className="text-[#5A4F48] leading-relaxed">{f.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Contenido */}
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          {bloques.map((b) => (
            <div key={b.h2}>
              <h2 className="text-2xl sm:text-3xl text-[#2B231F] mb-4 font-[family-name:var(--font-dm-serif)]">
                {b.h2}
              </h2>
              {b.parrafos && (
                <div className="space-y-4 text-[#5A4F48] leading-relaxed">
                  {b.parrafos.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
              {b.lista && (
                <ul className={`flex flex-col gap-3 ${b.parrafos ? "mt-5" : ""}`}>
                  {b.lista.map((l) => (
                    <li key={l} className="flex items-start gap-3 text-[#2B231F] leading-relaxed">
                      <Check />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Caso real */}
      {caso && (
        <section className="pb-14 sm:pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FFFDF9] border border-[#DBD5C9] rounded-2xl p-6 sm:p-9">
              <span className="text-sm font-semibold tracking-[0.06em] text-[#791E2A]">
                {caso.etiqueta}
              </span>
              <h2 className="text-2xl sm:text-3xl text-[#2B231F] mt-2 mb-5 font-[family-name:var(--font-dm-serif)]">
                {caso.titulo}
              </h2>
              {caso.cifras && (
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {caso.cifras.map((c) => (
                    <div key={c.texto} className="bg-[#F3EEE4] rounded-xl p-4">
                      <dt className="text-sm text-[#5A4F48] leading-snug">{c.texto}</dt>
                      <dd className="text-2xl text-[#2B231F] mt-1 font-[family-name:var(--font-dm-serif)]">
                        {c.valor}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="space-y-4 text-[#5A4F48] leading-relaxed">
                {caso.parrafos.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {caso.nota && (
                <p className="mt-5 text-sm text-[#5A4F48] italic">{caso.nota}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Preguntas propias de esta página */}
      {faq && (
        <section className="pb-14 sm:pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl text-[#2B231F] mb-6 font-[family-name:var(--font-dm-serif)]">
              Preguntas frecuentes
            </h2>
            <div className="flex flex-col gap-3">
              {faq.map((f) => (
                <details
                  key={f.p}
                  className="group bg-[#FFFDF9] border border-[#DBD5C9] rounded-xl px-5 sm:px-6"
                >
                  <summary
                    className={`flex items-center justify-between gap-4 cursor-pointer list-none py-5 text-base sm:text-lg font-semibold text-[#2B231F] ${FOCUS}`}
                  >
                    {f.p}
                    <svg
                      className="w-5 h-5 text-[#791E2A] flex-shrink-0 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="pb-5 text-[#5A4F48] leading-relaxed">{f.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enlaces del clúster */}
      {relacionados && (
        <section className="pb-14 sm:pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl text-[#2B231F] mb-6 font-[family-name:var(--font-dm-serif)]">
              {relacionadosTitulo}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3 list-none p-0 m-0">
              {relacionados.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className={`block h-full bg-[#FFFDF9] border border-[#DBD5C9] rounded-xl px-5 py-4 hover:border-[#791E2A] transition ${FOCUS}`}
                  >
                    <span className="font-semibold text-[#2B231F]">{r.texto}</span>
                    {r.detalle && (
                      <span className="block text-sm text-[#5A4F48] mt-1 leading-snug">{r.detalle}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="py-16 sm:py-20 bg-[#3F5E53]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl sm:text-3xl text-[#FFFDF9] mb-6 leading-snug font-[family-name:var(--font-dm-serif)]">
            {cierre}
          </p>
          <Link
            href="/#formulario"
            className="inline-flex items-center justify-center gap-2 bg-[#FFFDF9] text-[#791E2A] font-semibold rounded-lg px-8 py-4 text-base hover:bg-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFDF9]"
          >
            Pedir diagnóstico (30 min, sin coste)
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F9F5EF] border-t border-[#DBD5C9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className={`text-sm font-semibold text-[#2B231F] font-[family-name:var(--font-dm-serif)] ${FOCUS}`}
          >
            Galador
          </Link>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#5A4F48]">
            <Link href="/direccion-comercial-externa" className={`inline-flex items-center min-h-11 hover:text-[#2B231F] transition ${FOCUS}`}>Dirección comercial externa</Link>
            <Link href="/consultoria-comercial" className={`inline-flex items-center min-h-11 hover:text-[#2B231F] transition ${FOCUS}`}>Consultoría comercial</Link>
            <Link href="/sistema-de-ventas" className={`inline-flex items-center min-h-11 hover:text-[#2B231F] transition ${FOCUS}`}>Sistema de ventas</Link>
            <Link href="/entrenamiento-comercial" className={`inline-flex items-center min-h-11 hover:text-[#2B231F] transition ${FOCUS}`}>Entrenamiento comercial</Link>
            <Link href="/ventas-por-sector" className={`inline-flex items-center min-h-11 hover:text-[#2B231F] transition ${FOCUS}`}>Por sector</Link>
            <Link href="/aviso-legal" className={`inline-flex items-center min-h-11 hover:text-[#2B231F] transition ${FOCUS}`}>Aviso legal</Link>
            <Link href="/politica-privacidad" className={`inline-flex items-center min-h-11 hover:text-[#2B231F] transition ${FOCUS}`}>Privacidad</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
