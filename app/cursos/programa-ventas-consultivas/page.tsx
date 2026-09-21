"use client";

import { useState, useSyncExternalStore } from "react";
import { PROGRAM_CONFIG as C } from "./config";

// ── El reloj, leído como lo que es: un sistema externo a React ──
// Antes esto era un useEffect que hacía setState nada más montar, y eso
// provoca un render en cascada (React lo avisa desde la 19). useSyncExternalStore
// es la pieza pensada justo para esto: se suscribe al tic del reloj y el
// componente lee la hora durante el render, sin estado intermedio.

/** Un aviso por segundo. Devuelve la función para cancelar la suscripción. */
function suscribirseAlReloj(avisar: () => void) {
  const id = setInterval(avisar, 1000);
  return () => clearInterval(id);
}

/** La hora redondeada al segundo: si se llama dos veces dentro del mismo
 *  render tiene que devolver lo mismo, o React entra en bucle de renders. */
function ahoraEnElCliente() {
  return Math.floor(Date.now() / 1000) * 1000;
}

/** En el servidor no hay un «ahora» que valga: el HTML se genera una vez y se
 *  sirve a todo el mundo. Devolviendo null, el primer pintado sale a cero en
 *  servidor y en cliente —misma marca, sin desajuste de hidratación— y la
 *  cuenta real aparece en cuanto la página cobra vida en el navegador. */
function sinReloj() {
  return null;
}

const PARADO = { days: 0, hours: 0, minutes: 0, seconds: 0, expired: false };

function useCountdown(deadline: string | null) {
  const ahora = useSyncExternalStore(suscribirseAlReloj, ahoraEnElCliente, sinReloj);

  if (!deadline || ahora === null) return PARADO;

  const diff = new Date(deadline).getTime() - ahora;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
}

function TopBanner() {
  const [visible, setVisible] = useState(true);
  if (!C.banner.enabled || !visible) return null;

  const styles = {
    urgency: "bg-accent text-surface",
    promo: "bg-secondary text-surface",
    info: "bg-text text-surface",
  };

  return (
    <div className={`${styles[C.banner.style]} py-3 px-4 text-center text-sm font-medium relative`}>
      <span>{C.banner.text}</span>{" "}
      <a href={C.bookingLink} className="underline font-bold ml-1 hover:no-underline">
        {C.banner.ctaText} →
      </a>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
        aria-label="Cerrar"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function CountdownDisplay({ deadline }: { deadline: string | null }) {
  const t = useCountdown(deadline);
  if (!deadline || t.expired) return null;

  const units = [
    { value: t.days, label: "días" },
    { value: t.hours, label: "horas" },
    { value: t.minutes, label: "min" },
    { value: t.seconds, label: "seg" },
  ];

  return (
    <div className="flex gap-3 justify-center">
      {units.map((u) => (
        <div key={u.label} className="bg-text text-surface rounded-[var(--radius-button)] px-3 py-2 min-w-[56px] text-center">
          <div className="text-xl font-bold tabular-nums">{String(u.value).padStart(2, "0")}</div>
          <div className="text-[10px] text-surface/50 uppercase">{u.label}</div>
        </div>
      ))}
    </div>
  );
}

function BookingButton({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <a
      href={C.bookingLink}
      className={className ?? "block w-full bg-accent text-surface py-4 rounded-[var(--radius-button)] font-bold text-center text-lg hover:bg-accent-hover transition shadow-[var(--shadow-soft)]"}
    >
      <span className="flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {children ?? C.bookingCta}
      </span>
    </a>
  );
}

function PriceCard() {
  const hasOffer = C.offer.enabled;
  const price = hasOffer ? C.offer.discountPrice : C.price;
  const savings = C.price - price;

  return (
    <div id="precio" className="bg-surface rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] border border-border overflow-hidden max-w-md mx-auto">
      {hasOffer && (
        <div className="bg-accent text-surface text-center py-2 text-sm font-bold">
          {C.offer.name} — Ahorras {savings}{C.currency}
        </div>
      )}
      <div className="p-8">
        <h3 className="text-lg font-semibold text-text text-center mb-1 font-[family-name:var(--font-dm-serif)]">{C.name}</h3>
        <p className="text-sm text-text-muted text-center mb-6">{C.tagline}</p>

        <div className="text-center mb-6">
          {hasOffer && (
            <div className="text-muted line-through text-lg mb-1">{C.price}{C.currency}</div>
          )}
          <div className="text-5xl font-bold text-text font-[family-name:var(--font-dm-serif)]">
            {price}<span className="text-2xl">{C.currency}</span>
          </div>
          {C.paymentOptions.installments.enabled && (
            <div className="text-sm text-text-muted mt-2">
              o {C.paymentOptions.installments.count} cuotas de {C.paymentOptions.installments.amount}{C.currency}
            </div>
          )}
        </div>

        {hasOffer && C.offer.deadline && (
          <div className="mb-6">
            <div className="text-xs text-text-muted text-center mb-2">La oferta termina en:</div>
            <CountdownDisplay deadline={C.offer.deadline} />
          </div>
        )}

        {C.scarcity.enabled && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-text-muted mb-1">
              <span>Plazas ocupadas</span>
              <span className="font-bold text-accent">Quedan {C.scarcity.spotsLeft}</span>
            </div>
            <div className="w-full bg-surface-muted rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all"
                style={{ width: `${((C.scarcity.totalSpots - C.scarcity.spotsLeft) / C.scarcity.totalSpots) * 100}%` }}
              />
            </div>
          </div>
        )}

        <BookingButton />

        <p className="text-xs text-muted text-center mt-3">{C.bookingSubtext}</p>

        <div className="mt-5 bg-surface-muted rounded-[var(--radius-button)] p-4">
          <div className="text-xs font-semibold text-text mb-2">En la sesión con Paula:</div>
          <ul className="flex flex-col gap-1.5 text-xs text-text-muted">
            {[
              "Analizamos tu situación comercial actual",
              "Te explico cómo el método se adapta a tu caso",
              "Resolvemos todas tus dudas sobre el programa",
              "Sin compromiso — decides después con calma",
            ].map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <svg className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Garantía de {C.guarantee.days} días tras la compra
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          Programa completo de formación
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary leading-tight mb-6">
          Deja de perseguir clientes.{" "}
          <span className="text-accent">Haz que te elijan.</span>
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          El {C.name} es el programa de formación en venta consultiva que te enseña
          a cerrar ventas de alto valor sin presionar, sin guiones forzados y sin sentirte
          incómodo vendiendo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={C.bookingLink}
            className="bg-accent text-surface font-semibold px-8 py-4 rounded-[var(--radius-button)] hover:bg-accent-hover transition shadow-[var(--shadow-soft)] text-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {C.bookingCta}
          </a>
          <a href="#programa" className="text-text-muted font-medium hover:text-primary transition">
            Ver programa completo ↓
          </a>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            12 módulos
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            +40 vídeos
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Comunidad privada
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Garantía {C.guarantee.days} días
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-primary mb-4">
            El problema no es que no sepas vender.
            <br />
            <span className="text-accent">Es que nadie te ha enseñado el sistema.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-accent/5 rounded-[var(--radius-card)] p-8 border border-accent/15">
            <h3 className="font-bold text-text mb-4 flex items-center gap-2 font-[family-name:var(--font-dm-serif)]">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Sin el Método Consultivo
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-text-muted">
              {[
                "Persigues clientes que no responden",
                "Compites por precio y acabas haciendo descuentos",
                "Las reuniones terminan en 'ya te digo algo'",
                "No sabes cuándo ni cómo pedir el cierre",
                "Sientes que vendes de forma improvisada",
                "Pierdes oportunidades que deberías cerrar",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-secondary/5 rounded-[var(--radius-card)] p-8 border border-secondary/15">
            <h3 className="font-bold text-text mb-4 flex items-center gap-2 font-[family-name:var(--font-dm-serif)]">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Con el Método Consultivo
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-text-muted">
              {[
                "Los clientes te buscan y confían en ti",
                "Vendes por valor, no por precio",
                "Cada reunión sigue un sistema predecible",
                "El cierre es la consecuencia natural del proceso",
                "Tienes un framework replicable para cada venta",
                "Cierras más con menos esfuerzo y sin presión",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-secondary mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Program() {
  const modules = [
    { num: "01", title: "Mentalidad consultiva", desc: "Cambia el chip: de vendedor a asesor. Por qué funciona y cómo tu cliente lo percibe.", duration: "3 vídeos" },
    { num: "02", title: "Investigación pre-reunión", desc: "Cómo preparar cada reunión para llegar sabiendo más que tu competencia.", duration: "3 vídeos" },
    { num: "03", title: "Preguntas de indagación", desc: "Las preguntas que abren puertas: framework SPIN adaptado a la venta moderna.", duration: "4 vídeos" },
    { num: "04", title: "Escucha activa avanzada", desc: "Técnicas para escuchar lo que el cliente no dice y usar esa información.", duration: "3 vídeos" },
    { num: "05", title: "Diagnóstico de necesidades", desc: "Cómo hacer que el cliente verbalice su problema y sus consecuencias.", duration: "4 vídeos" },
    { num: "06", title: "Diseño de la propuesta", desc: "Estructura tu propuesta como una solución a medida, no como un catálogo.", duration: "3 vídeos" },
    { num: "07", title: "Presentación de valor", desc: "Presenta ROI, casos y beneficios de forma que el cliente se vea reflejado.", duration: "3 vídeos" },
    { num: "08", title: "Gestión de objeciones", desc: "El marco Empatizar → Preguntar → Reencuadrar para cada tipo de objeción.", duration: "4 vídeos" },
    { num: "09", title: "Negociación sin ceder", desc: "Negocia condiciones favorables sin tocar el precio. Frameworks probados.", duration: "3 vídeos" },
    { num: "10", title: "Cierre consultivo", desc: "El cierre como consecuencia natural. 5 técnicas de cierre no agresivo.", duration: "4 vídeos" },
    { num: "11", title: "Seguimiento y fidelización", desc: "Convierte clientes en recurrentes y en tu mejor fuente de referidos.", duration: "3 vídeos" },
    { num: "12", title: "Tu plan comercial", desc: "Diseña tu sistema de ventas personalizado. Plantillas, KPIs y rutinas.", duration: "3 vídeos" },
  ];

  return (
    <section id="programa" className="py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Programa completo
          </span>
          <h2 className="text-3xl text-primary mb-4">
            12 módulos para dominar la venta consultiva
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            +40 vídeos prácticos, ejercicios, plantillas y casos reales. Todo a tu ritmo.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {modules.map((m) => (
            <div key={m.num} className="flex items-start gap-4 p-5 bg-background rounded-[var(--radius-button)] border border-border hover:shadow-[var(--shadow-soft)] transition">
              <div className="text-2xl font-bold text-primary/20 leading-none mt-1 font-[family-name:var(--font-dm-serif)]">{m.num}</div>
              <div className="flex-1">
                <div className="font-semibold text-text text-sm">{m.title}</div>
                <div className="text-text-muted text-xs mt-1">{m.desc}</div>
              </div>
              <span className="text-xs text-muted bg-surface-muted px-2 py-1 rounded-full whitespace-nowrap">{m.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bonuses() {
  const bonuses = [
    { title: "Comunidad privada de alumnos", desc: "Acceso al grupo donde compartimos cierres, estrategias y feedback cada semana.", value: "Valor: 297€" },
    { title: "Plantillas y scripts descargables", desc: "Guiones de llamada, plantillas de propuesta, emails de seguimiento y checklists.", value: "Valor: 197€" },
    { title: "2 sesiones grupales en directo/mes", desc: "Role-plays, análisis de casos y Q&A conmigo en directo. Grabaciones incluidas.", value: "Valor: 497€" },
    { title: "Acceso de por vida + actualizaciones", desc: "Todos los módulos nuevos que añada están incluidos. Sin pagos extra.", value: "Valor: incalculable" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-primary mb-4">
            Además del programa, te llevas esto:
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {bonuses.map((b) => (
            <div key={b.title} className="bg-secondary/5 rounded-[var(--radius-card)] p-6 border border-secondary/15">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-text text-sm font-[family-name:var(--font-dm-serif)]">{b.title}</h3>
                <span className="text-xs text-accent font-bold whitespace-nowrap ml-2">{b.value}</span>
              </div>
              <p className="text-text-muted text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { name: "Carlos M.", role: "Director Comercial, TechSolutions", text: "En 3 meses mi equipo pasó de cerrar el 15% al 28% de las oportunidades. El Método Consultivo nos dio la estructura que nos faltaba.", initials: "CM", result: "+87% ratio de cierre" },
    { name: "Laura S.", role: "Account Executive, SaaS Corp", text: "Cambié mi forma de abordar reuniones por completo. Antes vendía, ahora asesoro. Y paradójicamente, cierro el doble.", initials: "LS", result: "x2 en cierres" },
    { name: "Miguel T.", role: "Consultor freelance", text: "Facturo un 60% más con la mitad de propuestas. Aprendí que diagnosticar antes de vender es la clave de todo.", initials: "MT", result: "+60% facturación" },
    { name: "Ana R.", role: "SDR, Startup Fintech", text: "Pasé de 2 reuniones cualificadas al mes a 8. Las preguntas de indagación son oro puro.", initials: "AR", result: "x4 reuniones" },
    { name: "David L.", role: "CEO, Agencia Digital", text: "Contraté el programa para mi equipo de 5 comerciales. En 2 meses recuperamos la inversión x3.", initials: "DL", result: "ROI x3 en 2 meses" },
    { name: "Marta F.", role: "Closer, High-ticket", text: "Cierro el 35% de las llamadas. Antes no llegaba al 15%. El framework de objeciones es brutal.", initials: "MF", result: "35% cierre en llamadas" },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-primary mb-4">
            Resultados reales de alumnos reales
          </h2>
          <p className="text-text-muted">No son promesas. Son datos de personas que han hecho el programa.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-background rounded-[var(--radius-card)] p-6 border border-border shadow-[var(--shadow-soft)]">
              <div className="inline-block bg-secondary/10 text-secondary text-xs font-bold px-2.5 py-1 rounded-full mb-4">
                {t.result}
              </div>
              <p className="text-text-muted text-sm leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-text text-xs">{t.name}</div>
                  <div className="text-[11px] text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "1", title: "Reserva tu sesión", desc: "Elige el día y hora que mejor te venga. Recibirás una confirmación con el enlace de la videollamada." },
    { num: "2", title: "Hablamos 30 minutos", desc: "Analizamos tu situación, te explico el método adaptado a tu caso y resolvemos todas tus dudas. Sin presión." },
    { num: "3", title: "Decides con calma", desc: "Si encaja, te doy acceso al programa con las condiciones que hayamos acordado. Si no, tan amigos." },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Proceso sencillo
          </span>
          <h2 className="text-3xl text-primary mb-4">¿Cómo funciona?</h2>
          <p className="text-text-muted">Tres pasos. Sin sorpresas.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-14 h-14 bg-secondary text-surface rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 font-[family-name:var(--font-dm-serif)]">
                {s.num}
              </div>
              <h3 className="font-semibold text-text mb-2 font-[family-name:var(--font-dm-serif)]">{s.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <BookingButton className="inline-flex items-center gap-2 bg-accent text-surface font-semibold px-8 py-4 rounded-[var(--radius-button)] hover:bg-accent-hover transition shadow-[var(--shadow-soft)] text-lg" />
        </div>
      </div>
    </section>
  );
}

function ForWho() {
  const yes = [
    "Comerciales que quieren un sistema predecible",
    "Consultores y freelances que necesitan vender sus servicios",
    "Emprendedores que odian vender pero necesitan hacerlo",
    "Closers que quieren mejorar su ratio de cierre",
    "Directores que quieren formar a su equipo",
  ];
  const no = [
    "Buscas un 'truco mágico' para vender sin esfuerzo",
    "No estás dispuesto a practicar y aplicar",
    "Quieres manipular a tus clientes",
    "Esperas resultados sin implementar nada",
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-primary mb-12 text-center">¿Es para ti?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-secondary mb-4 flex items-center gap-2 font-[family-name:var(--font-dm-serif)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Esto ES para ti si...
            </h3>
            <ul className="flex flex-col gap-3">
              {yes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-muted bg-secondary/5 p-3 rounded-[var(--radius-button)]">
                  <svg className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-accent mb-4 flex items-center gap-2 font-[family-name:var(--font-dm-serif)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Esto NO es para ti si...
            </h3>
            <ul className="flex flex-col gap-3">
              {no.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-muted bg-accent/5 p-3 rounded-[var(--radius-button)]">
                  <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-20 bg-surface-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-primary mb-4">
            Reserva una sesión y te cuento cómo funciona
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            30 minutos conmigo para analizar tu caso, resolver dudas y ver si el {C.name} encaja contigo. Sin compromiso.
          </p>
        </div>
        <PriceCard />
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary/5 rounded-[var(--radius-card)] p-8 sm:p-12 text-center border border-secondary/15">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl text-primary mb-4">
            Garantía de {C.guarantee.days} días. Sin preguntas.
          </h2>
          <p className="text-text-muted leading-relaxed max-w-lg mx-auto">
            {C.guarantee.text} Si el programa no es lo que esperabas, escríbeme
            un email y te hago la devolución completa. Sin preguntas, sin formularios,
            sin letra pequeña. El riesgo es cero.
          </p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "¿Qué pasa en la sesión con Paula?", a: "Es una videollamada 1:1 de 30 minutos. Analizamos tu situación comercial, te explico cómo el método se adapta a tu caso y resolvemos todas tus dudas. Sin compromiso — tú decides después." },
    { q: "¿La sesión es realmente gratuita?", a: "Sí, 100%. No te pido tarjeta ni datos de pago para reservar. Es una conversación para ver si encajamos. Si el programa no es para ti, no pasa nada." },
    { q: "¿Cuánto tiempo tengo acceso al programa?", a: "Para siempre. Una vez te inscribes, el acceso es tuyo de por vida. Además, recibirás todas las actualizaciones futuras sin coste adicional." },
    { q: "¿Cuánto tiempo necesito dedicar a la semana?", a: "Cada módulo tiene vídeos de 10-20 minutos. Con 3-4 horas semanales puedes completar el programa en 6-8 semanas. Pero vas a tu ritmo." },
    { q: "¿Funciona si vendo servicios / productos / B2B / B2C?", a: "Sí. La venta consultiva es un framework universal. Tenemos alumnos en SaaS, consultoría, agencias, freelance, formación e industria." },
    { q: "¿Puedo pagar a plazos?", a: `Sí. Puedes pagar en ${C.paymentOptions.installments.count} cuotas de ${C.paymentOptions.installments.amount}${C.currency}. Sin intereses. Todo esto lo vemos en la sesión.` },
    { q: "¿Qué pasa si no me gusta?", a: `Tienes ${C.guarantee.days} días de garantía tras la compra. Si no es lo que esperabas, te devuelvo el 100% sin preguntas.` },
    { q: "Ya he hecho otros cursos de ventas y no me han funcionado", a: "Lo entiendo. Por eso hacemos una sesión antes: para que veas si esto encaja contigo y no compres a ciegas." },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-primary mb-4">Preguntas frecuentes</h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-background rounded-[var(--radius-button)] border border-border overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-text text-sm">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-muted transition-transform flex-shrink-0 ml-4 ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-sm text-text-muted leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl text-surface mb-4">
          Dentro de 3 meses puedes seguir vendiendo igual.
          <br />
          O puedes estar cerrando el doble.
        </h2>
        <p className="text-surface/70 mb-8 max-w-lg mx-auto leading-relaxed">
          La diferencia no es talento. Es sistema. El {C.name} te da ese sistema.
          Reserva una sesión conmigo y hablamos de tu caso.
        </p>
        <a
          href={C.bookingLink}
          className="inline-flex items-center gap-2 bg-accent text-surface font-bold px-10 py-4 rounded-[var(--radius-button)] hover:bg-accent-hover transition shadow-[var(--shadow-soft)] text-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {C.bookingCta}
        </a>
        <p className="mt-4 text-surface/60 text-sm">
          Sesión 1:1 gratuita · 30 min · Sin compromiso
        </p>
        {C.offer.enabled && (
          <p className="mt-2 text-surface/40 text-xs">
            {C.offer.name} disponible: {C.offer.discountPrice}{C.currency} en lugar de {C.price}{C.currency}
          </p>
        )}
      </div>
    </section>
  );
}

function StickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border py-3 px-4 z-50 lg:hidden">
      <a
        href={C.bookingLink}
        className="flex items-center justify-center gap-2 w-full bg-accent text-surface py-3 rounded-[var(--radius-button)] font-bold text-sm hover:bg-accent-hover transition shadow-[var(--shadow-soft)] max-w-lg mx-auto"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {C.bookingCta}
      </a>
    </div>
  );
}

export default function ProgramaVentasConsultivas() {
  return (
    <>
      <TopBanner />
      <Hero />
      <Problem />
      <Program />
      <Bonuses />
      <Testimonials />
      <HowItWorks />
      <ForWho />
      <PricingSection />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <StickyBar />
    </>
  );
}
