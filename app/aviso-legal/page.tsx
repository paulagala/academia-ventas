export default function AvisoLegal() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl text-text mb-8 font-[family-name:var(--font-dm-serif)]">Aviso Legal</h1>
        <div className="flex flex-col gap-6 text-text-muted text-sm leading-relaxed">
          <h2 className="text-lg font-semibold text-text mt-4 font-[family-name:var(--font-dm-serif)]">1. Datos identificativos</h2>
          <p>Este sitio web es propiedad de AcademiaVentas. Email de contacto: hola@academiaventas.com.</p>

          <h2 className="text-lg font-semibold text-text mt-4 font-[family-name:var(--font-dm-serif)]">2. Objeto</h2>
          <p>Este sitio web tiene como finalidad ofrecer información sobre servicios de formación en ventas y facilitar el contacto con posibles clientes.</p>

          <h2 className="text-lg font-semibold text-text mt-4 font-[family-name:var(--font-dm-serif)]">3. Propiedad intelectual</h2>
          <p>Todos los contenidos de este sitio web (textos, imágenes, diseño, logotipos, código fuente) son propiedad de AcademiaVentas o se utilizan con licencia. Queda prohibida su reproducción sin autorización.</p>

          <h2 className="text-lg font-semibold text-text mt-4 font-[family-name:var(--font-dm-serif)]">4. Limitación de responsabilidad</h2>
          <p>AcademiaVentas no garantiza resultados específicos derivados de la formación. Los testimonios reflejan experiencias individuales y los resultados pueden variar.</p>

          <h2 className="text-lg font-semibold text-text mt-4 font-[family-name:var(--font-dm-serif)]">5. Enlaces externos</h2>
          <p>Este sitio puede contener enlaces a sitios de terceros. AcademiaVentas no se hace responsable del contenido de esos sitios.</p>

          <h2 className="text-lg font-semibold text-text mt-4 font-[family-name:var(--font-dm-serif)]">6. Legislación aplicable</h2>
          <p>Este aviso legal se rige por la legislación española. Para cualquier controversia, serán competentes los juzgados y tribunales del domicilio del usuario.</p>
        </div>
      </div>
    </section>
  );
}
