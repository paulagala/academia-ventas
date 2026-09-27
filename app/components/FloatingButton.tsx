import Link from "next/link";
import { Simbolo } from "./Logo";

export default function FloatingButton() {
  return (
    <Link
      href="/#formulario"
      className="fixed bottom-6 right-6 min-h-12 bg-accent text-surface px-5 py-3 rounded-[var(--radius-button)] shadow-[var(--shadow-soft)] hover:bg-accent-hover transition flex items-center gap-2 text-sm font-semibold z-40"
    >
      <Simbolo className="w-3.5 h-3.5 text-surface/85" />
      Solicitar diagnóstico
    </Link>
  );
}
