"use client";

import { useEffect } from "react";
import { applyThemeFromStorage } from "@/lib/theme-storage";

export function ThemeRoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyThemeFromStorage();
  }, []);
  return <>{children}</>;
}
