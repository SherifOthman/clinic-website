"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AuthNavbar } from "./AuthNavbar";

// Segments that belong to auth pages
const AUTH_SEGMENTS = [
  "login", "register", "forgot-password", "reset-password",
  "accept-invitation", "resend-email-verification", "confirm-email",
];

interface NavbarWrapperProps {
  locale: string;
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export function NavbarWrapper({ locale, navbar, footer, children }: NavbarWrapperProps) {
  const pathname = usePathname();

  const isAuthPage = AUTH_SEGMENTS.some((seg) =>
    pathname === `/${locale}/${seg}` || pathname.startsWith(`/${locale}/${seg}/`)
  );

  if (isAuthPage) {
    // Auth pages: minimal navbar (logo + dark mode + language), no footer
    return (
      <div className="flex min-h-screen flex-col">
        <AuthNavbar />
        <main className="flex-grow">{children}</main>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen">
      {navbar}
      <main className="flex-grow">{children}</main>
      {footer}
    </div>
  );
}
