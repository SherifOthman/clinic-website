"use client";

import { Button, Drawer, Link, Separator } from "@heroui/react";
import { Globe, Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/src/core/utils/api";
import { DASHBOARD_URL } from "@/src/core/constants/env";
import { ThemeSwitch } from "@/src/core/components/ui/ThemeSwitch";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    apiClient.get("/auth/me").then((result) => {
      if (result.ok) setIsLoggedIn(true);
    });
  }, []);

  const menuItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "pricing", href: "/pricing" },
    { key: "contact", href: "/contact" },
  ];

  const handleLoginOrDashboard = () => {
    if (isLoggedIn) {
      window.location.href = DASHBOARD_URL;
    } else {
      router.push(`/${locale}/login`);
    }
  };

  const switchLocale = () => {
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${locale === "en" ? "ar" : "en"}/${path}`);
  };

  const isActive = (href: string) =>
    pathname === `/${locale}${href}` ||
    (href === "/" && pathname === `/${locale}`);

  const isRTL = locale === "ar";

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">

            {/* Logo + Desktop nav links */}
            <div className="flex items-center gap-8">
              <Link href={`/${locale}`} className="flex items-center gap-2 no-underline">
                <Image src="/logo.svg" alt="ClinicCare" width={28} height={28} priority />
                <span className="text-lg font-bold text-foreground">ClinicCare</span>
              </Link>

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
            </div>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2 sm:flex">
              <ThemeSwitch />
              <Button variant="ghost" size="sm" onPress={switchLocale}>
                <Globe className="me-1 h-4 w-4" />
                {locale === "en" ? "العربية" : "English"}
              </Button>
              <Button variant="primary" size="sm" onPress={handleLoginOrDashboard}>
                {isLoggedIn ? t("dashboard") : t("login")}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className="sm:hidden"
              onPress={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer — controlled, slides in from the side like the dashboard */}
      <Drawer.Backdrop
        isOpen={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      >
        <Drawer.Content placement={isRTL ? "right" : "left"}>
          <Drawer.Dialog aria-label="Navigation menu">
            <Drawer.CloseTrigger />
            <Drawer.Body className="p-0">
              <div className="flex h-full flex-col">
                {/* Brand */}
                <div className="flex h-16 shrink-0 items-center gap-2 px-4">
                  <Image src="/logo.svg" alt="ClinicCare" width={28} height={28} />
                  <span className="text-lg font-bold">ClinicCare</span>
                </div>

                <Separator />

                {/* Nav links */}
                <nav className="flex-1 overflow-auto px-3 py-3">
                  <ul className="flex flex-col gap-1">
                    {menuItems.map((item) => (
                      <li key={item.key}>
                        <Link
                          href={`/${locale}${item.href}`}
                          onPress={() => setMobileMenuOpen(false)}
                          className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors ${
                            isActive(item.href)
                              ? "bg-surface-tertiary text-foreground font-semibold"
                              : "text-muted hover:bg-surface-secondary hover:text-foreground"
                          }`}
                        >
                          {t(item.key)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <Separator />

                {/* Bottom actions */}
                <div className="flex shrink-0 flex-col gap-2 p-4">
                  <Button
                    variant="primary"
                    fullWidth
                    onPress={() => {
                      setMobileMenuOpen(false);
                      handleLoginOrDashboard();
                    }}
                  >
                    {isLoggedIn ? t("dashboard") : t("login")}
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onPress={switchLocale}
                      className="flex-1"
                    >
                      <Globe className="me-1 h-4 w-4" />
                      {locale === "en" ? "العربية" : "English"}
                    </Button>
                    <ThemeSwitch />
                  </div>
                </div>
              </div>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </>
  );
};
