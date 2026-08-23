import { reconocimientos } from "../data/sitio.mjs";
import { destacados } from "../data/contenido.mjs";
import { fotos, rutaFoto } from "../data/fotos.mjs";
import { boton } from "../lib/html.mjs";
import { fichaNegocio } from "../lib/layout.mjs";
import {
  banda,
  centrada,
  comanda,
  fichaEnlace,
  franja,
  invitacion,
  mosaico,
  portadaPartida,
  relato,
} from "../lib/piezas.mjs";

export default {
  ruta: "/",
  archivo: "index.html",
  activa: "inicio",
  titulo: "Doña Salta · Empanadas al horno de barro en Salta capital",
  descripcion:
    "Bodegón salteño en Córdoba 46, frente a la Basílica de San Francisco. Empanadas al horno de barro, locro y cocina regional. Abierto todos los días, sin reserva.",
  imagen: rutaFoto(fotos.empanadas, 1440),
  precarga: fotos.fachada,
  jsonLd: [fichaNegocio()],
  portadaClara: true,
  cuerpo: [
    portadaPartida({
      imagen: fotos.fachada,
      titulo: ["Empanadas al horno", "de barro, en Salta"],
      bajada: "El bodegón de Córdoba 46. Cocina del norte al mediodía y a la noche, todos los días.",
      bajadaExtra: "Frente a la Basílica de San Francisco, en el casco histórico salteño.",
      ficha: fichaEnlace({ imagen: fotos.locro, texto: "Ver la carta con precios", url: "/carta" }),
    }),

    centrada({
      titulo: ["Una casona vieja", "con las mesas llenas"],
      imagenes: [fotos.salon, fotos.paredes],
      textos: [
        "Doña Salta es un bodegón de cocina regional en el casco histórico de Salta capital. Funciona en una casona antigua de techos altos, paredes de adobe color tierra y lámparas de mimbre colgadas de cañas de bambú.",
        "Los mozos atienden de sombrero salteño y de fondo suena folclore. No tomamos reserva: la mesa se gana por orden de llegada, todos los días del año.",
      ],
      accion: boton({ texto: "Conocer el bodegón", url: "/el-bodegon", nivel: "contorno" }),
    }),

    franja(fotos.mesa, fotos.horno),

    comanda({
      titulo: ["Lo que más sale", "de la cocina"],
      items: destacados,
      imagenes: [fotos.empanadas, fotos.locro],
      accion: boton({ texto: "Ver la carta completa", url: "/carta" }),
    }),

    relato({
      imagen: fotos.empanadas,
      invertida: true,
      pie: "Docena surtida, recién salida del horno",
      titulo: ["El repulgue", "sella el jugo"],
      textos: [
        "La empanada salteña es chica y jugosa, y eso depende de dos cosas: el cierre y el fuego. Cada una se cierra a mano, pliegue por pliegue, para que la carne se cocine adentro en su propio caldo.",
        "Después va al horno de barro. El barro devuelve un calor parejo que el horno eléctrico no da y la leña deja el gusto ahumado. En pocos minutos la masa queda fina, tostada arriba y dorada abajo.",
      ],
      accion: boton({ texto: "Ver los cuatro rellenos", url: "/empanadas", nivel: "contorno" }),
    }),

    banda({
      titulo: ["Lo dicen 25.000 personas", "que ya se sentaron a la mesa"],
      texto:
        "Doña Salta tiene 4,5 puntos sobre 5 en Google con más de 25.000 reseñas y quedó entre los primeros del ranking de restaurantes de Salta en TripAdvisor. Son los números de un local que trabaja lleno todos los días.",
      tarjetas: reconocimientos,
    }),

    invitacion({
      imagen: fotos.locroMesa,
      titulo: ["Te esperamos", "en Córdoba 46"],
      texto:
        "No tomamos reserva: se entra por orden de llegada. Si venís de noche o el fin de semana, conviene llegar temprano.",
    }),

    mosaico([fotos.fachada, fotos.horno, fotos.locro, fotos.salon]),
  ].join("\n"),
};
