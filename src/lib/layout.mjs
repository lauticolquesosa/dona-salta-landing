import { sitio, contacto, horarios, redes, navegacion, legales } from "../data/sitio.mjs";
import { fotos, rutaFoto } from "../data/fotos.mjs";
import { esc, juntar, icono, boton } from "./html.mjs";

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
      ratingValue: "4.5",
      reviewCount: "25000",
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
        ${boton({ texto: "Cómo llegar", url: contacto.mapa, ico: "pin", externo: true, etiqueta: "Cómo llegar a Doña Salta, abre Google Maps" })}
      </div>
    </div>

    <button class="hamburguesa" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir el menú">
      <span aria-hidden="true"></span>
    </button>
  </div>
</header>`;
}

/** Banda de cierre. Repite la única acción del sitio al final de cada página. */
export function cierre({ titulo, texto }) {
  const filas = horarios
    .map((h) => `<li><span>${esc(h.servicio)}</span><time>${esc(h.abre)} a ${esc(h.cierra)}</time></li>`)
    .join("");

  return `<section class="cierre">
  <div class="contenedor cierre__grilla">
    <div class="cierre__texto">
      <h2 class="titulo-2 animar">${esc(titulo)}</h2>
      <p class="parrafo animar">${esc(texto)}</p>
      <div class="cierre__accion animar">
        ${boton({ texto: "Cómo llegar", url: contacto.mapa, ico: "pin", externo: true, etiqueta: "Cómo llegar a Doña Salta, abre Google Maps" })}
        <a class="enlace" href="tel:${contacto.telefonoE164}">Llamar al ${esc(contacto.telefono)}${icono("flecha")}</a>
      </div>
    </div>
    <div class="cierre__datos animar">
      <p class="cierre__dir"><b>${esc(contacto.calle)}</b><span>${esc(contacto.codigoPostal)}, ${esc(contacto.localidad)} capital</span></p>
      <ul class="horas">${filas}</ul>
    </div>
  </div>
</section>`;
}

function pie() {
  const enlacesSitio = navegacion.map((n) => `<li><a href="${n.url}">${esc(n.titulo)}</a></li>`).join("");

  const tarjetasRedes = redes
    .map(
      (r) => `<a class="red" href="${esc(r.url)}" target="_blank" rel="noopener">
      ${icono(r.icono)}<span><b>${esc(r.red)}</b><small>${esc(r.cuenta)}</small></span></a>`
    )
    .join("");

  const filasHorario = horarios
    .map((h) => `<li><span>${esc(h.servicio)}</span><time>${esc(h.abre)} a ${esc(h.cierra)}</time></li>`)
    .join("");

  const enlacesLegales = legales.map((l) => `<a href="${l.url}">${esc(l.titulo)}</a>`).join("");

  return `<footer class="pie">
  <div class="contenedor pie__grilla">
    <div class="pie__marca">
      <img src="/assets/logo.webp" width="480" height="320" alt="${esc(sitio.nombre)}" loading="lazy" />
      <p>${esc(sitio.descripcionCorta)}</p>
    </div>

    <nav class="pie__col" aria-label="Secciones del sitio">
      <h2>El sitio</h2>
      <ul>${enlacesSitio}</ul>
    </nav>

    <div class="pie__col">
      <h2>Dónde y cuándo</h2>
      <ul>
        <li><a href="${esc(contacto.mapa)}" target="_blank" rel="noopener">${esc(contacto.calle)}, ${esc(contacto.localidad)} capital</a></li>
        <li><a href="tel:${contacto.telefonoE164}">${esc(contacto.telefono)}</a></li>
      </ul>
      <ul class="horas">${filasHorario}</ul>
    </div>

    <div class="pie__col">
      <h2>Redes</h2>
      <div class="redes">${tarjetasRedes}</div>
    </div>
  </div>

  <div class="contenedor pie__linea">
    <span>&copy; ${new Date().getFullYear()} ${esc(sitio.nombre)}, ${esc(contacto.localidad)} capital, ${esc(contacto.paisNombre)}</span>
    <nav class="pie__legales" aria-label="Legales">${enlacesLegales}</nav>
    <span>Sitio hecho por ${esc(sitio.estudio)}</span>
  </div>
</footer>`;
}

/**
 * Arma el documento completo de una página.
 * pagina: { ruta, titulo, descripcion, activa, imagen, jsonLd, cuerpo }
 */
export function documento(pagina, assets) {
  const url = absoluta(pagina.ruta);
  const imagen = absoluta(pagina.imagen || rutaFoto(fotos.empanadas, 1440));
  const bloques = (pagina.jsonLd || [])
    .map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`)
    .join("\n");

  return `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(pagina.titulo)}</title>
<meta name="description" content="${esc(pagina.descripcion)}" />
<link rel="canonical" href="${esc(url)}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="theme-color" content="#17120E" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="${esc(sitio.nombre)}" />
<meta property="og:locale" content="es_AR" />
<meta property="og:url" content="${esc(url)}" />
<meta property="og:title" content="${esc(pagina.titulo)}" />
<meta property="og:description" content="${esc(pagina.descripcion)}" />
<meta property="og:image" content="${esc(imagen)}" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="icon" href="/assets/icono-512.png" type="image/png" sizes="512x512" />
<link rel="apple-touch-icon" href="/assets/icono-180.png" />
<link rel="manifest" href="/manifest.webmanifest" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Hanken+Grotesk:wght@400;600&display=swap" />
<link rel="stylesheet" href="${assets.css}" />
${bloques}
</head>
<body>
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

export { juntar };
