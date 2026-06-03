# Doña Salta — Landing Page

Landing page de **Doña Salta**, restaurante de cocina regional salteña (Salta capital, Argentina).
Construida para convertir al turista a **reservar por WhatsApp**: rapidísima, accesible y lista para SEO.

**Stack:** [Astro](https://astro.build) (HTML estático, cero JS por defecto) · [Tailwind CSS v4](https://tailwindcss.com) (design tokens en CSS) · [GSAP + ScrollTrigger](https://gsap.com) (solo para animaciones de scroll/hero, carga diferida) · fuentes self-hosted (Fraunces + Inter).

---

## 🚀 Cómo correr

Requiere **Node 18.20+ / 20.3+ / 22+**.

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo → http://localhost:4321
npm run build      # genera el sitio estático en /dist
npm run preview    # previsualiza /dist localmente
```

Para regenerar los placeholders de imágenes/logo/favicon:

```bash
node scripts/gen-placeholders.mjs
```

---

## 📦 Deploy (estático)

`npm run build` genera una carpeta `/dist` 100% estática. Subila a cualquier host estático:

- **Netlify / Cloudflare Pages:** build command `npm run build`, publish directory `dist`.
- **Vercel:** detecta Astro automáticamente (output `dist`).
- **Manual:** subí el contenido de `/dist` a tu hosting.

> Antes de deployar, configurá el dominio real en [`astro.config.mjs`](astro.config.mjs) (campo `site`) para que las URLs absolutas de SEO/Open Graph sean correctas.

---

## ✅ Checklist de placeholders a completar

Todo el contenido editable está **centralizado en un solo archivo**: [`src/data/site.ts`](src/data/site.ts).
Los placeholders están señalizados con `[CORCHETES]`. Editá ese archivo y listo.

### 1. Datos del negocio — `src/data/site.ts` → `business`
| Placeholder | Qué es | Ejemplo |
|---|---|---|
| `[WHATSAPP_NUMERO]` | **Lo más importante.** Número de WhatsApp en formato internacional, **sin** `+`, espacios ni guiones. | `5493874000000` |
| `[AÑO_FUNDACION]` | Año de fundación (aparece en hero y "Nosotros"). | `1985` |
| `[TELEFONO]` | Teléfono visible. | `+54 387 421-0000` |
| `[TELEFONO_LINK]` | Teléfono para el link `tel:` (sin espacios). | `+543874210000` |
| `[EMAIL]` | Email de contacto/reservas. | `reservas@donasalta.com.ar` |
| `[DIRECCION]` | Calle y número. | `Calle Córdoba 46` |
| `[CP]` | Código postal. | `A4400` |
| `[LATITUD]` / `[LONGITUD]` | Coordenadas (para Schema.org). | `-24.7886` / `-65.4099` |
| `mapsUrl` | Link de Google Maps para el botón "Cómo llegar". | URL real del local |
| `mapsEmbedUrl` | URL del iframe del mapa embebido. | "Compartir → Insertar mapa" en Google Maps |
| `[URL_CARTA_PDF]` | Link a la carta completa (PDF). Mientras esté vacío, el botón apunta a la sección menú. | — |

### 2. Horarios — `src/data/site.ts` → `openingHours` y `hoursSummary`
Editá los rangos por día (`opens`/`closes` en formato 24h alimentan el SEO) y el resumen `[HORARIO]`.

### 3. Redes sociales — `src/data/site.ts` → `social.links`
| Placeholder | Qué es |
|---|---|
| `[URL_FACEBOOK]` | URL del perfil de Facebook. |
| `[URL_TRIPADVISOR]` | URL del perfil de TripAdvisor. |
| `[URL_GOOGLE_BUSINESS]` | URL de la ficha de Google. |

> Instagram ya está cargado (`@donasaltarestaurante`). Las **cifras de prueba social son reales** (4.5 ★, 25.000+ reseñas, Travelers' Choice 2025, 16.000 seguidores) — no las toques salvo que cambien.

### 4. Menú / precios — `src/data/site.ts` → `dishes`
Cada plato tiene `[PRECIO]` como placeholder. Completá precios, y ajustá nombres/descripciones si querés.

### 5. Reseñas — `src/data/site.ts` → `reviews`
Reemplazá `[RESEÑA]` y `[NOMBRE]` por reseñas reales (texto, autor, fuente Google/TripAdvisor, rating).

### 6. Crédito de autor (opcional) — `src/data/site.ts` → `credit`
`[MI_AGENCIA]` y `[URL_AGENCIA]`. Si los dejás vacíos, la línea no se muestra.

### 7. Copy editorial
En [`src/components/About.astro`](src/components/About.astro) hay marcas `[EDITAR_COPY]` para afinar el texto de "Nosotros".

---

## 🖼️ Imágenes (placeholders → fotos reales)

Las imágenes están **centralizadas** en `src/data/site.ts` (objetos `images`, `dishes`, `gallery`).
Hoy el sitio usa **imágenes IA provisorias** (generadas con Flux Schnell, estética salteña) en `public/assets/img/ai/`.
También quedan los **placeholders SVG** originales en `public/assets/img/` como respaldo.

> ⚠️ Las imágenes IA son **provisorias**: dan el tono y muestran el sitio terminado, pero **deben reemplazarse por fotos reales del local**. Es lo que más va a vender.

**Para reemplazar por fotos reales:** subí tus fotos a `public/assets/img/ai/` con el **mismo nombre y proporción** (o ponelas en `public/assets/img/` y cambiá la constante `IMG` y las extensiones en `src/data/site.ts`).
**Para regenerar las IA:** `HF_TOKEN=tu_token bash scripts/gen-ai-images.sh` (necesita un token válido de huggingface.co/settings/tokens).

| Archivo a reemplazar | Dónde se usa | Proporción / tamaño recomendado |
|---|---|---|
| `public/assets/img/hero.svg` → `hero.jpg` | Fondo del hero (LCP) | 3:2 · ~1920×1280, optimizada/WebP |
| `public/assets/img/nosotros.svg` → `nosotros.jpg` | Sección "Nosotros" | 4:5 · ~1200×1500 |
| `public/assets/img/og-image.svg` → `og-image.jpg` | Open Graph / redes | 1200×630 |
| `public/assets/img/plato-*.svg` (×6) | Tarjetas del menú | 3:2 · ~600×400 |
| `public/assets/img/galeria-*.svg` (×6) | Galería | 1:1 · ~800×800 |

> Si reemplazás un `.svg` por un `.jpg`/`.webp`, actualizá la extensión en `src/data/site.ts` (cada entrada ya tiene un campo `real` con el nombre `.jpg` sugerido).

**Logo:** placeholder en `public/assets/logo/logo-placeholder.svg`. En el header/footer el logo se renderiza como lockup tipográfico ([`src/components/ui/Logo.astro`](src/components/ui/Logo.astro)) que se adapta al color del fondo. Para el logo real, reemplazá el SVG y/o editá ese componente. Dimensiones recomendadas del logo: **~320×120** (horizontal) sobre fondo transparente.

> ⚠️ **Todos los placeholders SVG son provisorios** y dicen "REEMPLAZAR POR FOTO REAL". El sitio se ve terminado igual, pero las fotos reales del local son lo que más va a vender.

### (Opcional) Formulario de reserva
La acción principal es WhatsApp (no requiere backend). Si más adelante querés un formulario de reserva, se puede integrar con [Web3Forms](https://web3forms.com) o un endpoint serverless dejando la API key como placeholder; el WhatsApp seguiría siendo el camino primario.

---

## 🗂️ Estructura

```
.
├── astro.config.mjs          # config Astro + plugin Tailwind v4 + site (dominio)
├── scripts/gen-placeholders.mjs   # generador de placeholders SVG
├── public/
│   ├── favicon.svg
│   └── assets/{logo,img}/    # placeholders (reemplazar por reales)
└── src/
    ├── data/site.ts          # ← FUENTE ÚNICA de contenido/placeholders
    ├── layouts/BaseLayout.astro   # <head>, SEO, OG, Twitter, JSON-LD Restaurant
    ├── styles/global.css     # design tokens (@theme), texturas, animaciones
    ├── components/           # una sección por componente
    │   └── ui/               # piezas reutilizables (botón WA, logo, heading)
    └── pages/index.astro     # ensambla las secciones
```

---

## ♿ Accesibilidad y rendimiento

- HTML semántico, headings en orden, `lang="es"`, link "saltar al contenido".
- Contraste AA, foco visible, navegable por teclado, menú mobile con `aria-expanded`.
- **`prefers-reduced-motion`**: si el usuario pide menos movimiento, **todas las animaciones se desactivan** y el contenido se muestra estático (nunca queda oculto).
- Sin JS, el contenido es 100% visible (las animaciones son progresivas).
- Imágenes con `width`/`height` (sin CLS), `loading="lazy"` salvo el hero (`fetchpriority="high"`).
- Datos estructurados **Schema.org `Restaurant`** (rating, dirección, horarios) para Google.

---

Hecho con Astro + Tailwind. Funcional primero, hermoso muy de cerca. 🌶️
