import { Metadata, Viewport } from "next";
import "./globals.css";

import { fontArabic, fontSans } from "@/src/config/fonts";
import { siteConfig } from "@/src/config/site";
import { cn } from "@/src/lib/utils";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // metadataBase: new URL("https://localhost:3000"),
  keywords: [
    "clinic management",
    "healthcare",
    "patient management",
    "medical software",
    "HIPAA compliant",
  ],
  authors: [{ name: "ClinicFlow Team" }],
  creator: "ClinicFlow",
  publisher: "ClinicFlow",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
          fontArabic.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
