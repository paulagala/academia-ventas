/**
 * ── Del canal de YouTube a la web ──
 *
 * Lo lanza cada mañana .github/workflows/videos-a-articulos.yml. Por cada vídeo
 * público del canal que aún no está en la web:
 *   1. descarga sus subtítulos (la transcripción) con la API de YouTube,
 *   2. le pide a Claude el artículo SEO, con enlaces a los otros artículos
 *      (con Claude Code y la suscripción de Paula: no se paga aparte),
 *   3. añade la entrada a app/videos/videos.json en una rama video/{id},
 *   4. abre un PR para que Paula lo lea en la vista previa de Vercel y lo apruebe.
 *
 * Cerrar el PR sin aprobarlo = descartar ese vídeo: no se vuelve a proponer.
 * Además, mantiene al día los PRs abiertos cuando main cambia, para que dos
 * vídeos pendientes a la vez no choquen al aprobarlos.
 *
 * Variables de entorno (secretos del repo en GitHub):
 *   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN,
 *   CLAUDE_CODE_OAUTH_TOKEN (sale de `claude setup-token`; caduca al año)
 * Opcionales:
 *   VIDEO_ID       procesa solo ese vídeo, aunque ya esté publicado (regenera su artículo)
 *   SOLO_REBASE=1  no busca vídeos nuevos; solo pone al día los PRs abiertos
 *   SIN_PR=1       deja el resultado en videos.json en local, sin ramas ni PR (pruebas)
 *   TRANSCRIPCION  ruta a un .txt/.srt/.vtt: con VIDEO_ID de un vídeo que ya está en la
 *                  web, regenera su artículo sin tocar Google (pruebas en local)
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, "../..");
const RUTA_VIDEOS = "app/videos/videos.json";
const GUIA = fs.readFileSync(path.join(AQUI, "guia-editorial.md"), "utf8");

/** Alias de Claude Code: el Opus más reciente que incluya la suscripción. */
const MODELO = "opus";
/** Solo vídeos publicados desde esta fecha. Los anteriores, a mano con VIDEO_ID. */
const DESDE = "2026-09-13";
/** Por debajo de esto es un Short: no da para artículo. */
const DURACION_MINIMA_S = 180;
/** Un PR por vídeo; con esto un atasco de vídeos no llena GitHub de golpe. */
const MAXIMO_POR_EJECUCION = 2;

/** Páginas de servicio a las que los artículos pueden enlazar. */
const LANDINGS = [
  {
    ruta: "/",
    titulo: "Diagnóstico comercial con Paula Gallego (home)",
    resumen: "Qué hace Paula, para quién es, casos y el formulario para pedir el diagnóstico.",
  },
  {
    ruta: "/consultoria-comercial",
    titulo: "Qué es una consultoría comercial y para quién",
    resumen:
      "Qué incluye y qué no: diagnóstico sobre llamadas reales, construcción del proceso y entrenamiento de quien vende.",
  },
  {
    ruta: "/sistema-de-ventas",
    titulo: "Cómo construir un sistema de ventas que escale",
    resumen:
      "Proceso, cualificación, guiones, seguimiento y métricas para que la venta no dependa de quién coja el teléfono.",
  },
  {
    ruta: "/entrenamiento-comercial",
    titulo: "Entrenamiento comercial para equipos de ventas",
    resumen:
      "Entrenamiento sobre llamadas reales grabadas y anotadas: indagación, objeciones, estructura y cierre.",
  },
];

const env = process.env;

// ─── Utilidades ────────────────────────────────────────────────────────────

function sh(cmd, args, opciones = {}) {
  return execFileSync(cmd, args, { cwd: RAIZ, encoding: "utf8", ...opciones }).trim();
}

function leerVideos(texto = fs.readFileSync(path.join(RAIZ, RUTA_VIDEOS), "utf8")) {
  return JSON.parse(texto);
}

function escribirVideos(videos) {
  // Más nuevo arriba: es el orden en que se pintan.
  const ordenados = [...videos].sort((a, b) => b.fecha.localeCompare(a.fecha));
  fs.writeFileSync(path.join(RAIZ, RUTA_VIDEOS), JSON.stringify(ordenados, null, 2) + "\n");
}

/** «PT1H2M3S» → segundos. */
function segundos(iso) {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso) ?? [];
  return Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0);
}

function slugificar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/, "");
}

/** Subtítulos .srt/.vtt → texto corrido, sin números ni marcas de tiempo. */
function subtitulosATexto(sub) {
  const lineas = sub
    .replace(/\r/g, "")
    .split("\n")
    .map((l) => l.replace(/<[^>]+>/g, "").trim())
    .filter((l) => l && l !== "WEBVTT" && !/^\d+$/.test(l) && !l.includes("-->"));
  // Los subtítulos automáticos repiten la línea anterior al solaparse.
  return lineas.filter((l, i) => l !== lineas[i - 1]).join(" ");
}

// ─── YouTube ───────────────────────────────────────────────────────────────

async function tokenGoogle() {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      refresh_token: env.YOUTUBE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const datos = await r.json();
  if (!r.ok) {
    throw new Error(
      `Google no acepta el permiso de YouTube (${datos.error}). Si pone invalid_grant, ` +
        "hay que volver a autorizar: node scripts/videos/autorizar-youtube.mjs",
    );
  }
  return datos.access_token;
}

async function youtube(token, ruta, parametros, { comoTexto = false } = {}) {
  const r = await fetch(
    `https://www.googleapis.com/youtube/v3/${ruta}?${new URLSearchParams(parametros)}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!r.ok) throw new Error(`YouTube ${ruta}: ${r.status} ${await r.text()}`);
  return comoTexto ? r.text() : r.json();
}

/** Los últimos vídeos subidos al canal, con sus datos completos. */
async function ultimosVideos(token, ids) {
  if (!ids) {
    const canal = await youtube(token, "channels", { part: "contentDetails", mine: "true" });
    const subidas = canal.items[0].contentDetails.relatedPlaylists.uploads;
    const lista = await youtube(token, "playlistItems", {
      part: "contentDetails",
      playlistId: subidas,
      maxResults: "15",
    });
    ids = lista.items.map((i) => i.contentDetails.videoId);
  }
  const { items } = await youtube(token, "videos", {
    part: "snippet,contentDetails,status",
    id: ids.join(","),
  });
  return items.map((v) => ({
    youtubeId: v.id,
    titulo: v.snippet.title,
    descripcionYoutube: v.snippet.description,
    fecha: v.snippet.publishedAt.slice(0, 10),
    duracion: v.contentDetails.duration,
    publico: v.status.privacyStatus === "public" && v.status.uploadStatus === "processed",
  }));
}

/** Los subtítulos del vídeo: los que subió Paula si los hay; si no, los automáticos. */
async function transcripcion(token, videoId) {
  const { items } = await youtube(token, "captions", { part: "snippet", videoId });
  const listos = items.filter((c) => c.snippet.status === "serving");
  const es = listos.filter((c) => c.snippet.language?.startsWith("es"));
  const pista =
    es.find((c) => c.snippet.trackKind !== "asr") ?? es.find((c) => c.snippet.trackKind === "asr");
  if (!pista) return null;
  const srt = await youtube(token, `captions/${pista.id}`, { tfmt: "srt" }, { comoTexto: true });
  return subtitulosATexto(srt);
}

// ─── Claude ────────────────────────────────────────────────────────────────

const texto = { type: "string" };
const listaDeTextos = { type: "array", items: texto };
const objeto = (propiedades) => ({
  type: "object",
  properties: propiedades,
  required: Object.keys(propiedades),
  additionalProperties: false,
});

const ESQUEMA = objeto({
  slug: { ...texto, description: "URL corta en minúsculas y guiones, con la palabra clave. Sin tildes." },
  tema: { ...texto, description: "Etiqueta de tema. Reutiliza una de las existentes si encaja." },
  descripcion: { ...texto, description: "Meta description, 140–160 caracteres." },
  etiquetas: { ...listaDeTextos, description: "3–6 conceptos que trata, en minúsculas." },
  puntos: { ...listaDeTextos, description: "3–5 frases: lo que se lleva quien vea el vídeo." },
  articulo: objeto({
    palabraClave: texto,
    tituloSeo: texto,
    intro: listaDeTextos,
    secciones: { type: "array", items: objeto({ titulo: texto, parrafos: listaDeTextos }) },
    faq: { type: "array", items: objeto({ pregunta: texto, respuesta: texto }) },
  }),
  notasParaRevision: {
    ...listaDeTextos,
    description:
      "Lo que Paula debería comprobar: fragmentos que no se entendían, datos dudosos, decisiones tuyas discutibles. Vacío si no hay nada.",
  },
});

async function escribirArticulo(video, textoTranscripcion, publicados) {
  const enlazables = [
    ...publicados
      .filter((v) => v.youtubeId !== video.youtubeId)
      .map((v) => ({ ruta: `/videos/${v.slug}`, titulo: v.titulo, resumen: v.descripcion, tema: v.tema })),
    ...LANDINGS,
  ];
  const temas = [...new Set(publicados.map((v) => v.tema))];

  const peticion = `Escribe el artículo para este vídeo.

<video>
Título en YouTube: ${video.titulo}
Publicado: ${video.fecha}
Descripción en YouTube:
${video.descripcionYoutube || "(vacía)"}
</video>

<transcripcion>
${textoTranscripcion}
</transcripcion>

<paginas_enlazables>
${JSON.stringify(enlazables, null, 2)}
</paginas_enlazables>

<temas_existentes>${temas.join(", ") || "(ninguno todavía)"}</temas_existentes>`;

  // Claude Code en modo no interactivo, con la suscripción de Paula. Sin
  // herramientas (solo escribe) y desde una carpeta vacía, para que no cargue
  // el contexto del repositorio. --json-schema obliga a devolver la ficha
  // con los campos exactos que espera videos.json.
  let salida;
  try {
    salida = execFileSync(
      "claude",
      [
        "-p",
        "--model", MODELO,
        "--output-format", "json",
        "--json-schema", JSON.stringify(ESQUEMA),
        "--system-prompt", GUIA,
        "--tools", "",
      ],
      { cwd: os.tmpdir(), input: peticion, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 20 * 60 * 1000 },
    );
  } catch (e) {
    throw new Error(`Claude Code no ha podido escribir el artículo: ${e.stdout || e.message}`);
  }
  const respuesta = JSON.parse(salida);
  if (respuesta.is_error || !respuesta.structured_output) {
    // Lo más probable: se ha agotado el uso de la suscripción. No se abre PR,
    // así que el vídeo se reintenta solo en la próxima ejecución.
    throw new Error(`Claude no ha devuelto el artículo (${respuesta.subtype}): ${respuesta.result ?? ""}`);
  }
  const resultado = respuesta.structured_output;
  console.log(`  Claude (${Object.keys(respuesta.modelUsage ?? {}).join(", ")}) ha tardado ${Math.round(respuesta.duration_ms / 1000)} s.`);
  return { resultado, rutasValidas: new Set(enlazables.map((e) => e.ruta)) };
}

/**
 * Quita cualquier enlace a una ruta que no exista (Claude se puede inventar una):
 * el texto se queda, el enlace no. Devuelve cuántos enlaces buenos han quedado.
 */
function limpiarEnlaces(articulo, rutasValidas, avisos) {
  let buenos = 0;
  const limpiar = (t) =>
    t.replace(/\[([^\]]+)\]\(([^)]*)\)/g, (_, ancla, ruta) => {
      if (rutasValidas.has(ruta)) {
        buenos++;
        return `[${ancla}](${ruta})`;
      }
      avisos.push(`He quitado un enlace a «${ruta}», que no existe en la web.`);
      return ancla;
    });
  articulo.intro = articulo.intro.map(limpiar);
  for (const s of articulo.secciones) s.parrafos = s.parrafos.map(limpiar);
  for (const f of articulo.faq) f.respuesta = limpiar(f.respuesta);
  return buenos;
}

async function generarEntrada(video, textoTranscripcion, publicados) {
  const { resultado, rutasValidas } = await escribirArticulo(video, textoTranscripcion, publicados);
  const { notasParaRevision, articulo, ...campos } = resultado;
  const avisos = [...notasParaRevision];

  // Un vídeo ya publicado conserva su URL: cambiarla rompería la que Google tiene indexada.
  const existente = publicados.find((v) => v.youtubeId === video.youtubeId);
  const ocupados = new Set(publicados.filter((v) => v !== existente).map((v) => v.slug));
  let slug = existente?.slug ?? (slugificar(campos.slug) || slugificar(video.titulo));
  while (ocupados.has(slug)) slug += "-2";

  const enlaces = limpiarEnlaces(articulo, rutasValidas, avisos);
  if (!articulo.tituloSeo) delete articulo.tituloSeo;
  if (campos.descripcion.length > 165) {
    avisos.push(`La descripción para Google tiene ${campos.descripcion.length} caracteres; Google corta sobre 160.`);
  }
  const palabras = [...articulo.intro, ...articulo.secciones.flatMap((s) => s.parrafos)]
    .join(" ")
    .split(/\s+/).length;

  return {
    entrada: {
      youtubeId: video.youtubeId,
      slug,
      titulo: video.titulo,
      tema: campos.tema,
      descripcion: campos.descripcion,
      fecha: video.fecha,
      duracion: video.duracion,
      etiquetas: campos.etiquetas,
      puntos: campos.puntos,
      articulo,
    },
    avisos,
    enlaces,
    palabras,
  };
}

// ─── GitHub ────────────────────────────────────────────────────────────────

function prsDelVideo(id, estado = "all") {
  const salida = sh("gh", ["pr", "list", "--state", estado, "--head", `video/${id}`, "--json", "number"]);
  return JSON.parse(salida);
}

function cuerpoDelPR({ entrada, avisos, enlaces, palabras }, regenerado) {
  const a = entrada.articulo;
  return `${regenerado ? "Artículo **regenerado**" : "Vídeo nuevo en el canal"}: [${entrada.titulo}](https://www.youtube.com/watch?v=${entrada.youtubeId})

Cuando Vercel termine la vista previa (el comentario de abajo, en 1-2 minutos), ábrela y entra en \`/videos/${entrada.slug}\`.

| | |
|---|---|
| URL | \`/videos/${entrada.slug}\` |
| Búsqueda objetivo | ${a.palabraClave} |
| Título en Google | ${a.tituloSeo ?? entrada.titulo} |
| Tema | ${entrada.tema} |
| Extensión | ${palabras} palabras, ${a.secciones.length} secciones, ${a.faq.length} preguntas |
| Enlaces internos | ${enlaces} |

**Descripción para Google:** ${entrada.descripcion}

### Para revisar
${avisos.length ? avisos.map((n) => `- ${n}`).join("\n") : "- Nada concreto: Claude no ha marcado dudas."}
- Que no diga nada que tú no dirías ni atribuya al vídeo algo que no cuentas en él.

### Qué hacer
- **Está bien** → botón verde *Merge pull request*. En un par de minutos está en la web.
- **Hay que retocar algo** → edita \`app/videos/videos.json\` desde la pestaña *Files changed* (lápiz ✏️), o pídeselo a Claude Code con el número de este PR.
- **No quiero este vídeo en la web** → *Close pull request*. No se vuelve a proponer.
`;
}

function abrirPR(generado, regenerado) {
  const { entrada } = generado;
  const rama = `video/${entrada.youtubeId}`;
  sh("git", ["switch", "-C", rama, "origin/main"]);
  const videos = leerVideos().filter((v) => v.youtubeId !== entrada.youtubeId);
  escribirVideos([...videos, entrada]);
  sh("git", ["add", RUTA_VIDEOS]);
  sh("git", ["commit", "-m", `${regenerado ? "Regenera el artículo" : "Artículo del vídeo"}: ${entrada.titulo}`]);
  sh("git", ["push", "--force", "-u", "origin", rama]);
  if (prsDelVideo(entrada.youtubeId, "open").length === 0) {
    const cuerpo = path.join(RAIZ, ".pr-video.md");
    fs.writeFileSync(cuerpo, cuerpoDelPR(generado, regenerado));
    const titulo = `${regenerado ? "Artículo regenerado" : "Vídeo nuevo"}: ${entrada.titulo}`;
    const url = sh("gh", ["pr", "create", "--base", "main", "--head", rama, "--title", titulo, "--body-file", cuerpo]);
    fs.rmSync(cuerpo);
    console.log(`  PR abierto: ${url}`);
  }
  sh("git", ["switch", "main"]);
}

/**
 * Cada PR de vídeo añade una entrada al principio de videos.json. Si hay dos
 * abiertos y se aprueba uno, el otro choca. Aquí se rehace cada rama pendiente
 * sobre el main actual: mismo artículo, nada más cambia.
 */
function ponerAlDiaPRsAbiertos() {
  const abiertos = JSON.parse(
    sh("gh", ["pr", "list", "--state", "open", "--json", "headRefName", "--limit", "50"]),
  ).filter((p) => p.headRefName.startsWith("video/"));

  for (const { headRefName: rama } of abiertos) {
    const id = rama.slice("video/".length);
    sh("git", ["fetch", "origin", rama]);
    const detras = sh("git", ["rev-list", "--count", `origin/${rama}..origin/main`]);
    if (detras === "0") continue;
    const entrada = leerVideos(sh("git", ["show", `origin/${rama}:${RUTA_VIDEOS}`])).find(
      (v) => v.youtubeId === id,
    );
    if (!entrada) continue;
    const mensaje = sh("git", ["log", "-1", "--format=%s", `origin/${rama}`]);
    sh("git", ["switch", "-C", rama, "origin/main"]);
    escribirVideos([...leerVideos().filter((v) => v.youtubeId !== id), entrada]);
    sh("git", ["add", RUTA_VIDEOS]);
    sh("git", ["commit", "-m", mensaje]);
    sh("git", ["push", "--force", "origin", rama]);
    sh("git", ["switch", "main"]);
    console.log(`PR de ${rama} puesto al día con main.`);
  }
}

// ─── Principal ─────────────────────────────────────────────────────────────

async function main() {
  const sinPR = env.SIN_PR === "1";
  if (!sinPR) {
    sh("git", ["fetch", "origin", "main"]);
    ponerAlDiaPRsAbiertos();
    if (env.SOLO_REBASE === "1") return;
  }

  const publicados = leerVideos();
  const forzado = env.VIDEO_ID?.trim();

  // Modo prueba en local: regenera un vídeo que ya está en la web con una
  // transcripción que tengas en un archivo, sin credenciales de Google.
  if (forzado && env.TRANSCRIPCION) {
    const existente = publicados.find((v) => v.youtubeId === forzado);
    if (!existente) throw new Error("Con TRANSCRIPCION, VIDEO_ID tiene que ser de un vídeo que ya esté en videos.json.");
    const generado = await generarEntrada(
      { ...existente, descripcionYoutube: existente.descripcion },
      subtitulosATexto(fs.readFileSync(env.TRANSCRIPCION, "utf8")),
      publicados,
    );
    if (sinPR) {
      escribirVideos([...publicados.filter((v) => v.youtubeId !== forzado), generado.entrada]);
      console.log(cuerpoDelPR(generado, true));
    } else abrirPR(generado, true);
    return;
  }

  const token = await tokenGoogle();
  const candidatos = await ultimosVideos(token, forzado ? [forzado] : undefined);
  const yaEnWeb = new Set(publicados.map((v) => v.youtubeId));

  const pendientes = candidatos
    .filter((v) => {
      if (forzado) return true;
      if (!v.publico || yaEnWeb.has(v.youtubeId) || v.fecha < DESDE) return false;
      if (segundos(v.duracion) < DURACION_MINIMA_S) return false;
      // Ya propuesto antes: abierto, aprobado o descartado.
      return prsDelVideo(v.youtubeId).length === 0;
    })
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .slice(0, MAXIMO_POR_EJECUCION);

  if (pendientes.length === 0) {
    console.log("No hay vídeos nuevos.");
    return;
  }

  for (const video of pendientes) {
    console.log(`▶ ${video.titulo} (${video.youtubeId})`);
    const textoTranscripcion = await transcripcion(token, video.youtubeId);
    if (!textoTranscripcion) {
      // YouTube tarda un rato en generar los subtítulos automáticos. Mañana se reintenta.
      console.log("  Aún no tiene subtítulos en español; se reintenta en la próxima ejecución.");
      continue;
    }
    const generado = await generarEntrada(video, textoTranscripcion, publicados);
    const regenerado = yaEnWeb.has(video.youtubeId);
    if (sinPR) {
      escribirVideos([...publicados.filter((v) => v.youtubeId !== video.youtubeId), generado.entrada]);
      console.log(cuerpoDelPR(generado, regenerado));
    } else {
      abrirPR(generado, regenerado);
    }
  }
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
