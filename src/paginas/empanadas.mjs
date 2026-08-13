import { contacto } from "../data/sitio.mjs";
import { variedades } from "../data/contenido.mjs";
import { fotos, rutaFoto } from "../data/fotos.mjs";
import { enlace, foto, esc, icono } from "../lib/html.mjs";
import { cierre, migas } from "../lib/layout.mjs";

const encabezado = `<section class="encabezado encabezado--par">
  <div class="contenedor par">
    <div>
      <h1 class="titulo-1">Las empanadas salteñas de Doña Salta</h1>
      <p class="parrafo bajada">Se arman a mano cada mañana y se cocinan en horno de barro, a la vista del salón. Salen 2.000 pesos la unidad y 24.000 pesos la docena, con cuatro rellenos: carne a cuchillo, charqui, queso y pollo.</p>
    </div>
    ${foto(fotos.empanadas, { clase: "par__foto", prioridad: true, sizes: "(max-width: 960px) 100vw, 45vw" })}
  </div>
</section>`;

const rellenos = `<section class="seccion">
  <div class="contenedor">
    <div class="bloque">
      <h2 class="titulo-2 animar">Cuatro rellenos y ninguno de más</h2>
      <p class="parrafo animar">Trabajamos con los cuatro rellenos de siempre. Todos valen lo mismo, así que la docena se puede pedir surtida y probar los cuatro en una sentada.</p>
    </div>
    <ul class="lista-tarjetas escalona">
      ${variedades
        .map(
          (v) => `<li class="tarjeta animar">
        <h3 class="titulo-3">${esc(v.nombre)}</h3>
        <p class="parrafo">${esc(v.texto)}</p>
      </li>`
        )
        .join("")}
    </ul>
  </div>
</section>`;

const cocina = `<section class="seccion seccion--superficie">
  <div class="contenedor banda">
    ${foto(fotos.horno, { clase: "banda__foto animar", pie: "Las asaderas esperan turno frente a la boca del horno", sizes: "(max-width: 900px) 100vw, 45vw" })}
    <div class="banda__texto">
      <h2 class="titulo-2 animar">El repulgue no es adorno, sella el jugo</h2>
      <p class="parrafo animar">La empanada salteña es chica y jugosa, y eso depende de dos cosas: el cierre y el fuego. Cada empanada se cierra a mano con su repulgue, pliegue por pliegue, para que la carne se cocine adentro en su propio caldo y no se escape nada.</p>
      <p class="parrafo animar">Después va al horno de barro. El barro devuelve un calor parejo que el horno eléctrico no da, y la leña deja el gusto ahumado. En pocos minutos la masa queda fina, tostada arriba y dorada abajo.</p>
      <p class="parrafo animar">La de charqui es la que más sorprende a los que vienen de afuera. Es carne secada al sol y desmenuzada, como se conservaba antes de que hubiera heladera en el norte.</p>
    </div>
  </div>
</section>`;

const pedidos = `<section class="seccion">
  <div class="contenedor banda banda--invertida">
    ${foto(fotos.mesa, { clase: "banda__foto animar", sizes: "(max-width: 900px) 100vw, 45vw" })}
    <div class="banda__texto">
      <h2 class="titulo-2 animar">Cuánto salen y cómo se piden</h2>
      <p class="parrafo animar">El precio es el mismo para los cuatro rellenos, en el salón y para llevar. La docena es la forma más común de pedirlas.</p>
      <ul class="precios animar">
        <li><span>Unidad</span><span class="precios__num">$2.000</span></li>
        <li><span>Docena</span><span class="precios__num">$24.000</span></li>
      </ul>
      <p class="parrafo animar">Para llevar no hace falta encargar con anticipación, salvo que sean varias docenas. En ese caso llamá antes y las tenemos listas a la hora que las pases a buscar. Es lo que hacen los que se vuelven en avión y quieren llevarlas para el viaje.</p>
      <p class="animar"><a class="enlace" href="tel:${contacto.telefonoE164}">Encargar por teléfono al ${esc(contacto.telefono)}${icono("flecha")}</a></p>
      <p class="animar">${enlace({ texto: "Ver el resto de la carta", url: "/carta" })}</p>
    </div>
  </div>
</section>`;

export default {
  ruta: "/empanadas",
  archivo: "empanadas.html",
  activa: "empanadas",
  titulo: "Empanadas salteñas al horno de barro · Doña Salta, Salta",
  descripcion:
    "Empanadas salteñas de carne a cuchillo, charqui, queso y pollo, cocinadas en horno de barro. 2.000 pesos la unidad y 24.000 la docena, en Córdoba 46, Salta capital.",
  imagen: rutaFoto(fotos.empanadas, 1440),
  jsonLd: [migas("Empanadas", "/empanadas")],
  cuerpo: [
    encabezado,
    rellenos,
    cocina,
    pedidos,
    cierre({
      titulo: "Las empanadas salen todo el día",
      texto:
        "Se cocinan durante los dos turnos, mientras el horno está prendido. Venite a comerlas en el salón o pasá a retirarlas por Córdoba 46.",
    }),
  ].join("\n"),
};
