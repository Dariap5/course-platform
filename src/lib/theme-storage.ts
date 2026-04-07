import type { ThemeId } from "@/types";

const KEY = "theme";

export function getStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "blue";
  const t = localStorage.getItem(KEY);
  if (
    t === "blue" ||
    t === "violet" ||
    t === "ocean" ||
    t === "sunset" ||
    t === "forest" ||
    t === "gold"
  ) {
    return t;
  }
  return "blue";
}

export function setStoredTheme(theme: ThemeId): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

export function applyThemeFromStorage(): void {
  if (typeof window === "undefined") return;
  const theme = getStoredTheme();
  document.documentElement.setAttribute("data-theme", theme);
}
