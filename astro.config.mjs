// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // TODO: reemplazar por el dominio final para que las URLs absolutas de SEO/OG sean correctas.
  site: "https://donasalta.com.ar",
  // El sitio sigue siendo estático: solo las rutas con `prerender = false`
  // (ej. /api/reviews.json) se ejecutan como función serverless en Vercel.
  output: "static",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
