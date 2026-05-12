"use client";

import { Button } from "@heroui/react";
import { Globe, LayoutDashboard, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/src/core/utils/api";
import { DASHBOARD_URL } from "@/src/core/constants/env";
import { ThemeSwitch } from "@/src/core/components/ui/ThemeSwitch";

interface NavbarActionsProps {
  locale: string;
}

/**
 * Client-only interactive part of the Navbar.
 * Handles: auth check, login/dashboard button, locale switcher, theme toggle.
 * Kept small so the rest of the Navbar can be a server component.
 */
export function NavbarActions({ locale }: NavbarActionsProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    apiFetch("GET", "/auth/me").then((result) => {
      if (result.ok) setIsLoggedIn(true);
    });
  }, []);

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

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <ThemeSwitch />
      <Button variant="ghost" size="sm" onPress={switchLocale}>
        <Globe className="me-1 h-4 w-4" />
        {locale === "en" ? "العربية" : "English"}
      </Button>
      <Button variant="primary" size="sm" onPress={handleLoginOrDashboard}>
        {isLoggedIn ? (
          <><LayoutDashboard className="me-1 h-4 w-4" />{t("dashboard")}</>
        ) : (
          t("login")
        )}
      </Button>
    </div>
  );
}
