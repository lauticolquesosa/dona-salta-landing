/* ============================================================
   DOÑA SALTA — interacciones
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hdr = document.getElementById("hdr");

  /* ---- Header: transparente -> sólido + auto-hide ---- */
  var lastY = window.scrollY;
  function onHeader() {
    var y = window.scrollY;
    hdr.classList.toggle("is-solid", y > 48);
    if (!hdr.classList.contains("menu-open")) {
      if (y > lastY && y > 480) hdr.classList.add("is-hidden");
      else hdr.classList.remove("is-hidden");
    }
    lastY = y;
  }

  /* ---- Menú mobile ---- */
  var burger = document.querySelector(".hdr__burger");
  function closeMenu() {
    hdr.classList.remove("menu-open");
    document.body.style.overflow = "";
    if (burger) burger.setAttribute("aria-expanded", "false");
  }
  if (burger) {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = hdr.classList.toggle("menu-open");
      document.body.style.overflow = open ? "hidden" : "";
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    hdr.querySelectorAll(".hdr__nav a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---- Hero: secuencia sticky (frames + líneas + dots) ---- */
  var hero = document.querySelector(".hero");
  var frames = document.querySelectorAll(".hero__frame");
  var lines = document.querySelectorAll(".hero__line");
  var dots = document.querySelectorAll(".hero__dots span");
  var curHero = -1;
  function setHero(i) {
    if (i === curHero) return;
    curHero = i;
    frames.forEach(function (f, n) { f.classList.toggle("is-active", n === i); });
    lines.forEach(function (l, n) { l.classList.toggle("is-active", n === i); });
    dots.forEach(function (d, n) { d.classList.toggle("is-active", n === i); });
  }
  function onHero() {
    if (!hero) return;
    var rect = hero.getBoundingClientRect();
    var total = hero.offsetHeight - window.innerHeight;
    var p = total > 0 ? (-rect.top) / total : 0;
    p = Math.max(0, Math.min(1, p));
    setHero(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
  }
  setHero(0);

  /* ---- Parallax suave (horno + fachada) ---- */
  var parallax = [
    { el: document.querySelector(".horno__bg"), k: 0.12 },
    { el: document.querySelector(".visita__bg"), k: 0.1 }
  ].filter(function (o) { return o.el; });
  function onParallax() {
    if (reduce) return;
    var vh = window.innerHeight;
    parallax.forEach(function (o) {
      var r = o.el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var shift = (r.top + r.height / 2 - vh / 2) * -o.k;
      o.el.style.transform = "translateY(" + shift.toFixed(1) + "px)";
    });
  }

  /* ---- rAF scroll loop ---- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onHeader();
      onHero();
      onParallax();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onHeader(); onHero(); onParallax();

  /* ---- Reveals ---- */
  var revealEls = document.querySelectorAll(".reveal, .horno__rule");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Contadores ---- */
  var counters = document.querySelectorAll(".proof__num[data-count]");
  function animateCount(el) {
    var target = parseFloat(el.dataset.count);
    var dec = parseInt(el.dataset.decimals || "0", 10);
    var suffix = el.dataset.suffix || "";
    var start = performance.now(), dur = 1400;
    function frame(now) {
      var t = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = target * eased;
      var out = dec > 0 ? val.toFixed(dec) : Math.round(val).toLocaleString("es-AR");
      el.textContent = out + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if ("IntersectionObserver" in window && !reduce && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---- Tabs de la carta ---- */
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".panel");
  function activate(id) {
    tabs.forEach(function (t) {
      var on = t.dataset.tab === id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function (p) { p.classList.toggle("is-active", p.dataset.panel === id); });
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () { activate(t.dataset.tab); });
    t.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      var list = Array.prototype.slice.call(tabs);
      var i = list.indexOf(t);
      var ni = e.key === "ArrowRight" ? (i + 1) % list.length : (i - 1 + list.length) % list.length;
      list[ni].focus();
      activate(list[ni].dataset.tab);
    });
  });

  /* ---- Año footer ---- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
