import { Cairo, Roboto } from "next/font/google";

/**
 * Cairo — used for Arabic (RTL) locale.
 * Self-hosted by Next.js, no external request, no layout shift.
 */
export const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

/**
 * Roboto — used for English (LTR) locale.
 * Self-hosted by Next.js, no external request, no layout shift.
 */
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});
