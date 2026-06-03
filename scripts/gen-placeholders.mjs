/**
 * Genera placeholders SVG prolijos (con la paleta de marca) para que el sitio
 * se vea terminado sin fotos reales. Reemplazar por fotos reales manteniendo
 * el nombre/proporción. Ejecutar: `node scripts/gen-placeholders.mjs`
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imgDir = join(root, "public", "assets", "img");
const logoDir = join(root, "public", "assets", "logo");
mkdirSync(imgDir, { recursive: true });
mkdirSync(logoDir, { recursive: true });

const palette = {
  terracota: "#A8442A",
  ocre: "#C8893B",
  adobe: "#E8DAC4",
  cerro: "#4A5340",
  tostado: "#2B1D16",
  crema: "#F6EFE3",
  vino: "#6E2233",
};

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Placeholder de foto: degradado cálido + icono de cámara + etiqueta. */
function photo({ w, h, label, from = palette.terracota, to = palette.tostado, accent = palette.ocre }) {
  const id = Math.random().toString(36).slice(2, 8);
  const cx = w / 2;
  const cy = h / 2;
  const iconScale = Math.min(w, h) * 0.0012 + 0.7;
  const fontSize = Math.round(Math.min(w, h) * 0.045) + 6;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
  <defs>
    <linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <pattern id="d${id}" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="${palette.crema}" opacity="0.07"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g${id})"/>
  <rect width="${w}" height="${h}" fill="url(#d${id})"/>
  <g transform="translate(${cx} ${cy - fontSize * 1.6}) scale(${iconScale})" fill="none" stroke="${palette.crema}" stroke-opacity="0.85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-23 -8 h8 l3 -5 h12 l3 5 h8 a3 3 0 0 1 3 3 v20 a3 3 0 0 1 -3 3 h-34 a3 3 0 0 1 -3 -3 v-20 a3 3 0 0 1 3 -3 z" transform="translate(0 -2)"/>
    <circle cx="0" cy="6" r="8"/>
  </g>
  <text x="${cx}" y="${cy + fontSize * 1.4}" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" font-weight="600" fill="${palette.crema}" text-anchor="middle" letter-spacing="0.5">${esc(label)}</text>
  <text x="${cx}" y="${cy + fontSize * 2.6}" font-family="Inter, system-ui, sans-serif" font-size="${Math.round(fontSize * 0.5)}" fill="${palette.crema}" fill-opacity="0.6" text-anchor="middle" letter-spacing="2">REEMPLAZAR POR FOTO REAL</text>
  <rect x="6" y="6" width="${w - 12}" height="${h - 12}" fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="2" rx="6"/>
</svg>`;
}

const files = [
  // Hero (16:10-ish, full bleed)
  { name: "hero.svg", svg: photo({ w: 1920, h: 1280, label: "HERO — empanadas / ambiente", from: palette.terracota, to: palette.tostado }) },
  // Nosotros (4:5 retrato)
  { name: "nosotros.svg", svg: photo({ w: 1200, h: 1500, label: "NOSOTROS — cocina / mesa servida", from: palette.cerro, to: palette.tostado }) },
  // OG (1200x630)
  { name: "og-image.svg", svg: photo({ w: 1200, h: 630, label: "Doña Salta — Cocina salteña", from: palette.terracota, to: palette.vino }) },
  // Platos (3:2)
  { name: "plato-empanadas.svg", svg: photo({ w: 600, h: 400, label: "PLATO — empanadas", from: palette.terracota, to: palette.tostado }) },
  { name: "plato-locro.svg", svg: photo({ w: 600, h: 400, label: "PLATO — locro", from: palette.ocre, to: palette.tostado }) },
  { name: "plato-humita.svg", svg: photo({ w: 600, h: 400, label: "PLATO — humita", from: palette.cerro, to: palette.tostado }) },
  { name: "plato-tamales.svg", svg: photo({ w: 600, h: 400, label: "PLATO — tamales", from: palette.vino, to: palette.tostado }) },
  { name: "plato-asado.svg", svg: photo({ w: 600, h: 400, label: "PLATO — asado / parrilla", from: palette.terracota, to: palette.vino }) },
  { name: "plato-vinos.svg", svg: photo({ w: 600, h: 400, label: "PLATO — vinos de altura", from: palette.vino, to: palette.tostado }) },
  // Galería (cuadradas)
  { name: "galeria-01.svg", svg: photo({ w: 800, h: 800, label: "GALERÍA 1", from: palette.terracota, to: palette.tostado }) },
  { name: "galeria-02.svg", svg: photo({ w: 800, h: 800, label: "GALERÍA 2", from: palette.cerro, to: palette.tostado }) },
  { name: "galeria-03.svg", svg: photo({ w: 800, h: 800, label: "GALERÍA 3", from: palette.ocre, to: palette.tostado }) },
  { name: "galeria-04.svg", svg: photo({ w: 800, h: 800, label: "GALERÍA 4", from: palette.vino, to: palette.tostado }) },
  { name: "galeria-05.svg", svg: photo({ w: 800, h: 800, label: "GALERÍA 5", from: palette.terracota, to: palette.cerro }) },
  { name: "galeria-06.svg", svg: photo({ w: 800, h: 800, label: "GALERÍA 6", from: palette.ocre, to: palette.vino }) },
];

for (const f of files) writeFileSync(join(imgDir, f.name), f.svg);

/* ---- Logo placeholder: sello cálido con el nombre de la marca ---- */
const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120" role="img" aria-label="Doña Salta — logo placeholder">
  <rect x="2" y="2" width="316" height="116" rx="14" fill="${palette.crema}" stroke="${palette.terracota}" stroke-width="3"/>
  <g transform="translate(34 60)" fill="none" stroke="${palette.terracota}" stroke-width="3" stroke-linejoin="round">
    <circle cx="0" cy="0" r="26" stroke-opacity="0.55"/>
    <path d="M-15 9 L-6 -6 L0 3 L7 -10 L15 9 Z" fill="${palette.ocre}" stroke="none"/>
    <circle cx="9" cy="-12" r="4" fill="${palette.ocre}" stroke="none"/>
  </g>
  <text x="84" y="55" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="700" fill="${palette.tostado}">Doña Salta</text>
  <text x="85" y="80" font-family="Inter, system-ui, sans-serif" font-size="12" letter-spacing="4" fill="${palette.cerro}">COCINA SALTEÑA</text>
</svg>`;
writeFileSync(join(logoDir, "logo-placeholder.svg"), logo);

/* ---- Favicon ---- */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="Doña Salta">
  <rect width="64" height="64" rx="14" fill="${palette.terracota}"/>
  <g transform="translate(32 34)" fill="none" stroke="${palette.crema}" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-16 10 L-6 -6 L1 4 L9 -12 L17 10 Z" fill="${palette.ocre}" stroke="none"/>
    <circle cx="11" cy="-14" r="4.5" fill="${palette.crema}" stroke="none"/>
  </g>
</svg>`;
writeFileSync(join(root, "public", "favicon.svg"), favicon);

console.log(`Generados ${files.length} placeholders de imagen + logo + favicon.`);
