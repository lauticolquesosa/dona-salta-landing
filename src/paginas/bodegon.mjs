import { reconocimientos } from "../data/sitio.mjs";
import { fotos, rutaFoto } from "../data/fotos.mjs";
import { boton } from "../lib/html.mjs";
import { migas } from "../lib/layout.mjs";
import { banda, centrada, franja, invitacion, mosaico, portada, relato } from "../lib/piezas.mjs";

export default {
  ruta: "/el-bodegon",
  archivo: "el-bodegon.html",
  activa: "bodegon",
  titulo: "El bodegón por dentro · Doña Salta, casco histórico de Salta",
  descripcion:
    "El salón de Doña Salta: casona antigua de Córdoba 46 con paredes de adobe, lámparas de mimbre y mesas largas. Cómo es comer en el bodegón, en el casco histórico de Salta.",
  imagen: rutaFoto(fotos.salon, 1440),
  precarga: fotos.salon,
  jsonLd: [migas("El bodegón", "/el-bodegon")],
  cuerpo: [
    portada({
      imagen: fotos.salon,
      titulo: ["Una casona vieja", "del casco histórico"],
      bajada:
        "Doña Salta funciona en una casa antigua de Córdoba 46, a dos cuadras de la plaza 9 de Julio. Techos altos, paredes color tierra y mesas que se llenan todos los días.",
    }),

    centrada({
      titulo: ["Adentro se ve el norte,", "no una decoración de norte"],
      textos: [
        "Las paredes son de adobe pintado color tierra y las lámparas de mimbre cuelgan de cañas de bambú que cruzan el salón de lado a lado. El techo es de caña y tirantes de madera, como se construía acá hace cien años.",
        "En las paredes hay cuadros de pueblos de la puna. Los mozos atienden de sombrero salteño y de fondo suena folclore, bajito, para que se pueda charlar.",
      ],
    }),

    franja(fotos.paredes, fotos.mesa),

    relato({
      imagen: fotos.mesa,
      titulo: ["Se come de a varios", "y sin apuro"],
      textos: [
        "Las mesas son largas y la comida se comparte. Lo habitual es arrancar con una docena de empanadas en el centro, seguir con un plato de olla y bajarlo con vino de la casa en jarra.",
        "El salón es grande pero se llena. A la noche, y sobre todo los fines de semana, conviene llegar antes de las nueve. No tomamos reserva, así que la mesa se gana por orden de llegada.",
      ],
      accion: boton({ texto: "Ver horarios y cómo llegar", url: "/visitanos", nivel: "contorno" }),
    }),

    banda({
      titulo: ["Miles de comensales", "pasaron por estas mesas"],
      texto:
        "Doña Salta lleva generaciones haciendo la misma cocina, en el mismo lugar y con el mismo horno. La prueba más directa está en lo que dejan escrito los que ya vinieron.",
      tarjetas: reconocimientos,
    }),

    relato({
      imagen: fotos.horno,
      invertida: true,
      pie: "El horno, en plena tarea",
      titulo: ["Todas las fotos", "son del local"],
      textos: [
        "Lo que ves acá se sacó en Córdoba 46. No hay imágenes de banco ni renders: el salón, el horno y los platos son los que te vas a encontrar cuando cruces la puerta.",
      ],
    }),

    invitacion({
      imagen: fotos.locroMesa,
      titulo: ["La mesa", "está puesta"],
      texto:
        "Estamos frente a la Basílica de San Francisco. Se entra por orden de llegada, todos los días.",
    }),

    mosaico([fotos.fachada, fotos.salon, fotos.locro, fotos.empanadas]),
  ].join("\n"),
};
