"use client";

import { Button } from "@heroui/react";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitch } from "@/src/core/components/ui/ThemeSwitch";

/**
 * Minimal navbar for auth pages (login, register, forgot-password, etc.)
 * Shows only: logo (links to home), dark mode toggle, language switcher.
 * No nav links, no login/dashboard button.
 */
export function AuthNavbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${locale === "en" ? "ar" : "en"}/${path}`);
  };

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo — links back to home */}
        <Link href={`/${locale}`} className="flex items-center gap-2 no-underline">
          <Image src="/logo.svg" alt="ClinicCare" width={28} height={28} priority />
          <span className="text-lg font-bold text-foreground">ClinicCare</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <Button variant="ghost" size="sm" onPress={switchLocale}>
            <Globe className="me-1 h-4 w-4" />
            {locale === "en" ? "العربية" : "English"}
          </Button>
        </div>
      </div>
    </nav>
  );
}
