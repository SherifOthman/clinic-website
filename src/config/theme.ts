import type { ThemeProviderProps } from "next-themes";

// Default theme configuration to prevent flicker
export const DEFAULT_THEME_CONFIG: ThemeProviderProps = {
  attribute: "class",
  defaultTheme: "system",
  enableSystem: true,
  disableTransitionOnChange: true,
};
