"use client";

import { ClinicIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  return (
    <div className="min-h-screen bg-default-50 dark:bg-background">
      {/* Simple Header */}
      <header className="border-b border-divider bg-background">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <NextLink href="/" className="flex items-center gap-2">
              <ClinicIcon className="text-primary" size={32} />
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </NextLink>
            <div className="flex items-center gap-4">
              {isLoginPage && (
                <NextLink href="/register">
                  <Button color="primary" variant="flat" size="sm">
                    Sign Up
                  </Button>
                </NextLink>
              )}
              {isRegisterPage && (
                <NextLink href="/login">
                  <Button color="primary" variant="flat" size="sm">
                    Sign In
                  </Button>
                </NextLink>
              )}
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-divider bg-background">
        <div className="container mx-auto px-6 py-4 text-center">
          <p className="text-sm text-default-600">
            © 2024 {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
