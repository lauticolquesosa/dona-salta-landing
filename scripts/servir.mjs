/**
 * Servidor local para ver el sitio mientras se trabaja.
 *
 *   node scripts/servir.mjs
 *
 * Construye, sirve dist/ con las mismas direcciones limpias que Vercel
 * y vuelve a construir cuando cambia algo en src/ o en medios/.
 */
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { watch } from "node:fs";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const salida = join(raiz, "dist");
const PUERTO = Number(process.env.PORT) || 4321;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function construir() {
  return new Promise((resolver) => {
    const proceso = spawn(process.execPath, [join(raiz, "scripts", "construir.mjs")], {
      stdio: "inherit",
    });
    proceso.on("close", resolver);
  });
}

/** Prueba la ruta pedida y, si no existe, la misma con .html: así funciona /carta. */
async function resolver(ruta) {
  const pedida = decodeURIComponent(ruta.split("?")[0]);
  const limpia = normalize(pedida).replace(/^(\.\.[/\\])+/, "");
  const candidatos = pedida.endsWith("/")
    ? [join(limpia, "index.html")]
    : [limpia, `${limpia}.html`];

  for (const candidato of candidatos) {
    const archivo = join(salida, candidato);
    const info = await stat(archivo).catch(() => null);
    if (info?.isFile()) return archivo;
  }
  return null;
}

await construir();

createServer(async (peticion, respuesta) => {
  const archivo = await resolver(peticion.url);

  if (!archivo) {
    respuesta.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    respuesta.end("No existe esa página");
    return;
  }

  respuesta.writeHead(200, {
    "content-type": TIPOS[extname(archivo)] || "application/octet-stream",
    "cache-control": "no-store",
  });
  respuesta.end(await readFile(archivo));
}).listen(PUERTO, () => {
  console.log(`\nSitio en http://localhost:${PUERTO}`);
});

let pendiente = null;
for (const carpeta of ["src", "medios"]) {
  watch(join(raiz, carpeta), { recursive: true }, () => {
    clearTimeout(pendiente);
    pendiente = setTimeout(construir, 120);
  });
}
