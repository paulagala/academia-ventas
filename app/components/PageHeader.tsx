export default function PageHeader({
  tag,
  title,
  description,
}: {
  tag?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-surface border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="label-mono text-accent">{tag ?? "Índice"}</span>
          <span className="flex-1 h-px bg-line" />
          <span className="label-mono text-muted">AV—01</span>
        </div>
        <h1 className="text-4xl sm:text-5xl text-primary max-w-3xl">{title}</h1>
        {description && (
          <p className="text-lg text-text-muted max-w-2xl mt-5">{description}</p>
        )}
      </div>
    </div>
  );
}
