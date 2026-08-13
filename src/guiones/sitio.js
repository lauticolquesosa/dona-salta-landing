/**
 * Doña Salta — interacciones del sitio.
 * Cuatro cosas: menú de celular, estado de la cabecera al scrollear,
 * apariciones al entrar en pantalla e índice activo de la carta.
 */
(function () {
  "use strict";

  var raiz = document.documentElement;
  raiz.classList.add("js");

  var sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Menú de celular ---- */
  var cabecera = document.getElementById("cabecera");
  var boton = document.querySelector(".hamburguesa");

  function cerrarMenu() {
    if (!document.body.classList.contains("menu-abierto")) return;
    document.body.classList.remove("menu-abierto");
    document.body.style.overflow = "";
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir el menú");
  }

  if (boton) {
    boton.addEventListener("click", function (evento) {
      evento.stopPropagation();
      var abierto = document.body.classList.toggle("menu-abierto");
      document.body.style.overflow = abierto ? "hidden" : "";
      boton.setAttribute("aria-expanded", abierto ? "true" : "false");
      boton.setAttribute("aria-label", abierto ? "Cerrar el menú" : "Abrir el menú");
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") cerrarMenu();
    });

    document.addEventListener("click", function (evento) {
      if (!document.body.classList.contains("menu-abierto")) return;
      if (!evento.target.closest(".menu")) cerrarMenu();
    });

    window.addEventListener("resize", cerrarMenu);
  }

  /* ---- Cabecera: se vuelve sólida al bajar ---- */
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
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    animables.forEach(function (el) {
      observador.observe(el);
    });
  }

  /* ---- Índice de la carta: marca la sección que se está leyendo ---- */
  var enlacesIndice = document.querySelectorAll(".indice a");

  if (enlacesIndice.length && "IntersectionObserver" in window) {
    var porId = {};
    enlacesIndice.forEach(function (enlace) {
      porId[enlace.getAttribute("href").slice(1)] = enlace;
    });

    var secciones = document.querySelectorAll(".carta-seccion");
    var vigia = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          enlacesIndice.forEach(function (enlace) {
            enlace.classList.remove("es-activo");
          });
          var activo = porId[entrada.target.id];
          if (activo) activo.classList.add("es-activo");
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    secciones.forEach(function (seccion) {
      vigia.observe(seccion);
    });
  }
})();
