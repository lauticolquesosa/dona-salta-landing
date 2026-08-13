/**
 * Catálogo de fotos. El archivo fuente vive en medios/<nombre>.webp y la
 * compilación genera las medidas de ANCHOS que se publican en /assets.
 * ancho y alto son los del original: sirven para reservar el espacio.
 * Todas las fotos son propias, tomadas en Córdoba 46.
 */

export const ANCHOS = [640, 1000, 1440];

const definir = (nombre, ancho, alto, alt) => ({ nombre, ancho, alto, alt });

export const fotos = {
  empanadas: definir(
    "empanadas",
    1127,
    1396,
    "Tabla de madera con seis empanadas salteñas doradas, sobre una mesa del salón"
  ),
  horno: definir(
    "horno",
    963,
    1600,
    "Asaderas con empanadas crudas frente a la boca encendida del horno de barro"
  ),
  salon: definir(
    "salon",
    1479,
    1064,
    "Salón de Doña Salta con las mesas llenas, paredes color tierra y lámparas de mimbre"
  ),
  paredes: definir(
    "paredes",
    1268,
    1241,
    "Paredes color tierra del salón con lámparas de mimbre colgadas de cañas de bambú"
  ),
  mesa: definir(
    "mesa",
    1549,
    1015,
    "Mesa servida con canasta de pan casero y el salón de fondo"
  ),
  locro: definir(
    "locro",
    1380,
    1140,
    "Locro servido en olla de barro, con chorizo, mote y verdeo picado"
  ),
  locroMesa: definir(
    "locro-mesa",
    1486,
    1059,
    "Olla de barro con locro, pan casero y una copa de vino tinto sobre la mesa"
  ),
  fachada: definir(
    "fachada",
    1448,
    1086,
    "Fachada amarilla de la casona de Doña Salta en Córdoba 46, con las puertas abiertas"
  ),
};

/** Ruta publicada de una medida concreta. */
export const rutaFoto = (foto, ancho) => `/assets/${foto.nombre}-${ancho}.webp`;

/** Las medidas que existen para esa foto: nunca se agranda el original. */
export const medidas = (foto) => {
  const utiles = ANCHOS.filter((a) => a < foto.ancho);
  return utiles.length === ANCHOS.length ? utiles : [...utiles, foto.ancho];
};
