"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Logo from "../components/Logo";
import {
  CAL_URL,
  ENTRADA_INICIAL,
  PERFILES,
  SECTORES,
  calcular,
  dec,
  eur,
  eurConSigno,
  horasTxt,
  reunionesQueCaben,
  SEMANAS,
  textoDiferencia,
  type Entrada,
  type Escenario,
  type Resultado,
} from "./calculo";

// Calculadora comercial: una pregunta por pantalla; al terminar, nombre,
// empresa y email (el lead) y entonces el resultado en grande. El informe por
// correo lo monta y lo envía /api/calculadora.

type PasoId =
  | "modo"
  | "sector"
  | "ticket"
  | "cierre"
  | "margen"
  | "ciclo"
  | "prospeccion"
  | "actual"
  | "capacidad"
  | "hora"
  | "coste";

type Fase = "intro" | "preguntas" | "contacto" | "resultado";

// Lo que la persona escribe, tal cual (texto), para que pueda borrar y corregir.
type Textos = Record<"ticket" | "cierre" | "margen" | "prospeccion" | "actual" | "capacidad" | "hora" | "coste", string>;

const TEXTOS_INICIALES: Textos = {
  ticket: "",
  cierre: "",
  margen: "",
  prospeccion: "",
  actual: "",
  capacidad: "",
  hora: "50",
  coste: "",
};

type Contacto = { nombre: string; empresa: string; email: string; telefono: string; consentimiento: boolean; fax: string };
type Envio = "idle" | "enviando" | "ok" | "fallo";

const num = (t: string) => {
  const v = parseFloat(t.replace(",", "."));
  return Number.isFinite(v) && v >= 0 ? v : 0;
};

export default function Calculadora() {
  const [fase, setFase] = useState<Fase>("intro");
  const [modo, setModo] = useState<Entrada["modo"]>("primero");
  const [sector, setSector] = useState("");
  const [ciclo, setCiclo] = useState<number | null>(null);
  const [textos, setTextos] = useState<Textos>(TEXTOS_INICIALES);
  const [costeOpcion, setCosteOpcion] = useState<"becario" | "junior" | "senior" | "propio" | "">("");
  const [indice, setIndice] = useState(0);
  const [contacto, setContacto] = useState<Contacto>({ nombre: "", empresa: "", email: "", telefono: "", consentimiento: false, fax: "" });
  const [envio, setEnvio] = useState<Envio>("idle");
  const [enviadoCon, setEnviadoCon] = useState(""); // las respuestas del último informe enviado
  const [error, setError] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});

  const pasos: PasoId[] = useMemo(
    () => [
      "modo",
      "sector",
      "ticket",
      "cierre",
      "margen",
      "ciclo",
      ...(modo === "otro" ? (["actual", "capacidad"] as PasoId[]) : (["prospeccion"] as PasoId[])),
      "hora",
      "coste",
    ],
    [modo],
  );
  const paso = pasos[Math.min(indice, pasos.length - 1)];

  const costeMes =
    costeOpcion === "propio" ? num(textos.coste) : PERFILES.find((c) => c.id === costeOpcion)?.importe ?? 3100;

  const entrada: Entrada = {
    ...ENTRADA_INICIAL,
    modo,
    sector: sector || "otro",
    ticket: num(textos.ticket),
    cierre: Math.min(num(textos.cierre), 10) / 10,
    margen: Math.min(num(textos.margen), 100) / 100,
    ciclo: ciclo ?? 1,
    prospeccion: num(textos.prospeccion),
    actual: num(textos.actual),
    capacidadTotal: num(textos.capacidad),
    hora: num(textos.hora),
    coste: costeMes,
    becario: costeOpcion === "becario",
  };

  const valido: Record<PasoId, boolean> = {
    modo: true,
    sector: sector !== "",
    ticket: num(textos.ticket) > 0,
    cierre: num(textos.cierre) > 0 && num(textos.cierre) <= 10,
    margen: num(textos.margen) > 0 && num(textos.margen) <= 100,
    ciclo: ciclo !== null,
    prospeccion: textos.prospeccion.trim() !== "",
    actual: num(textos.actual) > 0,
    capacidad: true,
    hora: textos.hora.trim() !== "",
    coste: costeOpcion !== "" && (costeOpcion !== "propio" || num(textos.coste) > 0),
  };

  const escribir = (campo: keyof Textos, valor: string) => setTextos((t) => ({ ...t, [campo]: valor }));
  const siguiente = () => {
    if (!valido[paso]) return;
    if (indice >= pasos.length - 1) {
      // Quien ya dejó sus datos va directo al resultado.
      setFase(envio === "ok" || envio === "fallo" ? "resultado" : "contacto");
      window.scrollTo({ top: 0 });
    } else setIndice(indice + 1);
  };

  const enviar = async () => {
    const locales: Record<string, string> = {};
    if (!contacto.nombre.trim()) locales.nombre = "Dime cómo te llamas.";
    if (!contacto.empresa.trim()) locales.empresa = "El informe va a nombre de tu empresa.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contacto.email.trim())) locales.email = "Revisa el email: ahí te llega el informe.";
    if (!contacto.consentimiento) locales.consentimiento = "Necesito tu permiso para enviártelo.";
    setErrores(locales);
    if (Object.keys(locales).length) return;

    setEnvio("enviando");
    setError("");
    let estado: Envio = "fallo";
    try {
      const res = await fetch("/api/calculadora", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entrada, contacto }),
      });
      if (res.status === 400) {
        const datos = await res.json().catch(() => ({}));
        setErrores(datos.errores ?? {});
        setError(datos.error ?? "Revisa los campos marcados.");
        setEnvio("idle");
        return;
      }
      if (res.ok) estado = "ok";
    } catch {
      // Sin conexión: le enseñamos el resultado igualmente y le avisamos.
    }
    setEnvio(estado);
    setEnviadoCon(JSON.stringify(entrada));
    setFase("resultado");
    window.scrollTo({ top: 0 });
  };
  const atras = () => (indice === 0 ? setFase("intro") : setIndice(indice - 1));
  // En las preguntas de opciones, elegir ya es contestar.
  const elegirYSeguir = (accion: () => void) => {
    accion();
    setTimeout(() => setIndice((i) => Math.min(i + 1, pasos.length - 1)), 180);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className={`${fase === "resultado" ? "max-w-4xl" : "max-w-3xl"} mx-auto px-4 sm:px-6 pt-6 pb-2 flex items-center justify-between`}>
        <Link href="/" aria-label="Galador, ir a la portada">
          <Logo className="h-6 sm:h-7 w-auto text-accent" />
        </Link>
        <span className="text-sm text-muted">Calculadora comercial</span>
      </header>

      {fase === "intro" && <Intro onEmpezar={() => setFase("preguntas")} />}

      {fase === "preguntas" && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <Progreso actual={indice + 1} total={pasos.length} />
          <form
            className="mt-10"
            onSubmit={(e) => {
              e.preventDefault();
              siguiente();
            }}
          >
            {paso === "modo" && (
              <Pregunta titulo="¿Cuál es tu caso?">
                <Opciones
                  valor={modo}
                  opciones={[
                    { id: "primero", titulo: "Sería mi primer comercial", detalle: "Hoy los clientes los buscas tú" },
                    { id: "otro", titulo: "Ya tengo uno y quiero otro", detalle: "Quiero saber si me sale un segundo" },
                  ]}
                  onElegir={(id) => elegirYSeguir(() => setModo(id as Entrada["modo"]))}
                />
              </Pregunta>
            )}

            {paso === "sector" && (
              <Pregunta titulo="¿A qué se dedica tu empresa?">
                <Opciones
                  valor={sector}
                  opciones={SECTORES.map((s) => ({ id: s.id, titulo: s.nombre }))}
                  onElegir={(id) =>
                    elegirYSeguir(() => {
                      setSector(id);
                      if (ciclo === null) setCiclo(SECTORES.find((s) => s.id === id)?.ciclo ?? 1);
                    })
                  }
                  columnas
                />
              </Pregunta>
            )}

            {paso === "ticket" && (
              <Pregunta
                titulo="¿Cuánto te paga de media un cliente nuevo?"
                ayuda="Lo que facturas por una venta. Si cobras una cuota, lo que te paga en su primer año."
              >
                <Numero id="ticket" valor={textos.ticket} unidad="€" onCambio={(v) => escribir("ticket", v)} />
              </Pregunta>
            )}

            {paso === "cierre" && (
              <Pregunta
                titulo="De cada 10 reuniones con alguien que encaja, ¿cuántas acaban comprando?"
                ayuda="Si no lo tienes medido, pon lo que te dice la intuición."
              >
                <Numero id="cierre" valor={textos.cierre} unidad="de cada 10" onCambio={(v) => escribir("cierre", v)} />
                <Atajos opciones={["1", "2", "3", "4", "5"]} onElegir={(v) => escribir("cierre", v)} />
              </Pregunta>
            )}

            {paso === "margen" && (
              <Pregunta
                titulo="De cada 100 € que facturas, ¿cuánto te queda después de entregar el servicio?"
                ayuda="Tu margen bruto: lo que queda tras pagar a quien hace el trabajo y los costes directos."
              >
                <Numero id="margen" valor={textos.margen} unidad="%" onCambio={(v) => escribir("margen", v)} />
                <Atajos
                  opciones={["30", "50", "70"]}
                  sufijo=" %"
                  extra={{ texto: "No lo sé, usa 50 %", valor: "50" }}
                  onElegir={(v) => escribir("margen", v)}
                />
              </Pregunta>
            )}

            {paso === "ciclo" && (
              <Pregunta titulo="Desde la primera reunión, ¿cuánto tardan en decidir?">
                <Opciones
                  valor={ciclo === null ? "" : String(ciclo)}
                  opciones={[
                    { id: "0", titulo: "Deciden en el mismo mes" },
                    { id: "1", titulo: "Alrededor de un mes" },
                    { id: "2", titulo: "Dos o tres meses" },
                    { id: "4", titulo: "Más de tres meses" },
                  ]}
                  onElegir={(id) => elegirYSeguir(() => setCiclo(Number(id)))}
                />
              </Pregunta>
            )}

            {paso === "prospeccion" && (
              <Pregunta
                titulo="¿Cuántas horas a la semana dedicas hoy a buscar clientes?"
                ayuda="Prospectar, llamar, escribir y agendar. Es el trabajo que pasaría a hacer el comercial."
              >
                <Numero id="prospeccion" valor={textos.prospeccion} unidad="h a la semana" onCambio={(v) => escribir("prospeccion", v)} />
                <Atajos opciones={["2", "5", "8", "12"]} sufijo=" h" onElegir={(v) => escribir("prospeccion", v)} />
                {textos.prospeccion.trim() !== "" && (
                  <Nota>
                    {num(textos.prospeccion) > 0
                      ? `Son unas ${horasTxt(num(textos.prospeccion) * SEMANAS)} al mes. Si se las pasas a un comercial, te dejan hueco para unas ${reunionesQueCaben(num(textos.prospeccion))} reuniones de venta nuevas al mes.`
                      : "Entonces contamos que tienes hueco para todas las reuniones que te traiga."}
                  </Nota>
                )}
              </Pregunta>
            )}

            {paso === "actual" && (
              <Pregunta
                titulo="¿Cuántas reuniones al mes te trae hoy tu comercial?"
                ayuda="Celebradas y con alguien que encaja, no solo agendadas. Es lo que esperamos del segundo."
              >
                <Numero id="actual" valor={textos.actual} unidad="al mes" onCambio={(v) => escribir("actual", v)} />
              </Pregunta>
            )}

            {paso === "capacidad" && (
              <Pregunta
                titulo="¿Cuántas reuniones al mes podéis atender en total?"
                ayuda="Tú o quien cierre, contando las que ya tenéis. Si no lo sabes, déjalo en blanco."
              >
                <Numero id="capacidad" valor={textos.capacidad} unidad="al mes" onCambio={(v) => escribir("capacidad", v)} />
              </Pregunta>
            )}

            {paso === "hora" && (
              <Pregunta
                titulo="¿Cuánto vale una hora de tu tiempo?"
                ayuda="La usamos para contar las horas que pasarás dirigiendo al comercial."
              >
                <Numero id="hora" valor={textos.hora} unidad="€ la hora" onCambio={(v) => escribir("hora", v)} />
                <Atajos opciones={["30", "50", "80", "120"]} sufijo=" €" onElegir={(v) => escribir("hora", v)} />
              </Pregunta>
            )}

            {paso === "coste" && (
              <Pregunta
                titulo="¿Qué perfil contratarías?"
                ayuda="Coste total para la empresa: sueldo, variable y Seguridad Social."
              >
                <Opciones
                  valor={costeOpcion}
                  opciones={[
                    ...PERFILES.map((c) => ({ id: c.id, titulo: `${c.titulo} · ${eur(c.importe)} al mes`, detalle: c.detalle })),
                    { id: "propio", titulo: "Tengo mi propia cifra" },
                  ]}
                  onElegir={(id) => setCosteOpcion(id as typeof costeOpcion)}
                />
                {costeOpcion === "propio" && (
                  <div className="mt-4">
                    <Numero id="coste" valor={textos.coste} unidad="€ al mes" onCambio={(v) => escribir("coste", v)} />
                  </div>
                )}
              </Pregunta>
            )}

            <div className="mt-10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={atras}
                className="text-text-muted font-medium px-2 py-3 hover:text-text focus-visible:outline-2 focus-visible:outline-accent rounded-[var(--radius-button)]"
              >
                ← Atrás
              </button>
              <button
                type="submit"
                disabled={!valido[paso]}
                className="bg-accent text-surface font-medium px-7 py-3.5 rounded-[var(--radius-button)] hover:bg-accent-hover transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {indice >= pasos.length - 1 ? "Ver mi resultado" : "Siguiente"}
              </button>
            </div>
          </form>
        </section>
      )}

      {fase === "contacto" && (
        <Captura
          contacto={contacto}
          setContacto={setContacto}
          errores={errores}
          error={error}
          enviando={envio === "enviando"}
          onEnviar={enviar}
          onAtras={() => setFase("preguntas")}
        />
      )}

      {fase === "resultado" && (
        <ResultadoVista
          resultado={calcular(entrada)}
          contacto={contacto}
          envio={envio}
          desactualizado={enviadoCon !== JSON.stringify(entrada)}
          onReenviar={enviar}
          onCambiar={() => {
            setIndice(0);
            setFase("preguntas");
          }}
        />
      )}
    </div>
  );
}

// ── Piezas del cuestionario ──

function Intro({ onEmpezar }: { onEmpezar: () => void }) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.13em] text-muted">Calculadora comercial</p>
      <h1 className="mt-4 text-4xl sm:text-6xl leading-[1.08] text-primary font-[family-name:var(--font-dm-serif)] text-balance">
        ¿Te sale rentable contratar <span className="text-accent">a alguien que te consiga citas?</span>
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-text-muted max-w-[60ch]">
        En ventas se le llama SDR. Contesta unas preguntas rápidas sobre tu negocio y te digo si te sale, cuánto pierdes si lo
        contratas sin sistema y en qué mes recuperas lo invertido. Al final te pido tu email para enseñarte el resultado y enviarte
        el informe completo.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={onEmpezar}
          className="bg-accent text-surface font-medium text-lg px-8 py-4 rounded-[var(--radius-button)] hover:bg-accent-hover transition"
        >
          Empezar
        </button>
        <span className="text-text-muted">2 minutos · ves el resultado al momento</span>
      </div>
    </section>
  );
}

function Progreso({ actual, total }: { actual: number; total: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-muted mb-2">
        <span>
          Pregunta {actual} de {total}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-muted overflow-hidden" aria-hidden="true">
        <div className="h-full bg-accent rounded-full transition-[width] duration-300" style={{ width: `${(actual / total) * 100}%` }} />
      </div>
    </div>
  );
}

function Pregunta({ titulo, ayuda, children }: { titulo: string; ayuda?: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-2xl sm:text-4xl leading-tight text-primary font-[family-name:var(--font-dm-serif)] text-balance">
        {titulo}
      </legend>
      {ayuda && <p className="mt-3 text-text-muted max-w-[60ch]">{ayuda}</p>}
      <div className="mt-8">{children}</div>
    </fieldset>
  );
}

function Opciones({
  valor,
  opciones,
  onElegir,
  columnas = false,
}: {
  valor: string;
  opciones: Array<{ id: string; titulo: string; detalle?: string }>;
  onElegir: (id: string) => void;
  columnas?: boolean;
}) {
  return (
    <div className={`grid gap-3 ${columnas ? "sm:grid-cols-2" : ""}`}>
      {opciones.map((o) => {
        const activa = valor === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onElegir(o.id)}
            aria-pressed={activa}
            className={`text-left px-5 py-4 rounded-[var(--radius-card)] border transition focus-visible:outline-2 focus-visible:outline-accent ${
              activa ? "border-accent bg-accent/5 ring-1 ring-accent" : "border-border bg-surface hover:border-accent/50"
            }`}
          >
            <span className="block font-medium text-text">{o.titulo}</span>
            {o.detalle && <span className="block mt-1 text-sm text-text-muted">{o.detalle}</span>}
          </button>
        );
      })}
    </div>
  );
}

function Numero({
  id,
  valor,
  unidad,
  onCambio,
}: {
  id: string;
  valor: string;
  unidad: string;
  onCambio: (v: string) => void;
}) {
  return (
    <label htmlFor={id} className="flex items-center bg-surface border border-border rounded-[var(--radius-card)] focus-within:ring-2 focus-within:ring-accent/40 focus-within:border-accent max-w-md">
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoFocus
        autoComplete="off"
        value={valor}
        onChange={(e) => onCambio(e.target.value.replace(/[^\d.,]/g, ""))}
        className="flex-1 min-w-0 bg-transparent px-5 py-4 text-2xl sm:text-3xl tabular-nums text-text focus:outline-none font-[family-name:var(--font-dm-serif)]"
      />
      <span className="pr-5 text-text-muted whitespace-nowrap">{unidad}</span>
    </label>
  );
}

function Atajos({
  opciones,
  sufijo = "",
  extra,
  onElegir,
}: {
  opciones: string[];
  sufijo?: string;
  extra?: { texto: string; valor: string };
  onElegir: (v: string) => void;
}) {
  const clase =
    "px-4 py-2 rounded-full border border-border bg-surface text-sm text-text hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-accent";
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {opciones.map((o) => (
        <button key={o} type="button" className={clase} onClick={() => onElegir(o)}>
          {o}
          {sufijo}
        </button>
      ))}
      {extra && (
        <button type="button" className={`${clase} text-text-muted`} onClick={() => onElegir(extra.valor)}>
          {extra.texto}
        </button>
      )}
    </div>
  );
}

function Nota({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 max-w-md border-l-2 border-secondary pl-4 text-text">{children}</p>;
}

// ── Resultado ──

// Antes del resultado: los datos de contacto. Un adelanto borroso deja claro que ya está calculado.
function Captura({
  contacto,
  setContacto,
  errores,
  error,
  enviando,
  onEnviar,
  onAtras,
}: {
  contacto: Contacto;
  setContacto: (c: Contacto) => void;
  errores: Record<string, string>;
  error: string;
  enviando: boolean;
  onEnviar: () => void;
  onAtras: () => void;
}) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid gap-8">
      <div className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.13em] text-muted">Tu resultado está listo</p>
        <h1 className="text-3xl sm:text-5xl leading-[1.1] text-primary font-[family-name:var(--font-dm-serif)] text-balance">
          ¿A nombre de qué empresa preparo tu informe?
        </h1>
        <p className="text-lg text-text-muted max-w-[60ch]">
          Te enseño ahora si te sale, cuánto te juegas el primer año y en qué mes recuperas lo invertido. Y te mando el informe completo
          por correo para que lo tengas a mano.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 select-none" aria-hidden="true">
        {["Sin sistema", "Con sistema"].map((t) => (
          <div key={t} className="bg-surface border border-border rounded-[var(--radius-card)] p-6 grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.13em] text-muted">{t}</span>
            <span className="text-4xl sm:text-5xl font-[family-name:var(--font-dm-serif)] text-accent blur-[10px]">00.000 €</span>
            <span className="text-text-muted blur-[5px]">el primer año · recuperas en el mes 0</span>
          </div>
        ))}
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onEnviar();
        }}
        className="bg-surface border border-border rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-6 sm:p-8 grid gap-5"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Campo id="nombre" etiqueta="Nombre" valor={contacto.nombre} error={errores.nombre} autoComplete="given-name" onCambio={(x) => setContacto({ ...contacto, nombre: x })} />
          <Campo id="empresa" etiqueta="Empresa" valor={contacto.empresa} error={errores.empresa} autoComplete="organization" onCambio={(x) => setContacto({ ...contacto, empresa: x })} />
          <Campo id="email" etiqueta="Email" tipo="email" valor={contacto.email} error={errores.email} autoComplete="email" onCambio={(x) => setContacto({ ...contacto, email: x })} />
          <Campo id="telefono" etiqueta="Teléfono (opcional)" tipo="tel" valor={contacto.telefono} autoComplete="tel" onCambio={(x) => setContacto({ ...contacto, telefono: x })} />
        </div>
        {/* Honeypot: invisible para personas, irresistible para bots. */}
        <input
          type="text"
          name="fax"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          value={contacto.fax}
          onChange={(e) => setContacto({ ...contacto, fax: e.target.value })}
        />
        <label className="flex items-start gap-3 text-sm text-text-muted">
          <input
            type="checkbox"
            checked={contacto.consentimiento}
            onChange={(e) => setContacto({ ...contacto, consentimiento: e.target.checked })}
            className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
          />
          <span>
            Acepto la{" "}
            <Link href="/politica-privacidad" target="_blank" className="text-accent underline underline-offset-2">
              política de privacidad
            </Link>{" "}
            y que Galador me escriba sobre este informe.
            {errores.consentimiento && <span className="block text-accent mt-1">{errores.consentimiento}</span>}
          </span>
        </label>
        {error && (
          <p className="text-accent" role="alert">
            {error}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={onAtras}
            className="text-text-muted font-medium px-2 py-3 hover:text-text focus-visible:outline-2 focus-visible:outline-accent rounded-[var(--radius-button)]"
          >
            ← Atrás
          </button>
          <button
            type="submit"
            disabled={enviando}
            className="bg-accent text-surface font-medium text-lg px-8 py-4 rounded-[var(--radius-button)] hover:bg-accent-hover transition disabled:opacity-60"
          >
            {enviando ? "Preparando tu informe…" : "Ver mi resultado"}
          </button>
        </div>
      </form>
    </section>
  );
}

function ResultadoVista({
  resultado: r,
  contacto,
  envio,
  desactualizado,
  onReenviar,
  onCambiar,
}: {
  resultado: Resultado;
  contacto: Contacto;
  envio: Envio;
  desactualizado: boolean;
  onReenviar: () => void;
  onCambiar: () => void;
}) {
  const v = r.veredicto;
  const sinSale = r.sin.anio >= 0;
  const chipColor =
    v.estado === "bien" ? "bg-secondary-dark text-surface" : v.estado === "justo" ? "bg-surface-muted text-text" : "bg-accent text-surface";

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid gap-8">
      <p className="text-[15px] text-text-muted border-l-2 border-secondary pl-4">
        {envio === "fallo" ? (
          <>
            No hemos podido enviarte el informe por correo. Escríbeme a <strong className="text-text font-medium">paula@galador.es</strong> y te
            lo mando.
          </>
        ) : (
          <>
            {contacto.nombre.trim().split(" ")[0]}, te he enviado el informe de {contacto.empresa.trim()} a{" "}
            <strong className="text-text font-medium">{contacto.email.trim()}</strong>. Si no lo ves, mira en promociones o en spam.
          </>
        )}
      </p>

      {/* Veredicto */}
      <div className="grid gap-4">
        <span className={`justify-self-start text-xs font-semibold uppercase tracking-[0.13em] px-3 py-1.5 rounded-full ${chipColor}`}>{v.chip}</span>
        <h1 className="text-4xl sm:text-6xl leading-[1.08] text-primary font-[family-name:var(--font-dm-serif)] text-balance">
          {v.titular[0]}
          <span className="text-accent">{v.titular[1]}</span>
          {v.titular[2]}
        </h1>
        <p className="text-lg text-text-muted max-w-[62ch]">{v.explica}</p>
        {r.aviso && <p className="max-w-[62ch] border-l-2 border-accent bg-surface px-4 py-3 text-text">{r.aviso}</p>}
        {r.notaBecario && <p className="max-w-[62ch] border-l-2 border-accent bg-surface px-4 py-3 text-text">{r.notaBecario}</p>}
      </div>

      {/* Lo que pierdes y lo que ganas */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Tarjeta
          etiqueta="Si lo contratas sin sistema"
          valor={eurConSigno(r.sin.anio)}
          tono={sinSale ? "neutro" : "perdida"}
          detalle={`el primer año · ${r.sin.payback ? `recuperas lo invertido en el mes ${r.sin.payback}` : "no recuperas lo invertido en 3 años"}`}
        />
        <Tarjeta
          etiqueta="Si lo contratas con sistema"
          valor={eurConSigno(r.con.anio)}
          tono={r.con.anio >= 0 ? "ganancia" : "perdida"}
          detalle={`el primer año · ${r.con.payback ? `recuperas lo invertido en el mes ${r.con.payback}` : "no recuperas lo invertido en 3 años"}`}
        />
      </div>
      <div className="bg-accent text-surface rounded-[var(--radius-card)] px-6 py-6 sm:px-8 flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <span className="text-4xl sm:text-5xl font-[family-name:var(--font-dm-serif)] tabular-nums">{eur(Math.max(0, r.diferencia))}</span>
        <span className="text-lg text-surface/90 flex-1 min-w-[18ch]">{textoDiferencia(r)}</span>
      </div>

      {/* Lo que te ahorras */}
      <div className="grid gap-3">
        <h2 className="text-2xl text-primary font-[family-name:var(--font-dm-serif)]">Lo que te ahorras</h2>
        <div className={`grid gap-px bg-border border border-border rounded-[var(--radius-card)] overflow-hidden ${r.horasProspeccion > 0 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {r.horasProspeccion > 0 && (
            <Ahorro valor={horasTxt(r.horasProspeccion)} texto="al mes que dejas de pasar buscando clientes y dedicas a cerrar" />
          )}
          <Ahorro
            valor={horasTxt(r.horasSupervisionAhorradas)}
            texto={`al mes que no pasas corrigiendo al comercial sobre la marcha (unos ${eur(r.horasSupervisionAhorradas * r.entrada.hora)} de tu tiempo)`}
          />
          <Ahorro
            valor={dec(r.con.ventasMes - r.sin.ventasMes)}
            texto="ventas más al mes con sistema, cuando el comercial está rodado"
          />
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-5 sm:p-6 grid gap-3">
        <h2 className="text-2xl text-primary font-[family-name:var(--font-dm-serif)]">Lo que llevas ganado o perdido, mes a mes</h2>
        <p className="text-text-muted text-[15px] max-w-[65ch]">
          Lo que te ha dejado el comercial menos todo lo que te ha costado, tu tiempo incluido. Cuando la línea cruza el cero, has
          recuperado lo invertido.
        </p>
        <Grafico sin={r.sin} con={r.con} />
      </div>

      {/* Siguiente paso */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-6 sm:p-8 grid gap-4">
        <h2 className="text-3xl text-primary font-[family-name:var(--font-dm-serif)] text-balance">
          ¿Lo revisamos con el caso real de {contacto.empresa.trim() || "tu empresa"}?
        </h2>
        <p className="text-lg text-text-muted max-w-[60ch]">
          Esta cuenta es una estimación. En el análisis comercial miro tus números reales, tus llamadas y tu proceso, y te digo qué
          cambiaría antes de contratar a nadie: a quién buscar, qué guion darle y qué medir cada semana.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-surface font-medium text-lg px-8 py-4 rounded-[var(--radius-button)] hover:bg-accent-hover transition"
          >
            Reservar mi análisis comercial
          </a>
          <button type="button" onClick={onCambiar} className="text-text-muted underline underline-offset-2 hover:text-text">
            Cambiar mis respuestas
          </button>
          {desactualizado && envio !== "enviando" && (
            <button type="button" onClick={onReenviar} className="text-accent font-medium underline underline-offset-2">
              Enviarme el informe con estas respuestas
            </button>
          )}
        </div>
      </div>

      <footer className="text-sm text-text-muted grid gap-2 max-w-[70ch]">
        <p>
          De dónde salen las cifras: el informe de Bridge Group de 2025 sobre equipos de SDR (351 empresas, sobre todo de EE. UU. y de
          software) sitúa la cuota mediana en 10 reuniones celebradas al mes, que solo alcanza el 60 % de los SDR, y la rampa media en 3
          meses. Las cifras por sector son más prudentes, adaptadas a empresas pequeñas de servicios en España.
        </p>
        <p>
          Sin sistema contamos un 30 % menos de reuniones que cuentan, un cierre un 20 % peor, 2 meses más hasta rendir y 5 horas tuyas a
          la semana encima del comercial, frente a 2 con sistema. Con un becario, además, un 30 % menos de reuniones, un mes más hasta
          rendir y 2 horas tuyas más a la semana. Son supuestos de Galador, no un estudio. Es una estimación con tus
          números: no cuenta impuestos, financiación ni el coste de sustituir al comercial si se va.
        </p>
      </footer>
    </section>
  );
}

function Tarjeta({
  etiqueta,
  valor,
  detalle,
  tono,
}: {
  etiqueta: string;
  valor: string;
  detalle: string;
  tono: "perdida" | "ganancia" | "neutro";
}) {
  const color = tono === "perdida" ? "text-accent" : tono === "ganancia" ? "text-secondary-dark" : "text-text";
  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 grid gap-2 content-start">
      <span className="text-xs font-semibold uppercase tracking-[0.13em] text-muted">{etiqueta}</span>
      <span className={`text-4xl sm:text-5xl tabular-nums font-[family-name:var(--font-dm-serif)] ${color}`}>{valor}</span>
      <span className="text-text-muted">{detalle}</span>
    </div>
  );
}

function Ahorro({ valor, texto }: { valor: string; texto: string }) {
  return (
    <div className="bg-surface p-5 grid gap-1 content-start">
      <span className="text-3xl tabular-nums text-secondary-dark font-[family-name:var(--font-dm-serif)]">{valor}</span>
      <span className="text-[15px] text-text-muted">{texto}</span>
    </div>
  );
}

function Campo({
  id,
  etiqueta,
  valor,
  onCambio,
  error,
  tipo = "text",
  autoComplete,
}: {
  id: string;
  etiqueta: string;
  valor: string;
  onCambio: (v: string) => void;
  error?: string;
  tipo?: string;
  autoComplete?: string;
}) {
  return (
    <div className="grid gap-1.5 min-w-0">
      <label htmlFor={id} className="text-sm font-medium text-text">
        {etiqueta}
      </label>
      <input
        id={id}
        type={tipo}
        value={valor}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        onChange={(e) => onCambio(e.target.value)}
        className={`w-full border rounded-[var(--radius-button)] px-4 py-3 bg-background focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent ${
          error ? "border-accent" : "border-border"
        }`}
      />
      {error && <span className="text-sm text-accent">{error}</span>}
    </div>
  );
}

// Dos líneas de dinero acumulado: sin sistema (discontinua) y con sistema.
function Grafico({ sin, con }: { sin: Escenario; con: Escenario }) {
  const W = 640, H = 280, izq = 64, der = 104, arr = 18, abj = 30;
  const n = con.acumulados.length;
  const todos = [...sin.acumulados, ...con.acumulados, 0];
  let lo = Math.min(...todos);
  let hi = Math.max(...todos);
  if (hi - lo < 1) {
    hi += 1;
    lo -= 1;
  }
  const pad = (hi - lo) * 0.08;
  hi += pad;
  lo -= pad;
  const x = (i: number) => izq + (i * (W - izq - der)) / (n - 1);
  const y = (v: number) => arr + ((hi - v) / (hi - lo)) * (H - arr - abj);
  const k = (v: number) =>
    Math.abs(v) >= 1000 ? `${v < 0 ? "−" : ""}${Math.round(Math.abs(v) / 1000).toLocaleString("es-ES")} k€` : eur(v);
  const puntos = (d: number[]) => d.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

  const maxDato = Math.max(...sin.acumulados, ...con.acumulados);
  const minDato = Math.min(...sin.acumulados, ...con.acumulados);
  const marcas = [maxDato, minDato].filter((v, i, a) => a.indexOf(v) === i && Math.abs(y(v) - y(0)) > 22);

  let yc = y(con.acumulados[n - 1]);
  let ys = y(sin.acumulados[n - 1]);
  if (Math.abs(yc - ys) < 18) {
    const m = (yc + ys) / 2;
    const arriba = yc <= ys;
    yc = m + (arriba ? -9 : 9);
    ys = m + (arriba ? 9 : -9);
  }
  const texto = { fill: "var(--color-text-muted)", fontSize: 12 };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="Dinero acumulado durante 18 meses, sin sistema y con sistema">
      {marcas.map((v) => (
        <g key={v}>
          <line x1={izq} x2={W - der} y1={y(v)} y2={y(v)} stroke="var(--color-border)" strokeDasharray="2 4" />
          <text x={izq - 8} y={y(v) + 4} textAnchor="end" style={texto}>
            {k(v)}
          </text>
        </g>
      ))}
      <line x1={izq} x2={W - der} y1={y(0)} y2={y(0)} stroke="var(--color-text-muted)" />
      <text x={izq - 8} y={y(0) + 4} textAnchor="end" style={{ ...texto, fill: "var(--color-text)", fontWeight: 700 }}>
        0 €
      </text>
      {[1, 3, 6, 9, 12, 15, 18]
        .filter((m) => m <= n)
        .map((m) => (
          <text key={m} x={x(m - 1)} y={H - 8} textAnchor="middle" style={texto}>
            {m === 1 ? "Mes 1" : m}
          </text>
        ))}
      <polyline fill="none" stroke="var(--color-text-muted)" strokeWidth={2} strokeDasharray="6 5" strokeLinejoin="round" points={puntos(sin.acumulados)} />
      <polyline fill="none" stroke="var(--color-accent)" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" points={puntos(con.acumulados)} />
      {[
        { r: sin, color: "var(--color-text-muted)", nombre: "Sin sistema" },
        { r: con, color: "var(--color-accent)", nombre: "Con sistema" },
      ].map(({ r, color, nombre }) =>
        r.payback && r.payback <= n ? (
          <circle key={nombre} cx={x(r.payback - 1)} cy={y(r.acumulados[r.payback - 1])} r={5} fill="var(--color-surface)" stroke={color} strokeWidth={2}>
            <title>{`${nombre}: recuperas lo invertido en el mes ${r.payback}`}</title>
          </circle>
        ) : null,
      )}
      <text x={W - der + 8} y={yc + 4} style={{ ...texto, fill: "var(--color-accent)", fontWeight: 700 }}>
        Con sistema
      </text>
      <text x={W - der + 8} y={ys + 4} style={{ ...texto, fontWeight: 700 }}>
        Sin sistema
      </text>
    </svg>
  );
}

