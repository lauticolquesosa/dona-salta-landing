/**
 * Doña Salta — interacciones del sitio.
 * Cinco cosas: menú de celular, estado de la cabecera al scrollear,
 * apariciones al entrar en pantalla, mapa a pedido y atajo activo de la carta.
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Menú de celular ---- */
  var boton = document.querySelector(".hamburguesa");

  function cerrarMenu() {
    if (!document.body.classList.contains("menu-abierto")) return;
    document.body.classList.remove("menu-abierto");
    document.body.style.overflow = "";
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir el menú");
  }

  if (boton) {
    boton.addEventListener("click", function () {
      var abierto = document.body.classList.toggle("menu-abierto");
      document.body.style.overflow = abierto ? "hidden" : "";
      boton.setAttribute("aria-expanded", abierto ? "true" : "false");
      boton.setAttribute("aria-label", abierto ? "Cerrar el menú" : "Abrir el menú");
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") cerrarMenu();
    });

    document.querySelectorAll(".menu a").forEach(function (enlace) {
      enlace.addEventListener("click", cerrarMenu);
    });

    window.addEventListener("resize", cerrarMenu);
  }

  /* ---- Cabecera: se vuelve sólida al bajar ---- */
  var cabecera = document.getElementById("cabecera");
  var pendiente = false;

  function pintarCabecera() {
    cabecera.classList.toggle("es-solida", window.scrollY > 24);
    pendiente = false;
  }

  if (cabecera) {
    window.addEventListener(
      "scroll",
      function () {
        if (pendiente) return;
        pendiente = true;
        window.requestAnimationFrame(pintarCabecera);
      },
      { passive: true }
    );
    pintarCabecera();
  }

  /* ---- Apariciones, una sola vez ---- */
  var animables = document.querySelectorAll(".animar");

  if (sinMovimiento || !("IntersectionObserver" in window)) {
    animables.forEach(function (el) {
      el.classList.add("es-visible");
    });
  } else {
    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("es-visible");
          observador.unobserve(entrada.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    animables.forEach(function (el) {
      observador.observe(el);
    });
  }

  /* ---- Mapa a pedido: el embebido de Google pesa dos megas ---- */
  var abrirMapa = document.querySelector(".mapa__abrir");

  if (abrirMapa) {
    abrirMapa.addEventListener("click", function () {
      var marco = document.createElement("iframe");
      marco.title = "Mapa con la ubicación de Doña Salta en Córdoba 46, Salta";
      marco.src = abrirMapa.dataset.mapa;
      marco.loading = "lazy";
      marco.referrerPolicy = "no-referrer-when-downgrade";
      abrirMapa.parentNode.appendChild(marco);
      abrirMapa.remove();
    });
  }

  /* ---- Atajos de la carta: marcan la sección que se está leyendo ---- */
  var atajos = document.querySelectorAll(".atajos a");
  var secciones = document.querySelectorAll(".carta-seccion");

  if (atajos.length && secciones.length && "IntersectionObserver" in window) {
    var porId = {};
    atajos.forEach(function (enlace) {
      porId[enlace.getAttribute("href").slice(1)] = enlace;
    });

    var vigia = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          atajos.forEach(function (enlace) {
            enlace.classList.remove("es-activo");
          });
          if (porId[entrada.target.id]) porId[entrada.target.id].classList.add("es-activo");
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    secciones.forEach(function (seccion) {
      vigia.observe(seccion);
    });
  }
})();
