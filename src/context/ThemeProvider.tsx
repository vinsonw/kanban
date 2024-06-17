import * as React from "react";

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
  const [theme, setTheme] = React.useState<Theme>("light");
  const setThemeWithMarkingDocument = (theme: Theme) => {
    // for css variable switch
    document.documentElement.dataset.theme = theme;
    setTheme(theme);
  };
  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: setThemeWithMarkingDocument }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
