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

const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
url.searchParams.set("place_id", placeId);
url.searchParams.set("reviews_sort", "newest");
url.searchParams.set("reviews_no_translations", "true");
url.searchParams.set("language", "es");
url.searchParams.set("fields", "rating,user_ratings_total,reviews");
url.searchParams.set("key", key);

const res = await fetch(url);
const data = await res.json();
if (data.status !== "OK") {
  console.error(`Google respondió: ${data.status}`, data.error_message ?? "");
  process.exit(1);
}

const fmt = new Intl.DateTimeFormat("es-AR", { month: "long", year: "numeric" });
const reviews = (data.result?.reviews ?? [])
  .map((r) => ({
    author: r.author_name ?? "Cliente de Google",
    rating: Math.round(r.rating ?? 5),
    text: (r.text ?? "").trim(),
    time: r.time ?? 0,
    dateLabel: r.time ? fmt.format(new Date(r.time * 1000)) : "",
    photo: r.profile_photo_url ?? null,
    authorUrl: r.author_url ?? null,
  }))
  .filter((r) => r.text.length > 0)
  .sort((a, b) => b.time - a.time);

const snapshot = {
  fetchedAt: new Date().toISOString(),
  rating: data.result?.rating ?? null,
  total: data.result?.user_ratings_total ?? null,
  reviews,
};

const out = new URL("../src/data/google-reviews.json", import.meta.url);
writeFileSync(out, JSON.stringify(snapshot, null, 2) + "\n");
console.log(
  `Snapshot guardado: ${reviews.length} reseñas con texto (rating ${snapshot.rating}, total ${snapshot.total}).`
);
