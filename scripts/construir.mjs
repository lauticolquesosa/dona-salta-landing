/**
 * Genera el sitio publicable en dist/.
 *
 *   node scripts/construir.mjs
 *
 * Pasos: imágenes desde medios/, íconos, css y js con huella para poder
 * cachearlos para siempre, las páginas, y los archivos para buscadores.
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import { sitio, legales, navegacion } from "../src/data/sitio.mjs";
import { fotos, medidas, rutaFoto } from "../src/data/fotos.mjs";
import { documento } from "../src/lib/layout.mjs";

import inicio from "../src/paginas/inicio.mjs";
import empanadas from "../src/paginas/empanadas.mjs";
import carta from "../src/paginas/carta.mjs";
import bodegon from "../src/paginas/bodegon.mjs";
import visitanos from "../src/paginas/visitanos.mjs";
import paginasLegales from "../src/paginas/legales.mjs";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const salida = join(raiz, "dist");
const CALIDAD = 78;

const paginas = [inicio, empanadas, carta, bodegon, visitanos, ...paginasLegales];

const huella = (contenido) => createHash("sha256").update(contenido).digest("hex").slice(0, 8);

const escribir = async (ruta, contenido) => {
  await mkdir(dirname(ruta), { recursive: true });
  await writeFile(ruta, contenido);
};

/** Devuelve true si hay que volver a generar el archivo destino. */
async function estaVieja(origen, destino) {
  const [fuente, copia] = await Promise.all([stat(origen), stat(destino).catch(() => null)]);
  return !copia || copia.mtimeMs < fuente.mtimeMs;
}

/** Cada foto se publica en las medidas que declara el catálogo. */
async function generarFotos() {
  let total = 0;

  for (const foto of Object.values(fotos)) {
    const origen = join(raiz, "medios", `${foto.nombre}.webp`);

    for (const ancho of medidas(foto)) {
      const destino = join(salida, rutaFoto(foto, ancho).slice(1));
      await mkdir(dirname(destino), { recursive: true });

      if (await estaVieja(origen, destino)) {
        await sharp(origen)
          .resize({ width: ancho, withoutEnlargement: true })
          .webp({ quality: CALIDAD, effort: 6 })
          .toFile(destino);
      }

      total += (await stat(destino)).size;
    }
  }

  return total;
}

/** El logo va en una sola medida, y los íconos salen del mismo archivo. */
async function generarMarca() {
  const origen = join(raiz, "medios", "logo.webp");
  if (!(await estaVieja(origen, join(salida, "assets", "logo.webp")))) return;

  await sharp(origen)
    .resize({ width: 480 })
    .webp({ quality: 90, effort: 6 })
    .toFile(join(salida, "assets", "logo.webp"));

  // Ícono cuadrado: el logo centrado sobre el fondo del sitio.
  for (const lado of [32, 180, 512]) {
    const margen = Math.round(lado * 0.14);
    const logo = await sharp(origen)
      .resize({ width: lado - margen * 2, fit: "inside" })
      .toBuffer();

    await sharp({
      create: { width: lado, height: lado, channels: 4, background: sitio.colorTema },
    })
      .composite([{ input: logo, gravity: "center" }])
      .png()
      .toFile(join(salida, "assets", `icono-${lado}.png`));
  }
}

/** Sitemap con todas las páginas publicadas. */
const sitemap = () =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas
  .map((p) => `  <url><loc>${sitio.origen}${p.ruta}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`)
  .join("\n")}
</urlset>
`;

const robots = () => `User-agent: *
Allow: /

Sitemap: ${sitio.origen}/sitemap.xml
`;

const manifiesto = () =>
  JSON.stringify(
    {
      name: `${sitio.nombre}, empanadas al horno de barro`,
      short_name: sitio.nombre,
      description: sitio.descripcionCorta,
      start_url: "/",
      scope: "/",
      display: "standalone",
      lang: sitio.idioma,
      background_color: sitio.colorTema,
      theme_color: sitio.colorTema,
      icons: [
        { src: "/assets/icono-180.png", sizes: "180x180", type: "image/png" },
        { src: "/assets/icono-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      ],
    },
    null,
    2
  );

async function construir() {
  // Las páginas y las hojas se rehacen siempre. Las imágenes solo si cambió el original.
  await rm(join(salida, "a"), { recursive: true, force: true });
  for (const pagina of paginas) {
    await rm(join(salida, pagina.archivo), { force: true });
  }
  await mkdir(join(salida, "assets"), { recursive: true });

  const pesoFotos = await generarFotos();
  await generarMarca();

  const css = await readFile(join(raiz, "src", "estilos", "sitio.css"), "utf8");
  const js = await readFile(join(raiz, "src", "guiones", "sitio.js"), "utf8");

  const assets = {
    css: `/a/sitio.${huella(css)}.css`,
    js: `/a/sitio.${huella(js)}.js`,
  };

  await escribir(join(salida, assets.css.slice(1)), css);
  await escribir(join(salida, assets.js.slice(1)), js);

  for (const pagina of paginas) {
    await escribir(join(salida, pagina.archivo), documento(pagina, assets));
  }

  await escribir(join(salida, "sitemap.xml"), sitemap());
  await escribir(join(salida, "robots.txt"), robots());
  await escribir(join(salida, "manifest.webmanifest"), manifiesto());

  const rutas = paginas.map((p) => p.ruta).join(", ");
  console.log(`${paginas.length} páginas: ${rutas}`);
  console.log(`Imágenes: ${(pesoFotos / 1024 / 1024).toFixed(2)} MB en total`);
  console.log(`Hojas: ${assets.css} y ${assets.js}`);
}

// Aviso temprano si alguien suma una página al menú y se olvida de crearla.
const rutasGeneradas = new Set(paginas.map((p) => p.ruta));
for (const item of [...navegacion, ...legales]) {
  if (!rutasGeneradas.has(item.url)) {
    throw new Error(`El menú apunta a ${item.url} y esa página no existe`);
  }
}

await construir();
