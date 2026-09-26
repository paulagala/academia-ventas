import Link from "next/link";

// [texto](/ruta) → enlace interno. Solo rutas que empiezan por «/»: un enlace
// externo o mal formado se queda como texto plano, nunca como enlace roto.
const ENLACE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/**
 * Pinta un párrafo de artículo convirtiendo los enlaces internos que escribe el
 * generador (scripts/videos) en <Link>. Es el interlinking dentro del texto; el
 * de final de página lo pone relacionados() en app/videos/videos.ts.
 */
export default function TextoConEnlaces({ texto }: { texto: string }) {
  const trozos: React.ReactNode[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(ENLACE)) {
    const i = m.index ?? 0;
    if (i > ultimo) trozos.push(texto.slice(ultimo, i));
    trozos.push(
      <Link key={i} href={m[2]} className="text-accent font-medium underline underline-offset-2 hover:no-underline">
        {m[1]}
      </Link>,
    );
    ultimo = i + m[0].length;
  }
  if (ultimo < texto.length) trozos.push(texto.slice(ultimo));
  return <>{trozos}</>;
}

/** El mismo texto sin la sintaxis de enlace, para metadatos y JSON-LD. */
export function textoPlano(texto: string): string {
  return texto.replace(ENLACE, "$1");
}
