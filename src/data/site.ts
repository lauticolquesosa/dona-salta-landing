/**
 * Fuente única de verdad de todo el contenido editable de la landing.
 * Cambiar un dato (teléfono, dirección, precio, imagen, reseña) se hace ACÁ
 * y solo acá. Los placeholders están señalizados con [CORCHETES].
 *
 * Ver README.md → "Checklist de placeholders" para la lista completa.
 */

/* ------------------------------------------------------------------ */
/* Negocio / contacto                                                  */
/* ------------------------------------------------------------------ */
export const business = {
  name: "Doña Salta",
  tagline: "Cocina regional salteña",
  foundedYear: "[AÑO_FUNDACION]", // ej. "1985"
  // Número de WhatsApp en formato internacional SIN "+", espacios ni guiones.
  // Ej. Argentina Salta: 5493874000000  (54 9 387 4-000000)
  whatsappNumber: "[WHATSAPP_NUMERO]",
  phoneDisplay: "[TELEFONO]", // ej. "+54 387 421-0000"
  phoneHref: "[TELEFONO_LINK]", // ej. "+543874210000"
  email: "[EMAIL]", // ej. "reservas@donasalta.com.ar"
  address: {
    street: "[DIRECCION]", // ej. "Calle Córdoba 46"
    city: "Salta",
    region: "Salta",
    postalCode: "[CP]", // ej. "A4400"
    country: "AR",
    // Coordenadas para Schema.org y el botón "Cómo llegar".
    lat: "[LATITUD]", // ej. "-24.7886"
    lng: "[LONGITUD]", // ej. "-65.4099"
  },
  // URL de Google Maps para "Cómo llegar" (botón). Reemplazar por el link real del local.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Do%C3%B1a+Salta+Salta+Argentina",
  // URL del iframe embebido del mapa. Reemplazar por el embed real del local.
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Salta+Capital+Argentina&output=embed",
  // Carta completa (página interna con el menú real). Ver src/pages/carta.astro.
  fullMenuUrl: "/carta",
} as const;

/* ------------------------------------------------------------------ */
/* Horarios (editable). isClosed marca días cerrados.                  */
/* El formato `opens`/`closes` (24h) alimenta el Schema.org.           */
/* ------------------------------------------------------------------ */
export const openingHours = [
  { day: "Lunes a Jueves", days: ["Mo", "Tu", "We", "Th"], opens: "12:00", closes: "00:00", label: "12:00 – 00:00" },
  { day: "Viernes y Sábado", days: ["Fr", "Sa"], opens: "12:00", closes: "01:00", label: "12:00 – 01:00" },
  { day: "Domingo", days: ["Su"], opens: "12:00", closes: "00:00", label: "12:00 – 00:00" },
] as const;
// Resumen corto para el footer/hero (placeholder editable).
export const hoursSummary = "Todos los días · 12:00 – 00:00 [HORARIO]";

/* ------------------------------------------------------------------ */
/* Prueba social — credenciales REALES y verídicas (del brief)         */
/* ------------------------------------------------------------------ */
export const social = {
  googleRating: "4.5",
  googleReviews: "25.000+",
  googleReviewsCount: 25000,
  tripadvisor: "Travelers' Choice 2025",
  tripadvisorRank: "#11 de 377 en Salta",
  tripadvisorReviews: "4.227",
  instagramFollowers: "16.000",
  instagramHandle: "@donasaltarestaurante",
  facebookRating: "4.7",
  links: {
    instagram: "https://www.instagram.com/donasaltarestaurante/",
    facebook: "[URL_FACEBOOK]",
    tripadvisor: "[URL_TRIPADVISOR]",
    google: "[URL_GOOGLE_BUSINESS]",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Navegación                                                          */
/* ------------------------------------------------------------------ */
export const navLinks = [
  { label: "Menú", href: "#menu" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Galería", href: "#galeria" },
  { label: "Cómo llegar", href: "#ubicacion" },
  { label: "Reseñas", href: "#resenas" },
] as const;

/* ------------------------------------------------------------------ */
/* WhatsApp deep links                                                 */
/* ------------------------------------------------------------------ */
const waBase = `https://wa.me/${business.whatsappNumber}`;
export function waLink(message: string): string {
  return `${waBase}?text=${encodeURIComponent(message)}`;
}
export const wa = {
  reserva: waLink(
    "¡Hola Doña Salta! Quiero reservar una mesa. ¿Tienen disponibilidad?"
  ),
  consulta: waLink(
    "¡Hola Doña Salta! Quería hacerles una consulta sobre el restaurante."
  ),
  menu: waLink(
    "¡Hola Doña Salta! Me gustaría ver la carta y reservar una mesa."
  ),
} as const;

/* ------------------------------------------------------------------ */
/* Imágenes — placeholders centralizados.                              */
/* Reemplazar el archivo en /public/assets/img/ manteniendo el nombre  */
/* y la proporción (width/height) para no romper el layout.            */
/* ------------------------------------------------------------------ */
// Imágenes IA provisorias generadas con Flux Schnell (estética salteña).
// Para usar el placeholder SVG original, cambiá IMG por "/assets/img" y la
// extensión a .svg. Para fotos reales, reemplazá el archivo dentro de IMG.
const IMG = "/assets/img/ai";
// Base de imágenes de la GALERÍA. Apunta a las fotos REALES del local
// (en /public/assets/img/reales/). Para volver a las imágenes IA, cambiá a IMG.
const GALLERY_IMG = "/assets/img/reales";
export const images = {
  hero: {
    src: `${IMG}/hero.jpg`,
    real: `${IMG}/hero.jpg`,
    alt: "Empanadas salteñas recién horneadas y mesa servida en el ambiente cálido de Doña Salta",
    width: 1216,
    height: 832,
  },
  about: {
    src: `${IMG}/nosotros.jpg`,
    real: `${IMG}/nosotros.jpg`,
    alt: "Cocina tradicional salteña: manos amasando empanadas sobre mesa de madera",
    width: 832,
    height: 1024,
  },
  ogImage: {
    src: `${IMG}/og-image.jpg`,
    real: `${IMG}/og-image.jpg`,
    alt: "Doña Salta — cocina regional salteña",
    width: 1216,
    height: 640,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Menú / especialidades                                               */
/* Precios = placeholder editable.                                     */
/* ------------------------------------------------------------------ */
export type Dish = {
  slug: string;
  name: string;
  description: string;
  price: string;
  img: string;
  alt: string;
  highlight?: boolean;
};

export const dishes: Dish[] = [
  {
    slug: "empanadas",
    name: "Empanadas salteñas",
    description:
      "Carne, pollo, queso o charqui. Jugosas, a cuchillo y con repulgue criollo. La joya de la casa.",
    price: "$2.000 c/u",
    img: `${IMG}/plato-empanadas.jpg`,
    alt: "Empanadas salteñas doradas servidas en plato de barro",
    highlight: true,
  },
  {
    slug: "locro",
    name: "Locro norteño",
    description:
      "Guiso espeso de maíz, zapallo y carnes, cocción lenta. Puro abrigo del norte.",
    price: "$25.000",
    img: `${IMG}/plato-locro.jpg`,
    alt: "Plato de locro norteño humeante con quiaquita de ají",
  },
  {
    slug: "humita",
    name: "Humita en chala",
    description:
      "Choclo rallado, cremoso y dulzón, cocido en su propia hoja. Receta de siempre.",
    price: "$8.000",
    img: `${IMG}/plato-humita.jpg`,
    alt: "Humita en chala atada, servida tradicionalmente",
  },
  {
    slug: "tamales",
    name: "Tamales",
    description:
      "Masa de maíz rellena, envuelta en chala y cocida al punto justo. Sabor ancestral.",
    price: "$8.000",
    img: `${IMG}/plato-tamales.jpg`,
    alt: "Tamales salteños envueltos en chala sobre tabla de madera",
  },
  {
    slug: "cabrito",
    name: "Cabrito a la provenzal",
    description:
      "Cabrito tierno con papas españolas, dorado a la provenzal. El plato serrano por excelencia.",
    price: "$50.000",
    img: `${IMG}/plato-asado.jpg`,
    alt: "Cabrito a la provenzal con papas, plato regional salteño",
    highlight: true,
  },
  {
    slug: "vinos",
    name: "Vinos de altura",
    description:
      "Torrontés y Malbec de Cafayate y los Valles Calchaquíes. La altura en la copa.",
    price: "desde $4.500",
    img: `${IMG}/plato-vinos.jpg`,
    alt: "Copa de vino tinto de altura junto a botellas de los Valles Calchaquíes",
  },
];

/* ------------------------------------------------------------------ */
/* Carta completa — transcripción del menú real (PDF de la casa).      */
/* Se renderiza en /carta. Precios en pesos argentinos.                */
/* NOTA: las páginas de empanadas/regionales y minutas del PDF son     */
/* gráficas; algunos precios se infirieron del diseño. Verificar.      */
/* ------------------------------------------------------------------ */
export type MenuItem = {
  name: string;
  price: string;
  /** Variantes o aclaración (ej. sabores, tamaños). */
  note?: string;
};
export type MenuCategory = {
  title: string;
  /** Aclaración bajo el título (ej. "Carne / Pollo / Queso / Charqui"). */
  note?: string;
  items: MenuItem[];
};

export const fullMenu: MenuCategory[] = [
  {
    title: "Empanadas",
    note: "Carne · Pollo · Queso · Charqui",
    items: [
      { name: "Empanada", price: "$2.000", note: "por unidad" },
      { name: "Docena de empanadas", price: "$24.000", note: "por docena" },
    ],
  },
  {
    title: "Regionales",
    items: [
      { name: "Locro / Huaschalocro", price: "$25.000" },
      { name: "Lentejas / Carbonada / Mondongo", price: "$25.000" },
      { name: "Humitas", price: "$8.000", note: "cada una" },
      { name: "Tamales", price: "$8.000", note: "cada una" },
    ],
  },
  {
    title: "Pastas",
    items: [
      { name: "Pasta sola", price: "$20.000" },
      { name: "Tallarines con tuco", price: "$23.000" },
      { name: "Ñoquis con tuco", price: "$23.000" },
      { name: "Ravioles con tuco", price: "$23.000" },
      { name: "Sorrentinos con tuco", price: "$28.000" },
      { name: "Sorrentinos solos", price: "$25.000" },
      { name: "Extra peceto o pollo acompañando pastas", price: "$6.000" },
      { name: "Extra salsa blanca o bolognesa", price: "$6.000" },
    ],
  },
  {
    title: "Platos de la casa",
    items: [
      { name: "Cazuela de conejo", price: "$35.000" },
      { name: "Cazuela de cabrito", price: "$38.000" },
      { name: "Cabrito a la provenzal c/ papas españolas", price: "$50.000" },
      { name: "Bife de chorizo", price: "$30.000" },
      { name: "Matambre", price: "$25.000" },
      { name: "1/4 de pollo deshuesado", price: "$25.000" },
    ],
  },
  {
    title: "Minutas",
    items: [
      { name: "Milanesa c/ fritas y huevo", price: "$25.000" },
      { name: "Suprema c/ fritas y huevo", price: "$28.000" },
      { name: "Napolitana c/ fritas", price: "$28.000" },
      { name: "Suprema napolitana c/ fritas", price: "$30.000" },
      { name: "Pizza a la piedra", price: "$25.000", note: "Jamón · Napolitana · Muzzarella" },
    ],
  },
  {
    title: "Guarniciones",
    items: [
      { name: "Puré", price: "$8.500" },
      { name: "Papas fritas", price: "$8.500" },
      { name: "Papas fritas a la provenzal", price: "$10.000" },
      { name: "Ensalada mixta común", price: "$8.500" },
      { name: "Ensalada mixta especial", price: "$10.000" },
      { name: "Panaché de verduras", price: "$8.500" },
    ],
  },
  {
    title: "Postres",
    items: [
      { name: "Turrón salteño", price: "$6.500" },
      { name: "Postre Doña Salta", price: "$9.500" },
      { name: "Cayote o cuaresmillo", price: "$6.000" },
      { name: "Quesillo c/ miel", price: "$6.000" },
      { name: "Quesillo c/ cuaresmillo, cayote y nueces", price: "$8.500" },
      { name: "Quesillo mixto completo", price: "$12.000" },
      { name: "Ensalada de frutas", price: "$6.500" },
      { name: "Flan o budín de pan", price: "$6.500" },
      { name: "Helado", price: "$5.000 / $7.000 / $10.000", note: "1 · 2 · 3 bochas" },
      { name: "Almendrado / Suizo / Escocés", price: "$8.000" },
      { name: "Copa Don Pedro", price: "$11.000" },
      { name: "Extra dulce o crema", price: "$3.500" },
    ],
  },
  {
    title: "Bebidas sin alcohol",
    items: [
      { name: "Gaseosa x 1 litro", price: "$11.000" },
      { name: "Gaseosa chica x 330cc", price: "$4.500" },
      { name: "Schweppes lata x 500cc", price: "$5.500" },
      { name: "Agua mineral con/sin gas", price: "$5.000" },
      { name: "Agua c/gas limonada x 1 litro", price: "$10.000" },
      { name: "Agua c/gas limonada x 500cc", price: "$5.500" },
      { name: "Aguas saborizadas x 500cc", price: "$5.500" },
    ],
  },
  {
    title: "Cervezas y tragos",
    items: [
      { name: "Cerveza Salta (Blanca/Negra/Roja) x 1 litro", price: "$12.000" },
      { name: "Cerveza Salta (Blanca/Negra/Roja) x 500cc", price: "$8.000" },
      { name: "Cerveza Heineken x 1 litro", price: "$15.000" },
      { name: "Cerveza Heineken x 500cc", price: "$10.000" },
      { name: "Fernet con Coca", price: "$12.000" },
      { name: "Fernet solo", price: "$7.500" },
      { name: "Sangría jarra 1/2 litro", price: "$9.000" },
      { name: "Sangría jarra 1 litro", price: "$15.000" },
    ],
  },
  {
    title: "Vino de la casa",
    items: [
      { name: "Copa de vino", price: "$4.500" },
      { name: "Jarra 1/4 litro", price: "$6.000" },
      { name: "Jarra 1/2 litro", price: "$8.000" },
      { name: "Jarra 1 litro", price: "$12.000" },
    ],
  },
  {
    title: "Vinos salteños",
    items: [
      { name: "Origen Regional Tinto", price: "$14.000" },
      { name: "Origen Malbec / Torrontés", price: "$15.000" },
      { name: "Domingo Hnos. Expresión Tinto de Altura", price: "$20.000" },
      { name: "Domingo Hnos. Expresión Blanco de Altura", price: "$20.000" },
      { name: "Domingo Hnos. Expresión Dulce de Altura", price: "$20.000" },
      { name: "Domingo Molina Malbec / Cabernet Suave", price: "$43.000" },
      { name: "Nani Malbec / Tannat / Cab. Suave / Torrontés", price: "$22.000" },
      { name: "Nani Malbec / Torrontés 3/8", price: "$15.000" },
      { name: "Mayuco Malbec", price: "$30.000" },
      { name: "Mayuco Torrontés", price: "$30.000" },
      { name: "Familia Gascón Malbec", price: "$20.000" },
      { name: "Finca Las Nubes Malbec", price: "$33.000" },
      { name: "Finca Las Nubes Torrontés", price: "$23.000" },
      { name: "Etchart Malbec", price: "$17.000" },
      { name: "Etchart Cafayate Torrontés", price: "$17.000" },
      { name: "Etchart Privado Torrontés", price: "$17.000" },
      { name: "Don David Malbec / Cab. Suave / Torrontés", price: "$22.000" },
      { name: "Vasija Secreta Malbec / Cabernet", price: "$15.000" },
    ],
  },
  {
    title: "Vinos Puna",
    items: [
      { name: "Puna 2600 Malbec Reserva", price: "$33.000" },
      { name: "Puna 2600 Malbec", price: "$25.000" },
      { name: "Puna 2600 Malbec 3/8", price: "$15.000" },
      { name: "Puna 2600 Torrontés / Torrontés Dulce", price: "$18.000" },
      { name: "Puna Helios Malbec", price: "$16.000" },
      { name: "Occidente Malbec", price: "$20.000" },
    ],
  },
  {
    title: "Vinos mendocinos",
    items: [
      { name: "San Felipe", price: "$15.000" },
      { name: "San Felipe 3/8", price: "$10.000" },
      { name: "López Malbec", price: "$18.000" },
      { name: "López Malbec 3/8", price: "$12.000" },
      { name: "Dilema Dulce", price: "$13.000" },
      { name: "Dilema Espumante", price: "$16.000" },
      { name: "Champagne Chandon Extra Brut", price: "$38.000" },
    ],
  },
];

/** Aclaración fija que aparece en todas las páginas de la carta. */
export const menuNote = "Servicio de cubiertos $2.000 por persona.";

/* ------------------------------------------------------------------ */
/* Galería — placeholders con proporción definida                      */
/* ------------------------------------------------------------------ */
export type GalleryItem = {
  src: string;
  alt: string;
  /** "wide" ocupa 2 columnas, "tall" ocupa 2 filas (grid de mosaico). */
  span?: "wide" | "tall";
  /** Encuadre del recorte (object-position CSS). Ej: "center top", "50% 30%". */
  objectPosition?: string;
};

export const gallery: GalleryItem[] = [
  { src: `${GALLERY_IMG}/galeria-01.jpg`, alt: "Empanadas salteñas doradas recién horneadas, servidas en tabla de madera", span: "tall" },
  { src: `${GALLERY_IMG}/galeria-02.jpg`, alt: "Salón de Doña Salta con paredes de adobe, mesas de madera y comensales" },
  { src: `${GALLERY_IMG}/galeria-03.jpg`, alt: "Fachada iluminada de Doña Salta de noche, en el casco histórico de Salta", span: "wide", objectPosition: "center top" },
  { src: `${GALLERY_IMG}/galeria-04.jpg`, alt: "Mesa servida con tamales, picada y una copa de vino tinto de altura" },
  { src: `${GALLERY_IMG}/galeria-05.jpg`, alt: "Interior cálido del restaurante con arcos de adobe y detalles en caña" },
];

/* ------------------------------------------------------------------ */
/* Reseñas — formato real, contenido placeholder editable              */
/* ------------------------------------------------------------------ */
export type Review = {
  text: string;
  author: string;
  source: "Google" | "TripAdvisor";
  rating: number;
};

export const reviews: Review[] = [
  {
    text: "[RESEÑA] Las mejores empanadas salteñas que probé en mi vida. El locro, espectacular. Atención impecable y ambiente cálido. Volvería mil veces.",
    author: "[NOMBRE]",
    source: "Google",
    rating: 5,
  },
  {
    text: "[RESEÑA] Paramos en Salta solo unos días y este lugar fue lo mejor del viaje. Comida típica auténtica y precios justos. Imperdible.",
    author: "[NOMBRE]",
    source: "TripAdvisor",
    rating: 5,
  },
  {
    text: "[RESEÑA] Un clásico de Salta por algo. Los tamales y la humita te transportan. Reservá porque se llena.",
    author: "[NOMBRE]",
    source: "Google",
    rating: 5,
  },
  {
    text: "[RESEÑA] Comimos como reyes. El vino de altura acompañó perfecto el asado. Servicio atento y rápido. 100% recomendable.",
    author: "[NOMBRE]",
    source: "TripAdvisor",
    rating: 4,
  },
];

/* ------------------------------------------------------------------ */
/* Crédito de autor (footer, discreto y opcional)                      */
/* ------------------------------------------------------------------ */
export const credit = {
  agency: "[MI_AGENCIA]",
  url: "[URL_AGENCIA]",
};
