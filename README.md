# Doña Salta — Landing

Sitio web de **Doña Salta** (restaurante de cocina regional salteña, Córdoba 46, Salta capital).

Sitio **estático** (HTML + CSS + JS), sin build ni dependencias. Diseñado en Claude Design.

## Estructura
```
index.html      ← página única
styles.css      ← estilos
script.js       ← interacciones
assets/         ← imágenes reales (fotos del local y platos)
vercel.json     ← config de deploy estático en Vercel
```

## Ver en local
No necesita instalar nada. Opciones:
- Abrir `index.html` directo en el navegador, o
- Servirlo: `npx serve .`  (o cualquier servidor estático) y entrar a la URL que indique.

## Deploy
Conectado a **Vercel** con deploy automático: cada `git push` a `main` publica la web.
`vercel.json` configura el deploy como estático (sin build, sirve la raíz).

URL: https://dona-salta-landing.vercel.app

## Editar contenido
Todo el contenido (textos, secciones, imágenes) está en `index.html`.
Para cambiar una foto, reemplazá el archivo dentro de `assets/` manteniendo el nombre.
