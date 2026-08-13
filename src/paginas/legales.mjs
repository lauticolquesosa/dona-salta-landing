import { sitio, contacto, redes } from "../data/sitio.mjs";
import { esc } from "../lib/html.mjs";
import { migas } from "../lib/layout.mjs";

/** Arma una página de texto legal a partir de bloques de título y párrafos. */
const documentoLegal = (titulo, bajada, bloques) => `<section class="encabezado">
  <div class="contenedor">
    <h1 class="titulo-1">${esc(titulo)}</h1>
    <p class="parrafo bajada">${esc(bajada)}</p>
  </div>
</section>
<section class="seccion">
  <div class="contenedor texto-legal">
    ${bloques
      .map(
        (b) => `<h2 class="titulo-3">${esc(b.titulo)}</h2>
      ${b.parrafos.map((p) => `<p class="parrafo">${esc(p)}</p>`).join("")}`
      )
      .join("")}
  </div>
</section>`;

const privacidad = {
  ruta: "/privacidad",
  archivo: "privacidad.html",
  activa: "privacidad",
  titulo: "Política de privacidad · Doña Salta",
  descripcion:
    "Qué datos maneja el sitio de Doña Salta. No hay formularios, no se piden datos personales y no se usan cookies propias de seguimiento.",
  jsonLd: [migas("Política de privacidad", "/privacidad")],
  cuerpo: documentoLegal(
    "Política de privacidad",
    "Este sitio no te pide datos. No hay formularios, no hay registro y no guardamos información tuya.",
    [
      {
        titulo: "Qué datos recogemos",
        parrafos: [
          "Ninguno. El sitio de Doña Salta es una web informativa: muestra la carta, los horarios y la dirección del local. No tiene formularios, no tiene registro de usuarios y no guarda ningún dato personal en nuestros servidores.",
          "Si nos llamás por teléfono, usamos ese contacto solo para atender tu pedido o tu consulta. No armamos listas ni bases de datos con esa información.",
        ],
      },
      {
        titulo: "Cookies",
        parrafos: [
          "No usamos cookies propias de seguimiento ni herramientas de publicidad. Tampoco medimos tu navegación con perfiles individuales.",
          "El sitio carga tipografías desde Google Fonts y muestra un mapa embebido de Google Maps en la página Visitanos. Al cargarse esos recursos, Google puede recibir tu dirección IP y datos técnicos del navegador, según sus propias políticas. Si preferís evitarlo, podés bloquear ese contenido desde la configuración de tu navegador.",
        ],
      },
      {
        titulo: "Enlaces a otros sitios",
        parrafos: [
          `Desde acá se enlaza a Google Maps, a Instagram y a Facebook. Cuando salís del sitio, quedás sujeto a las políticas de privacidad de esas plataformas. Nuestras cuentas oficiales son ${redes.map((r) => `${r.red} ${r.cuenta}`).join(" y ")}.`,
        ],
      },
      {
        titulo: "Cambios y contacto",
        parrafos: [
          "Si en el futuro sumamos alguna función que necesite datos, vamos a actualizar este texto antes de ponerla en funcionamiento.",
          `Por cualquier consulta sobre esta política podés llamarnos al ${contacto.telefono} o acercarte a ${contacto.calle}, ${contacto.localidad} capital.`,
        ],
      },
    ]
  ),
};

const terminos = {
  ruta: "/terminos",
  archivo: "terminos.html",
  activa: "terminos",
  titulo: "Términos de uso · Doña Salta",
  descripcion:
    "Condiciones de uso del sitio de Doña Salta: alcance de la información publicada, precios de la carta y propiedad del contenido.",
  jsonLd: [migas("Términos de uso", "/terminos")],
  cuerpo: documentoLegal(
    "Términos de uso",
    "Las condiciones con las que publicamos la información de este sitio.",
    [
      {
        titulo: "Para qué sirve este sitio",
        parrafos: [
          `Este sitio es la web oficial de ${sitio.nombre}, el restaurante de ${contacto.calle}, ${contacto.localidad} capital. Publica la carta, los precios, los horarios y la dirección del local. No es una tienda: acá no se compra ni se reserva.`,
        ],
      },
      {
        titulo: "Precios y disponibilidad",
        parrafos: [
          "Los precios de la carta están en pesos argentinos e incluyen impuestos. Los actualizamos cuando cambian en el local, pero pueden variar sin aviso previo. La carta impresa del salón es la que vale al momento de pedir.",
          "La disponibilidad de los platos depende del día. Algunos platos regionales pueden agotarse durante el servicio.",
        ],
      },
      {
        titulo: "Reservas y pedidos",
        parrafos: [
          "No tomamos reservas de mesa. El ingreso al salón es por orden de llegada, en los horarios publicados.",
          `Los pedidos para llevar se hacen por teléfono al ${contacto.telefono} y se retiran en el local. No tenemos servicio de envío a domicilio ni vendemos a través de este sitio.`,
        ],
      },
      {
        titulo: "Contenido del sitio",
        parrafos: [
          `Las fotos, los textos y el logotipo son de ${sitio.nombre}. No se pueden reproducir con fines comerciales sin autorización. Las fotos fueron tomadas en el local y muestran el salón y los platos reales.`,
          "Cuidamos que todo lo publicado sea exacto. Si encontrás un error, avisanos y lo corregimos.",
        ],
      },
    ]
  ),
};

export default [privacidad, terminos];
