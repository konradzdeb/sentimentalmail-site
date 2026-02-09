const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const THEME_KEY = "sentimental-theme";

function syncHeroImage(theme) {
  const heroImage = document.querySelector(".hero-image");
  if (!heroImage) return;

  const lightSrc = heroImage.getAttribute("data-light-src");
  const darkSrc = heroImage.getAttribute("data-dark-src");
  const nextSrc = theme === "light" ? lightSrc : darkSrc;

  if (nextSrc && heroImage.getAttribute("src") !== nextSrc) {
    heroImage.setAttribute("src", nextSrc);
  }
}

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  syncHeroImage(theme);
}

function setTheme(theme) {
  applyTheme(theme);
  localStorage.setItem(THEME_KEY, theme);
}

applyTheme(getPreferredTheme());

function initThemeToggle() {
  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });
}

function initMobileNav() {
  const nav = document.querySelector(".nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("primary-nav");
  if (!nav || !menuToggle || !navLinks) return;
  nav.classList.add("nav--mobile-ready");

  function closeMenu() {
    nav.classList.remove("nav--open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }

  function openMenu() {
    nav.classList.add("nav--open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) closeMenu();
  });

  const desktopMediaQuery = window.matchMedia("(min-width: 761px)");
  if (desktopMediaQuery.addEventListener) {
    desktopMediaQuery.addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  } else if (desktopMediaQuery.addListener) {
    desktopMediaQuery.addListener((event) => {
      if (event.matches) closeMenu();
    });
  }
}

initThemeToggle();
initMobileNav();
