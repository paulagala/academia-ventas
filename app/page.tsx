"use client";

import { useState } from "react";
import Link from "next/link";

function Hero() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ nombre: "", email: "", nivel: "" });

  return (
    <section className="bg-surface bg-blueprint border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="label-mono text-accent">Formación en ventas</span>
            <span className="w-12 h-px bg-line" />
            <span className="label-mono text-muted">consultiva</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary leading-[1.05] mb-6">
            Vender con método,{" "}
            <span className="text-accent">no con presión.</span>
          </h1>
          <p className="text-lg text-text-muted mb-8 max-w-lg leading-relaxed">
            Formación práctica en venta consultiva: diagnóstico, estructura y criterio
            para cerrar más sin sonar agresivo.
          </p>
          <div className="flex items-center gap-4 border-t border-line pt-6">
            <div className="flex -space-x-px">
              {["P", "M", "A", "L"].map((letter, i) => (
                <div
                  key={i}
                  className="w-9 h-9 bg-surface border border-line flex items-center justify-center text-xs font-bold text-secondary num-mono"
                >
                  {letter}
                </div>
              ))}
            </div>
            <span className="label-mono text-muted">+500 alumnos formados</span>
          </div>
        </div>

        <div className="bg-surface border border-line rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-line">
            <span className="label-mono text-text-muted">Acceso gratuito</span>
            <span className="label-mono text-muted">{String(step).padStart(2, "0")} / 03</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 ${s <= step ? "bg-accent" : "bg-surface-muted"}`}
              />
            ))}
          </div>

          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-text mb-1 font-[family-name:var(--font-dm-serif)]">Tu nombre</h3>
              <p className="text-sm text-text-muted mb-4">Para personalizar tu experiencia</p>
              <input
                type="text"
                placeholder="Ej: Paula García"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full border border-line rounded-[var(--radius-button)] px-4 py-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
              />
              <button
                onClick={() => setStep(2)}
                className="label-mono mt-4 w-full bg-accent text-surface py-3.5 rounded-[var(--radius-button)] hover:bg-accent-hover transition"
              >
                Siguiente →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-text mb-1 font-[family-name:var(--font-dm-serif)]">Tu email</h3>
              <p className="text-sm text-text-muted mb-4">Te enviaremos acceso al curso gratuito</p>
              <input
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-line rounded-[var(--radius-button)] px-4 py-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setStep(1)}
                  className="label-mono flex-1 border border-line text-text py-3.5 rounded-[var(--radius-button)] hover:bg-surface-muted transition"
                >
                  ← Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="label-mono flex-1 bg-accent text-surface py-3.5 rounded-[var(--radius-button)] hover:bg-accent-hover transition"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-text mb-1 font-[family-name:var(--font-dm-serif)]">Tu nivel</h3>
              <p className="text-sm text-text-muted mb-4">Para recomendarte el mejor curso</p>
              <div className="flex flex-col gap-2">
                {["Empiezo desde cero", "Algo de experiencia", "Profesional con experiencia"].map(
                  (nivel) => (
                    <button
                      key={nivel}
                      onClick={() => setFormData({ ...formData, nivel })}
                      className={`text-left px-4 py-3 rounded-[var(--radius-button)] border text-sm transition ${
                        formData.nivel === nivel
                          ? "border-secondary bg-secondary/10 text-secondary font-medium"
                          : "border-line hover:border-secondary/50"
                      }`}
                    >
                      {nivel}
                    </button>
                  )
                )}
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setStep(2)}
                  className="label-mono flex-1 border border-line text-text py-3.5 rounded-[var(--radius-button)] hover:bg-surface-muted transition"
                >
                  ← Atrás
                </button>
                <button className="label-mono flex-1 bg-accent text-surface py-3.5 rounded-[var(--radius-button)] hover:bg-accent-hover transition">
                  Acceder gratis
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  const stats = [
    { value: "+500", label: "Alumnos formados" },
    { value: "98%", label: "Satisfacción" },
    { value: "12", label: "Cursos" },
    { value: "24h", label: "Soporte" },
  ];
  return (
    <section className="bg-background border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-line border-x border-line">
        {stats.map((s) => (
          <div key={s.label} className="py-10 px-6 text-center">
            <div className="text-4xl sm:text-5xl text-primary font-[family-name:var(--font-dm-serif)]">{s.value}</div>
            <div className="label-mono text-muted mt-2">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const reasons = [
    {
      num: "01",
      title: "Metodología práctica",
      desc: "Aprende con casos reales de empresas, no con teoría abstracta. Cada lección incluye ejercicios aplicables.",
    },
    {
      num: "02",
      title: "Comunidad activa",
      desc: "Una red de comerciales que comparten estrategias, cierres y aprendizajes cada semana.",
    },
    {
      num: "03",
      title: "Resultados medibles",
      desc: "Nuestros alumnos aumentan su ratio de cierre un 40% de media en los primeros 3 meses.",
    },
  ];
  return (
    <section className="py-20 bg-surface border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <span className="label-mono text-accent">Por qué nosotros</span>
          <span className="flex-1 h-px bg-line" />
          <span className="label-mono text-muted">03 puntos</span>
        </div>
        <div className="grid md:grid-cols-3 border-t border-l border-line">
          {reasons.map((r) => (
            <div key={r.num} className="border-r border-b border-line p-8 bg-surface">
              <div className="num-mono text-accent text-sm mb-6">{r.num} /</div>
              <h3 className="text-xl text-text mb-3 font-[family-name:var(--font-dm-serif)]">{r.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Courses() {
  const courses = [
    { title: "Fundamentos de la Venta", desc: "Domina las bases: prospección, cualificación y primer contacto.", level: "Principiante", lessons: "8 lecciones", slug: "fundamentos-venta" },
    { title: "Técnicas de Cierre", desc: "Aprende 12 técnicas de cierre probadas en B2B y B2C.", level: "Intermedio", lessons: "10 lecciones", slug: "tecnicas-cierre" },
    { title: "Venta Consultiva", desc: "Posiciónate como asesor, no como vendedor. Vende soluciones.", level: "Avanzado", lessons: "12 lecciones", slug: "programa-ventas-consultivas" },
    { title: "Negociación Estratégica", desc: "Gestiona objeciones y negocia sin ceder en precio.", level: "Intermedio", lessons: "9 lecciones", slug: "negociacion-estrategica" },
    { title: "Social Selling", desc: "Usa LinkedIn y redes sociales para generar oportunidades.", level: "Principiante", lessons: "7 lecciones", slug: "social-selling" },
    { title: "Liderazgo Comercial", desc: "Gestiona equipos de ventas, KPIs y pipelines como un líder.", level: "Avanzado", lessons: "14 lecciones", slug: "liderazgo-comercial" },
  ];
  return (
    <section className="py-20 bg-background border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <span className="label-mono text-accent">Catálogo</span>
          <span className="flex-1 h-px bg-line" />
          <span className="label-mono text-muted">06 cursos</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {courses.map((c, i) => (
            <Link
              key={c.slug}
              href={`/cursos/${c.slug}`}
              className="border-r border-b border-line p-7 bg-surface hover:bg-surface-muted transition group"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="num-mono text-accent text-sm">{String(i + 1).padStart(2, "0")}</span>
                <span className="label-mono text-muted">{c.level}</span>
              </div>
              <h3 className="text-lg text-text mb-2 group-hover:text-accent transition font-[family-name:var(--font-dm-serif)]">{c.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-5">{c.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-line">
                <span className="label-mono text-muted">{c.lessons}</span>
                <span className="text-accent group-hover:translate-x-1 transition">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-secondary text-surface bg-blueprint">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="label-mono text-surface/60">Empieza hoy</span>
        <h2 className="text-3xl sm:text-4xl text-surface mt-4 mb-5">Empieza a vender mejor hoy</h2>
        <p className="text-surface/70 mb-8 max-w-lg mx-auto leading-relaxed">
          Accede gratis al curso de Fundamentos de la Venta y mejora tus resultados desde la primera semana.
        </p>
        <Link
          href="/contacto"
          className="label-mono inline-block bg-accent text-surface px-8 py-4 rounded-[var(--radius-button)] hover:bg-accent-hover transition"
        >
          Empezar gratis →
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <WhyUs />
      <Courses />
      <CTASection />
    </>
  );
}
