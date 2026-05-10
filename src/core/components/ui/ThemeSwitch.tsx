"use client";

import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Theme toggle button. Uses mounted state to avoid SSR hydration mismatch —
 * next-themes returns undefined on the server, so we render a placeholder
 * until the client has mounted and the real theme is known.
 */
export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Button
      size="sm"
      variant="ghost"
      onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      isIconOnly
    >
      {/* Render placeholder until mounted to avoid hydration mismatch */}
      {mounted && theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}
