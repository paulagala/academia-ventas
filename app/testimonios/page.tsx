import PageHeader from "../components/PageHeader";

const testimonials = [
  { name: "Carlos Martínez", role: "Director Comercial, TechSolutions", text: "En 3 meses mi equipo pasó de cerrar el 15% al 28% de las oportunidades. La metodología es clara y directa.", initials: "CM" },
  { name: "Laura Sánchez", role: "Account Executive, SaaS Corp", text: "El curso de venta consultiva cambió mi forma de abordar reuniones. Ahora los clientes me buscan a mí.", initials: "LS" },
  { name: "Miguel Torres", role: "Freelance, Consultoría", text: "Como autónomo no sabía vender mis servicios. Ahora facturo un 60% más con la mitad de propuestas.", initials: "MT" },
  { name: "Ana Ruiz", role: "SDR, Startup Fintech", text: "Pasé de 2 reuniones al mes a 8 aplicando las técnicas de prospección del curso de Fundamentos.", initials: "AR" },
  { name: "David López", role: "CEO, Agencia Digital", text: "Contraté la formación para mi equipo de 5 comerciales. En 2 meses recuperamos la inversión x3.", initials: "DL" },
  { name: "Marta Fernández", role: "Closer, High-ticket", text: "El programa de closers me dio la estructura que necesitaba. Ahora cierro el 35% de las llamadas.", initials: "MF" },
  { name: "Javier García", role: "Consultor independiente", text: "La newsletter semanal es oro puro. Cada martes aplico algo nuevo. Llevo 6 meses suscrito.", initials: "JG" },
  { name: "Elena Martín", role: "Head of Sales, EdTech", text: "La formación para equipos nos ayudó a alinear mensaje, proceso y métricas. Nuestro pipeline creció un 45%.", initials: "EM" },
  { name: "Pablo Díaz", role: "Responsable Comercial, Industria", text: "Venía de venta tradicional B2B. El enfoque consultivo me abrió puertas que antes ni sabía que existían.", initials: "PD" },
];

export default function TestimoniosPage() {
  return (
    <>
      <PageHeader
        tag="Testimonios"
        title="Lo que dicen nuestros alumnos"
        description="Resultados reales de profesionales que han pasado por nuestra formación"
      />
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-surface rounded-[var(--radius-card)] p-8 border border-border shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-text text-sm">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
              <p className="text-text-muted text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
