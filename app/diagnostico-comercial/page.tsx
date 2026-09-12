import type { Metadata } from "next";
import LeadForm from "./LeadForm";

export const metadata: Metadata = {
  title: "Sistema comercial escalable para negocios de servicios online",
  description:
    "Ayudamos a negocios de servicios online que ya venden a construir un sistema comercial capaz de escalar sin perder calidad en la venta.",
};

// ── CTA reutilizable ──
function Cta({
  children = "Solicitar diagnóstico",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#formulario"
      className={`inline-flex items-center justify-center gap-2 bg-[#791E2A] text-[#FAFAFA] font-semibold rounded-lg hover:bg-[#611722] transition ${className}`}
    >
      {children}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </a>
  );
}

// ── 1. Barra superior (filtro) ──
function TopBanner() {
  return (
    <div className="bg-[#61948F] text-[#FAFAFA] text-center text-xs sm:text-sm px-4 py-2.5">
      <span className="opacity-90">
        Trabajamos con negocios de servicios online que ya venden y quieren escalar su sistema comercial.
      </span>{" "}
      <a href="#formulario" className="font-semibold underline underline-offset-2 hover:opacity-80 whitespace-nowrap">
        Solicita tu diagnóstico →
      </a>
    </div>
  );
}

// ── 2. Navbar ──
function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[#F3EEE4]/90 backdrop-blur border-b border-[#DBD5C9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <span className="text-lg font-semibold text-[#2B231F] font-[family-name:var(--font-dm-serif)]">
          Paula Gallego
        </span>
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#7A6F66]">
          <a href="#servicios" className="hover:text-[#2B231F] transition">Servicios</a>
          <a href="#resultados" className="hover:text-[#2B231F] transition">Resultados</a>
          <a href="#sobre-paula" className="hover:text-[#2B231F] transition">Sobre mí</a>
        </nav>
        <Cta className="px-4 sm:px-5 py-2.5 text-sm">
          <span className="sm:hidden">Diagnóstico</span>
          <span className="hidden sm:inline">Solicitar diagnóstico</span>
        </Cta>
      </div>
    </header>
  );
}

// ── 3. Hero ──
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#DBD5C9]">
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#61948F]/20 to-transparent pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <div className="inline-flex items-center gap-2 bg-[#E3E5DC] text-[#4a5a54] text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#61948F]" />
          Sistema comercial escalable
        </div>
        <h1 className="text-[2.1rem] leading-[1.1] sm:text-5xl lg:text-6xl sm:leading-[1.05] text-[#2B231F] mb-8 font-[family-name:var(--font-dm-serif)]">
          El siguiente salto de facturación empieza en tu{" "}
          <span className="text-[#791E2A]">sistema de ventas.</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#7A6F66] max-w-2xl mx-auto mb-10 leading-relaxed">
          Si tu negocio de servicios online ya vende, pero el sistema comercial todavía no está
          preparado para escalar, construimos una estructura capaz de vender más, incorporar
          equipo y mantener la calidad en cada conversación.
        </p>
        <Cta className="w-full sm:w-auto px-8 py-4 text-lg">Solicitar diagnóstico comercial</Cta>
      </div>
    </section>
  );
}

// ── 4. Logos ──
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.16em] text-[#7A6F66] mb-8">
          Empresas que confían
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {empresas.map((e) => (
            <div
              key={e.nombre}
              className="h-14 sm:h-16 w-28 sm:w-36 px-3 bg-[#FAFAFA] border border-[#DBD5C9] rounded-xl flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.logo} alt={e.nombre} className="max-h-7 sm:max-h-8 max-w-full w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 5. Resultados ──
function Resultados() {
  const stats = [
    { big: "x3", label: "en facturación mensual", caso: "Hotlist", detalle: "de 5.000 € a +15.000 €/mes" },
    { big: "+60%", label: "en tasa de conversión", caso: "Farma Leaders", detalle: "del 5 % al 8 %, con el mismo volumen de leads" },
    { big: "+102%", label: "en facturación", caso: "ISYFU", detalle: "de 91.000 € a 183.700 €" },
  ];
  return (
    <section id="resultados" className="py-16 sm:py-24 bg-[#F3EEE4] border-b border-[#DBD5C9] scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#E3E5DC] text-[#4a5a54] text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#61948F]" />
            Resultados
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] font-[family-name:var(--font-dm-serif)]">
            Crecimiento real sobre el sistema comercial.
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.caso} className="bg-[#FAFAFA] border border-[#DBD5C9] rounded-2xl p-8 text-center">
              <div className="text-6xl sm:text-7xl text-[#791E2A] font-[family-name:var(--font-dm-serif)] leading-none">
                {s.big}
              </div>
              <div className="text-[#2B231F] font-medium mt-4">{s.label}</div>
              <div className="text-sm text-[#7A6F66] mt-4 pt-4 border-t border-[#DBD5C9]">
                <span className="font-semibold text-[#2B231F]">{s.caso}</span>
                <br />
                {s.detalle}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#7A6F66] text-center max-w-2xl mx-auto mt-8 leading-relaxed">
          Resultados reales de clientes con los que hemos trabajado. Cada negocio es diferente, por
          lo que no constituyen una garantía de resultados futuros.
        </p>
      </div>
    </section>
  );
}

// ── 6. Servicios (3 pilares) ──
function Servicios() {
  const pilares = [
    {
      n: "01",
      t: "Diagnosticar",
      d: "Detectamos qué está frenando tus ventas, dónde se pierden oportunidades y qué debe cambiar para dar el siguiente salto.",
    },
    {
      n: "02",
      t: "Construir",
      d: "Diseñamos tu sistema comercial de principio a fin: proceso, CRM, guiones, seguimiento y métricas. El objetivo es convertir la venta en un sistema que pueda medirse, replicarse y crecer con el negocio.",
    },
    {
      n: "03",
      t: "Entrenar",
      d: "Un sistema solo escala si el equipo sabe ejecutarlo. Formamos a tus comerciales para que vendan con criterio, método y consistencia, manteniendo la calidad de la venta a medida que el equipo crece.",
    },
  ];
  return (
    <section id="servicios" className="py-16 sm:py-24 border-b border-[#DBD5C9] scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 bg-[#E3E5DC] text-[#4a5a54] text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#61948F]" />
            Servicios
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] font-[family-name:var(--font-dm-serif)]">
            Diagnosticar, construir y entrenar tu sistema comercial.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pilares.map((p) => (
            <div key={p.n} className="bg-[#FAFAFA] border border-[#DBD5C9] rounded-2xl p-8">
              <div className="text-2xl text-[#791E2A] font-[family-name:var(--font-dm-serif)] mb-4">{p.n}</div>
              <h3 className="text-xl text-[#2B231F] mb-3 font-[family-name:var(--font-dm-serif)]">{p.t}</h3>
              <p className="text-[#7A6F66] text-sm leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 7. Lo que no hacemos ──
function NoHacemos() {
  const items = [
    "No llamamos a los leads por ti.",
    "No generamos nuevos leads ni hacemos acciones de marketing.",
    "No trabajamos solo el cierre: trabajamos todo el proceso comercial.",
    "No dejamos un documento bonito y desaparecemos: el sistema tiene que poder ejecutarse.",
    "No somos gurús de ventas ni creemos en fórmulas mágicas. Trabajamos con método, criterio y realidad comercial.",
  ];
  return (
    <section className="py-16 sm:py-20 bg-[#F3EEE4] border-b border-[#DBD5C9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl text-[#2B231F] mb-8 font-[family-name:var(--font-dm-serif)]">
          Lo que no hacemos por ti
        </h2>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          {items.map((i) => (
            <li key={i} className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#791E2A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-[#2B231F] text-sm sm:text-base leading-relaxed">{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── 8. Quién hay detrás ──
function QuienDetras() {
  return (
    <section id="sobre-paula" className="py-16 sm:py-24 border-b border-[#DBD5C9] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Fotos: principal (vendiendo) grande + laboratorio pequeña */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden border border-[#DBD5C9] aspect-[4/5] bg-[#E3E5DC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/paula-call.png" alt="Paula Gallego trabajando" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-3 sm:left-6 w-2/5 rounded-2xl overflow-hidden border-4 border-[#F9F5EF] shadow-lg aspect-[3/4] bg-[#E3E5DC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/paula-lab.png" alt="Paula Gallego en el laboratorio" className="w-full h-full object-cover object-top" />
          </div>
        </div>

        <div className="lg:pl-4 pt-6 lg:pt-0">
          <div className="inline-flex items-center gap-2 bg-[#E3E5DC] text-[#4a5a54] text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#61948F]" />
            Quién hay detrás
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] mb-6 font-[family-name:var(--font-dm-serif)] leading-tight">
            Soy Paula Gallego y, curiosamente, no empecé en ventas.
          </h2>
          <div className="space-y-4 text-[#7A6F66] leading-relaxed">
            <p>
              Vengo del mundo de la investigación científica y supongo que de ahí viene buena parte
              de mi obsesión por entender por qué algo funciona, dónde falla y cómo conseguir que
              pueda repetirse.
            </p>
            <p>
              Cuando llegué a ventas descubrí un sector lleno de guiones, técnicas y fórmulas, pero
              demasiadas veces sin un sistema detrás. Y ahí encontré mi sitio.
            </p>
            <p>
              Hoy entro en empresas que ya venden para analizar qué está pasando realmente en su
              proceso comercial, construir una estructura que acompañe su crecimiento y preparar al
              equipo para ejecutarla.
            </p>
          </div>
          <p className="text-[#2B231F] font-semibold text-lg my-6 font-[family-name:var(--font-dm-serif)]">
            Analizo. Estructuro. Entreno.
          </p>
          <div className="border-l-2 border-[#61948F] pl-5 space-y-3 text-[#7A6F66] leading-relaxed">
            <p>
              Pero hay algo que no negocio: crecer no puede significar vender a cualquier precio.
              Quiero sistemas que vendan más, sí. Pero también equipos que sepan escuchar,
              diagnosticar y recomendar bien.
            </p>
            <p className="text-[#2B231F] font-medium">
              Porque para mí, escalar las ventas no debería significar convertir al cliente en un número.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 9. Vídeos / casos de éxito ──
function Casos() {
  const casos = [
    {
      src: "/testimonio-1.mp4",
      empresa: "Hotlist",
      resultado: "x3 en facturación mensual",
      problema: "El resultado dependía demasiado de cada persona del equipo.",
      sistema: "Ordenamos la estructura de llamada, el diagnóstico, la cualificación y el seguimiento.",
      cambio: "Pasaron de 5.000 € a más de 15.000 €/mes, con un equipo que vende con criterio.",
    },
    {
      src: "/testimonio-2.mp4",
      empresa: "Farma Leaders",
      resultado: "+60% en tasa de conversión",
      problema: "Buenas oportunidades que no acababan de convertir.",
      sistema: "Trabajamos la indagación, la comunicación de valor y el orden de la conversación.",
      cambio: "Del 5 % al 8 % de conversión, con el mismo volumen de leads.",
    },
    {
      src: "/testimonio-3.mp4",
      empresa: "ISYFU",
      resultado: "+102% en facturación",
      problema: "Un proceso comercial sin un sistema claro detrás.",
      sistema: "Construimos proceso, guiones, seguimiento y métricas.",
      cambio: "De 91.000 € a 183.700 € en facturación.",
    },
  ];
  return (
    <section id="casos" className="py-16 sm:py-24 bg-[#F3EEE4] border-b border-[#DBD5C9] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 bg-[#E3E5DC] text-[#4a5a54] text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#61948F]" />
            Casos de éxito
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] font-[family-name:var(--font-dm-serif)]">
            Negocios que ordenaron su forma de vender.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {casos.map((c) => (
            <div key={c.empresa} className="bg-[#FAFAFA] border border-[#DBD5C9] rounded-2xl overflow-hidden flex flex-col">
              <div className="bg-[#2B231F] aspect-[9/16]">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={c.src} controls playsInline preload="metadata" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <div className="font-semibold text-[#2B231F]">{c.empresa}</div>
                  <div className="text-[#791E2A] font-bold text-lg font-[family-name:var(--font-dm-serif)]">{c.resultado}</div>
                </div>
                <div className="space-y-2.5 text-sm">
                  <p className="text-[#7A6F66]"><span className="font-semibold text-[#2B231F]">Problema.</span> {c.problema}</p>
                  <p className="text-[#7A6F66]"><span className="font-semibold text-[#2B231F]">Sistema.</span> {c.sistema}</p>
                  <p className="text-[#7A6F66]"><span className="font-semibold text-[#2B231F]">Resultado.</span> {c.cambio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 10. Canal de YouTube ──
function YouTube() {
  // Sustituye url por el enlace real de cada vídeo cuando lo tengas.
  const canal = "#";
  const videos = [
    { titulo: "Cómo construir un sistema comercial que escale", url: "#" },
    { titulo: "Indagación: preguntar bien para vender mejor", url: "#" },
    { titulo: "Objeciones sin presión: el enfoque consultivo", url: "#" },
  ];
  return (
    <section className="py-16 sm:py-24 border-b border-[#DBD5C9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#E3E5DC] text-[#4a5a54] text-xs font-medium px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#61948F]" />
              En YouTube
            </div>
            <h2 className="text-3xl sm:text-4xl text-[#2B231F] font-[family-name:var(--font-dm-serif)]">
              Contenido sobre sistemas comerciales.
            </h2>
          </div>
          <a
            href={canal}
            className="text-[#791E2A] font-semibold text-sm hover:underline whitespace-nowrap"
          >
            Ver el canal →
          </a>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {videos.map((v) => (
            <a key={v.titulo} href={v.url} className="group block">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[#E3E5DC] border border-[#DBD5C9] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#791E2A] flex items-center justify-center text-[#FAFAFA] group-hover:scale-110 transition">
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-[#2B231F] leading-snug group-hover:text-[#791E2A] transition">
                {v.titulo}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 11. Formulario / candidatura ──
function FormSection() {
  return (
    <section id="formulario" className="py-16 sm:py-24 bg-[#F3EEE4] scroll-mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#E3E5DC] text-[#4a5a54] text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#61948F]" />
            Candidatura
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#2B231F] mb-4 font-[family-name:var(--font-dm-serif)]">
            Veamos si tiene sentido trabajar juntos
          </h2>
          <p className="text-[#7A6F66] text-lg max-w-xl mx-auto leading-relaxed">
            Cuéntame en qué punto está tu negocio y tu sistema comercial. Revisaremos tu situación
            para entender dónde está el cuello de botella y si podemos ayudarte a construir el
            siguiente salto.
          </p>
        </div>
        <div className="bg-[#FAFAFA] border border-[#DBD5C9] rounded-2xl p-6 sm:p-9">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

// ── Barra CTA fija (móvil) ──
function StickyCta() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F3EEE4]/95 backdrop-blur border-t border-[#DBD5C9] px-4 py-3">
      <a
        href="#formulario"
        className="flex items-center justify-center gap-2 w-full bg-[#791E2A] text-[#FAFAFA] font-semibold py-3.5 rounded-lg text-[15px] active:bg-[#611722] transition"
      >
        Solicitar diagnóstico
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </div>
  );
}

// ── 12. Footer ──
function MiniFooter() {
  return (
    <footer className="bg-[#F9F5EF] border-t border-[#DBD5C9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="text-lg font-semibold text-[#2B231F] mb-3 font-[family-name:var(--font-dm-serif)]">
              Paula Gallego
            </div>
            <p className="text-sm text-[#7A6F66] leading-relaxed">
              Sistemas comerciales que escalan sin perder el foco en el cliente.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A6F66] mb-4">Navegación</div>
            <ul className="flex flex-col gap-2.5 text-sm text-[#7A6F66]">
              <li><a href="#servicios" className="hover:text-[#2B231F] transition">Servicios</a></li>
              <li><a href="#resultados" className="hover:text-[#2B231F] transition">Resultados</a></li>
              <li><a href="#sobre-paula" className="hover:text-[#2B231F] transition">Sobre mí</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A6F66] mb-4">Legal</div>
            <ul className="flex flex-col gap-2.5 text-sm text-[#7A6F66]">
              <li><a href="/politica-privacidad" className="hover:text-[#2B231F] transition">Política de privacidad</a></li>
              <li><a href="/aviso-legal" className="hover:text-[#2B231F] transition">Aviso legal</a></li>
              <li><a href="#" className="hover:text-[#2B231F] transition">Política de cookies</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A6F66] mb-4">Contacto</div>
            <ul className="flex flex-col gap-2.5 text-sm text-[#7A6F66]">
              <li><a href="#formulario" className="hover:text-[#2B231F] transition">Solicitar diagnóstico</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#DBD5C9] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#7A6F66]">© {new Date().getFullYear()} Paula Gallego. Todos los derechos reservados.</span>
          <span className="text-xs text-[#7A6F66]">
            Los resultados mostrados corresponden a clientes concretos y no garantizan resultados futuros.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function DiagnosticoComercialPage() {
  return (
    <div className="bg-[#F9F5EF] text-[#2B231F] pb-20 lg:pb-0">
      <TopBanner />
      <Header />
      <Hero />
      <Logos />
      <Resultados />
      <Servicios />
      <NoHacemos />
      <QuienDetras />
      <Casos />
      <YouTube />
      <FormSection />
      <MiniFooter />
      <StickyCta />
    </div>
  );
}
