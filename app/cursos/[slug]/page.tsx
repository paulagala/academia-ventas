import Link from "next/link";

const coursesData: Record<string, { title: string; description: string; level: string; lessons: number; modules: string[] }> = {
  "fundamentos-venta": {
    title: "Fundamentos de la Venta", description: "Domina las bases de la venta profesional: desde la prospección hasta el primer contacto con el cliente. Aprende a cualificar oportunidades y a preparar reuniones comerciales efectivas.", level: "Principiante", lessons: 8,
    modules: ["Introducción a la venta profesional", "Prospección efectiva", "Cualificación de oportunidades", "El primer contacto", "Preparación de la reunión", "Presentación de valor", "Seguimiento comercial", "Plan de acción personal"],
  },
  "tecnicas-cierre": {
    title: "Técnicas de Cierre", description: "Aprende 12 técnicas de cierre probadas en entornos B2B y B2C. Desde el cierre por resumen hasta el cierre por urgencia, cada técnica incluye guiones y ejercicios.", level: "Intermedio", lessons: 10,
    modules: ["Psicología del cierre", "Señales de compra", "Cierre por resumen", "Cierre por alternativa", "Cierre por urgencia", "Cierre consultivo", "Gestión de la indecisión", "Negociación final", "Role-plays de cierre", "Tu toolkit de cierre"],
  },
  "negociacion-estrategica": {
    title: "Negociación Estratégica", description: "Gestiona objeciones con confianza y negocia condiciones favorables sin ceder en precio.", level: "Intermedio", lessons: 9,
    modules: ["Fundamentos de negociación", "Preparación estratégica", "BATNA y zona de acuerdo", "Gestión de objeciones", "Tácticas de negociación", "Negociación de precio", "Negociación en equipo", "Cierre del acuerdo", "Plan de negociación personal"],
  },
  "social-selling": {
    title: "Social Selling", description: "Usa LinkedIn y redes sociales para generar oportunidades de negocio de forma orgánica.", level: "Principiante", lessons: 7,
    modules: ["Qué es el Social Selling", "Optimiza tu perfil de LinkedIn", "Estrategia de contenidos", "Prospección en LinkedIn", "Mensajes que generan respuesta", "Construye tu marca personal", "Plan de Social Selling"],
  },
  "liderazgo-comercial": {
    title: "Liderazgo Comercial", description: "Aprende a gestionar equipos de ventas, definir KPIs, construir pipelines y liderar con datos y motivación.", level: "Avanzado", lessons: 14,
    modules: ["El rol del líder comercial", "Selección de vendedores", "Onboarding comercial", "Definición de KPIs", "Gestión del pipeline", "Reuniones de equipo efectivas", "Coaching comercial", "Motivación y retención", "Previsión de ventas", "CRM y herramientas", "Gestión del rendimiento", "Cultura comercial", "Escalado del equipo", "Plan de liderazgo"],
  },
};

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = coursesData[slug];

  if (!course) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl text-primary mb-4">Curso no encontrado</h1>
        <Link href="/cursos" className="text-accent hover:underline">Ver todos los cursos</Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-surface py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cursos" className="text-sm text-accent hover:underline mb-4 inline-block">&larr; Todos los cursos</Link>
          <div className="flex gap-3 mb-4">
            <span className="text-xs bg-secondary/10 text-secondary px-2.5 py-1 rounded-full font-medium">{course.level}</span>
            <span className="text-xs bg-surface-muted text-muted px-2.5 py-1 rounded-full">{course.lessons} lecciones</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-primary mb-4">{course.title}</h1>
          <p className="text-lg text-text-muted max-w-2xl">{course.description}</p>
          <Link
            href="/contacto"
            className="mt-8 inline-block bg-accent text-surface font-semibold px-8 py-3 rounded-[var(--radius-button)] hover:bg-accent-hover transition"
          >
            Inscribirme a este curso
          </Link>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl text-primary mb-8">Temario del curso</h2>
          <div className="flex flex-col gap-3">
            {course.modules.map((mod, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-surface rounded-[var(--radius-button)] border border-border">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-text text-sm font-medium">{mod}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
