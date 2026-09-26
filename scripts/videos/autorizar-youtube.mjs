/**
 * Se ejecuta UNA vez, en tu ordenador, para dar permiso al robot a leer los
 * subtítulos de tus vídeos. Te abre Google, entras con la cuenta del canal,
 * aceptas, y la terminal te imprime el YOUTUBE_REFRESH_TOKEN para GitHub.
 *
 *   node scripts/videos/autorizar-youtube.mjs
 *
 * Te pide el ID y el secreto de cliente de Google (o los coge de
 * GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET si ya están puestos, o del JSON que
 * descarga Google si pasas su ruta en GOOGLE_CLIENT_JSON).
 *
 * Con GUARDAR_EN_GITHUB=1 no imprime nada secreto: guarda directamente
 * GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET y YOUTUBE_REFRESH_TOKEN como secretos
 * del repositorio con `gh`. Con NO_ABRIR=1 no abre el navegador (lo abres tú
 * con la dirección que imprime).
 *
 * Paso a paso completo en VIDEOS-AUTOMATICOS.md.
 */

import { execFile, execFileSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import { createInterface } from "node:readline/promises";

const env = process.env;
const deJson = env.GOOGLE_CLIENT_JSON
  ? JSON.parse(fs.readFileSync(env.GOOGLE_CLIENT_JSON, "utf8")).installed
  : {};
let id = env.GOOGLE_CLIENT_ID || deJson.client_id;
let secreto = env.GOOGLE_CLIENT_SECRET || deJson.client_secret;
if (!id || !secreto) {
  const terminal = createInterface({ input: process.stdin, output: process.stdout });
  id ||= (await terminal.question("Pega el ID de cliente y pulsa Enter: ")).trim();
  secreto ||= (await terminal.question("Pega el secreto de cliente y pulsa Enter: ")).trim();
  terminal.close();
}
if (!id || !secreto) {
  console.error("Faltan el ID o el secreto de cliente. Mira VIDEOS-AUTOMATICOS.md, paso 1.");
  process.exit(1);
}

const PUERTO = 53682;
const vuelta = `http://127.0.0.1:${PUERTO}`;
// force-ssl es el permiso que exige YouTube para descargar subtítulos.
// Solo lectura en la práctica: el script nunca modifica nada del canal.
const permiso = "https://www.googleapis.com/auth/youtube.force-ssl";

const url =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: id,
    redirect_uri: vuelta,
    response_type: "code",
    scope: permiso,
    access_type: "offline",
    prompt: "consent",
  });

const servidor = http.createServer(async (req, res) => {
  const codigo = new URL(req.url, vuelta).searchParams.get("code");
  if (!codigo) {
    res.end("No ha llegado el permiso. Vuelve a la terminal.");
    return;
  }
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({
      code: codigo,
      client_id: id,
      client_secret: secreto,
      redirect_uri: vuelta,
      grant_type: "authorization_code",
    }),
  });
  const datos = await r.json();
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  if (!datos.refresh_token) {
    res.end("Algo ha fallado. Mira la terminal.");
    console.error("Google no ha devuelto el permiso:", datos);
  } else if (env.GUARDAR_EN_GITHUB === "1") {
    const secretos = {
      GOOGLE_CLIENT_ID: id,
      GOOGLE_CLIENT_SECRET: secreto,
      YOUTUBE_REFRESH_TOKEN: datos.refresh_token,
    };
    for (const [nombre, valor] of Object.entries(secretos)) {
      // El valor va por la entrada estándar: nunca aparece en pantalla ni en el historial.
      execFileSync("gh", ["secret", "set", nombre, "--repo", "paulagala/academia-ventas"], { input: valor });
    }
    res.end("Listo. Los permisos ya están guardados en GitHub. Puedes cerrar esta pestaña.");
    console.log("Guardados en GitHub: " + Object.keys(secretos).join(", "));
  } else {
    res.end("Listo. Ya puedes cerrar esta pestaña y volver a la terminal.");
    console.log("\nCopia esto en GitHub como secreto YOUTUBE_REFRESH_TOKEN:\n");
    console.log(datos.refresh_token + "\n");
  }
  servidor.close();
});

servidor.listen(PUERTO, "127.0.0.1", () => {
  console.log("Abriendo Google en el navegador. Si no se abre, pega esta dirección:\n\n" + url + "\n");
  if (env.NO_ABRIR !== "1") execFile("open", [url]);
});
