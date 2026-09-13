import Link from "next/link";

export default function FloatingButton() {
  return (
    <Link
      href="/#formulario"
      className="fixed bottom-6 right-6 bg-accent text-surface px-5 py-3 rounded-[var(--radius-button)] shadow-[var(--shadow-soft)] hover:bg-accent-hover transition flex items-center gap-2 text-sm font-semibold z-40"
    >
      <span className="w-1.5 h-1.5 bg-surface/80 rounded-full" />
      Solicitar diagnóstico
    </Link>
  );
}
