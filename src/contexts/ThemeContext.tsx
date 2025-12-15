"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkModeEnabled: boolean;
}

const defaultThemeContext: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
  isDarkModeEnabled: false,
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

// Safe hook to get pathname without breaking SSR
function useSafePathname(): string | null {
  const [pathname, setPathname] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  return pathname;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const pathname = useSafePathname();

  // Check if dark mode should be enabled based on the current route
  const isDarkModeEnabled: boolean =
    typeof window !== "undefined" &&
    !!pathname?.startsWith("/dashboard") &&
    !pathname.includes("/dashboard/preview");

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to light
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
    }
  }, []);

  useEffect(() => {
    // Apply or remove dark class based on theme and route
    if (typeof window !== "undefined") {
      if (isDarkModeEnabled && theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, isDarkModeEnabled]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkModeEnabled }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
