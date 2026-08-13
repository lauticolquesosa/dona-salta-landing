import { contacto, horarios } from "../data/sitio.mjs";
import { faq } from "../data/contenido.mjs";
import { fotos, rutaFoto } from "../data/fotos.mjs";
import { boton, foto, esc, icono } from "../lib/html.mjs";
import { migas } from "../lib/layout.mjs";

const encabezado = `<section class="encabezado">
  <div class="contenedor">
    <h1 class="titulo-1">Córdoba 46, frente a la Basílica de San Francisco</h1>
    <p class="parrafo bajada">Estamos en pleno casco histórico de Salta capital, a tres cuadras de la plaza 9 de Julio. Abrimos todos los días al mediodía y a la noche. No tomamos reserva: se entra por orden de llegada.</p>
    <div class="acciones">
      ${boton({ texto: "Cómo llegar", url: contacto.mapa, ico: "pin", externo: true, etiqueta: "Cómo llegar a Doña Salta, abre Google Maps" })}
      <a class="enlace" href="tel:${contacto.telefonoE164}">Llamar al ${esc(contacto.telefono)}${icono("flecha")}</a>
    </div>
  </div>
  ${foto(fotos.fachada, { clase: "foto--ancha foto--recorte", prioridad: true, sizes: "100vw" })}
</section>`;

const datos = `<section class="seccion">
  <div class="contenedor visita">
    <div class="visita__col">
      <h2 class="titulo-2 animar">Si ves la torre de San Francisco, ya llegaste</h2>
      <p class="parrafo animar">La casona es amarilla y tiene tres arcos sobre la vereda, justo enfrente de la Basílica y Convento de San Francisco. Desde la plaza 9 de Julio son tres cuadras caminando por calle Córdoba.</p>
      <p class="ficha animar"><b>${esc(contacto.calle)}</b><span>${esc(contacto.codigoPostal)}, ${esc(contacto.localidad)} capital, ${esc(contacto.paisNombre)}</span></p>
      <ul class="horas horas--grande animar">
        ${horarios
          .map(
            (h) => `<li><span>${esc(h.servicio)}<small>${esc(h.dias)}</small></span><time>${esc(h.abre)} a ${esc(h.cierra)}</time></li>`
          )
          .join("")}
      </ul>
      <p class="parrafo animar">Entre las 15 y las 20 la cocina está cerrada. Si querés retirar un pedido, llamá dentro de esos horarios de atención.</p>
    </div>

    <div class="visita__mapa animar">
      <iframe title="Mapa con la ubicación de Doña Salta en Córdoba 46, Salta" src="${esc(contacto.mapaEmbed)}" width="600" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>`;

const preguntas = `<section class="seccion seccion--superficie">
  <div class="contenedor">
    <div class="bloque">
      <h2 class="titulo-2 animar">Lo que más nos preguntan</h2>
      <p class="parrafo animar">Las respuestas cortas a las dudas que llegan por teléfono todos los días.</p>
    </div>
    <div class="preguntas escalona">
      ${faq
        .map(
          (f) => `<details class="pregunta animar">
        <summary><span>${esc(f.pregunta)}</span></summary>
        <p class="parrafo">${esc(f.respuesta)}</p>
      </details>`
        )
        .join("")}
    </div>
  </div>
</section>`;

const contactoBloque = `<section class="seccion">
  <div class="contenedor cierre__grilla">
    <div class="cierre__texto">
      <h2 class="titulo-2 animar">Para encargar, llamá</h2>
      <p class="parrafo animar">No tenemos delivery propio ni tomamos pedidos por formulario. Llamás al local, encargás lo que quieras y lo pasás a retirar por el salón cuando esté listo. Es la vía más rápida y te contesta alguien que está adentro.</p>
      <div class="cierre__accion animar">
        ${boton({ texto: `Llamar al ${contacto.telefono}`, url: `tel:${contacto.telefonoE164}`, ico: "telefono" })}
      </div>
    </div>
    <div class="cierre__datos animar">
      <p class="cierre__dir"><b>${esc(contacto.calle)}</b><span>${esc(contacto.localidad)} capital</span></p>
      <ul class="horas">
        ${horarios.map((h) => `<li><span>${esc(h.servicio)}</span><time>${esc(h.abre)} a ${esc(h.cierra)}</time></li>`).join("")}
      </ul>
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
  jsonLd: [migas("Visitanos", "/visitanos"), fichaFaq],
  cuerpo: [encabezado, datos, preguntas, contactoBloque].join("\n"),
};
