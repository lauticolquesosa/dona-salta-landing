# Doña Salta

Sitio de **Doña Salta**, bodegón de cocina regional salteña en Córdoba 46, Salta capital.

Son siete páginas de HTML estático. No hay framework ni cliente pesado: un script de
Node arma los archivos y el navegador recibe HTML terminado. La única dependencia de
compilación es `sharp`, y se usa para generar las fotos en varias medidas.

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
src/lib/         render de HTML, piezas de sección y armado del documento
src/paginas/     una por página publicada
src/estilos/     la hoja de estilos, con todas las variables
src/guiones/     el JavaScript del sitio, en un solo archivo
medios/          fotos originales del local, sin tocar
scripts/         compilación y servidor de desarrollo
```

Cada página se arma combinando las piezas de `src/lib/piezas.mjs`. Una pieza devuelve el
HTML de una sección entera y recibe por parámetro todo lo que muestra, así que sumar una
sección es elegir la pieza y escribirle el contenido, no inventar marcado nuevo.

| Pieza | Qué es |
| --- | --- |
| `portada` | Foto a sangre con velo, título grande y una sola acción |
| `centrada` | Título centrado con filete, dos fotos y el texto abajo |
| `franja` | Dos fotos de borde a borde, sin texto |
| `comanda` | La tarjeta de platos apenas girada sobre las fotos |
| `relato` | Foto al costado y texto, con el lado invertible |
| `banda` | Sección oscura con tarjetas de cifras |
| `invitacion` | Foto a sangre con la tarjeta de dirección y horarios |
| `mosaico` | Cuatro fotos a sangre |
| `atajos` | Fila de accesos a las secciones de la carta |

## Dónde se cambia cada cosa

| Qué | Dónde |
| --- | --- |
| Dirección, teléfono, horarios, redes, puntaje | `src/data/sitio.mjs` |
| Precios y platos de la carta | `src/data/carta.mjs` |
| Platos destacados, rellenos y preguntas frecuentes | `src/data/contenido.mjs` |
| Fotos y sus textos alternativos | `src/data/fotos.mjs` más el archivo en `medios/` |
| Textos de una página | el archivo de esa página en `src/paginas/` |
| Colores, tipografía, espaciado | las variables al principio de `src/estilos/sitio.css` |

El teléfono, la dirección y los horarios se escriben una sola vez y de ahí salen el
encabezado, el pie, la ficha del negocio para Google y las páginas legales. Tienen que
coincidir letra por letra con la ficha de Google Business y con las redes.

## Diseño

Dos familias: **Aboreto** para los títulos, siempre en mayúscula y con tracking negativo,
y **Inclusive Sans** para el texto. Un solo acento, el rojo del poncho, y solo marca
acciones y precios. Un solo radio de esquina, que hoy es recto. El ritmo del sitio sale
de alternar fondo hueso y fondo oscuro entre secciones, no de decorar cada una.

El movimiento es una sola cosa repetida: los bloques aparecen con un desplazamiento corto
al entrar en pantalla, una vez sola, escalonados de a cinco en las grillas. Se anima
`transform` y `opacity` y nada más. Con `prefers-reduced-motion` no se mueve nada y el
contenido queda visible igual, lo mismo que si falla el JavaScript.

Las decisiones están medidas contra `REDESIGN-WEB.md`, que es el estándar de construcción
de LCS Design y manda sobre cualquier preferencia de este proyecto.

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

## Rendimiento

La foto que abre cada página se precarga y el resto se difiere. El mapa de Google pesa
más de dos megas, así que en `/visitanos` no se carga solo: aparece la fachada con un
botón y el mapa entra recién cuando alguien lo toca. Con eso ninguna página pasa de un
cuarto de mega en la primera pantalla.

## Publicación

Vercel toma cada push a `main`, corre `node scripts/construir.mjs` y publica `dist/`.

- `vercel.json` define las direcciones limpias, la caché y los headers de seguridad.
- Los archivos de `/a/` llevan el hash del contenido en el nombre, así que se cachean
  para siempre y un cambio de estilos llega al instante.
- La política de seguridad de contenido no admite scripts ni estilos en línea. Si algún
  día hace falta uno, se agrega al archivo correspondiente, nunca al HTML.

Al conectar el dominio propio hay que cambiar `origen` en `src/data/sitio.mjs`: de ahí
salen las canónicas, el sitemap y las metas para compartir.
