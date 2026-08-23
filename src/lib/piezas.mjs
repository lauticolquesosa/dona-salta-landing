/**
 * Las piezas con las que se arman las páginas.
 * Cada una devuelve el HTML de una sección completa y no sabe nada de la página
 * que la usa: todo lo que muestra le llega por parámetro.
 */

import { contacto, horarios, reputacion } from "../data/sitio.mjs";
import { boton, esc, estrellas, foto, icono, miniatura, precio } from "./html.mjs";

const lineas = (titulo) =>
  (Array.isArray(titulo) ? titulo : [titulo]).map((l) => `<span>${esc(l)}</span>`).join("");

const parrafos = (textos, clase = "parrafo animar") =>
  textos.map((t) => `<p class="${clase}">${esc(t)}</p>`).join("");

/**
 * Portada a sangre: foto de fondo, velo oscuro y el título abajo a la izquierda.
 * alta = primera pantalla completa del inicio. El resto de las páginas usa la media.
 */
export function portada({ imagen, titulo, bajada, acciones = "", fichas = "", alta = false }) {
  return `<section class="portada${alta ? " portada--alta" : ""}">
  ${foto(imagen, { clase: "portada__foto", prioridad: true, sizes: "100vw" })}
  <div class="portada__velo" aria-hidden="true"></div>
  <div class="contenedor portada__contenido">
    <h1 class="titulo-1 portada__titulo">${lineas(titulo)}</h1>
    <p class="portada__bajada">${esc(bajada)}</p>
    ${acciones ? `<div class="acciones">${acciones}</div>` : ""}
  </div>
  ${fichas ? `<div class="contenedor portada__fichas">${fichas}</div>` : ""}
</section>`;
}

/**
 * Portada partida: el texto a la izquierda sobre el mismo fondo claro que la
 * sección siguiente y la foto del local a la derecha, con la tarjeta de la
 * carta apoyada sobre el borde inferior izquierdo de la foto.
 * bajadaExtra es la parte de la bajada que se cae en celular, donde la apertura
 * se reordena para que la foto entre en la primera pantalla.
 */
export function portadaPartida({ imagen, titulo, bajada, bajadaExtra = "", acciones = "", ficha = "" }) {
  return `<section class="apertura">
  <div class="contenedor apertura__grilla">
    <div class="apertura__texto">
      <h1 class="titulo-1 apertura__titulo">${lineas(titulo)}</h1>
      <p class="apertura__bajada">${esc(bajada)}${
        bajadaExtra ? ` <span class="apertura__extra">${esc(bajadaExtra)}</span>` : ""
      }</p>
      ${acciones ? `<div class="acciones apertura__acciones">${acciones}</div>` : ""}
      ${puntajeSuelto()}
    </div>
    <div class="apertura__marco">
      ${foto(imagen, { clase: "apertura__foto", prioridad: true, sizes: "(max-width: 62rem) 100vw, 52vw" })}
      ${ficha ? `<div class="apertura__ficha">${ficha}</div>` : ""}
    </div>
  </div>
</section>`;
}

/** Puntaje de Google en una línea, sin tarjeta: va sobre el fondo claro. */
export const puntajeSuelto = () => `<a class="puntaje" href="${esc(contacto.reseñas)}" target="_blank" rel="noopener">
  ${estrellas(reputacion.puntaje)}
  <span class="puntaje__texto"><b>${esc(reputacion.puntajeTexto)} en Google</b><small>${esc(reputacion.reseñasTexto)} reseñas</small></span>
</a>`;

/** Tarjeta blanca con el puntaje de Google. Va colgada del borde inferior de la portada. */
export const fichaPuntaje = () => `<a class="ficha ficha--puntaje" href="${esc(contacto.reseñas)}" target="_blank" rel="noopener">
  ${estrellas(reputacion.puntaje)}
  <span><b>${esc(reputacion.puntajeTexto)} en Google</b><small>${esc(reputacion.reseñasTexto)} reseñas de comensales</small></span>
</a>`;

/** Tarjeta blanca con miniatura que lleva a otra página del sitio. */
export const fichaEnlace = ({ imagen, texto, url }) => `<a class="ficha ficha--enlace" href="${esc(url)}">
  ${miniatura(imagen)}<span>${esc(texto)}</span>${icono("flecha")}
</a>`;

/**
 * Bloque centrado con dos fotos en el medio. Es el bloque que abre el relato
 * en el inicio y el que presenta cada página interna.
 */
export function centrada({ titulo, textos, imagenes = [], accion = "" }) {
  const fotos = imagenes.length
    ? `<div class="centrada__fotos escalona">${imagenes
        .map((f) => foto(f, { clase: "animar", sizes: "(max-width: 760px) 90vw, 34vw" }))
        .join("")}</div>`
    : "";

  return `<section class="seccion centrada">
  <div class="contenedor">
    <span class="filete animar" aria-hidden="true"></span>
    <h2 class="titulo-2 animar">${lineas(titulo)}</h2>
    ${fotos}
    <div class="centrada__texto">${parrafos(textos)}</div>
    ${accion ? `<div class="acciones acciones--centro animar">${accion}</div>` : ""}
  </div>
</section>`;
}

/** Dos fotos a sangre, de borde a borde. Corta el ritmo sin decir nada. */
export const franja = (a, b) => `<div class="franja">
  ${foto(a, { clase: "animar", sizes: "50vw" })}
  ${foto(b, { clase: "animar", sizes: "50vw" })}
</div>`;

/**
 * La comanda: tarjeta blanca apenas girada con platos y precios, apoyada sobre
 * un par de fotos. Es la apuesta fuerte del sitio y aparece una sola vez.
 */
export function comanda({ titulo, items, accion, imagenes }) {
  const filas = items
    .map(
      (it) => `<li>
      <div class="comanda__fila">
        <h3 class="titulo-3">${esc(it.nombre)}</h3>
        <span class="comanda__precio">${precio(it.precio)}</span>
      </div>
      <p class="comanda__detalle">${esc(it.texto)}</p>
    </li>`
    )
    .join("");

  return `<section class="seccion comanda">
  <div class="contenedor">
    <h2 class="titulo-2 comanda__titulo animar">${lineas(titulo)}</h2>
  </div>
  <div class="comanda__cuerpo">
    <div class="comanda__soporte animar">
      <div class="comanda__papel">
        <ul class="comanda__lista">${filas}</ul>
        ${accion}
      </div>
    </div>
    <div class="comanda__fotos">
      ${imagenes.map((f) => foto(f, { clase: "animar", sizes: "(max-width: 900px) 100vw, 50vw" })).join("")}
    </div>
  </div>
</section>`;
}

/** Fila de accesos a las secciones de la carta. Son enlaces, no filtros. */
export const atajos = (items) => `<nav class="atajos animar" aria-label="Secciones de la carta">
  ${items.map((i) => `<a href="${esc(i.url)}">${esc(i.titulo)}</a>`).join("")}
</nav>`;

/** Banda oscura con tarjetas claras. La usa la prueba social y los reconocimientos. */
export function banda({ titulo, texto, tarjetas }) {
  const items = tarjetas
    .map(
      (t) => `<li class="cifra animar">
      <span class="cifra__dato">${esc(t.dato)}</span>
      <span class="cifra__unidad">${esc(t.unidad)}</span>
      <span class="cifra__detalle">${esc(t.detalle)}</span>
    </li>`
    )
    .join("");

  return `<section class="seccion seccion--oscura">
  <div class="contenedor">
    <div class="bloque bloque--centro">
      <h2 class="titulo-2 animar">${lineas(titulo)}</h2>
      <p class="parrafo animar">${esc(texto)}</p>
    </div>
    <ul class="cifras escalona">${items}</ul>
  </div>
</section>`;
}

/** Foto a sangre con una tarjeta encima. Repite la única acción del sitio. */
export function invitacion({ imagen, titulo, texto }) {
  const filas = horarios
    .map((h) => `<li><span>${esc(h.servicio)}</span><time>${esc(h.abre)} a ${esc(h.cierra)}</time></li>`)
    .join("");

  return `<section class="invitacion">
  ${foto(imagen, { clase: "invitacion__foto", sizes: "100vw" })}
  <div class="invitacion__velo" aria-hidden="true"></div>
  <div class="contenedor">
    <div class="invitacion__tarjeta animar">
      <h2 class="titulo-2">${lineas(titulo)}</h2>
      <p class="parrafo">${esc(texto)}</p>
      <p class="direccion"><b>${esc(contacto.calle)}</b><span>${esc(contacto.codigoPostal)}, ${esc(contacto.localidad)} capital</span></p>
      <ul class="horas">${filas}</ul>
      <div class="acciones acciones--centro">
        ${boton({ texto: "Cómo llegar", url: contacto.mapa, ico: "pin", externo: true, etiqueta: "Cómo llegar a Doña Salta, abre Google Maps" })}
        <a class="enlace" href="tel:${contacto.telefonoE164}"><span>Llamar al ${esc(contacto.telefono)}</span>${icono("flecha")}</a>
      </div>
    </div>
  </div>
</section>`;
}

/** Mosaico de fotos a sangre. Cierra las páginas que tienen algo para mostrar. */
export const mosaico = (imagenes) => `<div class="mosaico escalona">
  ${imagenes.map((f) => foto(f, { clase: "animar", sizes: "(max-width: 760px) 50vw, 25vw" })).join("")}
</div>`;

/**
 * Bloque de texto con foto al lado. Se alterna el lado para dar ritmo a las
 * páginas internas sin sumar componentes nuevos.
 */
export function relato({ imagen, titulo, textos, accion = "", pie = "", invertida = false }) {
  return `<section class="seccion">
  <div class="contenedor relato${invertida ? " relato--invertida" : ""}">
    ${foto(imagen, { clase: "relato__foto animar", pie, sizes: "(max-width: 900px) 100vw, 45vw" })}
    <div class="relato__texto">
      <h2 class="titulo-2 animar">${lineas(titulo)}</h2>
      ${parrafos(textos)}
      ${accion ? `<p class="animar">${accion}</p>` : ""}
    </div>
  </div>
</section>`;
}
