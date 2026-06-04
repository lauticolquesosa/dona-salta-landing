/* ============================================================
   DOÑA SALTA — interacciones
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Navbar al hacer scroll ---- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Entrada de la barra flotante ---- */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      setTimeout(function () { nav.classList.add("nav--in"); }, 200);
    });
  });

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Tabs de la carta ---- */
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".panel");
  function activate(id) {
    tabs.forEach(function (t) {
      var on = t.dataset.tab === id;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function (p) {
      p.classList.toggle("active", p.dataset.panel === id);
    });
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      activate(t.dataset.tab);
      // re-disparar reveals dentro del panel recién mostrado
      var panel = document.querySelector('.panel[data-panel="' + t.dataset.tab + '"]');
      if (panel) panel.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    });
    // teclado: flechas entre tabs
    t.addEventListener("keydown", function (e) {
      var list = Array.prototype.slice.call(tabs);
      var i = list.indexOf(t);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var ni = e.key === "ArrowRight" ? (i + 1) % list.length : (i - 1 + list.length) % list.length;
        list[ni].focus();
        activate(list[ni].dataset.tab);
      }
    });
  });

  /* ---- Hero parallax muy sutil ---- */
  var heroBg = document.querySelector(".hero__bg");
  if (heroBg && !reduce) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY;
          if (y < window.innerHeight) {
            heroBg.style.transform = "scale(1.06) translateY(" + (y * 0.18) + "px)";
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---- Año del footer ---- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
