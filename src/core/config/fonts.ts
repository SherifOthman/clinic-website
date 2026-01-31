import {
  Cairo,
  Fira_Code as FontMono,
  Inter as FontSans,
  Roboto,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontCairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});
