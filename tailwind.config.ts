import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        cairo: ["var(--font-cairo)", "Cairo", "sans-serif"],
        roboto: ["var(--font-roboto)", "Roboto", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#e6f7ff",
              100: "#bae7ff",
              200: "#91d5ff",
              300: "#69c0ff",
              400: "#40a9ff",
              500: "#1890ff",
              600: "#096dd9",
              700: "#0050b3",
              800: "#003a8c",
              900: "#002766",
              DEFAULT: "#1890ff",
              foreground: "#ffffff",
            },
            focus: "#1890ff",
          },
        },
        dark: {
          colors: {
            primary: {
              50: "#002766",
              100: "#003a8c",
              200: "#0050b3",
              300: "#096dd9",
              400: "#1890ff",
              500: "#40a9ff",
              600: "#69c0ff",
              700: "#91d5ff",
              800: "#bae7ff",
              900: "#e6f7ff",
              DEFAULT: "#40a9ff",
              foreground: "#000000",
            },
            focus: "#40a9ff",
          },
        },
      },
    }),
  ],
};

export default config;
