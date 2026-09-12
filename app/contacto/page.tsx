"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Contacto
          </span>
          <h1 className="text-3xl sm:text-4xl text-primary mb-6">Hablemos</h1>
          <p className="text-lg text-text-muted mb-8">
            ¿Tienes dudas sobre un curso? ¿Quieres formación para tu equipo? ¿O simplemente
            quieres saber si esto es para ti? Escríbeme y te respondo en menos de 24h.
          </p>
          <div className="flex flex-col gap-4 text-sm text-text-muted">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hola@academiaventas.com
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Respuesta en menos de 24h
            </div>
          </div>
        </div>

        <div className="bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-8 border border-border">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text mb-2 font-[family-name:var(--font-dm-serif)]">¡Mensaje enviado!</h3>
              <p className="text-text-muted text-sm">Te responderé en menos de 24 horas.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full border border-border rounded-[var(--radius-button)] px-4 py-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full border border-border rounded-[var(--radius-button)] px-4 py-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">¿Sobre qué quieres hablar?</label>
                <select className="w-full border border-border rounded-[var(--radius-button)] px-4 py-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary text-text-muted">
                  <option>Información sobre un curso</option>
                  <option>Formación para mi equipo</option>
                  <option>Colaboración o partnership</option>
                  <option>Otro tema</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Mensaje</label>
                <textarea
                  rows={4}
                  placeholder="Cuéntame cómo puedo ayudarte..."
                  className="w-full border border-border rounded-[var(--radius-button)] px-4 py-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary resize-none"
                />
              </div>
              <button
                onClick={() => setSubmitted(true)}
                className="w-full bg-accent text-surface py-3 rounded-[var(--radius-button)] font-medium hover:bg-accent-hover transition"
              >
                Enviar mensaje
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
