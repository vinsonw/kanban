import * as React from "react";
import { KB_THEME_KEY } from "../constants";
import { useMediaQuery } from "../hooks";

type Theme = "light" | "dark";
type ThemeContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = React.createContext<ThemeContext>({
  theme: "light",
  setTheme: () => null,
});

const ThemeProvider = (props: { children: React.ReactNode }) => {
  const defaultTheme = (localStorage.getItem(KB_THEME_KEY) || "light") as Theme;
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);
  document.documentElement.dataset.theme = theme;

  const setThemeWithMarkingDocument = (theme: Theme) => {
    // for css variable switch
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(KB_THEME_KEY, theme);
    setTheme(theme);
  };

  // sync system light/dark theme
  const isSystemThemeDark: boolean = useMediaQuery(
    "(prefers-color-scheme: dark)",
  );
  React.useEffect(() => {
    setThemeWithMarkingDocument(isSystemThemeDark ? "dark" : "light");
  }, [isSystemThemeDark]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: setThemeWithMarkingDocument }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
