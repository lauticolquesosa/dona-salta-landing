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

  /* ---- Hero: desktop = scroll sticky · mobile = crossfade automático + swipe ---- */
  var hero = document.querySelector(".hero");
  var sticky = document.querySelector(".hero__sticky");
  var frames = document.querySelectorAll(".hero__frame");
  var lines = document.querySelectorAll(".hero__line");
  var dots = document.querySelectorAll(".hero__dots span");
  var nFrames = frames.length;
  var mqMobile = window.matchMedia("(max-width: 920px)");
  var curHero = -1;
  var autoTimer = null;

  function setHero(i) {
    if (i === curHero || !nFrames) return;
    curHero = i;
    frames.forEach(function (f, n) { f.classList.toggle("is-active", n === i); });
    lines.forEach(function (l, n) { l.classList.toggle("is-active", n === i); });
    dots.forEach(function (d, n) { d.classList.toggle("is-active", n === i); });
  }

  function onHero() {
    if (!hero || mqMobile.matches) return;
    var rect = hero.getBoundingClientRect();
    var total = hero.offsetHeight - window.innerHeight;
    var p = total > 0 ? (-rect.top) / total : 0;
    p = Math.max(0, Math.min(1, p));
    setHero(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
  }

  function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
  function startAuto() {
    stopAuto();
    if (reduce || !nFrames) return;
    autoTimer = setInterval(function () { setHero((curHero + 1) % nFrames); }, 4500);
  }
  function goTo(i) {
    setHero((i + nFrames) % nFrames);
    if (mqMobile.matches) startAuto();
  }
  function syncHeroMode() {
    if (mqMobile.matches) { setHero(curHero < 0 ? 0 : curHero); startAuto(); }
    else { stopAuto(); onHero(); }
  }

  dots.forEach(function (d, n) { d.addEventListener("click", function () { if (mqMobile.matches) goTo(n); }); });

  if (sticky) {
    var sx = 0, sy = 0;
    sticky.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    sticky.addEventListener("touchend", function (e) {
      if (!mqMobile.matches) return;
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) goTo(curHero + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  if (mqMobile.addEventListener) mqMobile.addEventListener("change", syncHeroMode);
  else if (mqMobile.addListener) mqMobile.addListener(syncHeroMode);
  setHero(0);
  syncHeroMode();

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
