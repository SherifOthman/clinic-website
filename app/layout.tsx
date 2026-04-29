import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "ClinicCare — Clinic Management Platform",
    template: `%s | ClinicCare`,
  },
  description:
    "Modern healthcare management with comprehensive medical services",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
