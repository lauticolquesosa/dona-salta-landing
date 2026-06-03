/**
 * Toma una FOTO (snapshot) de las reseñas reales más nuevas de Google y la
 * guarda en src/data/google-reviews.json. El sitio luego lee ese archivo de
 * forma ESTÁTICA: producción no llama a Google en cada visita → costo $0.
 *
 * Para refrescar las reseñas cuando quieras:
 *   1) asegurate de tener GOOGLE_MAPS_API_KEY y GOOGLE_PLACE_ID en .env
 *      (la key necesita billing activo SOLO en el momento de correr esto)
 *   2) node scripts/snapshot-reviews.mjs
 *   3) commit + push
 */
import { readFileSync, writeFileSync } from "node:fs";

function envVal(name) {
  if (process.env[name]) return process.env[name];
  try {
    const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
    return env.match(new RegExp(`^${name}\\s*=\\s*(.+)\\s*$`, "m"))?.[1]?.trim();
  } catch {
    return undefined;
  }
}

const key = envVal("GOOGLE_MAPS_API_KEY");
const placeId = envVal("GOOGLE_PLACE_ID");
if (!key || !placeId) {
  console.error("Falta GOOGLE_MAPS_API_KEY o GOOGLE_PLACE_ID (en .env o entorno).");
  process.exit(1);
}

// Texto mínimo para que una reseña luzca bien en la tarjeta (evita "ok" sueltos).
const MIN_TEXT = 25;

async function fetchReviews(sort) {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  if (sort) url.searchParams.set("reviews_sort", sort);
  url.searchParams.set("reviews_no_translations", "true");
  url.searchParams.set("language", "es");
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("key", key);
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK") {
    console.error(`Google respondió (${sort}): ${data.status}`, data.error_message ?? "");
    process.exit(1);
  }
  return data.result ?? {};
}

// Combinamos "más nuevas" + "más relevantes" para maximizar reseñas con texto.
const [newest, relevant] = await Promise.all([
  fetchReviews("newest"),
  fetchReviews("most_relevant"),
]);

const fmt = new Intl.DateTimeFormat("es-AR", { month: "long", year: "numeric" });
const seen = new Set();
const reviews = [...(newest.reviews ?? []), ...(relevant.reviews ?? [])]
  .map((r) => ({
    author: r.author_name ?? "Cliente de Google",
    rating: Math.round(r.rating ?? 5),
    text: (r.text ?? "").trim(),
    time: r.time ?? 0,
    dateLabel: r.time ? fmt.format(new Date(r.time * 1000)) : "",
    photo: r.profile_photo_url ?? null,
    authorUrl: r.author_url ?? null,
  }))
  .filter((r) => {
    if (r.text.length < MIN_TEXT) return false;
    const id = r.author + "|" + r.time; // dedupe entre ambos listados
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  })
  .sort((a, b) => b.time - a.time); // más nuevas primero

const snapshot = {
  fetchedAt: new Date().toISOString(),
  rating: newest.rating ?? relevant.rating ?? null,
  total: newest.user_ratings_total ?? relevant.user_ratings_total ?? null,
  reviews,
};

const out = new URL("../src/data/google-reviews.json", import.meta.url);
writeFileSync(out, JSON.stringify(snapshot, null, 2) + "\n");
console.log(
  `Snapshot guardado: ${reviews.length} reseñas con texto (rating ${snapshot.rating}, total ${snapshot.total}).`
);
