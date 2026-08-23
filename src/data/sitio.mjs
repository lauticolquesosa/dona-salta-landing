/**
 * Fuente única de los datos del negocio.
 * Nombre, dirección y teléfono tienen que ser idénticos acá, en Google y en las redes.
 */

export const sitio = {
  nombre: "Doña Salta",
  origen: "https://dona-salta-landing.vercel.app",
  idioma: "es-AR",
  descripcionCorta:
    "Bodegón salteño frente a la Basílica de San Francisco. Empanadas al horno de barro y cocina regional, todos los días.",
  estudio: "LCS DESIGN",
  estudioUrl: "https://lcsdesign.vercel.app",
  // Se usa en la etiqueta de tema, el manifiesto y el fondo del ícono.
  colorTema: "#1E1512",
};

export const contacto = {
  calle: "Córdoba 46",
  localidad: "Salta",
  provincia: "Salta",
  codigoPostal: "A4400",
  pais: "AR",
  paisNombre: "Argentina",
  telefono: "0387 432-1921",
  telefonoE164: "+543874321921",
  whatsapp: "https://wa.me/543874321921",
  mapa: "https://www.google.com/maps/dir/?api=1&destination=Do%C3%B1a+Salta+C%C3%B3rdoba+46+Salta+Argentina",
  mapaEmbed:
    "https://www.google.com/maps?q=Do%C3%B1a+Salta%2C+C%C3%B3rdoba+46%2C+Salta%2C+Argentina&output=embed",
  reseñas: "https://www.google.com/maps/search/?api=1&query=Do%C3%B1a+Salta+Salta",
};

export const horarios = [
  { servicio: "Almuerzo", dias: "Todos los días", abre: "11:30", cierra: "15:00" },
  { servicio: "Cena", dias: "Todos los días", abre: "20:00", cierra: "00:00" },
];

export const redes = [
  {
    red: "Instagram",
    cuenta: "@donasaltarestaurante",
    url: "https://www.instagram.com/donasaltarestaurante/",
    icono: "instagram",
  },
  {
    red: "Facebook",
    cuenta: "Doña Salta",
    url: "https://www.facebook.com/100063616204876",
    icono: "facebook",
  },
];

/** Puntaje público en Google. Se escribe una vez: lo usan la portada y la ficha del negocio. */
export const reputacion = { puntaje: 4.5, puntajeTexto: "4,5", reseñas: 25000, reseñasTexto: "25.000" };

/** Prueba de confianza. Todos los datos están verificados, no se agregan otros. */
export const reconocimientos = [
  { dato: "4,5", unidad: "sobre 5", detalle: "Puntaje en Google con más de 25.000 reseñas" },
  { dato: "25.000", unidad: "reseñas", detalle: "Comensales que ya calificaron la mesa" },
  { dato: "11", unidad: "de 377", detalle: "Puesto entre los restaurantes de Salta en TripAdvisor" },
  { dato: "2025", unidad: "Travelers' Choice", detalle: "Premio de TripAdvisor del último año" },
];

export const navegacion = [
  { titulo: "Empanadas", url: "/empanadas", clave: "empanadas" },
  { titulo: "La carta", url: "/carta", clave: "carta" },
  { titulo: "El bodegón", url: "/el-bodegon", clave: "bodegon" },
  { titulo: "Visitanos", url: "/visitanos", clave: "visitanos" },
];

export const legales = [
  { titulo: "Política de privacidad", url: "/privacidad", clave: "privacidad" },
  { titulo: "Términos de uso", url: "/terminos", clave: "terminos" },
];
