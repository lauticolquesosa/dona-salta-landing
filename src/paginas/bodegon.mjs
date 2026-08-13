import { reconocimientos } from "../data/sitio.mjs";
import { fotos, rutaFoto } from "../data/fotos.mjs";
import { foto, enlace, esc } from "../lib/html.mjs";
import { cierre, migas } from "../lib/layout.mjs";

const encabezado = `<section class="encabezado">
  <div class="contenedor">
    <h1 class="titulo-1">El bodegón: una casona vieja del casco histórico</h1>
    <p class="parrafo bajada">Doña Salta funciona en una casona antigua de Córdoba 46, a dos cuadras de la plaza 9 de Julio. Techos altos, paredes color tierra, ladrillo a la vista y mesas de madera que se llenan todos los días.</p>
  </div>
  ${foto(fotos.salon, { clase: "foto--ancha foto--recorte", prioridad: true, sizes: "100vw" })}
</section>`;

const salon = `<section class="seccion">
  <div class="contenedor banda banda--invertida">
    ${foto(fotos.paredes, { clase: "banda__foto animar", sizes: "(max-width: 900px) 100vw, 45vw" })}
    <div class="banda__texto">
      <h2 class="titulo-2 animar">Adentro se ve el norte, no una decoración de norte</h2>
      <p class="parrafo animar">Las paredes son de adobe pintado color tierra y las lámparas de mimbre cuelgan de cañas de bambú que cruzan el salón de lado a lado. En las paredes hay cuadros de pueblos de la puna. El techo es de caña y tirantes de madera, como se construía acá hace cien años.</p>
      <p class="parrafo animar">Los mozos atienden de sombrero salteño y de fondo suena folclore, bajito, para que se pueda charlar. No es un decorado armado para la foto: es una casa vieja que se sigue usando como bodegón.</p>
    </div>
  </div>
</section>`;

const mesa = `<section class="seccion seccion--superficie">
  <div class="contenedor banda">
    ${foto(fotos.mesa, { clase: "banda__foto animar", sizes: "(max-width: 900px) 100vw, 45vw" })}
    <div class="banda__texto">
      <h2 class="titulo-2 animar">Se come de a varios y sin apuro</h2>
      <p class="parrafo animar">Las mesas son largas y la comida se comparte. Lo habitual es arrancar con una docena de empanadas en el centro, seguir con un plato de olla y bajarlo con vino de la casa en jarra.</p>
      <p class="parrafo animar">El salón es grande pero se llena. A la noche, y sobre todo los fines de semana, conviene llegar antes de las nueve. No tomamos reserva, así que la mesa se gana por orden de llegada.</p>
      <p class="animar">${enlace({ texto: "Ver los horarios y cómo llegar", url: "/visitanos" })}</p>
    </div>
  </div>
</section>`;

const galeria = `<section class="seccion">
  <div class="contenedor">
    <div class="bloque">
      <h2 class="titulo-2 animar">Así se ve un día cualquiera</h2>
      <p class="parrafo animar">Todas las fotos del sitio son del local, sacadas en Córdoba 46. No hay imágenes de banco ni renders: lo que ves es lo que te vas a encontrar cuando cruces la puerta.</p>
    </div>
    <div class="galeria escalona">
      ${foto(fotos.fachada, { clase: "animar", pie: "La puerta, sobre calle Córdoba", sizes: "(max-width: 640px) 100vw, 50vw" })}
      ${foto(fotos.horno, { clase: "animar", pie: "El horno, en plena tarea", sizes: "(max-width: 640px) 100vw, 50vw" })}
      ${foto(fotos.locroMesa, { clase: "animar", pie: "Pan, locro y un tinto", sizes: "(max-width: 640px) 100vw, 50vw" })}
      ${foto(fotos.locro, { clase: "animar", pie: "La olla de barro llega caliente", sizes: "(max-width: 640px) 100vw, 50vw" })}
    </div>
  </div>
</section>`;

const historia = `<section class="seccion seccion--superficie">
  <div class="contenedor">
    <div class="bloque">
      <h2 class="titulo-2 animar">Miles de comensales pasaron por estas mesas</h2>
      <p class="parrafo animar">Doña Salta lleva generaciones haciendo la misma cocina, en el mismo lugar y con el mismo horno. La prueba más directa está en lo que dejan escrito los que ya vinieron.</p>
    </div>
    <ul class="cifras escalona">
      ${reconocimientos
        .map(
          (r) => `<li class="cifra animar">
        <span class="cifra__dato">${esc(r.dato)}</span>
        <span class="cifra__unidad">${esc(r.unidad)}</span>
        <span class="cifra__detalle">${esc(r.detalle)}</span>
      </li>`
        )
        .join("")}
    </ul>
  </div>
</section>`;

export default {
  ruta: "/el-bodegon",
  archivo: "el-bodegon.html",
  activa: "bodegon",
  titulo: "El bodegón por dentro · Doña Salta, casco histórico de Salta",
  descripcion:
    "El salón de Doña Salta: casona antigua de Córdoba 46 con paredes de adobe, lámparas de mimbre y mesas largas. Cómo es comer en el bodegón, en el casco histórico de Salta.",
  imagen: rutaFoto(fotos.salon, 1440),
  jsonLd: [migas("El bodegón", "/el-bodegon")],
  cuerpo: [
    encabezado,
    salon,
    mesa,
    galeria,
    historia,
    cierre({
      titulo: "La mesa está puesta",
      texto:
        "Estamos en Córdoba 46, frente a la Basílica de San Francisco. Se entra por orden de llegada, todos los días.",
    }),
  ].join("\n"),
};
