"use client";

import { Button, Switch } from "@heroui/react";
import { Globe, Moon, Sun } from "lucide-react";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Minimal navbar for auth pages (login, register, forgot-password, etc.)
 * Shows only: logo (links to home), dark mode toggle, language switcher.
 * No nav links, no login/dashboard button.
 */
export function AuthNavbar() {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

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
          {mounted && (
            <Switch
              size="sm"
              isSelected={theme === "dark"}
              onChange={(checked) => setTheme(checked ? "dark" : "light")}
              aria-label="Toggle dark mode"
            >
              {({ isSelected }: { isSelected: boolean }) => (
                <Switch.Control>
                  <Switch.Thumb>
                    <Switch.Icon>
                      {isSelected ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                    </Switch.Icon>
                  </Switch.Thumb>
                </Switch.Control>
              )}
            </Switch>
          )}
          <Button variant="ghost" size="sm" onPress={switchLocale}>
            <Globe className="me-1 h-4 w-4" />
            {locale === "en" ? "العربية" : "English"}
          </Button>
        </div>
      </div>
    </nav>
  );
}
