"use client";

import { useState } from "react";

export default function LeadForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    vende: "",
    equipo: "",
    problema: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const input =
    "w-full border border-[#DBD5C9] rounded-lg px-4 py-3 text-sm bg-[#FAFAFA] text-[#2B231F] placeholder:text-[#9d9186] focus:outline-none focus:ring-2 focus:ring-[#61948F]/40 focus:border-[#61948F]";
  const label = "block text-sm font-medium text-[#2B231F] mb-1.5";

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-[#E3E5DC] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-[#61948F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl text-[#2B231F] mb-2 font-[family-name:var(--font-dm-serif)]">
          Solicitud recibida
        </h3>
        <p className="text-[#7A6F66] text-sm max-w-sm mx-auto">
          Gracias. Revisaré tu caso y te escribiré para valorar si tiene sentido que trabajemos juntos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <label className={label}>Nombre</label>
        <input className={input} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Tu nombre" />
      </div>
      <div>
        <label className={label}>Email</label>
        <input type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@email.com" />
      </div>
      <div>
        <label className={label}>Teléfono</label>
        <input type="tel" className={input} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="Opcional" />
      </div>
      <div>
        <label className={label}>Web o empresa</label>
        <input className={input} value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} placeholder="tuempresa.com" />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>¿Qué vendes?</label>
        <input className={input} value={form.vende} onChange={(e) => setForm({ ...form, vende: e.target.value })} placeholder="Servicios, formación, consultoría…" />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>¿Tienes equipo comercial?</label>
        <select
          className={`${input} ${form.equipo ? "" : "text-[#9d9186]"}`}
          value={form.equipo}
          onChange={(e) => setForm({ ...form, equipo: e.target.value })}
        >
          <option value="">Selecciona una opción</option>
          <option value="si">Sí, tengo equipo comercial</option>
          <option value="fundador">No, vendo yo (fundador/a)</option>
          <option value="montando">Estoy montándolo ahora</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={label}>¿Cuál es tu principal problema comercial?</label>
        <textarea
          rows={4}
          className={`${input} resize-none`}
          value={form.problema}
          onChange={(e) => setForm({ ...form, problema: e.target.value })}
          placeholder="Cuéntame brevemente en qué punto está tu proceso comercial."
        />
      </div>
      <div className="sm:col-span-2 mt-1">
        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-[#791E2A] text-[#FAFAFA] py-4 rounded-lg font-semibold text-base hover:bg-[#611722] transition"
        >
          Solicitar diagnóstico comercial
        </button>
        <p className="text-xs text-[#7A6F66] text-center mt-3">
          Sin spam. Solo usaré tus datos para contactar contigo y valorar tu caso.
        </p>
      </div>
    </div>
  );
}
