import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/forms/theme-provider.tsx";

/*
 * ToggleMode component provides a theme toggling mechanism with a dropdown menu.
 *
 * This component utilizes the useTheme hook to manage theme changes.
 * It renders a button with sun and moon icons, allowing users to toggle between
 * light, dark, and system themes through a dropdown menu.
 *
 * @returns {JSX.Element} The JSX element representing the ToggleMode component.
 *
 * @example
 * // Example usage of ToggleMode component:
 * import { ToggleMode } from './ToggleMode';
 *
 * function App() {
 *   return (
 *     <div>
 *       <h1>My App</h1>
 *       <ToggleMode />
 *        ...
 *     </div>
 *   );
 * }
 */

export function ToggleMode() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
