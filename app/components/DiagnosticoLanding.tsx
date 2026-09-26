import Image from "next/image";
import Link from "next/link";
import LeadForm from "./LeadForm";
import Faq from "./Faq";
import VideoTestimonio from "./VideoTestimonio";
import {
  CANAL_YOUTUBE,
  duracionLegible,
  miniatura,
  videosPublicados,
} from "../videos/videos";

// Anillo de foco común. En fondos claros el burdeos de marca; en las bandas
// oscuras se sobrescribe con el crema (ver TopBanner y SiNo).
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#791E2A]";

// ── Datos que Paula tiene que rellenar ──
// Todo lo que está vacío aquí simplemente NO se pinta en la web: nunca se
// publica un hueco a medias. En cuanto escribas el dato, la pieza aparece.

// Cifra de autoridad del hero. Ej.: cifra: "15"
const AUTORIDAD = { cifra: "", texto: "sistemas comerciales construidos y entrenados" };

// Cifras de la sección «Quién hay detrás». Ej.: { valor: "12", texto: "equipos entrenados" }
const TRAYECTORIA = [
  { valor: "", texto: "equipos entrenados" },
  { valor: "", texto: "llamadas auditadas" },
  { valor: "", texto: "años en ventas B2B" },
];

// ── CTA reutilizable ──
function Cta({
  children = "Pedir diagnóstico",
  href = "#formulario",
  variant = "primario",
  className = "",
}: {
  children?: React.ReactNode;
  href?: string;
  variant?: "primario" | "secundario";
  className?: string;
}) {
  const estilo =
    variant === "primario"
      ? "bg-[#791E2A] text-[#FFFDF9] hover:bg-[#611722]"
      : "border border-[#791E2A] text-[#791E2A] hover:bg-[#791E2A]/5";
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition ${estilo} ${FOCUS} ${className}`}
    >
      {children}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </a>
  );
}

// ── Etiqueta de sección (no es encabezado: no compite con los h2) ──
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 bg-[#E3E5DC] text-[#3F5E53] text-sm font-semibold tracking-[0.06em] px-3.5 py-1.5 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-[#3F5E53]" aria-hidden="true" />
      {children}
    </span>
  );
}

function TopBanner() {
  return (
    <div className="hidden md:block bg-[#3F5E53] text-[#FFFDF9] text-center text-sm px-4 py-2.5">
      <span>Consultoría comercial para negocios de servicios que ya venden y quieren dejar de improvisar</span>{" "}
      <a
        href="#formulario"
        className="font-semibold underline underline-offset-2 hover:opacity-80 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFDF9]"
      >
        Ver si encajas →
      </a>
    </div>
  );
}

function Header() {
  const enlaces = [
    { href: "#servicios", texto: "Servicios" },
    { href: "#proceso", texto: "Proceso" },
    { href: "#casos", texto: "Casos" },
    { href: "#faq", texto: "Preguntas" },
    { href: "/videos", texto: "Vídeos" },
  ];
  return (
    <header className="sticky top-0 z-40 bg-[#F3EEE4]/90 backdrop-blur border-b border-[#DBD5C9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
        <Link
          href="/"
          className={`text-lg font-semibold text-[#2B231F] font-[family-name:var(--font-dm-serif)] ${FOCUS}`}
        >
          Galador
        </Link>
        <nav aria-label="Principal" className="hidden md:flex items-center gap-7 text-sm text-[#5A4F48]">
          {enlaces.map((e) => {
            const clase = `inline-flex items-center py-3 hover:text-[#2B231F] transition ${FOCUS}`;
            // Los anclas («#casos») se quedan en la home con un <a> normal;
            // los que salen a otra página van con Link para no recargar todo.
            return e.href.startsWith("/") ? (
              <Link key={e.href} href={e.href} className={clase}>
                {e.texto}
              </Link>
            ) : (
              <a key={e.href} href={e.href} className={clase}>
                {e.texto}
              </a>
            );
          })}
        </nav>
        <Cta className="px-4 sm:px-5 py-2.5 text-sm">
          <span className="sm:hidden">Diagnóstico</span>
          <span className="hidden sm:inline">Pedir diagnóstico</span>
        </Cta>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="border-b border-[#DBD5C9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Badge>CONSULTORÍA DE SISTEMA COMERCIAL</Badge>
          <h1 className="text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.05] text-balance text-[#2B231F] mt-6 mb-6 font-[family-name:var(--font-dm-serif)]">
            Si cada llamada es distinta, tu facturación es{" "}
            <span className="text-[#791E2A]">una lotería</span>.
          </h1>
          <p className="text-lg sm:text-xl text-[#5A4F48] max-w-xl mb-8 leading-relaxed">
            Sin un proceso detrás, unos meses cierras y otros no, y nunca sabes del todo por qué. En
            tres meses escuchamos tus llamadas reales, convertimos lo que ya te funciona en un método
            que se puede repetir y entrenamos a quien vende —tú o tu equipo— hasta que lo ejecuta
            igual de bien.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Cta className="px-7 py-4 text-base">Pedir diagnóstico (30 min, sin coste)</Cta>
            <Cta href="#casos" variant="secundario" className="px-7 py-4 text-base">
              Ver casos reales
            </Cta>
          </div>
          <p className="text-sm text-[#5A4F48] mt-4">
            Lo reviso yo, no un equipo de ventas. Respuesta en 24–48 h.
          </p>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden border border-[#DBD5C9] aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-[#E3E5DC]">
            <Image
              src="/paula.png"
              alt="Paula Gallego"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          {/* La tarjeta de autoridad solo aparece cuando hay una cifra real:
              mientras AUTORIDAD.cifra esté vacía, no se pinta nada. */}
          {AUTORIDAD.cifra && (
            <div className="absolute -bottom-6 left-4 sm:-left-6 bg-[#FFFDF9] border border-[#DBD5C9] rounded-2xl px-6 py-5 shadow-[0_12px_32px_rgba(43,35,32,0.12)] max-w-[15rem]">
              <div className="text-4xl text-[#791E2A] leading-none font-[family-name:var(--font-dm-serif)]">
                {AUTORIDAD.cifra}
              </div>
              <div className="text-sm text-[#5A4F48] mt-2 leading-snug">{AUTORIDAD.texto}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const empresas = [
    { nombre: "Hotlist", logo: "/logo-hotlist.svg" },
    { nombre: "Spanish is Cool", logo: "/logo-spanishiscool.png" },
    { nombre: "ADBI Tech", logo: "/logo-adbi.png" },
    { nombre: "ISYFU", logo: "/logo-isyfu.png" },
    { nombre: "Farma Leaders Talento", logo: "/logo-farmaleaders.svg" },
  ];
  return (
    <section className="py-12 sm:py-14 bg-[#F9F5EF] border-b border-[#DBD5C9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-[#5A4F48] mb-8">
          Clientes con los que hemos trabajado
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 gap-y-6">
          {empresas.map((e) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={e.nombre}
              src={e.logo}
              alt={e.nombre}
              // Altura óptica común y tope de ancho: sin el max-w, los logos
              // apaisados (Farma Leaders) se comen la franja y el resto se pierde.
              className="h-6 sm:h-7 w-auto max-w-[120px] sm:max-w-[140px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Problema() {
  // Seis síntomas, en voz del lector. Quien llega a esta página no busca
  // «un sistema comercial»: busca el síntoma con el que convive, y casi
  // siempre llega con el autodiagnóstico equivocado.
  const sintomas = [
    {
      t: "«Cada llamada es distinta»",
      d: "Improvisas sobre la marcha. Cuando cierras no sabes qué hiciste bien, y cuando no cierras tampoco.",
      icono: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17l4-8 4 5 4-9 6 12" />,
    },
    {
      t: "«Me dicen que se lo piensan y no vuelven»",
      d: "Sales de la llamada sin un sí ni un no. El cliente vuelve a su vida, y en su vida tú no estás.",
      icono: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12c0 3.9-4 7-9 7-1.2 0-2.3-.2-3.3-.5L4 20l1.3-3.5C4.2 15.3 3 13.8 3 12c0-3.9 4-7 9-7s9 3.1 9 7z"
        />
      ),
    },
    {
      t: "«La mitad no aparece»",
      d: "Reuniones agendadas que nadie atiende. Ese problema no empieza en la llamada, empieza antes.",
      icono: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16v13H4zM8 3v4M16 3v4M4 11h16" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14.5l4 3.5M14 14.5l-4 3.5" />
        </>
      ),
    },
    {
      t: "«Si no entro yo, no se cierra»",
      d: "Delegas una llamada y la conversión baja. Tu agenda marca el techo de la facturación.",
      icono: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M5 9l7-6 7 6" />,
    },
    {
      t: "«Sé lo que facturo, no por qué»",
      d: "Tienes el número final, pero no en qué paso concreto se están cayendo las oportunidades.",
      icono: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19V5M4 19h16M8 15v-4M12 15V8M16 15v-6" />
      ),
    },
    {
      t: "«Cierro clientes que no puedo cobrar bien»",
      d: "Entras en llamadas que no tenían que haber pasado el filtro, y el ticket medio se queda donde está.",
      icono: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5h16l-6 7v6l-4 2v-8z" />,
    },
  ];
  return (
    <section id="problema" className="py-16 sm:py-24 border-b border-[#DBD5C9] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge>EL PUNTO DE PARTIDA</Badge>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] mt-5 font-[family-name:var(--font-dm-serif)]">
            Si algo de esto te suena, no es falta de esfuerzo. Es falta de sistema.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sintomas.map((s) => (
            <div key={s.t} className="bg-[#FFFDF9] border border-[#DBD5C9] rounded-2xl p-7">
              <div className="w-10 h-10 rounded-lg bg-[#F2E4E4] flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#791E2A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {s.icono}
                </svg>
              </div>
              <h3 className="text-xl text-[#2B231F] mb-2 font-[family-name:var(--font-dm-serif)] text-balance">{s.t}</h3>
              <p className="text-[#5A4F48] text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Servicios() {
  // El proyecto dura 3 meses (12 semanas) y el peso está en entrenar, no en diagnosticar.
  // TODO Paula: confirmar que los entregables de cada fase coinciden con lo que
  // realmente entregas en un proyecto.
  const pilares = [
    {
      n: "01",
      plazo: "Semanas 1–2",
      t: "Diagnosticar",
      d: "Escuchamos tus llamadas reales y localizamos en qué punto exacto se caen las oportunidades.",
      entregables: ["Auditoría de llamadas reales", "Mapa de fugas del embudo", "Informe de prioridades"],
    },
    {
      n: "02",
      plazo: "Semanas 3–6",
      t: "Construir",
      d: "Escribimos tu proceso de principio a fin: de cómo entra un lead a cómo se firma.",
      entregables: [
        "Proceso y criterios de cualificación",
        "Guiones de llamada, árbol de objeciones y seguimiento",
        "Qué debe registrar tu CRM y el cuadro de métricas para dirigir",
      ],
    },
    {
      n: "03",
      plazo: "Semanas 7–12",
      t: "Entrenar",
      d: "El entrenamiento comercial no es una charla: escuchamos las llamadas que tenéis esa misma semana y te las devolvemos anotadas.",
      entregables: [
        "Revisión de tus llamadas grabadas, anotadas una a una",
        "Sesiones de entrenamiento sobre esas mismas llamadas",
        "Manual de venta del negocio",
      ],
    },
  ];
  return (
    <section id="servicios" className="py-16 sm:py-24 bg-[#F3EEE4] border-b border-[#DBD5C9] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12 mb-12">
          <div className="flex-1">
            <Badge>SERVICIOS</Badge>
            <h2 className="text-3xl sm:text-4xl text-[#2B231F] mt-5 font-[family-name:var(--font-dm-serif)]">
              Tres meses, tres fases y una forma de vender que se puede repetir.
            </h2>
          </div>
          <p className="lg:max-w-sm text-[#5A4F48] leading-relaxed">
            Un proyecto de tres meses con entregables concretos en cada fase. No partimos de teoría:
            partimos de tus llamadas grabadas y de lo que de verdad pasa dentro de ellas.
          </p>
        </div>
        {/* Ancla del enlace «Proceso» del menú */}
        <span id="proceso" className="block scroll-mt-24" />
        <div className="grid md:grid-cols-3 gap-6">
          {pilares.map((p) => (
            <div key={p.n} className="bg-[#FFFDF9] border border-[#DBD5C9] rounded-2xl p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl text-[#791E2A] font-[family-name:var(--font-dm-serif)]">{p.n}</span>
                <span className="text-sm font-semibold text-[#791E2A] bg-[#F2E4E4] px-3 py-1 rounded-md">
                  {p.plazo}
                </span>
              </div>
              <h3 className="text-xl text-[#2B231F] mb-3 font-[family-name:var(--font-dm-serif)]">{p.t}</h3>
              <p className="text-[#5A4F48] text-sm leading-relaxed mb-6">{p.d}</p>
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#5A4F48] mb-3">
                Te llevas
              </div>
              <ul className="flex flex-col gap-2 text-sm text-[#2B231F]">
                {p.entregables.map((e) => (
                  <li key={e} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-[#3F5E53] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l5 5L19 7" />
                    </svg>
                    <span className="leading-relaxed">{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanda() {
  return (
    <section className="py-12 sm:py-14 bg-[#E3E5DC] border-b border-[#DBD5C9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
        <p className="flex-1 text-lg sm:text-xl text-[#2B231F] leading-relaxed font-[family-name:var(--font-dm-serif)]">
          El diagnóstico dura 30 minutos, no tiene coste y sales de él sabiendo en qué punto se te
          están cayendo las oportunidades. Trabajemos juntos o no.
        </p>
        <Cta className="px-7 py-4 text-base flex-shrink-0">Pedir diagnóstico</Cta>
      </div>
    </section>
  );
}

function SiNo() {
  const si = [
    "Escuchamos tus llamadas grabadas y te las devolvemos anotadas, una a una.",
    "Trabajamos el proceso comercial completo, no solo el cierre.",
    "Entrenamos a quien vende, seas tú o tu equipo, hasta que ejecuta el sistema solo.",
    "Partimos de lo que ya te funciona, no de fórmulas de gurú.",
    "Entrenamos para escuchar y recomendar, no para presionar.",
  ];
  const no = [
    "No llamamos a tus leads por ti.",
    "No generamos tráfico ni hacemos marketing.",
    "No montamos ni administramos tu CRM: te decimos qué tiene que registrar.",
    "No trabajamos con quien aún busca sus primeros clientes.",
    "No prometemos multiplicadores ni dejamos un PDF y desaparecemos.",
  ];
  return (
    <section className="py-16 sm:py-24 bg-[#241D1A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-[#F3EEE4] mb-3 font-[family-name:var(--font-dm-serif)]">
          Cómo trabajamos — y con quién no.
        </h2>
        <p className="text-[#C9BEB4] mb-10 leading-relaxed">
          Preferimos que te descartes ahora a que lo descubramos en la semana tres.
        </p>
        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8FBCA8] mb-5">Esto sí</div>
            <ul className="flex flex-col gap-4">
              {si.map((i) => (
                <li key={i} className="flex items-start gap-3 text-[#F3EEE4] leading-relaxed">
                  <svg className="w-5 h-5 text-[#8FBCA8] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l5 5L19 7" />
                  </svg>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#D98C97] mb-5">Esto no</div>
            <ul className="flex flex-col gap-4">
              {no.map((i) => (
                <li key={i} className="flex items-start gap-3 text-[#C9BEB4] leading-relaxed">
                  <svg className="w-5 h-5 text-[#D98C97] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
                  </svg>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Resultados y casos, fusionados: cada cifra encabeza su propio caso ──
function Prueba() {
  const casos = [
    {
      // Pega aquí el ID del vídeo de YouTube (la parte después de v=) y el vídeo aparecerá solo
      youtubeId: "",
      // Cita literal del cliente. Mientras esté vacía no se publica nada.
      cita: "",
      autor: "",
      empresa: "Hotlist",
      cifra: "x3",
      label: "en facturación mensual",
      partida: "5.000 €/mes. El resultado dependía demasiado de cada persona del equipo.",
      sistema: "Ordenamos la estructura de llamada, el diagnóstico, la cualificación y el seguimiento.",
      resultado: "Más de 15.000 €/mes, con todo el equipo cerrando con el mismo proceso.",
    },
    {
      // Pega aquí el ID del vídeo de YouTube (la parte después de v=) y el vídeo aparecerá solo
      youtubeId: "",
      // Cita literal del cliente. Mientras esté vacía no se publica nada.
      cita: "",
      autor: "",
      empresa: "Farma Leaders",
      cifra: "+60 %",
      label: "en tasa de conversión",
      partida: "5 % de conversión. Buenas oportunidades que no acababan de convertir.",
      sistema: "Trabajamos la indagación, la comunicación de valor y el orden de la conversación.",
      resultado: "Del 5 % al 8 % de conversión, con el mismo volumen de leads.",
    },
    {
      // Pega aquí el ID del vídeo de YouTube (la parte después de v=) y el vídeo aparecerá solo
      youtubeId: "",
      // Cita literal del cliente. Mientras esté vacía no se publica nada.
      cita: "",
      autor: "",
      empresa: "ISYFU",
      cifra: "+102 %",
      label: "en facturación",
      partida: "91.000 €. Un proceso comercial sin un sistema claro detrás.",
      sistema: "Construimos proceso, guiones, seguimiento y métricas.",
      resultado: "De 91.000 € a 183.700 € de facturación.",
    },
  ];
  return (
    <section id="casos" className="py-16 sm:py-24 border-b border-[#DBD5C9] scroll-mt-24">
      {/* Se conserva el ancla antigua para no romper enlaces ya publicados */}
      <span id="resultados" className="block scroll-mt-24" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge>RESULTADOS</Badge>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] mt-5 font-[family-name:var(--font-dm-serif)]">
            Lo que cambió en sus números.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {casos.map((c) => (
            <div key={c.empresa} className="bg-[#FFFDF9] border border-[#DBD5C9] rounded-2xl p-8 flex flex-col gap-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-5xl text-[#791E2A] leading-none num-mono font-[family-name:var(--font-dm-serif)]">
                  {c.cifra}
                </span>
                <h3 className="text-base font-semibold text-[#2B231F]">{c.empresa}</h3>
              </div>
              <div className="text-[#5A4F48]">{c.label}</div>
              <div className="border-t border-[#DBD5C9]" />
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#5A4F48] mb-1.5">
                  Punto de partida
                </div>
                <p className="text-sm text-[#2B231F] leading-relaxed">{c.partida}</p>
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#5A4F48] mb-1.5">
                  Qué construimos
                </div>
                <p className="text-sm text-[#2B231F] leading-relaxed">{c.sistema}</p>
              </div>
              <div className="bg-[#E3E5DC] rounded-lg p-4">
                <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#3F5E53] mb-1.5">
                  Resultado
                </div>
                <p className="text-sm text-[#2B231F] leading-relaxed">{c.resultado}</p>
              </div>

              <VideoTestimonio youtubeId={c.youtubeId} empresa={c.empresa} />

              {/* La cita solo se publica cuando existe de verdad (ver el array de casos) */}
              {c.cita && (
                <figure className="mt-auto pt-2 m-0 text-sm text-[#5A4F48] leading-relaxed">
                  <blockquote className="m-0 italic text-[#2B231F]">«{c.cita}»</blockquote>
                  {c.autor && <figcaption className="mt-1 not-italic">{c.autor}</figcaption>}
                </figure>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Cta className="px-7 py-4 text-base">Pedir diagnóstico</Cta>
          <p className="text-sm text-[#5A4F48] max-w-md leading-relaxed text-center sm:text-left">
            Resultados de clientes concretos. Cada negocio es diferente, por lo que no constituyen
            una garantía de resultados futuros.
          </p>
        </div>
      </div>
    </section>
  );
}

function QuienDetras() {
  return (
    <section id="sobre-paula" className="py-16 sm:py-24 bg-[#F3EEE4] border-b border-[#DBD5C9] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative">
          <div className="rounded-2xl overflow-hidden border border-[#DBD5C9] aspect-[4/5] bg-[#E3E5DC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/paula-call.png" alt="Paula Gallego trabajando" className="w-full h-full object-cover" />
          </div>
          {/* Se oculta por debajo de lg: en tablet se recortaba sobre la foto principal */}
          <div className="hidden lg:block absolute -bottom-6 left-6 w-2/5 rounded-2xl overflow-hidden border-4 border-[#F9F5EF] shadow-lg aspect-[3/4] bg-[#E3E5DC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/paula-lab.png" alt="Paula Gallego en el laboratorio" className="w-full h-full object-cover object-top" />
          </div>
        </div>

        <div className="lg:pl-4">
          <Badge>QUIÉN HAY DETRÁS</Badge>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] mt-5 mb-6 font-[family-name:var(--font-dm-serif)] leading-tight">
            Vengo de la investigación científica. De ahí la obsesión por entender por qué algo
            funciona.
          </h2>
          <p className="text-[#5A4F48] leading-relaxed">
            Hoy entro en empresas que ya venden, escucho sus llamadas reales, encuentro en qué punto
            se caen las oportunidades y dejo el sistema montado y al equipo entrenado para que deje
            de pasar. Detrás de Galador estoy yo: cada diagnóstico lo hago en persona.
          </p>
          <p className="text-[#2B231F] font-semibold text-lg my-6 font-[family-name:var(--font-dm-serif)]">
            Analizo. Estructuro. Entreno.
          </p>

          {/* Solo se pinta la franja de cifras si hay al menos una rellena (ver TRAYECTORIA arriba) */}
          {TRAYECTORIA.some((c) => c.valor) && (
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#DBD5C9]">
              {TRAYECTORIA.filter((c) => c.valor).map((c) => (
                <div key={c.texto}>
                  <div className="text-3xl text-[#791E2A] leading-none font-[family-name:var(--font-dm-serif)]">
                    {c.valor}
                  </div>
                  <div className="text-sm text-[#5A4F48] mt-2">{c.texto}</div>
                </div>
              ))}
            </div>
          )}

          <blockquote className="mt-7 text-xl sm:text-2xl text-[#791E2A] leading-snug font-[family-name:var(--font-dm-serif)]">
            Escalar las ventas no debería significar convertir al cliente en un número.
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function FormSection() {
  return (
    <section id="formulario" className="py-16 sm:py-24 bg-[#F9F5EF] border-b border-[#DBD5C9] scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge>CANDIDATURA</Badge>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] mt-5 mb-4 font-[family-name:var(--font-dm-serif)]">
            Veamos si tiene sentido trabajar juntos
          </h2>
          <p className="text-[#5A4F48] text-lg max-w-xl mx-auto leading-relaxed">
            Cuéntame en qué punto está tu negocio y cómo vendéis hoy. Reviso tu caso personalmente y
            te digo en qué paso se te están cayendo las oportunidades, trabajemos juntos o no.
          </p>
        </div>
        <div className="bg-[#FFFDF9] border border-[#DBD5C9] rounded-2xl p-6 sm:p-9">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

function YouTube() {
  // Los vídeos salen de app/videos/videos.ts: esa lista es el único sitio
  // donde hay que tocar para publicar uno nuevo. Aquí se enseñan los 3
  // últimos; el resto están en /videos.
  const ultimos = videosPublicados.slice(0, 3);
  // Sin vídeos publicados no se pinta la sección: nunca un hueco a medias.
  if (ultimos.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 border-b border-[#DBD5C9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <Badge>EN YOUTUBE</Badge>
            <h2 className="text-3xl sm:text-4xl text-[#2B231F] mt-5 font-[family-name:var(--font-dm-serif)]">
              Cómo trabajamos la venta, explicado en abierto.
            </h2>
          </div>
          <Link
            href="/videos"
            className={`text-[#791E2A] font-semibold text-sm hover:underline whitespace-nowrap inline-flex items-center py-3 ${FOCUS}`}
          >
            Ver todos los vídeos →
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {ultimos.map((v) => (
            <Link key={v.slug} href={`/videos/${v.slug}`} className={`group block rounded-xl ${FOCUS}`}>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[#E3E5DC] border border-[#DBD5C9]">
                {/* Miniatura servida por i.ytimg.com: no pasa por el
                    optimizador de Next, así que <img> en vez de <Image>. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={miniatura(v.youtubeId)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition group-hover:opacity-90"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-[#791E2A] flex items-center justify-center text-[#FFFDF9] group-hover:scale-110 transition">
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
                <span className="absolute bottom-2 right-2 rounded bg-[#2B231F]/85 text-[#FFFDF9] text-xs font-medium px-1.5 py-0.5 num-mono">
                  {duracionLegible(v.duracion)}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-[#2B231F] leading-snug group-hover:text-[#791E2A] transition">
                {v.titulo}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-[#5A4F48]">
          Los vídeos nuevos salen antes en{" "}
          <a href={CANAL_YOUTUBE} className={`text-[#791E2A] font-semibold hover:underline ${FOCUS}`}>
            el canal de YouTube
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function StickyCta() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F3EEE4]/95 backdrop-blur border-t border-[#DBD5C9] px-4 py-3">
      <a
        href="#formulario"
        className={`flex items-center justify-center gap-2 w-full bg-[#791E2A] text-[#FFFDF9] font-semibold py-3.5 rounded-lg text-[15px] active:bg-[#611722] transition ${FOCUS}`}
      >
        Pedir diagnóstico
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </div>
  );
}

function MiniFooter() {
  return (
    <footer className="bg-[#F9F5EF] border-t border-[#DBD5C9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="text-lg font-semibold text-[#2B231F] mb-3 font-[family-name:var(--font-dm-serif)]">
              Galador
            </div>
            <p className="text-sm text-[#5A4F48] leading-relaxed">
              Consultoría comercial para negocios de servicios que ya venden. Sistemas que escalan
              sin perder el foco en el cliente.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5A4F48] mb-4">Navegación</div>
            <ul className="flex flex-col gap-2.5 text-sm text-[#5A4F48]">
              <li><a href="#servicios" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Servicios</a></li>
              <li><a href="#casos" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Casos</a></li>
              <li><a href="#faq" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Preguntas</a></li>
              <li><a href="#sobre-paula" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Sobre mí</a></li>
              <li><Link href="/videos" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Vídeos</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5A4F48] mb-4">Especialidades</div>
            <ul className="flex flex-col gap-2.5 text-sm text-[#5A4F48]">
              <li><a href="/consultoria-comercial" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Consultoría comercial</a></li>
              <li><a href="/sistema-de-ventas" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Sistema de ventas</a></li>
              <li><a href="/entrenamiento-comercial" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Entrenamiento comercial</a></li>
              <li><a href="/ventas-por-sector" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Por sector</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5A4F48] mb-4">Legal</div>
            <ul className="flex flex-col gap-2.5 text-sm text-[#5A4F48]">
              <li><a href="/politica-privacidad" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Política de privacidad</a></li>
              <li><a href="/aviso-legal" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Aviso legal</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#DBD5C9] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-[#5A4F48]">© {new Date().getFullYear()} Galador. Todos los derechos reservados.</span>
          <span className="text-sm text-[#5A4F48]">
            Los resultados mostrados corresponden a clientes concretos y no garantizan resultados futuros.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function DiagnosticoLanding() {
  return (
    <div className="bg-[#F9F5EF] text-[#2B231F] pb-20 lg:pb-0">
      <TopBanner />
      <Header />
      <Hero />
      <Logos />
      <Problema />
      <Servicios />
      <CtaBanda />
      <SiNo />
      <Prueba />
      <QuienDetras />
      <Faq />
      <FormSection />
      <YouTube />
      <MiniFooter />
      <StickyCta />
    </div>
  );
}
