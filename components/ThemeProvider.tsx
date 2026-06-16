"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useAppStore((s) => s.profile.darkMode ?? "system");

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", darkMode);
    }
  }, [darkMode]);

  return <>{children}</>;
}
