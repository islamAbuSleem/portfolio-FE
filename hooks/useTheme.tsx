"use client";

import { useSyncExternalStore, createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribeToMounted() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function useIsMounted() {
  return useSyncExternalStore(subscribeToMounted, getClientSnapshot, getServerSnapshot);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mounted = useIsMounted();
  const [theme, setThemeState] = useState<Theme>(() => {
    // Dark is the designed default; the system preference no longer decides.
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored ?? "dark";
  });

  const applyTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
  };

  const toggleTheme = () => {
    applyTheme(theme === "light" ? "dark" : "light");
  };

  const setTheme = (next: Theme) => {
    applyTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}