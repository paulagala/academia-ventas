import { Simbolo } from "./Logo";

export default function PageHeader({
  tag,
  title,
  description,
  marca,
}: {
  tag?: string;
  title: string;
  description?: string;
  /** Marca de agua a la derecha del tag. Sin ella no se pinta nada.
   *  Venía fija como «AV—01», de cuando el sitio era Academia Ventas;
   *  ahora la marca es Galador y ese código no significa nada. */
  marca?: string;
}) {
  return (
    <div className="bg-surface border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="label-mono text-accent">{tag ?? "Índice"}</span>
          <span className="flex-1 h-px bg-line" />
          {/* Sin marca de texto, la línea acaba en el símbolo de Galador */}
          {marca ? (
            <span className="label-mono text-muted">{marca}</span>
          ) : (
            <Simbolo className="w-4 h-4 text-accent" />
          )}
        </div>
        <h1 className="text-4xl sm:text-5xl text-primary max-w-3xl">{title}</h1>
        {description && (
          <p className="text-lg text-text-muted max-w-2xl mt-5">{description}</p>
        )}
      </div>
    </div>
  );
}
