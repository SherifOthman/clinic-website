"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Segments that belong to auth pages — no Navbar/Footer on these
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

  // Check if current path is an auth page
  const isAuthPage = AUTH_SEGMENTS.some((seg) =>
    pathname === `/${locale}/${seg}` || pathname.startsWith(`/${locale}/${seg}/`)
  );

  if (isAuthPage) {
    // Auth pages: full-screen, no Navbar/Footer — just render children
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
