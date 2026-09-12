"use client";

import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-3 py-1 rounded-full mb-4">
          Newsletter semanal
        </span>
        <h1 className="text-3xl sm:text-4xl text-primary mb-4">
          Una lección de ventas cada semana
        </h1>
        <p className="text-lg text-text-muted mb-8">
          Cada martes recibirás una técnica, un caso real o una reflexión sobre ventas
          que puedes aplicar ese mismo día. Sin humo, sin relleno.
        </p>

        {submitted ? (
          <div className="bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-8 border border-border">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-text mb-2 font-[family-name:var(--font-dm-serif)]">¡Suscripción confirmada!</h3>
            <p className="text-text-muted text-sm">Revisa tu email. El próximo martes recibirás tu primera lección.</p>
          </div>
        ) : (
          <div className="bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-8 border border-border">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border border-border rounded-[var(--radius-button)] px-4 py-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary"
              />
              <button
                onClick={() => setSubmitted(true)}
                className="bg-accent text-surface px-6 py-3 rounded-[var(--radius-button)] font-medium hover:bg-accent-hover transition"
              >
                Suscribirme
              </button>
            </div>
            <p className="text-xs text-muted mt-4">+500 suscriptores. Puedes darte de baja cuando quieras.</p>
          </div>
        )}

        <div className="mt-12 grid sm:grid-cols-3 gap-6 text-left">
          {[
            { title: "Práctica", desc: "Cada email incluye una acción concreta que puedes aplicar ese mismo día." },
            { title: "Breve", desc: "3 minutos de lectura. Sin rodeos, sin teoría innecesaria." },
            { title: "Gratis", desc: "100% gratuita. Sin ventas agresivas, solo valor." },
          ].map((item) => (
            <div key={item.title} className="bg-background rounded-[var(--radius-card)] p-6 border border-border">
              <h3 className="font-semibold text-text mb-1 text-sm font-[family-name:var(--font-dm-serif)]">{item.title}</h3>
              <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
