import { carta, cubierto } from "../data/carta.mjs";
import { fotos, rutaFoto } from "../data/fotos.mjs";
import { esc, precio, foto, enlace } from "../lib/html.mjs";
import { cierre, migas, absoluta } from "../lib/layout.mjs";

const encabezado = `<section class="encabezado">
  <div class="contenedor">
    <h1 class="titulo-1">La carta de Doña Salta, con todos los precios</h1>
    <p class="parrafo bajada">Esta es la carta completa del salón, la misma que está sobre la mesa. Cocina regional salteña, pastas, minutas y una carta de vinos casi toda de la provincia. Los precios están en pesos y se actualizan cuando cambian en el local.</p>
  </div>
</section>`;

const indice = `<nav class="indice" aria-label="Secciones de la carta">
  <div class="contenedor">
    <ul>${carta.map((s) => `<li><a href="#${s.id}">${esc(s.titulo)}</a></li>`).join("")}</ul>
  </div>
</nav>`;

const seccion = (s, i) => `<section class="seccion carta-seccion${i % 2 ? " seccion--superficie" : ""}" id="${s.id}">
  <div class="contenedor">
    <div class="bloque">
      <h2 class="titulo-2 animar">${esc(s.titulo)}</h2>
      <p class="parrafo animar">${esc(s.entrada)}</p>
    </div>
    <div class="grupos">
      ${s.grupos
        .map(
          (g) => `<div class="grupo animar">
        <h3 class="titulo-3">${esc(g.titulo)}</h3>
        <ul class="items">
          ${g.items
            .map(
              (it) => `<li class="item">
            <span class="item__nombre">${esc(it.nombre)}${it.detalle ? `<small>${esc(it.detalle)}</small>` : ""}</span>
            <span class="item__precio">${precio(it.precio)}</span>
          </li>`
            )
            .join("")}
        </ul>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

const notas = `<section class="seccion">
  <div class="contenedor banda banda--invertida">
    ${foto(fotos.locroMesa, { clase: "banda__foto animar", sizes: "(max-width: 900px) 100vw, 45vw" })}
    <div class="banda__texto">
      <h2 class="titulo-2 animar">Antes de sentarte, tres cosas</h2>
      <p class="parrafo animar">El servicio de cubiertos y pan se cobra ${precio(cubierto)} por persona y va aparte de lo que pidas. Los precios están en pesos argentinos y pueden cambiar sin aviso, así que la carta del salón es la que manda.</p>
      <p class="parrafo animar">Sin carne hay poco, y preferimos decirlo antes: empanadas de queso, humitas, tamales, pastas con salsa, pizza a la piedra, ensaladas y guarniciones de verdura.</p>
      <p class="animar">${enlace({ texto: "Cómo se hacen las empanadas", url: "/empanadas" })}</p>
    </div>
  </div>
</section>`;

/** Menú estructurado para el buscador: cada sección con sus ítems y precios. */
const fichaCarta = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Carta de Doña Salta",
  url: absoluta("/carta"),
  inLanguage: "es-AR",
  hasMenuSection: carta.map((s) => ({
    "@type": "MenuSection",
    name: s.titulo,
    description: s.entrada,
    hasMenuItem: s.grupos.flatMap((g) =>
      g.items.map((it) => ({
        "@type": "MenuItem",
        name: it.nombre,
        ...(it.detalle ? { description: it.detalle } : {}),
        offers: { "@type": "Offer", price: it.precio, priceCurrency: "ARS" },
      }))
    ),
  })),
};

export default {
  ruta: "/carta",
  archivo: "carta.html",
  activa: "carta",
  titulo: "Carta y precios · Doña Salta, cocina regional en Salta",
  descripcion:
    "Carta completa de Doña Salta con precios: empanadas al horno de barro, locro, humitas, cazuela de cabrito, pastas, minutas y vinos salteños. Córdoba 46, Salta capital.",
  imagen: rutaFoto(fotos.locro, 1440),
  jsonLd: [migas("La carta", "/carta"), fichaCarta],
  cuerpo: [
    encabezado,
    indice,
    carta.map(seccion).join("\n"),
    notas,
    cierre({
      titulo: "La carta se disfruta en la mesa",
      texto:
        "Todo lo que ves se cocina acá, en Córdoba 46. Venite a almorzar o a cenar, o llamá y te lo preparamos para llevar.",
    }),
  ].join("\n"),
};
