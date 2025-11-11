const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

const toggleBtn = document.querySelector(".theme-toggle");
const THEME_KEY = "hgr-theme";
const prefersDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

const applyTheme = (theme) => {
  const mode = theme === "dark" ? "dark" : "light";
  document.body.dataset.theme = mode;
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
  }
};

const savedTheme = window.localStorage ? localStorage.getItem(THEME_KEY) : null;
const initialTheme =
  savedTheme ||
  (prefersDark && prefersDark.matches ? "dark" : document.body.dataset.theme || "light");
applyTheme(initialTheme);

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    if (window.localStorage) {
      localStorage.setItem(THEME_KEY, next);
    }
  });
}

if (prefersDark) {
  prefersDark.addEventListener("change", (event) => {
    const stored = window.localStorage ? localStorage.getItem(THEME_KEY) : null;
    if (stored) {
      return;
    }
    applyTheme(event.matches ? "dark" : "light");
  });
}
