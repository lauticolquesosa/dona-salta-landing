/**
 * Autodetecta el Place ID de Doña Salta usando tu GOOGLE_MAPS_API_KEY.
 * Uso:  node scripts/find-place-id.mjs ["consulta opcional"]
 * Lee la key de la variable de entorno GOOGLE_MAPS_API_KEY o del archivo .env.
 */
import { readFileSync } from "node:fs";

function loadEnvKey() {
  if (process.env.GOOGLE_MAPS_API_KEY) return process.env.GOOGLE_MAPS_API_KEY;
  try {
    const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
    const m = env.match(/^GOOGLE_MAPS_API_KEY\s*=\s*(.+)\s*$/m);
    return m?.[1]?.trim();
  } catch {
    return undefined;
  }
}

const key = loadEnvKey();
if (!key) {
  console.error("Falta GOOGLE_MAPS_API_KEY (en el entorno o en .env).");
  process.exit(1);
}

const query = process.argv[2] || "Doña Salta restaurante Salta Argentina";
const url = new URL(
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
);
url.searchParams.set("input", query);
url.searchParams.set("inputtype", "textquery");
url.searchParams.set("fields", "place_id,name,formatted_address");
url.searchParams.set("language", "es");
url.searchParams.set("key", key);

const res = await fetch(url);
const data = await res.json();

if (data.status !== "OK") {
  console.error(`Google respondió: ${data.status}`, data.error_message ?? "");
  process.exit(1);
}

console.log(`\nResultados para: "${query}"\n`);
for (const c of data.candidates) {
  console.log(`  name:     ${c.name}`);
  console.log(`  address:  ${c.formatted_address}`);
  console.log(`  PLACE_ID: ${c.place_id}\n`);
}
console.log(
  "Copiá el PLACE_ID correcto en .env (GOOGLE_PLACE_ID=...) y en Vercel."
);
