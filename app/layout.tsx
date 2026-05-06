import "@/styles/globals.css";
import { Metadata } from "next";

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
  return children;
}
