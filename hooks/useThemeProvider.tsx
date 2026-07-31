"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./useTheme";

export function ClientThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
