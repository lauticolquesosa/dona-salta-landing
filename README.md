# Doña Salta — Landing

Sitio web de **Doña Salta** — restaurante de cocina regional salteña, empanadas al horno de barro. Córdoba 46, Salta capital.

Sitio **estático** (HTML + CSS + JS puro). Sin framework ni build: el navegador sirve los archivos tal cual. La única dependencia (`sharp`) es una herramienta **local** para optimizar imágenes, no se usa en producción.

## Estructura
```
index.html                  ← página única
styles.css                  ← estilos
script.js                   ← interacciones (nav, tabs, reveals, parallax)
assets/                     ← imágenes (fotos del local y los platos, en WebP)
scripts/optimize-images.mjs ← optimizador de imágenes (uso local con sharp)
vercel.json                 ← deploy estático en Vercel + headers de caché
```

## Ver en local
No necesita instalar nada para correr el sitio:
- Abrir `index.html` directo en el navegador, o
- Servirlo: `npx serve .` y entrar a la URL que indique.

## Optimizar imágenes (opcional)
Antes de subir fotos nuevas, optimizalas a WebP para que el sitio cargue rápido:
```
npm install          # instala sharp (solo la primera vez)
npm run optimize     # convierte/comprime las imágenes de assets/
```

## Deploy
Conectado a **Vercel** con deploy automático: cada `git push` a `main` publica la web.

- Producción: **https://dona-salta-landing.vercel.app**
- Las URLs con hash (`...-xxxxx-lauti-s-projects.vercel.app`) son previews congeladas de un commit puntual: no usar para ver "lo último".

## Editar contenido
Todo el contenido (textos, secciones, precios de la carta) está en `index.html`.
Para cambiar una foto, reemplazá el archivo dentro de `assets/` manteniendo el nombre.
