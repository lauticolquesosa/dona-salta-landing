/** Utilidades de render. Sin dependencias. */

import { medidas, rutaFoto } from "../data/fotos.mjs";

const ENTIDADES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escapa texto que va dentro de atributos o de nodos de texto. */
export const esc = (valor) => String(valor).replace(/[&<>"']/g, (c) => ENTIDADES[c]);

/** 24000 -> "$24.000" */
export const precio = (n) => "$" + n.toLocaleString("es-AR");

/** Une fragmentos salteando los vacíos. */
export const juntar = (partes, sep = "\n") => partes.filter(Boolean).join(sep);

const ICONOS = {
  flecha: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  telefono:
    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  instagram:
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.01"/>',
  facebook: '<path d="M14 9V7.5A1.5 1.5 0 0 1 15.5 6H17V3h-2.5A4.5 4.5 0 0 0 10 7.5V9H8v3h2v9h4v-9h2.5l.5-3h-3"/>',
};

/** Ícono de línea, decorativo. El significado siempre lo da el texto que lo acompaña. */
export const icono = (nombre) =>
  `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[nombre]}</svg>`;

/** Cinco estrellas con las llenas que correspondan al puntaje. Decorativas: el número va al lado. */
export function estrellas(puntaje) {
  const llenas = Math.round(puntaje);
  const una = (activa) =>
    `<svg class="estrella${activa ? " es-llena" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.6 5.7 6.4.7-4.8 4.3 1.3 6.3L12 17l-5.5 3 1.3-6.3L3 9.4l6.4-.7Z"/></svg>`;
  return `<span class="estrellas">${[1, 2, 3, 4, 5].map((i) => una(i <= llenas)).join("")}</span>`;
}

/**
 * Botón. Tres niveles en todo el sitio: principal, contorno y enlace de texto.
 * externo agrega target y rel; el texto siempre dice qué va a pasar.
 */
export function boton({ texto, url, nivel = "principal", ico, externo = false, etiqueta }) {
  const attrs = [
    `class="boton boton--${nivel}"`,
    `href="${esc(url)}"`,
    externo ? 'target="_blank" rel="noopener"' : "",
    etiqueta ? `aria-label="${esc(etiqueta)}"` : "",
  ];
  return `<a ${juntar(attrs, " ")}>${ico ? icono(ico) : ""}<span>${esc(texto)}</span>${icono("flecha")}</a>`;
}

/** Enlace de texto con flecha. Se entiende fuera de contexto. */
export const enlace = ({ texto, url, externo = false }) =>
  `<a class="enlace" href="${esc(url)}"${externo ? ' target="_blank" rel="noopener"' : ""}><span>${esc(texto)}</span>${icono("flecha")}</a>`;

/**
 * Foto con medidas declaradas y varias resoluciones.
 * prioridad = imagen de la primera pantalla: se carga sin diferir.
 */
export function foto(f, { clase = "", pie = "", prioridad = false, sizes = "100vw" } = {}) {
  const anchos = medidas(f);
  const srcset = anchos.map((a) => `${rutaFoto(f, a)} ${a}w`).join(", ");
  const carga = prioridad ? 'fetchpriority="high"' : 'loading="lazy"';

  const img = `<img src="${rutaFoto(f, anchos.at(-1))}" srcset="${srcset}" sizes="${esc(sizes)}"
    width="${f.ancho}" height="${f.alto}" alt="${esc(f.alt)}" decoding="async" ${carga} />`;

  return `<figure class="foto ${clase}">${img}${pie ? `<figcaption>${esc(pie)}</figcaption>` : ""}</figure>`;
}

/** Foto chica de tamaño fijo, para tarjetas y fichas. Nunca es la imagen principal. */
export const miniatura = (f, lado = 640) =>
  `<img class="mini" src="${rutaFoto(f, lado)}" width="${f.ancho}" height="${f.alto}" alt="${esc(f.alt)}" decoding="async" loading="lazy" />`;
