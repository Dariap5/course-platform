"use client";

import { cn } from "@/lib/utils";
import type { ThemeId } from "@/types";
import { getStoredTheme, setStoredTheme } from "@/lib/theme-storage";
import { useState } from "react";

const THEMES: {
  id: ThemeId;
  label: string;
  from: string;
  to: string;
}[] = [
  { id: "blue", label: "Синий (по умолчанию)", from: "#3B3BF5", to: "#818CF8" },
  { id: "violet", label: "Фиолетовый", from: "#7C3AED", to: "#C026D3" },
  { id: "ocean", label: "Океан", from: "#2563EB", to: "#0D9488" },
  { id: "sunset", label: "Закат", from: "#EA580C", to: "#DB2777" },
  { id: "forest", label: "Лес", from: "#16A34A", to: "#0D9488" },
  { id: "gold", label: "Золото", from: "#D97706", to: "#EA580C" },
];

export function ThemePicker() {
  const [current, setCurrent] = useState<ThemeId>(() => getStoredTheme());

  function pick(id: ThemeId) {
    setStoredTheme(id);
    setCurrent(id);
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-[hsl(var(--fg))]">
        Цвет платформы
      </h2>
      <p className="mt-1 text-xs text-[hsl(var(--fg-muted))]">
        Меняет акцентные элементы: кнопки, прогресс, градиенты
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => pick(t.id)}
            title={t.label}
            className={cn(
              "h-9 w-9 cursor-pointer rounded-full transition-shadow",
              current === t.id && "ring-2 ring-offset-2 ring-[hsl(var(--fg))]/20",
            )}
            style={{
              background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
              boxShadow:
                current === t.id ? `0 0 0 2px ${t.from}` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}
