import Link from "next/link";

export default function FloatingButton() {
  return (
    <Link
      href="/contacto"
      className="label-mono fixed bottom-6 right-6 bg-text text-surface px-5 py-3 rounded-[var(--radius-button)] shadow-[var(--shadow-soft)] hover:bg-accent transition flex items-center gap-2 z-40 border border-text"
    >
      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
      Contactar
    </Link>
  );
}
