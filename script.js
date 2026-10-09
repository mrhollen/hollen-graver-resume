// Update copyright year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

// Color theme system
const toggleBtn = document.querySelector(".theme-toggle");
const THEME_KEY = "hgr-theme";
const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
const prefersDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

const applyTheme = (theme) => {
  const mode = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = mode;
  document.body.dataset.theme = mode;

  if (colorSchemeMeta) {
    colorSchemeMeta.content = mode;
  }

  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
    toggleBtn.setAttribute(
      "aria-label",
      mode === "dark" ? "Switch to light color mode" : "Switch to dark color mode"
    );
  }
};

const getPreferredTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") {
      return saved;
    }
  } catch (e) {}

  return prefersDark && prefersDark.matches ? "dark" : "light";
};

// Initialize theme
applyTheme(getPreferredTheme());

// Click toggle
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
  });
}

// Respond to OS system preference changes if no manual override is active
if (prefersDark) {
  prefersDark.addEventListener("change", (e) => {
    try {
      if (localStorage.getItem(THEME_KEY)) {
        return;
      }
    } catch (err) {}
    applyTheme(e.matches ? "dark" : "light");
  });
}

// Sync theme changes across browser tabs
window.addEventListener("storage", (e) => {
  if (e.key === THEME_KEY && (e.newValue === "dark" || e.newValue === "light")) {
    applyTheme(e.newValue);
  }
});
