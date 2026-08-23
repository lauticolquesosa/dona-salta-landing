import { carta, cubierto } from "../data/carta.mjs";
import { fotos, rutaFoto } from "../data/fotos.mjs";
import { boton, esc, precio } from "../lib/html.mjs";
import { absoluta, migas } from "../lib/layout.mjs";
import { atajos, centrada, invitacion, portada, relato } from "../lib/piezas.mjs";

/** Cada sección de la carta: una grilla de filetes con el plato, el detalle y el precio. */
const seccion = (s) => `<section class="seccion seccion--oscura carta-seccion" id="${s.id}">
  <div class="contenedor">
    <div class="bloque bloque--centro">
      <h2 class="titulo-2 animar">${esc(s.titulo)}</h2>
      <p class="parrafo animar">${esc(s.entrada)}</p>
    </div>
    ${s.grupos
      .map(
        (g) => `<div class="grupo">
      <h3 class="grupo__titulo animar">${esc(g.titulo)}</h3>
      <ul class="items escalona">
        ${g.items
          .map(
            (it) => `<li class="item animar">
          <h4 class="titulo-3">${esc(it.nombre)}</h4>
          ${it.detalle ? `<p class="item__detalle">${esc(it.detalle)}</p>` : ""}
          <p class="item__precio">${precio(it.precio)}</p>
        </li>`
          )
          .join("")}
      </ul>
    </div>`
      )
      .join("")}
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
  precarga: fotos.locro,
  jsonLd: [migas("La carta", "/carta"), fichaCarta],
  cuerpo: [
    portada({
      imagen: fotos.locro,
      titulo: ["La carta,", "con todos los precios"],
      bajada:
        "Esta es la carta del salón, la misma que está sobre la mesa. Cocina regional salteña, pastas, minutas y vinos de la provincia.",
    }),

    centrada({
      titulo: ["Ocho secciones", "y una cocina sola"],
      textos: [
        "Todo se cocina en Córdoba 46: las empanadas en el horno de barro, los platos de olla a fuego lento y las cazuelas por encargo del día. Los precios están en pesos y se actualizan cuando cambian en el local.",
      ],
      accion: atajos(carta.map((s) => ({ titulo: s.titulo, url: `#${s.id}` }))),
    }),

    carta.map(seccion).join("\n"),

    relato({
      imagen: fotos.locroMesa,
      invertida: true,
      titulo: ["Antes de sentarte,", "tres cosas"],
      textos: [
        `El servicio de cubiertos y pan se cobra ${precio(cubierto)} por persona y va aparte de lo que pidas.`,
        "Los precios pueden cambiar sin aviso, así que la carta del salón es la que manda al momento de pedir. La disponibilidad de los platos regionales depende del día y algunos se agotan durante el servicio.",
        "Sin carne hay poco, y preferimos decirlo antes: empanadas de queso, humitas, tamales, pastas con salsa, pizza a la piedra, ensaladas y guarniciones de verdura.",
      ],
      accion: boton({ texto: "Cómo se hacen las empanadas", url: "/empanadas", nivel: "contorno" }),
    }),

    invitacion({
      imagen: fotos.mesa,
      titulo: ["La carta se disfruta", "en la mesa"],
      texto:
        "Todo lo que ves se cocina acá. Venite a almorzar o a cenar, o llamá y te lo preparamos para llevar.",
    }),
  ].join("\n"),
};
