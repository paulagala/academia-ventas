"use client";

import { useState } from "react";

// ── Configuración de la masterclass ──
// Edita fecha y hora cuando las tengas. Si quedan vacías, se muestra "Próxima fecha".
const MASTERCLASS = {
  fecha: "", // ej: "Jueves 3 de julio"
  hora: "", // ej: "18:00h (CET)"
  duracion: "60 minutos + preguntas",
  formato: "Online en directo",
};

const CTA_PRIMARY = "Reservar plaza gratuita";

// ── Botón CTA reutilizable (ancla al formulario final) ──
function CtaButton({
  children = CTA_PRIMARY,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#reservar"
      className={`inline-flex items-center justify-center gap-2 bg-accent text-surface font-bold rounded-[var(--radius-button)] hover:bg-accent-hover transition shadow-[var(--shadow-soft)] ${className}`}
    >
      {children}
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </a>
  );
}

// ── Formulario de reserva ──
function LeadForm({ id }: { id?: string }) {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-dm-serif)] text-text">
          ¡Plaza reservada!
        </h3>
        <p className="text-sm text-text-muted">
          Te enviaremos el acceso a la masterclass por email. Revisa tu bandeja de entrada.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-border rounded-[var(--radius-button)] px-4 py-3 text-sm bg-background text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary";

  return (
    <div id={id} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Tu nombre"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        className={inputClass}
      />
      <input
        type="email"
        placeholder="Tu mejor email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className={inputClass}
      />
      <input
        type="tel"
        placeholder="Teléfono (opcional)"
        value={form.telefono}
        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        className={inputClass}
      />
      <button
        onClick={() => setSubmitted(true)}
        className="w-full bg-accent text-surface py-4 rounded-[var(--radius-button)] font-bold text-base hover:bg-accent-hover transition shadow-[var(--shadow-soft)]"
      >
        {CTA_PRIMARY}
      </button>
      <p className="text-xs text-center text-muted">
        Te enviaremos el acceso a la masterclass por email.
      </p>
    </div>
  );
}

// ── Barra superior fija (desktop): sin menú, solo marca + CTA ──
function TopCtaBar() {
  return (
    <div className="hidden lg:block sticky top-0 z-40 bg-background/95 backdrop-blur border-t-2 border-t-secondary border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="font-bold text-primary font-[family-name:var(--font-dm-serif)]">
            AcademiaVentas
          </span>
          <span className="inline-flex items-center gap-1.5 label-mono text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            est. consultiva
          </span>
        </span>
        <nav className="flex items-center gap-7 text-sm text-text-muted">
          <a href="#errores" className="hover:text-primary transition">Masterclass gratuita</a>
          <a href="#para-quien" className="hover:text-primary transition">Para quién es</a>
          <a href="#autoridad" className="hover:text-primary transition">Sobre mí</a>
          <a href="#descubrir" className="hover:text-primary transition">Recursos</a>
        </nav>
        <CtaButton className="px-5 py-2.5 text-sm">Reservar plaza gratuita</CtaButton>
      </div>
    </div>
  );
}

// ── Hero ──
function Hero() {
  const fechaTexto = MASTERCLASS.fecha
    ? `${MASTERCLASS.fecha}${MASTERCLASS.hora ? ` · ${MASTERCLASS.hora}` : ""}`
    : "Próxima fecha · Reserva y te avisamos";

  const features = [
    {
      t: "Método claro",
      d: "Un enfoque consultivo paso a paso.",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    },
    {
      t: "Resultados reales",
      d: "Más conversaciones que avanzan y cierran.",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    },
    {
      t: "Aplicable mañana",
      d: "Herramientas prácticas para tu día a día.",
      icon: "M5 13l4 4L19 7",
    },
  ];

  return (
    <section className="bg-surface border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-14 sm:pb-20 grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Columna texto */}
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide mb-5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Masterclass gratuita en directo
          </span>

          <h1 className="text-4xl sm:text-5xl text-primary leading-[1.08] mb-5">
            No pierdes ventas por precio. Las pierdes por{" "}
            <span className="text-accent italic">diagnosticar mal.</span>
          </h1>

          <p className="text-lg text-text-muted mb-5 leading-relaxed">
            La mayoría de las ventas se pierde antes de hablar de precio: no se hizo el
            diagnóstico correcto, no se comunicó valor o no se ayudó a decidir.
          </p>

          <p className="text-base text-text font-semibold mb-7 leading-relaxed">
            No se trata de presionar. Se trata de diagnosticar mejor, comunicar valor y ayudar a decidir.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {features.map((f) => (
              <div key={f.t}>
                <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                  </svg>
                </div>
                <div className="text-sm font-bold text-text leading-tight">{f.t}</div>
                <div className="text-xs text-text-muted leading-relaxed mt-1">{f.d}</div>
              </div>
            ))}
          </div>

          <CtaButton className="px-7 py-4 text-lg w-full sm:w-auto">Reservar mi plaza gratuita</CtaButton>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted mt-6">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {fechaTexto}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {MASTERCLASS.duracion}
            </span>
          </div>
        </div>

        {/* Columna formulario */}
        <div className="lg:col-span-4 bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-6 sm:p-7 border border-border">
          <div className="text-center mb-5">
            <div className="inline-block bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-3">
              RESERVA GRATUITA
            </div>
            <h2 className="text-xl font-bold text-text font-[family-name:var(--font-dm-serif)]">
              Reserva tu plaza ahora
            </h2>
            <p className="text-sm text-muted mt-1">Plazas limitadas · Acceso por email</p>
          </div>
          <LeadForm />
        </div>

        {/* Columna retrato */}
        <div className="lg:col-span-3">
          <div className="relative rounded-[var(--radius-card)] overflow-hidden border border-line aspect-[3/4] max-w-[280px] mx-auto lg:max-w-none bg-surface-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/paula.png"
              alt="Paula Gallego"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-secondary/90 px-3 py-2">
              <div className="label-mono text-surface/70 text-[0.6rem]">Imparte</div>
              <div className="text-sm font-semibold text-surface">Paula Gallego</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Idea central ──
function IdeaCentral() {
  return (
    <section className="py-14 sm:py-16 bg-secondary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-8">
        <div className="hidden md:flex w-16 h-16 rounded-full border border-surface/40 items-center justify-center text-surface/80 flex-shrink-0">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-2xl sm:text-3xl text-surface leading-snug text-center font-[family-name:var(--font-dm-serif)]">
          La venta consultiva no va de hablar más.
          <br />
          <span className="text-surface/85">Va de entender mejor para ayudar a decidir mejor.</span>
        </p>
        <div className="hidden md:flex w-16 h-16 rounded-full border border-surface/40 items-center justify-center text-surface/80 flex-shrink-0">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ── Cierre de bloque con CTA ──
function CtaBreak({ text }: { text: string }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10">
      <p className="text-lg text-text mb-5 font-medium">{text}</p>
      <CtaButton className="px-7 py-4 text-lg" />
    </div>
  );
}

// ── Problema (errores) ──
function Problema() {
  const items = [
    { t: "Llamadas que parecen ir bien… pero no convierten.", d: "Conversaciones amables que no avanzan." },
    { t: "Clientes interesados que luego desaparecen.", d: "Se enfrían porque no se sintieron guiados." },
    { t: "Objeciones que aparecen justo al final.", d: "Falta de diagnóstico previo y gestión." },
    { t: "Presentas tu solución demasiado pronto.", d: "El cliente no ha validado su necesidad." },
    { t: "Hablas mucho de lo que ofreces.", d: "Y poco de lo que el cliente necesita." },
    { t: "Falta un diagnóstico real.", d: "Asientes, preguntas… pero no profundizas." },
  ];
  return (
    <section id="errores" className="py-16 sm:py-20 bg-background scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="label-mono text-accent mb-3">Errores que te hacen perder ventas</div>
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">
            No es falta de interés. Es falta de método.
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Estos son los errores más comunes que hacen que una llamada aparentemente buena acabe en silencio.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <div key={item.t} className="text-center px-3 py-6 bg-surface rounded-[var(--radius-card)] border border-border">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-text leading-snug mb-2 font-[family-name:var(--font-dm-serif)]">{item.t}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Lo que vas a descubrir ──
function LoQueVerás() {
  const items = [
    "Por qué una llamada aparentemente buena puede acabar sin venta.",
    "Qué diferencia hay entre preguntar e indagar de verdad.",
    "Cómo detectar el verdadero motivo por el que el cliente no compra.",
    "Por qué responder rápido a una objeción puede empeorar la venta.",
    "Cómo evitar presentar tu solución demasiado pronto.",
    "Cómo estructurar una conversación comercial más consultiva y efectiva.",
  ];
  return (
    <section id="descubrir" className="py-16 sm:py-20 bg-surface scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Lo que vas a descubrir
          </span>
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">
            Dónde se rompe tu llamada (y cómo evitarlo)
          </h2>
        </div>
        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3 p-4 bg-background rounded-[var(--radius-button)] border border-border">
              <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-text leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Los 5 errores ──
function CincoErrores() {
  const errores = [
    {
      n: "01",
      t: "No encuadrar bien la conversación",
      d: "Entras directo a “contarte lo que hago” sin acordar para qué estáis hablando. Sin encuadre, el cliente no sabe qué esperar y tú pierdes el control de la llamada.",
    },
    {
      n: "02",
      t: "Preguntar sin profundizar",
      d: "Haces la pregunta, te quedas con la primera respuesta y sigues. Sin una segunda capa, nunca llegas al problema real ni a lo que de verdad le importa.",
    },
    {
      n: "03",
      t: "Presentar la solución demasiado pronto",
      d: "En cuanto detectas una necesidad, sueltas tu propuesta. Si presentas antes de que el cliente vea claro su problema, tu solución suena a folleto, no a respuesta.",
    },
    {
      n: "04",
      t: "Tratar las objeciones como rechazos",
      d: "“Es caro” o “me lo pienso” te ponen a la defensiva y respondes para convencer. Una objeción no es un no: es información que aún no has terminado de entender.",
    },
    {
      n: "05",
      t: "Cerrar sin haber construido valor ni urgencia",
      d: "Llegas al cierre y el cliente no ve por qué actuar ahora. Si no has construido valor y un motivo para decidir, el “me lo pienso” es la respuesta lógica.",
    },
  ];
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">Los 5 errores que te cuestan ventas</h2>
          <p className="text-text-muted text-lg">
            Los verás explicados en la masterclass, con ejemplos concretos de llamadas reales.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {errores.map((e) => (
            <div key={e.n} className="flex items-start gap-5 p-6 bg-surface rounded-[var(--radius-card)] border border-border">
              <div className="text-3xl font-bold text-accent/30 leading-none font-[family-name:var(--font-dm-serif)]">{e.n}</div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-1.5 font-[family-name:var(--font-dm-serif)]">{e.t}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{e.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CtaBreak text="Reserva tu plaza gratuita y descubre dónde se están rompiendo tus llamadas comerciales." />
    </section>
  );
}

// ── Para quién es / Para quién no es ──
function ParaQuien() {
  const si = [
    "Vendes servicios o productos de alto valor.",
    "Haces llamadas comerciales y quieres mejorar tu conversión.",
    "Tienes leads interesados que luego no convierten como deberían.",
    "Sientes que improvisas demasiado en cada conversación.",
    "Te cuesta manejar objeciones sin sonar insistente.",
    "Quieres vender con más estructura, más criterio y menos presión.",
    "Tienes equipo comercial o quieres construir uno.",
  ];
  const no = [
    "Buscas trucos mágicos de cierre.",
    "Quieres aprender a manipular al cliente.",
    "No estás dispuesto a revisar cómo vendes ahora.",
    "Solo quieres frases hechas para copiar y pegar.",
    "No quieres trabajar tu proceso comercial con profundidad.",
  ];
  return (
    <section id="para-quien" className="py-16 sm:py-20 bg-surface scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
        <div className="bg-background rounded-[var(--radius-card)] p-7 border border-secondary/20">
          <h3 className="font-bold text-secondary mb-5 flex items-center gap-2 font-[family-name:var(--font-dm-serif)] text-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Esta masterclass es para ti si…
          </h3>
          <ul className="flex flex-col gap-3">
            {si.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                <svg className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-background rounded-[var(--radius-card)] p-7 border border-accent/20">
          <h3 className="font-bold text-accent mb-5 flex items-center gap-2 font-[family-name:var(--font-dm-serif)] text-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            No es para ti si…
          </h3>
          <ul className="flex flex-col gap-3">
            {no.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── Autoridad / confianza ──
function Autoridad() {
  return (
    <section id="autoridad" className="py-16 sm:py-20 bg-background scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-[var(--radius-card)] border border-border overflow-hidden grid md:grid-cols-[280px_1fr]">
          <div className="relative bg-surface-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/paula.png"
              alt="Paula Gallego"
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-text/70 backdrop-blur px-4 py-2">
              <div className="label-mono text-surface/70">Imparte</div>
              <div className="text-sm font-semibold text-surface">Paula Gallego</div>
            </div>
          </div>
          <div className="p-8 sm:p-10">
            <div className="label-mono text-secondary mb-4">Quién está detrás</div>
            <h2 className="text-3xl sm:text-4xl text-primary mb-5">Hola, soy Paula Gallego</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Durante más de 10 años he ayudado a profesionales y equipos comerciales a vender
              con más claridad, menos presión y mejores resultados.
            </p>
            <p className="text-text leading-relaxed font-medium mb-6">
              AcademiaVentas nació para compartir un método consultivo, práctico y humano que
              transforma la forma en que gestionas tus llamadas comerciales.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm border-t border-line pt-6">
              <div><span className="font-bold text-text num-mono">+500</span> <span className="text-muted">profesionales formados</span></div>
              <div><span className="font-bold text-text num-mono">+10</span> <span className="text-muted">años en consultiva</span></div>
              <div><span className="font-bold text-text num-mono">98%</span> <span className="text-muted">lo recomienda</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA intermedia fuerte ──
function CtaIntermedia() {
  return (
    <section className="py-14 sm:py-16 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl text-primary mb-6 leading-snug">
          Reserva tu plaza gratuita y descubre dónde se están rompiendo tus llamadas comerciales.
        </h2>
        <CtaButton className="px-8 py-4 text-lg" />
      </div>
    </section>
  );
}

// ── FAQ / objeciones ──
function Objeciones() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "No tengo mucha experiencia vendiendo", a: "Mejor: aprenderás un método ordenado desde el principio, sin arrastrar malos hábitos. No necesitas experiencia previa para seguir la masterclass." },
    { q: "Ya tengo llamadas comerciales, pero quiero mejorar", a: "Entonces es para ti. La masterclass se centra en afinar lo que ya haces: detectar qué se te escapa, indagar mejor y cerrar más sin forzar." },
    { q: "No quiero vender de forma agresiva", a: "Es justo el enfoque. Todo gira en torno a la venta consultiva: diagnosticar, construir valor y guiar la decisión. Nada de presión." },
    { q: "No sé si esto aplica a mi negocio", a: "Si vendes servicios de alto valor mediante conversaciones (formación, mentoría, consultoría, agencia, academia o servicios profesionales), aplica." },
    { q: "¿La masterclass es gratuita?", a: "Sí, totalmente gratuita. Reservas tu plaza con tu nombre y email, y te enviamos el acceso. Sin coste ni compromiso." },
  ];
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">Por si te lo estás preguntando</h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-surface rounded-[var(--radius-button)] border border-border overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-text text-sm pr-4">{f.q}</span>
                <svg
                  className={`w-5 h-5 text-muted transition-transform flex-shrink-0 ${open === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-text-muted leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Cierre final + formulario ──
function ReservaFinal() {
  const fechaTexto = MASTERCLASS.fecha
    ? `${MASTERCLASS.fecha}${MASTERCLASS.hora ? ` · ${MASTERCLASS.hora}` : ""}`
    : "Próxima fecha · Reserva y te avisamos por email";

  return (
    <section id="reservar" className="py-16 sm:py-24 bg-secondary scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="text-center lg:text-left">
          <p className="text-2xl sm:text-3xl text-surface mb-5 leading-snug font-[family-name:var(--font-dm-serif)]">
            Una llamada comercial no se gana en el cierre. Se construye desde la primera pregunta.
          </p>
          <p className="text-surface/75 text-lg mb-6 leading-relaxed">
            Reserva tu plaza gratuita. Las plazas son limitadas y el acceso se envía por email.
          </p>
          <ul className="flex flex-col gap-3 text-surface/80 text-sm max-w-sm mx-auto lg:mx-0">
            {[
              `${fechaTexto}`,
              `${MASTERCLASS.duracion} · ${MASTERCLASS.formato}`,
              "Gratuita y sin compromiso",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 justify-center lg:justify-start">
                <svg className="w-5 h-5 text-surface/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-6 sm:p-8">
          <h3 className="text-xl font-bold text-text mb-4 text-center font-[family-name:var(--font-dm-serif)]">
            Reserva tu plaza gratuita
          </h3>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

// ── Barra fija inferior (mobile) ──
function StickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border py-3 px-4 z-50 lg:hidden">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <span className="text-sm font-semibold text-text whitespace-nowrap">Masterclass gratuita</span>
        <a
          href="#reservar"
          className="flex-1 text-center bg-accent text-surface py-3 rounded-[var(--radius-button)] font-bold text-sm hover:bg-accent-hover transition shadow-[var(--shadow-soft)]"
        >
          Reservar plaza
        </a>
      </div>
    </div>
  );
}

export default function MasterclassVentasConsultivas() {
  return (
    <div className="pb-20 lg:pb-0">
      <TopCtaBar />
      <Hero />
      <IdeaCentral />
      <Problema />
      <LoQueVerás />
      <CincoErrores />
      <ParaQuien />
      <Autoridad />
      <CtaIntermedia />
      <Objeciones />
      <ReservaFinal />
      <StickyBar />
    </div>
  );
}
