import { contacto, horarios } from "../data/sitio.mjs";
import { faq } from "../data/contenido.mjs";
import { fotos, rutaFoto } from "../data/fotos.mjs";
import { boton, esc, foto, icono } from "../lib/html.mjs";
import { migas } from "../lib/layout.mjs";
import { invitacion, portada } from "../lib/piezas.mjs";

const comoLlegar = `<section class="seccion">
  <div class="contenedor visita">
    <div class="visita__texto">
      <h2 class="titulo-2 animar"><span>Si ves la torre</span><span>de San Francisco,</span><span>ya llegaste</span></h2>
      <p class="parrafo animar">La casona es amarilla y tiene tres arcos sobre la vereda, sobre la misma cuadra de la Basílica y Convento de San Francisco. Desde la plaza 9 de Julio son dos cuadras caminando por calle Córdoba.</p>
      <p class="direccion animar"><b>${esc(contacto.calle)}</b><span>${esc(contacto.codigoPostal)}, ${esc(contacto.localidad)} capital, ${esc(contacto.paisNombre)}</span></p>
      <ul class="horas horas--grande animar">
        ${horarios
          .map(
            (h) => `<li><span>${esc(h.servicio)}<small>${esc(h.dias)}</small></span><time>${esc(h.abre)} a ${esc(h.cierra)}</time></li>`
          )
          .join("")}
      </ul>
      <p class="parrafo animar">Entre las 15 y las 20 la cocina está cerrada. Si querés retirar un pedido, llamá dentro de los horarios de atención.</p>
      <div class="acciones animar">
        ${boton({ texto: "Cómo llegar", url: contacto.mapa, ico: "pin", externo: true, etiqueta: "Cómo llegar a Doña Salta, abre Google Maps" })}
        <a class="enlace" href="tel:${contacto.telefonoE164}"><span>Llamar al ${esc(contacto.telefono)}</span>${icono("flecha")}</a>
      </div>
    </div>
    <div class="visita__mapa animar">
      ${foto(fotos.fachada, { sizes: "(max-width: 60rem) 100vw, 45vw" })}
      <button class="boton boton--contorno mapa__abrir" type="button" data-mapa="${esc(contacto.mapaEmbed)}">
        ${icono("pin")}<span>Ver el mapa acá</span>
      </button>
    </div>
  </div>
</section>`;

const preguntas = `<section class="seccion seccion--oscura">
  <div class="contenedor">
    <div class="bloque bloque--centro">
      <h2 class="titulo-2 animar"><span>Lo que más</span><span>nos preguntan</span></h2>
      <p class="parrafo animar">Las respuestas cortas a las dudas que llegan por teléfono todos los días.</p>
    </div>
    <div class="preguntas escalona">
      ${faq
        .map(
          (f) => `<details class="pregunta animar">
        <summary><span>${esc(f.pregunta)}</span></summary>
        <p>${esc(f.respuesta)}</p>
      </details>`
        )
        .join("")}
    </div>
  </div>
</section>`;

const encargar = `<section class="seccion">
  <div class="contenedor bloque bloque--centro">
    <h2 class="titulo-2 animar"><span>Para encargar,</span><span>llamá</span></h2>
    <p class="parrafo animar">No tenemos delivery propio ni tomamos pedidos por formulario. Llamás al local, encargás lo que quieras y lo pasás a retirar por el salón cuando esté listo. Es la vía más rápida y te contesta alguien que está adentro.</p>
    <div class="acciones acciones--centro animar">
      ${boton({ texto: `Llamar al ${contacto.telefono}`, url: `tel:${contacto.telefonoE164}`, ico: "telefono" })}
    </div>
  </div>
</section>`;

/** Preguntas frecuentes estructuradas: es el formato que más se cita. */
const fichaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.pregunta,
    acceptedAnswer: { "@type": "Answer", text: f.respuesta },
  })),
};

export default {
  ruta: "/visitanos",
  archivo: "visitanos.html",
  activa: "visitanos",
  titulo: "Dónde estamos y horarios · Doña Salta, Córdoba 46, Salta",
  descripcion:
    "Doña Salta queda en Córdoba 46, frente a la Basílica de San Francisco, Salta capital. Almuerzo de 11:30 a 15:00 y cena de 20:00 a 00:00, todos los días, sin reserva.",
  imagen: rutaFoto(fotos.fachada, 1440),
  precarga: fotos.fachada,
  jsonLd: [migas("Visitanos", "/visitanos"), fichaFaq],
  cuerpo: [
    portada({
      imagen: fotos.fachada,
      titulo: ["Córdoba 46,", "frente a San Francisco"],
      bajada:
        "En pleno casco histórico de Salta capital, a dos cuadras de la plaza 9 de Julio. Abrimos todos los días al mediodía y a la noche, sin reserva.",
      acciones: boton({
        texto: "Cómo llegar",
        url: contacto.mapa,
        ico: "pin",
        externo: true,
        etiqueta: "Cómo llegar a Doña Salta, abre Google Maps",
      }),
    }),
    comoLlegar,
    preguntas,
    encargar,
    invitacion({
      imagen: fotos.salon,
      titulo: ["Se entra", "por orden de llegada"],
      texto:
        "No tomamos reserva. A la noche y los fines de semana el salón se llena temprano, así que conviene venir antes de las nueve.",
    }),
  ].join("\n"),
};
