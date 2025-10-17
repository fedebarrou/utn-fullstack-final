import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // lee preferencia guardada o la del sistema
  const systemPref =
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || saved === "light" ? saved : systemPref;
  });

  // aplica/remueve clase en <body> y persiste
  useEffect(() => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // toggle simple
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  return ctx;
}
