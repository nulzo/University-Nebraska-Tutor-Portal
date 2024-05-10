import { createContext, useContext, useEffect, useState } from "react";

/*
 * ThemeProvider is a React context provider that manages the theme state for an application.
 *
 * This component utilizes React context to provide a theme state to its descendants.
 * It allows setting the theme manually and persisting it in local storage.
 *
 * @component
 * @example
 * // Example usage of ThemeProvider:
 * import { ThemeProvider, useTheme } from './ThemeProvider';
 *
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="system">
 *       <MyThemedComponent />
 *     </ThemeProvider>
 *   );
 * }
 *
 * // Inside a component that needs access to the theme:
 * function MyThemedComponent() {
 *   const { theme, setTheme } = useTheme();
 *   // Component logic...
 * }
 *
 * @param {object} props - The props for the ThemeProvider component.
 * @param {React.ReactNode} props.children - The child components that will have access to the theme context.
 * @param {Theme} [props.defaultTheme="system"] - The default theme to use if no theme is stored in local storage.
 * @param {string} [props.storageKey="vite-ui-theme"] - The key for storing the theme in local storage.
 * @returns {JSX.Element} The JSX element representing the ThemeProvider component.
 */

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
