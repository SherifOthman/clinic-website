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
    // Auth pages are full-screen split panels with their own logo — no wrapper needed
    return <>{children}</>;
  }

  return (
    <div className="relative flex flex-col min-h-screen">
      {navbar}
      <main className="flex-grow">{children}</main>
      {footer}
    </div>
  );
}
