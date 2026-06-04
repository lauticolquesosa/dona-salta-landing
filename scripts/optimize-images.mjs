/**
 * Optimiza las imágenes de assets/: redimensiona (máx 1600px) y convierte a WebP.
 * Uso: node scripts/optimize-images.mjs
 */
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const dir = "assets";
const MAX = 1600;
const Q = 80;

const pngs = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".png"));
let before = 0,
  after = 0;

for (const file of pngs) {
  const src = join(dir, file);
  const out = join(dir, file.replace(/\.png$/i, ".webp"));
  const inBytes = statSync(src).size;
  await sharp(src)
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: Q, effort: 6 })
    .toFile(out);
  const outBytes = statSync(out).size;
  before += inBytes;
  after += outBytes;
  console.log(
    `${file.padEnd(22)} ${(inBytes / 1024).toFixed(0).padStart(5)} KB  →  ${(outBytes / 1024).toFixed(0).padStart(5)} KB`
  );
}

console.log(
  `\nTOTAL  ${(before / 1024 / 1024).toFixed(1)} MB  →  ${(after / 1024 / 1024).toFixed(2)} MB  ` +
    `(${(100 - (after / before) * 100).toFixed(0)}% menos)`
);
