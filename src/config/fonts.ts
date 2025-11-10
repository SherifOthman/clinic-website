import { Roboto } from "next/font/google";

export const fontSans = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "optional",
  weight: ["300", "400", "500", "700"],
  preload: true,
});
