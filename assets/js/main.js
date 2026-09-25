(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.remove("no-js");

  /* ---------- Modo escuro ---------- */
  var toggle = document.querySelector(".theme-toggle");
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return root.getAttribute("data-theme") || (media.matches ? "dark" : "light");
  }
  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#161616" : "#F9F8F6");
    if (toggle) {
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      toggle.setAttribute("aria-label", theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro");
    }
    if (persist) { try { localStorage.setItem("theme", theme); } catch (e) {} }
  }
  applyTheme(currentTheme(), false);
  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
  }
  media.addEventListener && media.addEventListener("change", function (e) {
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (err) {}
    if (!saved) applyTheme(e.matches ? "dark" : "light", false);
  });

  /* ---------- Cabeçalho e menu mobile ---------- */
  var header = document.querySelector(".header");
  var menuBtn = document.querySelector(".menu-toggle");
  var nav = document.getElementById("nav");

  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Abrir menu");
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Filtro das perguntas ---------- */
  var filters = document.querySelector(".filters");
  if (filters) {
    var items = document.querySelectorAll(".faq details");
    filters.hidden = false;
    filters.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      var cat = chip.getAttribute("data-filter");
      filters.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      items.forEach(function (d) {
        d.hidden = !(cat === "todas" || d.getAttribute("data-cat") === cat);
      });
    });
  }

  /* ---------- Entrada suave das seções ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Aviso de cookies (LGPD) ---------- */
  var CONSENT_KEY = "cookie-consent";
  function savedConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: value });
    }
    if (value === "granted") (window.dataLayer = window.dataLayer || []).push({ event: "consent_granted" });
  }
  var policyLink = document.querySelector('a[href*="politica-de-privacidade"]');
  var policyHref = policyLink ? policyLink.getAttribute("href") : "politica-de-privacidade.html";
  var banner = document.createElement("div");
  banner.className = "cookie";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Aviso de cookies");
  banner.hidden = true;
  banner.innerHTML =
    '<p class="cookie__title">Sua privacidade</p>' +
    '<p>Usamos cookies do Google apenas para medir as visitas e melhorar o site, se você permitir. ' +
    'Saiba mais na <a href="' + policyHref + '">Política de Privacidade</a>.</p>' +
    '<div class="cookie__actions">' +
    '<button type="button" class="btn btn--ghost" data-consent="denied">Recusar</button>' +
    '<button type="button" class="btn" data-consent="granted">Aceitar</button>' +
    '</div>';
  document.body.appendChild(banner);

  function showBanner(show) {
    banner.hidden = !show;
    root.classList.toggle("cookie-open", show);
  }
  banner.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-consent]");
    if (!btn) return;
    setConsent(btn.getAttribute("data-consent"));
    showBanner(false);
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest("[data-cookie-prefs]")) return;
    showBanner(true);
    banner.querySelector('[data-consent="granted"]').focus();
  });
  var initial = savedConsent();
  if (initial !== "granted" && initial !== "denied") showBanner(true);

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
