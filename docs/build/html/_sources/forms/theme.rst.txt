ThemeProvider React Component Documentation
==========================================

The `ThemeProvider` component is a React context provider that manages the theme state for a ticketing portal. It allows users to customize the theme (dark, light, or system default) and persists the selected theme in local storage.

Overview
--------

The `ThemeProvider` component is responsible for providing a theme context to its children components. It offers functionality to set and retrieve the current theme, and it automatically syncs the theme with the user's system preference when the "system" theme is selected.

Key Components
--------------

### createContext, useContext

These functions are used from the `react` library to create and access the theme context, respectively.

### useState

The `useState` hook is used to manage the local state of the selected theme.

### useEffect

The `useEffect` hook is used to update the document's root element with the selected theme class. It also listens for changes in the theme and adjusts the document accordingly.

### ThemeProviderProps

This type defines the props expected by the `ThemeProvider` component, including `children`, `defaultTheme`, and `storageKey`.

### ThemeProviderState

This type represents the state of the `ThemeProvider` component, including the current theme and the `setTheme` function.

### initialState

This constant represents the initial state of the `ThemeProvider` component, with the default theme set to "system."

### ThemeProviderContext

The context created using `createContext` to provide theme-related values to child components.

### ThemeProvider Component

The main `ThemeProvider` component that manages the theme state, sets the theme class on the document root, and provides the theme context to its children.

### useTheme Hook

The `useTheme` hook is a custom hook that retrieves the current theme and `setTheme` function from the context. It throws an error if used outside a `ThemeProvider`.

Usage
-----

To use the `ThemeProvider` component, wrap it around the components that need access to the theme context within a React application. Customize the theme by providing the desired values for `defaultTheme` and `storageKey`.

Example:

```jsx
import ThemeProvider, { useTheme } from "@/path/to/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <MainContent />
    </ThemeProvider>
  );
}

function MainContent() {
  const { theme, setTheme } = useTheme();

  // Implement theme-specific rendering or functionality based on the theme context.

  return (
    <div>
      <h1>Theme is {theme}</h1>
      <button onClick={() => setTheme("light")}>Switch to Light Theme</button>
    </div>
  );
}
