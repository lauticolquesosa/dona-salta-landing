import { contacto } from "../data/sitio.mjs";
import { variedades } from "../data/contenido.mjs";
import { fotos, rutaFoto } from "../data/fotos.mjs";
import { boton, enlace, esc } from "../lib/html.mjs";
import { migas } from "../lib/layout.mjs";
import { centrada, franja, invitacion, portada, relato } from "../lib/piezas.mjs";

const rellenos = `<section class="seccion seccion--oscura">
  <div class="contenedor">
    <div class="bloque bloque--centro">
      <h2 class="titulo-2 animar"><span>Cuatro rellenos</span><span>y ninguno de más</span></h2>
      <p class="parrafo animar">Trabajamos con los cuatro de siempre. Todos valen lo mismo, así que la docena se puede pedir surtida y probar los cuatro en una sentada.</p>
    </div>
    <ul class="rellenos escalona">
      ${variedades
        .map(
          (v) => `<li class="relleno animar">
        <h3 class="titulo-3">${esc(v.nombre)}</h3>
        <p>${esc(v.texto)}</p>
      </li>`
        )
        .join("")}
    </ul>
  </div>
</section>`;

const precios = `<section class="seccion">
  <div class="contenedor bloque bloque--centro">
    <h2 class="titulo-2 animar"><span>Cuánto salen</span><span>y cómo se piden</span></h2>
    <p class="parrafo animar">El precio es el mismo para los cuatro rellenos, en el salón y para llevar. La docena es la forma más común de pedirlas.</p>
    <ul class="tarifa animar">
      <li><span>Unidad</span><span class="tarifa__precio">$2.000</span></li>
      <li><span>Docena</span><span class="tarifa__precio">$24.000</span></li>
    </ul>
    <p class="parrafo animar">Para llevar no hace falta encargar con anticipación, salvo que sean varias docenas. En ese caso llamá antes y las tenemos listas a la hora que las pases a buscar. Es lo que hacen los que se vuelven en avión y quieren llevarlas para el viaje.</p>
    <div class="acciones acciones--centro animar">
      ${boton({ texto: `Encargar al ${contacto.telefono}`, url: `tel:${contacto.telefonoE164}`, ico: "telefono" })}
      ${enlace({ texto: "Ver el resto de la carta", url: "/carta" })}
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
  precarga: fotos.empanadas,
  jsonLd: [migas("Empanadas", "/empanadas")],
  cuerpo: [
    portada({
      imagen: fotos.empanadas,
      titulo: ["Las empanadas", "de Doña Salta"],
      bajada:
        "Se arman a mano cada mañana y se cocinan en horno de barro, a la vista del salón. Dos mil pesos la unidad, veinticuatro mil la docena.",
    }),

    centrada({
      titulo: ["Se hacen todos los días,", "desde temprano"],
      textos: [
        "El horno se prende antes de que abra la puerta y no se apaga hasta que cierra la cocina. Las empanadas salen durante los dos turnos, así que a cualquier hora que vengas hay una asadera adentro.",
        "La masa se estira a la mañana, el relleno se cocina el día anterior y las empanadas se cierran una por una. No hay máquina en el medio.",
      ],
    }),

    franja(fotos.horno, fotos.mesa),

    relato({
      imagen: fotos.horno,
      pie: "Las asaderas esperan turno frente a la boca del horno",
      titulo: ["El barro cocina", "distinto"],
      textos: [
        "La empanada salteña es chica y jugosa. Eso depende del cierre y del fuego. El repulgue sella la carne para que se cocine en su propio caldo y no se escape nada.",
        "El barro guarda el calor y lo devuelve parejo, cosa que el horno eléctrico no hace. La leña deja el gusto ahumado. En pocos minutos la masa queda fina, tostada arriba y dorada abajo.",
        "La de charqui es la que más sorprende a los que vienen de afuera. Es carne secada al sol y desmenuzada, como se conservaba antes de que hubiera heladera en el norte.",
      ],
    }),

    rellenos,
    precios,

    invitacion({
      imagen: fotos.locroMesa,
      titulo: ["Las empanadas", "salen todo el día"],
      texto:
        "Se cocinan durante los dos turnos, mientras el horno está prendido. Venite a comerlas al salón o pasá a retirarlas por Córdoba 46.",
    }),
  ].join("\n"),
};
