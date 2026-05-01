import { Inter as FontSans } from "next/font/google";

// Only fontSans is used — applied as a CSS variable in layout.tsx
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
