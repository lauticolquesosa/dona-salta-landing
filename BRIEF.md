# BRIEF — Landing Page Doña Salta

> **Para Claude Code:** Este archivo es la orden de trabajo completa. Leelo entero antes de escribir una sola línea. Tu objetivo no es "hacer una página linda": es construir una landing page **funcional, rapidísima y convertidora** para un restaurante real que hoy pierde clientes todos los días por no tener web. Cada decisión técnica y estética se justifica en este documento.

---

## 0. Quién sos en este proyecto (mentalidad)

Actuás simultáneamente como un equipo de élite, y sos el mejor en cada rol:

- **Desarrollador / programador senior (20 años de experiencia):** código limpio, semántico, mantenible y sin deuda técnica. Nada de librerías de más, nada de divs sin sentido, nada de hacks. Arquitectura clara, componentes reutilizables, performance como requisito no negociable. Si algo se puede hacer con CSS nativo en vez de JS, se hace con CSS.
- **Diseñador web (arquitectura y estructura):** jerarquía visual impecable, grilla coherente, ritmo vertical consistente, espaciado generoso. La estructura guía el ojo hacia la conversión.
- **Diseñador UX/UI:** cada sección responde a "¿qué quiere el usuario en este momento y qué lo acerca a ir al restaurante?". Cero fricción. CTAs siempre a la vista. Mobile-first de verdad (el 90% del tráfico turístico es celular).
- **Diseñador gráfico:** paleta, tipografía, texturas y detalles que transmitan la identidad de Salta y de este local concreto. Coherencia conceptual de punta a punta.

Regla de oro: **funcional primero, estético muy cerca segundo, "vistoso" un distante tercero.** Animaciones con lo justo: que sumen, nunca que distraigan ni ralenticen.

---

## 1. El negocio (contexto real)

**Doña Salta** — Restaurante de cocina regional salteña, Salta capital, Argentina.

Es uno de los restaurantes **más reputados de la ciudad**, pero **no tiene web funcional** (dos intentos fallidos: un dominio muerto y un sitio dado de baja). Esta landing existe para capitalizar una reputación que ya está construida.

**Credenciales reales (usar como prueba social, son verídicas):**
- ⭐ 4.5 en Google con ~25.000 reseñas
- 🏆 Travelers' Choice 2025 de TripAdvisor — #11 de 377 restaurantes en Salta — 4.227 reseñas
- 📸 16.000 seguidores en Instagram (@donasaltarestaurante)
- 4.7 estrellas en Facebook

**Especialidad:** cocina regional del norte argentino — empanadas salteñas, locro, humita, tamales, asado, vinos de altura (Cafayate/Valles Calchaquíes).

**Público objetivo:**
1. **Turista en planificación** (el principal): decide dónde comer desde el celular, antes o durante el viaje a Salta. Llega buscando "dónde comer comida típica en Salta". Quiere ver fotos de los platos, el menú, ubicación, horarios y reservar fácil.
2. **Local / recomendación boca a boca:** alguien le recomendó el restaurante, lo googlea, y necesita encontrar algo que dé confianza (hoy encuentra una página rota).

**Objetivo nº1 de conversión (en orden de prioridad):**
1. **Reservar / contactar por WhatsApp** (acción principal).
2. **Cómo llegar** (Google Maps).
3. **Ver el menú**.

> Salta recibe ~2,4 millones de turistas/año. La landing tiene que convertir a ese turista que ya quiere ir, antes de que ponga un pie en la ciudad.

---

## 2. Stack técnico (no negociable salvo muy buena razón)

Elegido para máxima velocidad, SEO impecable y código limpio — exactamente lo que el restaurante necesita:

- **Astro** (framework). Renderiza HTML estático, **cero JS por defecto**, Lighthouse 95-100 sin esfuerzo. Ideal para una landing. Islas interactivas solo donde haga falta.
- **Tailwind CSS** para estilos, con un **sistema de design tokens** definido en `tailwind.config` (colores, tipografías, espaciados de la marca). Nada de estilos mágicos sueltos.
- **GSAP + ScrollTrigger** SOLO para las animaciones de scroll reveal y la del hero. Cargado de forma diferida. Si una animación se puede hacer con CSS (`transition`, `@keyframes`, `transition-behavior`), se hace con CSS.
- **Formulario / contacto:** la acción principal es un **botón de WhatsApp** (deep link `https://wa.me/<numero>?text=<mensaje precargado>`). Dejá el número como placeholder `[WHATSAPP_NUMERO]`. Si se quiere formulario de reserva, integrarlo con **Web3Forms** o un endpoint serverless — dejá la API key como placeholder y que el form degrade elegante (que el WhatsApp siga siendo el camino primario).
- **Deploy target:** estático (Netlify / Vercel / Cloudflare Pages). Que `npm run build` genere un `/dist` listo para subir.

**Estructura de carpetas esperada:**
```
dona-salta-landing/
├── BRIEF.md                ← este archivo
├── package.json
├── astro.config.mjs
├── tailwind.config.* (o config en CSS si Tailwind v4)
├── src/
│   ├── pages/index.astro
│   ├── components/         ← un componente por sección
│   ├── layouts/
│   └── styles/             ← tokens globales, fuentes
├── public/
│   └── assets/
│       ├── logo/           ← PLACEHOLDER del logo (ver §6)
│       └── img/            ← PLACEHOLDERS de fotos (ver §6)
└── README.md               ← cómo correr y dónde completar placeholders
```

**Calidad de código exigida:**
- HTML semántico (`<header> <main> <section> <nav> <footer>`, headings en orden).
- Componentes chicos, una responsabilidad cada uno, nombres claros.
- Sin dependencias innecesarias. Sin `console.log` ni código muerto.
- Comentarios solo donde el "por qué" no es obvio.
- Accesibilidad real: contraste AA mínimo, `alt` en todas las imágenes, foco visible, navegable por teclado, `prefers-reduced-motion` respetado (si el usuario pidió menos movimiento, las animaciones se desactivan).

---

## 3. Identidad visual — estética Salta regional + Doña Salta

El concepto: **calidez del norte argentino, cocina de adobe y tierra, elegancia sobria que no caiga en lo "souvenir kitsch".** Auténtico, cálido, apetecible, confiable. Pensá en barro cocido, paredes de adobe al sol, textiles andinos, cerros de colores, una mesa servida con empanadas y vino tinto.

### Paleta (definir como tokens; estos son los valores guía, ajustables con criterio)
- **Terracota / barro cocido** `#A8442A` → color principal de marca, CTAs.
- **Ocre / dorado tierra** `#C8893B` → acentos, detalles, hover.
- **Adobe / arena cálida** `#E8DAC4` → fondos suaves, secciones claras.
- **Verde cerro / oliva oscuro** `#4A5340` → contrapunto natural, texto sobre claro.
- **Marrón profundo / casi negro tostado** `#2B1D16` → texto principal, fondos oscuros del hero/footer.
- **Crema hueso** `#F6EFE3` → fondo base.
- Acento opcional puntual: un **rojo-vino** `#6E2233` para el vino de altura / detalles premium.

Usar la paleta con disciplina: fondos cálidos neutros, terracota para la acción, verde y ocre como acentos. No saturar.

### Tipografía
- **Títulos:** una serif con carácter y calidez artesanal pero legible y moderna (ej. *Fraunces*, *Playfair Display* o *DM Serif Display*). Da identidad y "cocina con historia".
- **Cuerpo / UI:** una sans-serif limpia y muy legible (ej. *Inter*, *Mulish* o *Work Sans*).
- Jerarquía clara, line-height generoso, ningún bloque de texto largo (es una landing, no un blog).

### Texturas y detalles gráficos (lo que lo hace "de Salta" y no genérico)
- Sutil **textura de papel/adobe** en fondos (muy tenue, nunca ruidosa).
- Detalles inspirados en **textil andino / guarda salteña** como separadores o bordes finos — usados con MUCHA moderación, como acento, no como wallpaper.
- Esquinas, sombras y bordes cálidos y suaves (nada de neumorfismo frío ni glassmorphism azulado: esto es tierra, no tecnología).
- Iconografía de línea simple y cálida para servicios (empanada, vino, fuego/parrilla, ubicación, reloj).

### Mood
Apetecible y humano. Que dé hambre y dé confianza. Premium pero accesible. Que un turista lo vea y piense "ahí quiero comer", y que un local lo vea y piense "estos son en serio".

---

## 4. Estructura de la landing (secciones, en orden)

Una sola página, scroll vertical, navegación ancla. Cada sección tiene un propósito de conversión.

1. **Header / Nav (sticky, translúcido al hacer scroll)**
   - Logo (placeholder) a la izquierda.
   - Links ancla: Menú · Nosotros · Galería · Cómo llegar · Reseñas.
   - **CTA fijo a la derecha: "Reservá por WhatsApp"** (botón terracota, siempre visible).
   - En mobile: menú hamburguesa + el CTA de WhatsApp siempre visible.

2. **Hero (primera pantalla, alto impacto)**
   - Imagen de fondo a pantalla completa (placeholder: plato icónico / empanadas / ambiente del local) con overlay cálido oscuro para legibilidad.
   - Título grande serif: algo como *"Sabor salteño de verdad, desde [año]"* (placeholder de año/eslogan).
   - Subtítulo corto: una línea que diga qué es y por qué ir.
   - **Dos CTAs:** primario "Reservá por WhatsApp" · secundario "Ver el menú".
   - **Barra de prueba social inmediata** debajo de los CTAs: `★ 4.5 · 25.000+ reseñas en Google` · `🏆 Travelers' Choice 2025` · `#11 de 377 en Salta`. Esto vende solo, va arriba de todo.
   - Animación de entrada sobria (fade + slight rise del título y CTAs, una vez).

3. **Franja de confianza / credenciales** (si no entra todo en el hero)
   - Logos/insignias: Google, TripAdvisor (Travelers' Choice), Instagram con seguidores. Placeholders de logos de plataformas.

4. **Nosotros / La historia** (breve, emotivo)
   - 2-3 párrafos cortos sobre la cocina regional, la tradición, por qué Doña Salta. Copy placeholder editable.
   - Imagen de apoyo (ambiente del local / cocinera / mesa servida — placeholder).
   - Detalle gráfico andino sutil como acento.

5. **El menú / Especialidades** (clave para el turista)
   - Grilla de platos estrella: **Empanadas salteñas, Locro, Humita, Tamales, Asado/parrilla, Vinos de altura**. Cada uno: foto (placeholder), nombre, descripción corta apetecible, precio referencial (placeholder).
   - CTA: "Ver carta completa" (placeholder a PDF/menú) y "Reservá por WhatsApp".
   - Animación: reveal escalonado al hacer scroll (sutil).

6. **Galería**
   - Grilla de fotos (placeholders): platos, ambiente, detalles. Masonry o grid limpio.
   - Lightbox simple opcional (solo si no compromete performance).

7. **Reseñas / Prueba social fuerte**
   - 3-4 testimonios reales-formato (placeholders con estructura: estrella, texto, nombre, fuente Google/TripAdvisor).
   - Reiterar las cifras grandes: 25.000+ reseñas, Travelers' Choice 2025.
   - Enlaces a los perfiles reales (placeholders de URL).

8. **Cómo llegar / Ubicación y horarios**
   - Mapa de Google embebido (placeholder de dirección/coords).
   - Dirección, horarios (placeholder), teléfono, WhatsApp.
   - CTA "Cómo llegar" → abre Google Maps.

9. **CTA final de cierre**
   - Sección a todo color (terracota o foto con overlay) con un único mensaje fuerte: *"Tu mesa en el mejor sabor salteño te espera"* + botón grande WhatsApp.

10. **Footer**
    - Logo, datos de contacto, redes (Instagram, Facebook, TripAdvisor — placeholders de URL), horarios resumidos.
    - Línea legal / "Hecho por [Mi Agencia]" discreto (placeholder, opcional).
    - **Botón flotante de WhatsApp** fijo en toda la página (esquina inferior derecha), mobile y desktop.

---

## 5. Animaciones (con lo justo)

- **Sí:** fade/rise de entrada del hero (una vez); reveals sutiles al hacer scroll (sección por sección, escalonados en grillas); micro-interacciones en hover de botones y tarjetas (escala mínima, cambio de color suave); header que se vuelve sólido/translúcido al scrollear; botón WhatsApp con un latido muy suave ocasional.
- **No:** parallax pesado, carruseles automáticos agresivos, animaciones que bloqueen el scroll, autoplay de video con sonido, nada que retrase el LCP del hero.
- **Performance de animación:** solo `transform` y `opacity` (compositor-friendly). Nada que dispare reflow.
- **Accesibilidad:** respetar `prefers-reduced-motion: reduce` → desactivar/atenuar todo movimiento no esencial.

---

## 6. Logo e imágenes — PLACEHOLDERS (importante)

Por ahora **no hay logo ni fotos reales**. Lauti los carga después. Tu trabajo es dejar el sitio **completo y funcionando con placeholders prolijos y bien dimensionados**, de modo que reemplazarlos sea trivial.

- **Logo:** en `public/assets/logo/`. Dejá un placeholder SVG simple (texto "Doña Salta" en la tipografía de marca dentro de un recuadro/sello cálido) llamado `logo-placeholder.svg`. Documentá en el README las dimensiones recomendadas para el logo real.
- **Imágenes:** en `public/assets/img/`. Para cada foto, usá un placeholder con la proporción correcta (no rompas el layout) — color de marca + etiqueta de qué va ahí (ej. "HERO — empanadas / ambiente", "PLATO — locro", "GALERÍA 3"). Podés generar placeholders con un `<div>` estilizado, un SVG, o `https://placehold.co` con los colores de la paleta.
- **Nombres consistentes y predecibles** (`hero.jpg`, `plato-empanadas.jpg`, `galeria-01.jpg`…) y centralizados (un archivo de datos / array) para que cambiar una imagen sea editar un solo lugar.
- Si en esta carpeta hay una **skill de generación de imágenes cargada** (ej. `imagegen`), podés usarla para generar imágenes de relleno *provisorias* con estética salteña — pero dejá igualmente claro en el README cuáles son provisorias y deben reemplazarse por fotos reales del local.
- Todo texto de copy (eslóganes, descripciones, precios, año de fundación, horarios, dirección, teléfono) va como **placeholder editable y señalizado** (ej. `[AÑO_FUNDACION]`, `[DIRECCION]`, `[PRECIO]`), listado en el README.

> **Regla:** el sitio tiene que verse terminado y profesional incluso con placeholders. Nada de cajas grises rotas ni layouts que se desarman cuando falta una imagen.

---

## 7. Requisitos de calidad (checklist de entrega)

Antes de dar por terminado, verificá:

- [ ] `npm install && npm run dev` levanta sin errores. `npm run build` genera `/dist` limpio.
- [ ] **Lighthouse mobile ≥ 95** en Performance, SEO, Best Practices y Accessibility.
- [ ] **Mobile-first real:** impecable en 360px de ancho, y escala bien hasta desktop grande.
- [ ] LCP rápido (hero optimizado, imágenes con `width/height`, `loading="lazy"` salvo el hero, formatos modernos).
- [ ] **SEO:** `<title>`, meta description, Open Graph + Twitter cards (con imagen placeholder), `lang="es"`, datos estructurados **Schema.org `Restaurant`** (JSON-LD con nombre, dirección, rating, horarios — placeholders). Esto es clave para el turista que busca en Google.
- [ ] Todos los CTAs de WhatsApp funcionan (deep link `wa.me` con mensaje precargado).
- [ ] Accesibilidad: contraste AA, `alt`, foco visible, teclado, `prefers-reduced-motion`.
- [ ] Sin errores de consola. Código formateado y limpio.
- [ ] **README.md** con: cómo correr, lista completa de placeholders a completar (logo, imágenes, número de WhatsApp, dirección, horarios, precios, URLs de redes, API key del form), y cómo deployar.

---

## 8. Resumen en una línea

Construí, con estándar de estudio top, una landing page **Astro + Tailwind** para **Doña Salta**: estética cálida de Salta regional (terracota/adobe/ocre/verde cerro), enfocada en convertir al turista a **reservar por WhatsApp**, rapidísima (Lighthouse ~100), accesible, con animaciones sobrias, y con **logo, imágenes y datos como placeholders prolijos** listos para que Lauti complete. Funcional primero, hermosa muy de cerca.
