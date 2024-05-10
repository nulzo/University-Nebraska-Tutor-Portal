ToggleMode React Component Documentation
========================================

The `ToggleMode` component is a React component that provides a mode toggle button for changing the theme of a ticketing portal. It utilizes icons for the sun and moon to represent light and dark themes, respectively. The component is implemented using the `lucide-react` library for icon components and leverages the `DropdownMenu` component for the theme selection options.

Overview
--------

The `ToggleMode` component offers a user-friendly way to switch between light, dark, and system (default) themes in the ticketing portal. Users can click on the button to reveal a dropdown menu with theme options.

Key Components
--------------

### Button Component

The `Button` component from `@/components/ui/button` is used to create the clickable button for toggling themes. It includes icons for the sun and moon, providing a visual representation of the available themes.

### DropdownMenu Components

The `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, and `DropdownMenuItem` components from `@/components/ui/dropdown-menu` are utilized to create a dropdown menu for selecting different themes. The menu is triggered by clicking on the mode toggle button.

### useTheme Hook

The `useTheme` hook from `@/forms/ThemeProvider` is used to access the `setTheme` function, enabling the component to update the selected theme based on user input.

Usage
-----

To use the `ToggleMode` component, integrate it into a parent component or page within a React application. Ensure that the necessary dependencies are imported, and handle theme changes accordingly.

Example:

```jsx
import ToggleMode from "@/path/to/ToggleMode";

function ThemeSettingsPage() {
  return (
    <div>
      <h1>Theme Settings</h1>
      <ToggleMode />
    </div>
  );
}
