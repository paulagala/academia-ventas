"use client";

import { useRef, useState } from "react";

// Formulario de candidatura en dos pasos.
//
// Paso 1 (identidad) va primero a propósito: si alguien abandona en el paso 2
// ya hemos pedido lo mínimo para poder escribirle. El paso 2 es el que
// cualifica de verdad — facturación, equipo y problema.

type Campo =
  | "nombre"
  | "email"
  | "telefono"
  | "empresa"
  | "facturacion"
  | "equipo"
  | "problema";

type Formulario = Record<Campo, string> & { fax: string; consentimiento: boolean };

type Estado = "idle" | "sending" | "success" | "error";

const INICIAL: Formulario = {
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  facturacion: "",
  equipo: "",
  problema: "",
  fax: "",
  consentimiento: false,
};

const CAMPOS_PASO_1: Campo[] = ["nombre", "email"];
const CAMPOS_PASO_2: Campo[] = ["facturacion", "equipo", "problema"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validar(form: Formulario, campo: Campo): string {
  const valor = form[campo].trim();
  switch (campo) {
    case "nombre":
      return valor ? "" : "Dime cómo te llamas.";
    case "email":
      if (!valor) return "Déjame un email: es por donde te respondo.";
      return EMAIL_RE.test(valor) ? "" : "Revisa el email: parece que le falta la arroba o el dominio.";
    case "facturacion":
      return valor ? "" : "Elige el tramo que más se acerque.";
    case "equipo":
      return valor ? "" : "Elige la opción que describa tu situación hoy.";
    case "problema":
      return valor ? "" : "Cuéntame en dos líneas qué está pasando.";
    default:
      return "";
  }
}

export default function LeadForm() {
  const [form, setForm] = useState<Formulario>(INICIAL);
  const [paso, setPaso] = useState<1 | 2>(1);
  const [estado, setEstado] = useState<Estado>("idle");
  const [errores, setErrores] = useState<Partial<Record<Campo | "consentimiento", string>>>({});
  const [errorEnvio, setErrorEnvio] = useState("");

  const refs = useRef<Record<string, HTMLElement | null>>({});
  const exitoRef = useRef<HTMLDivElement | null>(null);
  const pasoRef = useRef<HTMLHeadingElement | null>(null);

  const input =
    "w-full border border-[#DBD5C9] rounded-lg px-4 py-3 text-base bg-[#FFFDF9] text-[#2B231F] placeholder:text-[#8A7F75] focus:outline-none focus:ring-2 focus:ring-[#791E2A]/40 focus:border-[#791E2A]";
  const inputError = "border-[#A8323C] focus:border-[#A8323C] focus:ring-[#A8323C]/30";
  const label = "block text-sm font-semibold text-[#2B231F] mb-2";
  const ayuda = "mt-2 text-sm text-[#A8323C]";

  function set(campo: Campo, valor: string) {
    const siguiente = { ...form, [campo]: valor } as Formulario;
    setForm(siguiente);
    // Si el campo ya estaba marcado en rojo, lo limpiamos en cuanto se corrige,
    // pero no validamos en cada tecla mientras se escribe por primera vez.
    if (errores[campo] && !validar(siguiente, campo)) {
      setErrores((e) => ({ ...e, [campo]: "" }));
    }
  }

  function alSalir(campo: Campo) {
    const mensaje = validar(form, campo);
    setErrores((e) => ({ ...e, [campo]: mensaje }));
  }

  // Devuelve la primera clave inválida, o null si está todo correcto.
  function revisar(campos: Campo[], exigirConsentimiento: boolean): string | null {
    const nuevos: Partial<Record<Campo | "consentimiento", string>> = {};
    for (const campo of campos) {
      const mensaje = validar(form, campo);
      if (mensaje) nuevos[campo] = mensaje;
    }
    if (exigirConsentimiento && !form.consentimiento) {
      nuevos.consentimiento = "Marca la casilla para que pueda escribirte.";
    }

    setErrores((e) => ({ ...e, ...nuevos }));
    return Object.keys(nuevos)[0] ?? null;
  }

  function continuar() {
    const fallo = revisar(CAMPOS_PASO_1, false);
    if (fallo) {
      refs.current[fallo]?.focus();
      return;
    }
    setPaso(2);
    // Mover el foco al encabezado del paso 2 para que quien navega con teclado
    // o lector de pantalla sepa que ha cambiado el contenido.
    requestAnimationFrame(() => pasoRef.current?.focus());
  }

  async function enviar() {
    const fallo = revisar([...CAMPOS_PASO_1, ...CAMPOS_PASO_2], true);
    if (fallo) {
      // Si lo que falta es del paso 1, volvemos a él: enfocar un campo que no
      // está en pantalla dejaría al usuario sin saber qué corregir.
      if ((CAMPOS_PASO_1 as string[]).includes(fallo)) {
        setPaso(1);
      }
      requestAnimationFrame(() => refs.current[fallo]?.focus());
      return;
    }

    setEstado("sending");
    setErrorEnvio("");

    try {
      const respuesta = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!respuesta.ok) {
        const datos = await respuesta.json().catch(() => ({}));
        setErrorEnvio(
          datos?.error ||
            "No he podido registrar tu candidatura. Vuelve a intentarlo o escríbeme a paula@galador.es y la atiendo igual.",
        );
        setEstado("error");
        return;
      }

      setEstado("success");
      requestAnimationFrame(() => exitoRef.current?.focus());
    } catch {
      setErrorEnvio(
        "No he podido conectar. Revisa tu conexión y vuelve a intentarlo, o escríbeme a paula@galador.es.",
      );
      setEstado("error");
    }
  }

  if (estado === "success") {
    return (
      <div
        ref={exitoRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="text-center py-10 focus:outline-none"
      >
        <div className="w-16 h-16 bg-[#E3E5DC] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-[#3F5E53]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl text-[#2B231F] mb-3 font-[family-name:var(--font-dm-serif)]">
          Candidatura recibida
        </h3>
        <p className="text-[#5A4F48] text-base max-w-sm mx-auto leading-relaxed">
          Reviso tu caso personalmente y te contesto en 24–48 h desde{" "}
          <span className="font-semibold text-[#2B231F]">paula@galador.es</span>, haya encaje o no.
          Si en dos días no ves nada, revisa la carpeta de spam.
        </p>
      </div>
    );
  }

  const enviando = estado === "sending";

  return (
    <div>
      {/* Progreso */}
      <div className="flex items-center gap-3 mb-7">
        <div className="flex-1 h-1.5 rounded-full bg-[#791E2A]" />
        <div className={`flex-1 h-1.5 rounded-full ${paso === 2 ? "bg-[#791E2A]" : "bg-[#E3DDD1]"}`} />
        <span className="text-sm font-semibold text-[#5A4F48] whitespace-nowrap">Paso {paso} de 2</span>
      </div>

      <h3
        ref={pasoRef}
        tabIndex={-1}
        className="text-xl text-[#2B231F] mb-1 font-[family-name:var(--font-dm-serif)] focus:outline-none"
      >
        {paso === 1 ? "Quién eres" : "Tu situación"}
      </h3>
      <p className="text-sm text-[#5A4F48] mb-6">
        {paso === 1
          ? "Con esto ya puedo escribirte, aunque no llegues a terminar el segundo paso."
          : "No te lo pregunto por curiosidad: con estos tres datos ya sé si tu problema es de sistema o de captación."}
      </p>

      {/* Honeypot: fuera de la vista y del orden de tabulación. */}
      <div aria-hidden="true" className="absolute w-px h-px overflow-hidden -left-[9999px]">
        <label htmlFor="lead-fax">No rellenar</label>
        <input
          id="lead-fax"
          name="fax"
          tabIndex={-1}
          autoComplete="off"
          value={form.fax}
          onChange={(e) => setForm({ ...form, fax: e.target.value })}
        />
      </div>

      {paso === 1 ? (
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="lead-nombre" className={label}>Nombre</label>
            <input
              id="lead-nombre"
              name="nombre"
              autoComplete="name"
              ref={(el) => { refs.current.nombre = el; }}
              className={`${input} ${errores.nombre ? inputError : ""}`}
              value={form.nombre}
              onChange={(e) => set("nombre", e.target.value)}
              onBlur={() => alSalir("nombre")}
              aria-invalid={errores.nombre ? true : undefined}
              aria-describedby={errores.nombre ? "lead-nombre-error" : undefined}
              placeholder="Tu nombre"
            />
            {errores.nombre && <p id="lead-nombre-error" className={ayuda}>{errores.nombre}</p>}
          </div>

          <div>
            <label htmlFor="lead-email" className={label}>Email</label>
            <input
              id="lead-email"
              name="email"
              type="email"
              autoComplete="email"
              ref={(el) => { refs.current.email = el; }}
              className={`${input} ${errores.email ? inputError : ""}`}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => alSalir("email")}
              aria-invalid={errores.email ? true : undefined}
              aria-describedby={errores.email ? "lead-email-error" : undefined}
              placeholder="tu@empresa.com"
            />
            {errores.email && <p id="lead-email-error" className={ayuda}>{errores.email}</p>}
          </div>

          <div>
            <label htmlFor="lead-empresa" className={label}>Web o empresa</label>
            <input
              id="lead-empresa"
              name="empresa"
              autoComplete="organization"
              className={input}
              value={form.empresa}
              onChange={(e) => set("empresa", e.target.value)}
              placeholder="tuempresa.com"
            />
          </div>

          <div>
            <label htmlFor="lead-telefono" className={label}>
              Teléfono <span className="font-normal text-[#5A4F48]">(opcional)</span>
            </label>
            <input
              id="lead-telefono"
              name="telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={input}
              value={form.telefono}
              onChange={(e) => set("telefono", e.target.value)}
              placeholder="+34 600 000 000"
            />
          </div>

          <div className="sm:col-span-2 mt-1">
            <button
              type="button"
              onClick={continuar}
              className="w-full bg-[#791E2A] text-[#FAFAFA] py-4 rounded-lg font-semibold text-base hover:bg-[#611722] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#791E2A] transition"
            >
              Continuar →
            </button>
            <p className="text-sm text-[#5A4F48] text-center mt-3">
              Lo reviso yo, no un equipo de ventas. Respuesta en 24–48 h.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="lead-facturacion" className={label}>Facturación mensual actual</label>
            <select
              id="lead-facturacion"
              name="facturacion"
              ref={(el) => { refs.current.facturacion = el; }}
              className={`${input} ${form.facturacion ? "" : "text-[#8A7F75]"} ${errores.facturacion ? inputError : ""}`}
              value={form.facturacion}
              onChange={(e) => set("facturacion", e.target.value)}
              onBlur={() => alSalir("facturacion")}
              aria-invalid={errores.facturacion ? true : undefined}
              aria-describedby={errores.facturacion ? "lead-facturacion-error" : undefined}
            >
              <option value="">Selecciona una opción</option>
              <option value="Menos de 10.000 €">Menos de 10.000 €</option>
              <option value="10.000–20.000 €">10.000–20.000 €</option>
              <option value="20.000–50.000 €">20.000–50.000 €</option>
              <option value="Más de 50.000 €">Más de 50.000 €</option>
            </select>
            {errores.facturacion && (
              <p id="lead-facturacion-error" className={ayuda}>{errores.facturacion}</p>
            )}
          </div>

          <div>
            <label htmlFor="lead-equipo" className={label}>¿Tienes equipo comercial?</label>
            <select
              id="lead-equipo"
              name="equipo"
              ref={(el) => { refs.current.equipo = el; }}
              className={`${input} ${form.equipo ? "" : "text-[#8A7F75]"} ${errores.equipo ? inputError : ""}`}
              value={form.equipo}
              onChange={(e) => set("equipo", e.target.value)}
              onBlur={() => alSalir("equipo")}
              aria-invalid={errores.equipo ? true : undefined}
              aria-describedby={errores.equipo ? "lead-equipo-error" : undefined}
            >
              <option value="">Selecciona una opción</option>
              <option value="Sí, tengo equipo comercial">Sí, tengo equipo comercial</option>
              <option value="No, vendo yo (fundador/a)">No, vendo yo (fundador/a)</option>
              <option value="Estoy montándolo ahora">Estoy montándolo ahora</option>
            </select>
            {errores.equipo && <p id="lead-equipo-error" className={ayuda}>{errores.equipo}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="lead-problema" className={label}>¿Cuál es tu principal problema comercial?</label>
            <textarea
              id="lead-problema"
              name="problema"
              rows={5}
              ref={(el) => { refs.current.problema = el; }}
              className={`${input} resize-y ${errores.problema ? inputError : ""}`}
              value={form.problema}
              onChange={(e) => set("problema", e.target.value)}
              onBlur={() => alSalir("problema")}
              aria-invalid={errores.problema ? true : undefined}
              aria-describedby={errores.problema ? "lead-problema-error" : undefined}
              placeholder="Qué está pasando en tus llamadas y qué has intentado ya. Por ejemplo: se lo piensan y no vuelven, la mitad no aparece a la cita, o cada uno vende de una manera."
            />
            {errores.problema && <p id="lead-problema-error" className={ayuda}>{errores.problema}</p>}
          </div>

          <div className="sm:col-span-2 flex items-start gap-3">
            <input
              id="lead-consentimiento"
              name="consentimiento"
              type="checkbox"
              ref={(el) => { refs.current.consentimiento = el; }}
              checked={form.consentimiento}
              onChange={(e) => {
                setForm({ ...form, consentimiento: e.target.checked });
                if (e.target.checked) setErrores((x) => ({ ...x, consentimiento: "" }));
              }}
              aria-invalid={errores.consentimiento ? true : undefined}
              aria-describedby={errores.consentimiento ? "lead-consentimiento-error" : undefined}
              className="mt-1 w-5 h-5 accent-[#791E2A] shrink-0"
            />
            <div>
              <label htmlFor="lead-consentimiento" className="text-sm text-[#5A4F48] leading-relaxed">
                Acepto la{" "}
                <a href="/politica-privacidad" className="text-[#791E2A] font-semibold underline underline-offset-2">
                  política de privacidad
                </a>
                . Solo usaré tus datos para contactar contigo y valorar tu caso.
              </label>
              {errores.consentimiento && (
                <p id="lead-consentimiento-error" className={ayuda}>{errores.consentimiento}</p>
              )}
            </div>
          </div>

          {errorEnvio && (
            <div
              role="alert"
              className="sm:col-span-2 border border-[#A8323C] bg-[#FBEDED] text-[#7A1F27] rounded-lg px-4 py-3 text-sm leading-relaxed"
            >
              {errorEnvio}
            </div>
          )}

          <div className="sm:col-span-2 mt-1 flex flex-col sm:flex-row-reverse gap-3">
            <button
              type="button"
              onClick={enviar}
              disabled={enviando}
              className="flex-1 bg-[#791E2A] text-[#FAFAFA] py-4 rounded-lg font-semibold text-base hover:bg-[#611722] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#791E2A] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {enviando ? "Enviando…" : "Enviar candidatura"}
            </button>
            <button
              type="button"
              onClick={() => setPaso(1)}
              disabled={enviando}
              className="sm:w-40 border border-[#DBD5C9] text-[#2B231F] py-4 rounded-lg font-semibold text-base hover:border-[#791E2A] hover:text-[#791E2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#791E2A] transition disabled:opacity-60"
            >
              ← Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
