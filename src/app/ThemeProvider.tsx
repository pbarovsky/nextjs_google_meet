"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      value={{
        light: "theme-light",
        dark: "theme-dark",
      }}
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemeProvider>
  );
}
