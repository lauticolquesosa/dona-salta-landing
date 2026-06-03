import type { APIRoute } from "astro";

/**
 * Endpoint serverless: devuelve las reseñas MÁS NUEVAS de Google del local.
 * La API key vive solo en el servidor (variable de entorno), nunca llega al
 * navegador. Si falta configuración o Google falla, devuelve `configured:false`
 * y el frontend usa las reseñas curadas de respaldo (degradación elegante).
 *
 * Variables de entorno necesarias (en Vercel y en .env local):
 *   - GOOGLE_MAPS_API_KEY : API key con "Places API" habilitada + billing.
 *   - GOOGLE_PLACE_ID     : Place ID del local (se puede autodetectar, ver scripts/find-place-id.mjs).
 */

// Esta ruta se ejecuta on-demand (función serverless), no se prerenderiza.
export const prerender = false;

type CleanReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  time: number;
  photo: string | null;
  authorUrl: string | null;
};

const env = (k: string) =>
  process.env[k] ?? (import.meta.env as Record<string, string>)[k];

export const GET: APIRoute = async () => {
  const key = env("GOOGLE_MAPS_API_KEY");
  const placeId = env("GOOGLE_PLACE_ID");

  // Sin credenciales → el frontend cae al respaldo curado.
  if (!key || !placeId) {
    return json({ configured: false, reviews: [] }, 200, 300);
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("reviews_sort", "newest"); // las más nuevas primero
  url.searchParams.set("reviews_no_translations", "true");
  url.searchParams.set("language", "es");
  url.searchParams.set("fields", "rating,user_ratings_total,reviews,url,name");
  url.searchParams.set("key", key);

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const data = await res.json();

    if (data.status !== "OK") {
      return json(
        { configured: true, ok: false, error: data.status, reviews: [] },
        200,
        60
      );
    }

    const result = data.result ?? {};
    const reviews: CleanReview[] = (result.reviews ?? [])
      .map((r: any) => ({
        author: r.author_name ?? "Cliente de Google",
        rating: Math.round(r.rating ?? 5),
        text: (r.text ?? "").trim(),
        relativeTime: r.relative_time_description ?? "",
        time: r.time ?? 0,
        photo: r.profile_photo_url ?? null,
        authorUrl: r.author_url ?? null,
      }))
      .filter((r: CleanReview) => r.text.length > 0)
      .sort((a: CleanReview, b: CleanReview) => b.time - a.time);

    return json(
      {
        configured: true,
        ok: true,
        rating: result.rating ?? null,
        total: result.user_ratings_total ?? null,
        placeUrl: result.url ?? null,
        reviews,
      },
      200,
      3600
    );
  } catch (err) {
    return json(
      { configured: true, ok: false, error: "fetch_failed", reviews: [] },
      200,
      60
    );
  }
};

/** Respuesta JSON con caché en el edge de Vercel (s-maxage) + SWR. */
function json(body: unknown, status: number, sMaxAge: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, s-maxage=${sMaxAge}, stale-while-revalidate=86400`,
    },
  });
}
