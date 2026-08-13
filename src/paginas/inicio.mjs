import { contacto, reconocimientos } from "../data/sitio.mjs";
import { fotos, rutaFoto } from "../data/fotos.mjs";
import { boton, enlace, foto, precio, esc } from "../lib/html.mjs";
import { cierre, fichaNegocio } from "../lib/layout.mjs";

const destacados = [
  { que: "Empanada al horno de barro", cuanto: 2000 },
  { que: "Docena de empanadas", cuanto: 24000 },
  { que: "Locro en olla de barro", cuanto: 25000 },
];

/* Portada a pantalla completa: la fachada de Córdoba 46 de fondo, el título
   grande abajo a la izquierda y una sola acción principal. */
const portada = `<section class="portada">
  ${foto(fotos.fachada, { clase: "portada__foto", prioridad: true, sizes: "100vw" })}
  <div class="portada__velo" aria-hidden="true"></div>
  <div class="contenedor portada__contenido">
    <h1 class="portada__titulo">
      <span>Empanadas al</span>
      <span>horno de barro,</span>
      <span>en Salta capital</span>
    </h1>
    <p class="portada__bajada">El bodegón de Córdoba 46, frente a la Basílica de San Francisco. Cocina del norte, todos los días al mediodía y a la noche.</p>
    <div class="acciones">
      ${boton({ texto: "Llamar", url: `tel:${contacto.telefonoE164}`, ico: "telefono", etiqueta: `Llamar a Doña Salta al ${contacto.telefono}` })}
      ${boton({ texto: "Cómo llegar", url: contacto.mapa, nivel: "contorno", ico: "pin", externo: true, etiqueta: "Cómo llegar a Doña Salta, abre Google Maps" })}
    </div>
  </div>
</section>`;

const prueba = `<section class="seccion seccion--superficie">
  <div class="contenedor">
    <div class="bloque">
      <h2 class="titulo-2 animar">Lo dicen 25.000 personas que ya se sentaron a la mesa</h2>
      <p class="parrafo animar">Doña Salta tiene 4,5 puntos sobre 5 en Google con más de 25.000 reseñas, y quedó entre los primeros del ranking de restaurantes de Salta en TripAdvisor. Son los números de un local que trabaja lleno todos los días, no una campaña.</p>
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
    <p class="animar">${enlace({ texto: "Ver las reseñas en Google", url: contacto.reseñas, externo: true })}</p>
  </div>
</section>`;

const horno = `<section class="seccion">
  <div class="contenedor banda">
    ${foto(fotos.horno, { clase: "banda__foto animar", pie: "El horno, un rato antes del mediodía", sizes: "(max-width: 900px) 100vw, 45vw" })}
    <div class="banda__texto">
      <h2 class="titulo-2 animar">El horno se prende antes de que abra la puerta</h2>
      <p class="parrafo animar">La empanada salteña se cocina en horno de barro y no hay otra forma de que salga igual. El barro guarda el calor parejo, la leña le deja el gusto ahumado y la empanada se dora arriba en pocos minutos, con el jugo adentro.</p>
      <p class="parrafo animar">Cada una se cierra a mano con su repulgue. Ese pliegue sella la carne para que se cocine en su propio caldo, y es la diferencia que se nota en la primera mordida.</p>
      <p class="animar">${enlace({ texto: "Cómo se hacen las empanadas", url: "/empanadas" })}</p>
    </div>
  </div>
</section>`;

const carta = `<section class="seccion seccion--superficie">
  <div class="contenedor banda banda--invertida">
    ${foto(fotos.locro, { clase: "banda__foto animar", pie: "Locro, todo el año", sizes: "(max-width: 900px) 100vw, 45vw" })}
    <div class="banda__texto">
      <h2 class="titulo-2 animar">Carta corta, cocina del norte y precios a la vista</h2>
      <p class="parrafo animar">Servimos comida regional salteña: empanadas, locro, humitas, tamales, cazuela de cabrito y de conejo. También hay pastas, milanesas y pizza a la piedra para el que no quiere plato regional. La carta de vinos es casi toda salteña.</p>
      <ul class="precios animar">
        ${destacados
          .map(
            (d) => `<li><span>${esc(d.que)}</span><span class="precios__num">${precio(d.cuanto)}</span></li>`
          )
          .join("")}
      </ul>
      <p class="animar">${enlace({ texto: "Ver la carta completa con precios", url: "/carta" })}</p>
    </div>
  </div>
</section>`;

const salon = `<section class="seccion">
  <div class="contenedor">
    <div class="bloque">
      <h2 class="titulo-2 animar">Una casona vieja con las mesas llenas</h2>
      <p class="parrafo animar">El salón es una casona antigua del casco histórico: techos altos, paredes color tierra, ladrillo a la vista y lámparas de mimbre colgadas de cañas. Los mozos atienden de sombrero salteño y de fondo suena folclore. Se llena temprano, sobre todo a la noche.</p>
    </div>
    ${foto(fotos.salon, { clase: "foto--ancha animar", sizes: "100vw" })}
    <p class="animar">${enlace({ texto: "Conocer el bodegón por dentro", url: "/el-bodegon" })}</p>
  </div>
</section>`;

export default {
  ruta: "/",
  archivo: "index.html",
  activa: "inicio",
  titulo: "Doña Salta · Empanadas al horno de barro en Salta capital",
  descripcion:
    "Bodegón salteño en Córdoba 46, frente a la Basílica de San Francisco. Empanadas al horno de barro, locro y cocina regional. Abierto todos los días, sin reserva.",
  imagen: rutaFoto(fotos.empanadas, 1440),
  // La foto de la portada es el LCP: se precarga en vez de diferirse.
  precarga: { foto: fotos.fachada, sizes: "100vw" },
  jsonLd: [fichaNegocio()],
  cuerpo: [
    portada,
    prueba,
    horno,
    carta,
    salon,
    cierre({
      titulo: "Te esperamos en Córdoba 46",
      texto:
        "No tomamos reserva: se entra por orden de llegada, todos los días. Si venís de noche o el fin de semana, conviene llegar temprano.",
    }),
  ].join("\n"),
};
