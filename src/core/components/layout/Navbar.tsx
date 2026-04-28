"use client";

import { Button, Link } from "@heroui/react";
import { Globe, HeartHandshake, Menu, Moon, Sun, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3001";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const menuItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "pricing", href: "/pricing" },
    { key: "contact", href: "/contact" },
  ];

  const loginUrl = `${AUTH_URL}/${locale}/login`;

  const switchLocale = () => {
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${locale === "en" ? "ar" : "en"}/${path}`);
  };

  const isActive = (href: string) =>
    pathname === `/${locale}${href}` || (href === "/" && pathname === `/${locale}`);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 no-underline">
            <HeartHandshake className="h-7 w-7 text-accent" />
            <span className="text-lg font-bold text-foreground">ClinicCare</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 sm:flex">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`text-sm transition-colors no-underline ${
                  isActive(item.href)
                    ? "font-semibold text-accent"
                    : "text-foreground hover:text-accent"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 sm:flex">
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
            <Button variant="ghost" size="sm" onPress={switchLocale}>
              <Globe className="me-1 h-4 w-4" />
              {locale === "en" ? "العربية" : "English"}
            </Button>
            <Button variant="primary" size="sm" onPress={() => { window.location.href = loginUrl; }}>
              {t("login")}
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="rounded-lg p-2 text-foreground hover:bg-default sm:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-border bg-background px-6 py-4 sm:hidden">
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`text-sm no-underline ${
                  isActive(item.href) ? "font-semibold text-accent" : "text-foreground"
                }`}
                onPress={() => setIsOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <Button variant="primary" className="mt-2 w-full" onPress={() => { setIsOpen(false); window.location.href = loginUrl; }}>
              {t("login")}
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onPress={switchLocale} className="flex-1">
                <Globe className="me-1 h-4 w-4" />
                {locale === "en" ? "العربية" : "English"}
              </Button>
              {mounted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex-1"
                >
                  {theme === "dark" ? <Sun className="me-1 h-4 w-4" /> : <Moon className="me-1 h-4 w-4" />}
                  {theme === "dark" ? "Light" : "Dark"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
