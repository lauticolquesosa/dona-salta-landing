import { sitio, contacto, horarios, redes, navegacion, legales, reputacion } from "../data/sitio.mjs";
import { carta } from "../data/carta.mjs";
import { fotos, medidas, rutaFoto } from "../data/fotos.mjs";
import { esc, icono, boton } from "./html.mjs";

const DIAS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const absoluta = (ruta) => sitio.origen + ruta;

/** Ficha del negocio. La usan el buscador y los modelos que citan datos del local. */
export function fichaNegocio() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": absoluta("/#restaurante"),
    name: sitio.nombre,
    url: absoluta("/"),
    image: absoluta(rutaFoto(fotos.fachada, 1440)),
    telephone: contacto.telefonoE164,
    servesCuisine: "Cocina regional salteña",
    priceRange: "$$",
    currenciesAccepted: "ARS",
    acceptsReservations: false,
    hasMenu: absoluta("/carta"),
    address: {
      "@type": "PostalAddress",
      streetAddress: contacto.calle,
      addressLocality: contacto.localidad,
      addressRegion: contacto.provincia,
      postalCode: contacto.codigoPostal,
      addressCountry: contacto.pais,
    },
    openingHoursSpecification: horarios.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DIAS,
      opens: h.abre,
      // schema.org no admite el cierre a las 00:00 como fin del día: se declara 23:59.
      closes: h.cierra === "00:00" ? "23:59" : h.cierra,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(reputacion.puntaje),
      reviewCount: String(reputacion.reseñas),
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: redes.map((r) => r.url),
  };
}

/** Migas de pan para las páginas internas. */
export const migas = (titulo, ruta) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: absoluta("/") },
    { "@type": "ListItem", position: 2, name: titulo, item: absoluta(ruta) },
  ],
});

const accionPrincipal = () =>
  boton({
    texto: "Cómo llegar",
    url: contacto.mapa,
    ico: "pin",
    externo: true,
    etiqueta: "Cómo llegar a Doña Salta, abre Google Maps",
  });

function cabecera(activa) {
  const items = navegacion
    .map(
      (n) =>
        `<li><a href="${n.url}"${n.clave === activa ? ' aria-current="page"' : ""}>${esc(n.titulo)}</a></li>`
    )
    .join("");

  return `<header class="cabecera" id="cabecera">
  <div class="cabecera__fila contenedor">
    <a class="marca" href="/" aria-label="${esc(sitio.nombre)}, ir al inicio">
      <img src="/assets/logo.webp" width="480" height="320" alt="${esc(sitio.nombre)}" fetchpriority="high" />
    </a>

    <div class="menu" id="menu">
      <nav class="nav" aria-label="Principal"><ul>${items}</ul></nav>
      <div class="menu__acciones">
        <a class="menu__tel" href="tel:${contacto.telefonoE164}">${icono("telefono")}<span>${esc(contacto.telefono)}</span></a>
        ${accionPrincipal()}
      </div>
    </div>

    <button class="hamburguesa" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir el menú">
      <span aria-hidden="true"></span>
    </button>
  </div>
</header>`;
}

function pie() {
  const columna = (titulo, cuerpo) =>
    `<div class="pie__col"><h2>${esc(titulo)}</h2>${cuerpo}</div>`;

  const enlacesSitio = navegacion.map((n) => `<li><a href="${n.url}">${esc(n.titulo)}</a></li>`).join("");

  const secciones = carta
    .slice(0, 4)
    .map((s) => `<li><a href="/carta#${s.id}">${esc(s.titulo)}</a></li>`)
    .join("");

  const filasHorario = horarios
    .map((h) => `<li><span>${esc(h.servicio)}</span><time>${esc(h.abre)} a ${esc(h.cierra)}</time></li>`)
    .join("");

  const tarjetasRedes = redes
    .map(
      (r) => `<a class="red" href="${esc(r.url)}" target="_blank" rel="noopener">
      ${icono(r.icono)}<span><b>${esc(r.red)}</b><small>${esc(r.cuenta)}</small></span></a>`
    )
    .join("");

  const enlacesLegales = legales.map((l) => `<a href="${l.url}">${esc(l.titulo)}</a>`).join("");

  return `<footer class="pie">
  <div class="contenedor">
    <div class="pie__marca">
      <img src="/assets/logo.webp" width="480" height="320" alt="${esc(sitio.nombre)}" loading="lazy" />
      <p>${esc(sitio.descripcionCorta)}</p>
    </div>

    <div class="pie__grilla">
      ${columna("El sitio", `<nav aria-label="Secciones del sitio"><ul>${enlacesSitio}</ul></nav>`)}
      ${columna("La carta", `<nav aria-label="Secciones de la carta"><ul>${secciones}</ul></nav>`)}
      ${columna(
        "Dónde y cuándo",
        `<ul>
        <li><a href="${esc(contacto.mapa)}" target="_blank" rel="noopener">${esc(contacto.calle)}, ${esc(contacto.localidad)} capital</a></li>
        <li><a href="tel:${contacto.telefonoE164}">${esc(contacto.telefono)}</a></li>
      </ul>
      <ul class="horas">${filasHorario}</ul>`
      )}
      ${columna("Redes", `<div class="redes">${tarjetasRedes}</div>`)}
    </div>

    <div class="pie__linea">
      <span>&copy; ${new Date().getFullYear()} ${esc(sitio.nombre)}, ${esc(contacto.localidad)} capital, ${esc(contacto.paisNombre)}</span>
      <nav class="pie__legales" aria-label="Legales">${enlacesLegales}</nav>
      <span>Sitio hecho por ${esc(sitio.estudio)}</span>
    </div>
  </div>
</footer>`;
}

/**
 * Clases del cuerpo. sin-portada = la página arranca con texto y la cabecera va
 * sólida; portada-clara = la apertura es de fondo claro y la cabecera se pinta
 * en tinta hasta que aparece el fondo al scrollear.
 */
function claseCuerpo(pagina) {
  const clases = [pagina.sinPortada && "sin-portada", pagina.portadaClara && "portada-clara"].filter(Boolean);
  return clases.length ? ` class="${clases.join(" ")}"` : "";
}

/**
 * Arma el documento completo de una página.
 * pagina: { ruta, titulo, descripcion, activa, imagen, jsonLd, precarga, cuerpo }
 */
export function documento(pagina, assets) {
  const url = absoluta(pagina.ruta);
  const imagen = absoluta(pagina.imagen || rutaFoto(fotos.empanadas, 1440));
  const bloques = (pagina.jsonLd || [])
    .map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`)
    .join("\n");

  // La foto que abre la página es el LCP: se pide junto con la hoja de estilos.
  const precarga = pagina.precarga
    ? `<link rel="preload" as="image" href="${rutaFoto(pagina.precarga, medidas(pagina.precarga).at(-1))}" imagesrcset="${medidas(
        pagina.precarga
      )
        .map((a) => `${rutaFoto(pagina.precarga, a)} ${a}w`)
        .join(", ")}" imagesizes="100vw" fetchpriority="high" />`
    : "";

  return `<!doctype html>
<html lang="${esc(sitio.idioma)}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(pagina.titulo)}</title>
<meta name="description" content="${esc(pagina.descripcion)}" />
<link rel="canonical" href="${esc(url)}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="theme-color" content="${sitio.colorTema}" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="${esc(sitio.nombre)}" />
<meta property="og:locale" content="es_AR" />
<meta property="og:url" content="${esc(url)}" />
<meta property="og:title" content="${esc(pagina.titulo)}" />
<meta property="og:description" content="${esc(pagina.descripcion)}" />
<meta property="og:image" content="${esc(imagen)}" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="icon" href="/assets/icono-32.png" type="image/png" sizes="32x32" />
<link rel="apple-touch-icon" href="/assets/icono-180.png" />
<link rel="manifest" href="/manifest.webmanifest" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Aboreto&family=Inclusive+Sans:wght@400;700&display=swap" />
<link rel="stylesheet" href="${assets.css}" />
${precarga}
${bloques}
</head>
<body${claseCuerpo(pagina)}>
<a class="saltar" href="#contenido">Saltar al contenido</a>
${cabecera(pagina.activa)}
<main id="contenido">
${pagina.cuerpo}
</main>
${pie()}
<script src="${assets.js}" defer></script>
</body>
</html>`;
}
