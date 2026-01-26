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

initThemeToggle();
