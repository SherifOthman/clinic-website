"use client";

import { Button, Drawer, Link, Separator } from "@heroui/react";
import { Globe, Home, Info, LayoutDashboard, LogIn, DollarSign, Mail, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/src/core/utils/api";
import { DASHBOARD_URL } from "@/src/core/constants/env";
import { ThemeSwitch } from "@/src/core/components/ui/ThemeSwitch";

interface NavbarMobileProps {
  locale: string;
}

/**
 * Mobile hamburger + drawer navigation.
 * Client-only because it needs useState for open/close and useEffect for auth.
 */
export function NavbarMobile({ locale }: NavbarMobileProps) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname();
  const isRTL = locale === "ar";

  useEffect(() => {
    apiClient.get("/auth/me").then((r) => { if (r.ok) setIsLoggedIn(true); });
  }, []);

  const menuItems = [
    { key: "home",    href: "/",        icon: Home },
    { key: "about",   href: "/about",   icon: Info },
    { key: "pricing", href: "/pricing", icon: DollarSign },
    { key: "contact", href: "/contact", icon: Mail },
  ];

  const isActive = (href: string) =>
    pathname === `/${locale}${href}` || (href === "/" && pathname === `/${locale}`);

  const switchLocale = () => {
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${locale === "en" ? "ar" : "en"}/${path}`);
  };

  const handleLoginOrDashboard = () => {
    setOpen(false);
    if (isLoggedIn) window.location.href = DASHBOARD_URL;
    else router.push(`/${locale}/login`);
  };

  return (
    <>
      {/* Hamburger button — visible on mobile only */}
      <Button
        variant="ghost"
        size="sm"
        isIconOnly
        className="sm:hidden"
        onPress={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Drawer */}
      <Drawer.Backdrop isOpen={open} onOpenChange={setOpen}>
        <Drawer.Content placement={isRTL ? "right" : "left"}>
          <Drawer.Dialog aria-label="Navigation menu">
            <Drawer.CloseTrigger />
            <Drawer.Body className="p-0">
              <div className="flex h-full flex-col">
                {/* Brand */}
                <div className="flex h-16 shrink-0 items-center gap-3 px-5">
                  <Image src="/logo.svg" alt="ClinicCare" width={32} height={32} />
                  <span className="text-xl font-bold text-foreground">ClinicCare</span>
                </div>

                <Separator />

                {/* Nav links */}
                <nav className="flex-1 overflow-auto py-4">
                  <ul className="flex flex-col gap-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      return (
                        <li key={item.key}>
                          <Link
                            href={`/${locale}${item.href}`}
                            onPress={() => setOpen(false)}
                            className={`group flex w-full items-center gap-3 px-5 py-3 no-underline transition-all ${
                              active
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground hover:bg-surface-secondary"
                            }`}
                          >
                            <Icon className={`h-5 w-5 shrink-0 ${active ? "text-accent-foreground" : "text-muted group-hover:text-foreground"}`} />
                            <span className={`text-sm font-medium ${active ? "text-accent-foreground" : ""}`}>
                              {t(item.key)}
                            </span>
                            {active && (
                              <span className="ms-auto h-1.5 w-1.5 rounded-full bg-accent-foreground" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <Separator />

                {/* Bottom actions */}
                <div className="shrink-0 space-y-3 p-4">
                  <Button variant="primary" fullWidth onPress={handleLoginOrDashboard}>
                    {isLoggedIn
                      ? <><LayoutDashboard className="h-4 w-4" />{t("dashboard")}</>
                      : <><LogIn className="h-4 w-4" />{t("login")}</>
                    }
                  </Button>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2">
                    <Globe className="h-4 w-4 shrink-0 text-muted" />
                    <button
                      onClick={switchLocale}
                      className="flex-1 text-start text-sm font-medium text-foreground"
                    >
                      {locale === "en" ? "العربية" : "English"}
                    </button>
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
}
