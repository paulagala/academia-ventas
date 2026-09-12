import Link from "next/link";

const recursosData: Record<string, { title: string; tag: string; content: string[] }> = {
  "como-tratar-objeciones-en-ventas": {
    title: "Cómo tratar objeciones en ventas",
    tag: "Objeciones",
    content: [
      "Las objeciones no son rechazos, son peticiones de más información. Un buen vendedor no evita las objeciones: las provoca para resolverlas cuanto antes.",
      "Las 5 objeciones más comunes son: precio, timing, competencia, necesidad de consultar y falta de urgencia. Cada una tiene un marco de respuesta específico.",
      "La técnica más efectiva es Empatizar → Preguntar → Reencuadrar. Primero valida la preocupación, luego profundiza con una pregunta, y finalmente presenta tu propuesta desde otro ángulo.",
      "Nunca respondas una objeción con un argumento. Responde con una pregunta que haga reflexionar al cliente sobre las consecuencias de no actuar.",
      "Practica con role-plays semanales. La gestión de objeciones es una habilidad muscular: se entrena, no se aprende leyendo.",
    ],
  },
  "venta-consultiva": {
    title: "Venta consultiva: guía completa",
    tag: "Metodología",
    content: [
      "La venta consultiva consiste en posicionarte como asesor de confianza, no como vendedor. Tu objetivo es diagnosticar antes de prescribir.",
      "El proceso tiene 4 fases: Investigación, Diagnóstico, Propuesta de solución y Acompañamiento en la decisión.",
      "Las preguntas son tu herramienta principal. Usa preguntas de situación, problema, implicación y necesidad-beneficio (framework SPIN).",
      "Nunca presentes tu solución antes de que el cliente haya verbalizado su problema y sus consecuencias. Si lo haces, estás vendiendo. Si esperas, estás asesorando.",
      "La venta consultiva funciona especialmente bien en servicios, B2B y tickets altos, donde la confianza es el factor decisivo.",
    ],
  },
  "guion-de-ventas": {
    title: "Guión de ventas: cómo crearlo paso a paso",
    tag: "Herramientas",
    content: [
      "Un guión de ventas no es un texto para leer literalmente. Es una estructura que te asegura cubrir todos los puntos clave sin improvisar.",
      "Estructura básica: Apertura (romper el hielo) → Contexto (por qué estamos hablando) → Diagnóstico (preguntas) → Presentación de valor → Cierre.",
      "La apertura debe durar máximo 30 segundos. Preséntate, agradece el tiempo y establece la agenda de la conversación.",
      "La fase de diagnóstico es la más importante: dedica al menos el 40% del tiempo a hacer preguntas y escuchar.",
      "Personaliza el guión para cada tipo de cliente. Un guión genérico se nota. Ten versiones para cada segmento o buyer persona.",
    ],
  },
  "cierre-de-ventas": {
    title: "Cierre de ventas: técnicas y ejemplos",
    tag: "Cierre",
    content: [
      "El cierre no es un momento mágico al final de la reunión. Es el resultado natural de un proceso bien ejecutado.",
      "Cierre por resumen: recapitula los beneficios acordados y pregunta directamente si quiere avanzar.",
      "Cierre por alternativa: en lugar de preguntar sí o no, ofrece dos opciones válidas. '¿Prefieres empezar con el plan mensual o el trimestral?'",
      "Cierre por urgencia: sin manipular, presenta razones reales por las que actuar ahora es mejor que esperar.",
      "La mejor técnica de cierre es haber hecho un diagnóstico tan bueno que el cliente se cierra solo. Si tienes que forzar, algo falló antes.",
    ],
  },
  "preguntas-de-indagacion": {
    title: "Preguntas de indagación en ventas",
    tag: "Diagnóstico",
    content: [
      "Las preguntas de indagación te permiten entender la situación real del cliente, más allá de lo que dice en la superficie.",
      "Tipos de preguntas: abiertas (exploran), cerradas (confirman), de implicación (hacen consciente el coste del problema) y de proyección (visualizan la solución).",
      "Ejemplos de preguntas poderosas: '¿Qué pasa si no resolvéis esto en los próximos 6 meses?' '¿Cuánto os está costando este problema cada mes?'",
      "La regla del 70/30: el cliente debería hablar el 70% del tiempo. Si hablas más tú, estás presentando, no diagnosticando.",
      "Prepara siempre al menos 10 preguntas antes de cada reunión. No las leas, pero tenlas como referencia para no perder el hilo.",
    ],
  },
};

export default async function RecursoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recurso = recursosData[slug];

  if (!recurso) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl text-primary mb-4">Recurso no encontrado</h1>
        <Link href="/recursos" className="text-accent hover:underline">Ver todos los recursos</Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-surface py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/recursos" className="text-sm text-accent hover:underline mb-4 inline-block">&larr; Todos los recursos</Link>
          <span className="block text-xs bg-secondary/10 text-secondary px-2.5 py-1 rounded-full font-medium w-fit mb-4">{recurso.tag}</span>
          <h1 className="text-3xl sm:text-4xl text-primary">{recurso.title}</h1>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          {recurso.content.map((paragraph, i) => (
            <p key={i} className="text-text-muted leading-relaxed">{paragraph}</p>
          ))}
          <div className="mt-8 bg-primary/5 rounded-[var(--radius-card)] p-8 text-center border border-primary/10">
            <h3 className="text-xl text-primary mb-3 font-[family-name:var(--font-dm-serif)]">¿Quieres profundizar?</h3>
            <p className="text-text-muted text-sm mb-6">Explora nuestros cursos para dominar esta habilidad con práctica y acompañamiento</p>
            <Link href="/cursos" className="inline-block bg-accent text-surface font-semibold px-8 py-3 rounded-[var(--radius-button)] hover:bg-accent-hover transition">
              Ver cursos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
