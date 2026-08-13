# Doña Salta

Sitio de **Doña Salta**, bodegón de cocina regional salteña en Córdoba 46, Salta capital.

Son cinco páginas de HTML estático. No hay framework ni cliente pesado: un script de
Node arma los archivos y el navegador recibe HTML terminado. La única dependencia es
`sharp`, y se usa para generar las fotos en varias medidas.

## Cómo trabajar

```
npm install     # la primera vez
npm run dev     # levanta http://localhost:4321 y rehace el sitio al guardar
npm run build   # deja el sitio publicable en dist/
```

`dist/` es resultado, no fuente: se puede borrar entero y se vuelve a generar.

## Estructura

```
src/data/        contenido del sitio: negocio, carta, fotos, preguntas frecuentes
src/lib/         render de HTML y armado de cada página
src/paginas/     una por página publicada
src/estilos/     la hoja de estilos, con todas las variables
src/guiones/     el JavaScript del sitio, en un solo archivo
medios/          fotos originales del local, sin tocar
scripts/         compilación y servidor de desarrollo
```

## Dónde se cambia cada cosa

| Qué | Dónde |
| --- | --- |
| Dirección, teléfono, horarios, redes | `src/data/sitio.mjs` |
| Precios y platos de la carta | `src/data/carta.mjs` |
| Preguntas frecuentes y rellenos de empanada | `src/data/contenido.mjs` |
| Fotos y sus textos alternativos | `src/data/fotos.mjs` más el archivo en `medios/` |
| Textos de una página | el archivo de esa página en `src/paginas/` |
| Colores, tipografía, espaciado | las variables al principio de `src/estilos/sitio.css` |

El teléfono, la dirección y los horarios se escriben una sola vez y de ahí salen el
encabezado, el pie, la ficha del negocio para Google y las páginas legales. Tienen que
coincidir letra por letra con la ficha de Google Business y con las redes.

## Páginas

`/` inicio · `/empanadas` · `/carta` · `/el-bodegon` · `/visitanos` ·
`/privacidad` · `/terminos`

Cada una tiene su título, su descripción y sus datos estructurados. El sitemap y el
robots se generan solos con la lista de páginas.

## Imágenes

Las fotos originales viven en `medios/`. La compilación genera de cada una las medidas
que declara `ANCHOS` en `src/data/fotos.mjs` y el HTML sale con `srcset`, así el celular
baja la chica y la pantalla grande la grande. Una foto solo se genera de nuevo si el
original cambió.

Para sumar una foto: dejá el archivo en `medios/`, agregala a `src/data/fotos.mjs` con
sus medidas reales y su texto alternativo, y usala desde la página.

## Publicación

Vercel toma cada push a `main`, corre `node scripts/construir.mjs` y publica `dist/`.

- `vercel.json` define las direcciones limpias, la caché y los headers de seguridad.
- Los archivos de `/a/` llevan el hash del contenido en el nombre, así que se cachean
  para siempre y un cambio de estilos llega al instante.
- La política de seguridad de contenido no admite scripts ni estilos en línea. Si algún
  día hace falta uno, se agrega al archivo correspondiente, nunca al HTML.

Al conectar el dominio propio hay que cambiar `origen` en `src/data/sitio.mjs`: de ahí
salen las canónicas, el sitemap y las metas para compartir.
