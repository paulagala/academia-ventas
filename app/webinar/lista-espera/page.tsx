"use client";

import { useState } from "react";

export default function ListaEspera() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-secondary/10 text-primary text-sm font-semibold px-3 py-1 rounded-[var(--radius-button)] mb-4">
          Próximamente
        </span>
        <h1 className="text-3xl sm:text-4xl text-text mb-4 font-[family-name:var(--font-dm-serif)]">
          Nuevo webinar en preparación
        </h1>
        <p className="text-lg text-text-muted mb-8">
          Estamos preparando el próximo webinar. Apúntate a la lista de espera y serás
          el primero en enterarte.
        </p>

        {submitted ? (
          <div className="bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-8 border border-border">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl text-text mb-2 font-[family-name:var(--font-dm-serif)]">¡Estás en la lista!</h3>
            <p className="text-text-muted text-sm">Te avisaremos en cuanto abramos plazas.</p>
          </div>
        ) : (
          <div className="bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-8 border border-border">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <button
                onClick={() => setSubmitted(true)}
                className="bg-accent text-surface px-6 py-3 rounded-lg font-medium hover:bg-accent-hover transition"
              >
                Apuntarme
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
