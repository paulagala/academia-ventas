import Image from "next/image";
import Link from "next/link";
import CalReserva from "./CalReserva";
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
      <span>Dirección comercial externa para negocios que ya venden y quieren dejar de improvisar</span>{" "}
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
    { href: "#servicios", texto: "Cómo trabajo" },
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
          <Badge>DIRECCIÓN COMERCIAL EXTERNA</Badge>
          <h1 className="text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.05] text-balance text-[#2B231F] mt-6 mb-6 font-[family-name:var(--font-dm-serif)]">
            Tu producto es bueno. Tu forma de venderlo,{" "}
            <span className="text-[#791E2A]">todavía no</span>.
          </h1>
          <p className="text-lg sm:text-xl text-[#5A4F48] max-w-xl mb-8 leading-relaxed">
            Hoy vendes porque lo que ofreces funciona. Pero unos meses cierras y otros no, y nadie
            sabe explicar por qué. Entro en tu negocio como tu dirección comercial: encuentro dónde
            se escapan las ventas, ajusto lo que no tiene sentido —oferta, precio, proceso— y entreno
            a quien vende, tú o tu equipo, con sus llamadas reales. Para que vendáis porque sabéis
            vender.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Cta className="px-7 py-4 text-base">Pedir diagnóstico (45 min, sin coste)</Cta>
            <Cta href="#casos" variant="secundario" className="px-7 py-4 text-base">
              Ver casos reales
            </Cta>
          </div>
          <p className="text-sm text-[#5A4F48] mt-4">
            Reservas directamente en mi agenda. La llamada la hago yo, no un equipo de ventas.
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
    { nombre: "Spanish is Cool", logo: "/logo-spanishiscool-limpio.png" },
    { nombre: "ADBI Tech", logo: "/logo-adbi-limpio.png" },
    { nombre: "ISYFU", logo: "/logo-isyfu-limpio.png" },
    { nombre: "Farma Leaders Talento", logo: "/logo-farmaleaders.svg" },
  ];
  return (
    <section className="py-12 sm:py-14 bg-[#F9F5EF] border-b border-[#DBD5C9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-[#5A4F48] mb-8">
          Algunas de las empresas con las que he trabajado
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
      t: "«Me comparan por precio»",
      d: "El cliente te pone al lado de otros tres y elige el más barato. No sabe ver qué te hace distinto, porque nadie se lo ha enseñado.",
      icono: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M4 7h16" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7l-2 6h4zM20 7l-2 6h4z" />
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
      t: "«Vamos a crecer y no hay proceso»",
      d: "Entra gente nueva al equipo y cada una vende a su manera. Formar a alguien es sentarlo a tu lado y esperar que aprenda.",
      icono: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11a3 3 0 100-6 3 3 0 000 6zM16 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-3 2.5-5 5-5s5 2 5 5M13 20c0-3 1.5-5 3-5 2.5 0 5 2 5 5" />
      ),
    },
  ];
  return (
    <section id="problema" className="py-16 sm:py-24 border-b border-[#DBD5C9] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge>EL PUNTO DE PARTIDA</Badge>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] mt-5 font-[family-name:var(--font-dm-serif)]">
            Si algo de esto te suena, no es falta de esfuerzo. Es falta de dirección comercial.
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
      d: "Miramos tu negocio entero: números, embudo, oferta y llamadas reales. Sales sabiendo en qué punto exacto se te escapan las ventas.",
      entregables: ["Auditoría del embudo y de tus llamadas reales", "Mapa de fugas: dónde y por qué se pierde cada venta", "Prioridades: qué se arregla primero"],
    },
    {
      n: "02",
      plazo: "Semanas 3–6",
      t: "Decidir y construir",
      d: "Ajustamos lo que no tiene sentido y escribimos cómo se vende en tu negocio, de cómo entra un lead a cómo se firma.",
      entregables: [
        "Oferta y precio revisados, y cómo diferenciarte sin bajar precio",
        "Proceso, criterios de cualificación, guion, objeciones y seguimiento",
        "Las pocas métricas que hay que mirar para dirigir con datos",
      ],
    },
    {
      n: "03",
      plazo: "Semanas 7–12",
      t: "Entrenar",
      d: "Entreno a quien vende sobre sus propias llamadas de esa semana. Qué ha hecho bien, qué no y qué frase exacta cambia la venta.",
      entregables: [
        "Revisión de llamadas reales con feedback directo",
        "Sesiones de entrenamiento y role play de objeciones",
        "Manual de venta para formar a cada persona nueva del equipo",
      ],
    },
  ];
  return (
    <section id="servicios" className="py-16 sm:py-24 bg-[#F3EEE4] border-b border-[#DBD5C9] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12 mb-12">
          <div className="flex-1">
            <Badge>CÓMO TRABAJO</Badge>
            <h2 className="text-3xl sm:text-4xl text-[#2B231F] mt-5 font-[family-name:var(--font-dm-serif)]">
              De vender por intuición a vender con dirección.
            </h2>
          </div>
          <p className="lg:max-w-sm text-[#5A4F48] leading-relaxed">
            Tres meses para dejarlo funcionando, con entregables concretos en cada fase. No partimos de
            teoría: partimos de tus números y de lo que de verdad pasa dentro de tus llamadas.
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
          El diagnóstico dura 45 minutos, no tiene coste y sales de él sabiendo dónde se te están
          escapando las ventas. Trabajemos juntos o no.
        </p>
        <Cta className="px-7 py-4 text-base flex-shrink-0">Pedir diagnóstico</Cta>
      </div>
    </section>
  );
}

function SiNo() {
  const si = [
    "Miramos el negocio entero: números, embudo, oferta, precio y llamadas.",
    "Te decimos las cosas a la cara, también las que no apetece oír.",
    "Estamos en el día a día, como una más de tu equipo.",
    "Entrenamos a quien vende, seas tú o tu equipo, sobre sus llamadas reales.",
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
  // Cifras y citas literales de los vídeos de caso de éxito de cada cliente
  // (transcripciones en «Claude - Galador/Casos de éxito - transcripciones»).
  // No cambiar una cifra sin que el cliente la haya dicho o autorizado.
  const casos = [
    {
      // Pega aquí el ID del vídeo de YouTube (la parte después de v=) y el vídeo aparecerá solo
      youtubeId: "",
      cita: "Me ha hecho un por dos, Paula. Te mete caña, te dice las cosas a la cara.",
      autor: "Lucía, CEO de Hotlist",
      empresa: "Hotlist",
      cifra: "x2",
      label: "en ingresos recurrentes",
      partida: "5.000 €/mes y ningún cliente nuevo en enero y febrero. La CEO vendía sola, sin guion.",
      sistema: "Analizamos sus reuniones de venta una a una y construimos un guion que funciona, con feedback directo cada semana.",
      resultado: "Más de 10.000 €/mes recurrentes desde marzo de 2026.",
    },
    {
      // Pega aquí el ID del vídeo de YouTube (la parte después de v=) y el vídeo aparecerá solo
      youtubeId: "",
      cita: "Hemos pasado de vender porque tenemos un buen producto a vender porque realmente sabemos vender.",
      autor: "José, responsable de ventas de Farma Leaders Talento",
      empresa: "Farma Leaders",
      cifra: "+40.000 €",
      label: "netos, con la misma demanda",
      partida: "Buen producto y buenas ventas, pero sin sistema, justo cuando el equipo comercial iba a crecer.",
      sistema: "Guion de ventas, protocolo de seguimiento y revisión de las llamadas de cada comercial, también de quien empezaba desde cero.",
      resultado: "La conversión pasó del 8 % al 10 %: unos 40.000 € netos más.",
    },
    {
      // Pega aquí el ID del vídeo de YouTube (la parte después de v=) y el vídeo aparecerá solo
      youtubeId: "",
      cita: "Nos ha permitido quitarle el techo que teníamos, que era de dirección comercial.",
      autor: "Samuel Acera, CEO de ISYFU",
      empresa: "ISYFU",
      cifra: "x4",
      label: "en facturación anual",
      partida: "60.000 € al año, compitiendo por precio en un sector donde todo el mundo lo hace.",
      sistema: "Dos años de dirección comercial: oferta, precio, cómo diferenciarse y un sistema para formar a cada persona nueva.",
      resultado: "Unos 250.000 € al año, sin techo comercial.",
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
            Hoy entro en empresas que ya venden y hago de su dirección comercial: miro los números,
            encuentro dónde se escapan las ventas, cambio lo que no tiene sentido y entreno a quien
            vende hasta que lo hace sin mí. Detrás de Galador estoy yo: cada diagnóstico lo hago en
            persona.
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge>RESERVA TU DIAGNÓSTICO</Badge>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] mt-5 mb-4 font-[family-name:var(--font-dm-serif)]">
            Veamos si tiene sentido trabajar juntos
          </h2>
          <p className="text-[#5A4F48] text-lg max-w-xl mx-auto leading-relaxed">
            Elige el día y la hora que te vengan bien y responde cinco preguntas rápidas. Las leo antes
            de la llamada, así los 45 minutos los dedicamos a tu caso y no a ponernos en contexto.
          </p>
        </div>
        <div className="bg-[#FFFDF9] border border-[#DBD5C9] rounded-2xl p-2 sm:p-4">
          <CalReserva />
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
              Dirección comercial externa para negocios que ya venden. Para que vendáis porque sabéis
              vender.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5A4F48] mb-4">Navegación</div>
            <ul className="flex flex-col gap-2.5 text-sm text-[#5A4F48]">
              <li><a href="#servicios" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Cómo trabajo</a></li>
              <li><a href="#casos" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Casos</a></li>
              <li><a href="#faq" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Preguntas</a></li>
              <li><a href="#sobre-paula" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Sobre mí</a></li>
              <li><Link href="/videos" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Vídeos</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5A4F48] mb-4">Especialidades</div>
            <ul className="flex flex-col gap-2.5 text-sm text-[#5A4F48]">
              <li><a href="/direccion-comercial-externa" className={`inline-flex items-center py-1.5 hover:text-[#2B231F] transition ${FOCUS}`}>Dirección comercial externa</a></li>
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
