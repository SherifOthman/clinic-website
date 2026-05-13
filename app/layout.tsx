import "@/styles/globals.css";
import type { Metadata } from "next";
import { cairo, roboto } from "@/src/core/config/fonts";
import clsx from "clsx";
import { ThemeProviders } from "./[locale]/providers";

export const metadata: Metadata = {
  title: {
    default: "ClinicCare — Clinic Management Platform",
    template: `%s | ClinicCare`,
  },
  description:
    "Modern healthcare management with comprehensive medical services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" dir="ltr" className={clsx(cairo.variable, roboto.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var p=location.pathname.split("/")[1],r=p==="ar";if(p){document.documentElement.lang=p;document.documentElement.dir=r?"rtl":"ltr"}})()`
        }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProviders>
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
