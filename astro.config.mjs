// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // TODO: reemplazar por el dominio final para que las URLs absolutas de SEO/OG sean correctas.
  site: "https://donasalta.com.ar",
  // Sitio 100% estático. Las reseñas reales de Google se incrustan como snapshot
  // en build (ver scripts/snapshot-reviews.mjs) → cero llamadas a Google en runtime.
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
