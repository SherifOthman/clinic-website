"use client";

import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { Logo } from "@/src/components/Logo";
import { NavigationLinks } from "@/src/components/NavigationLinks";
import { ThemeSwitch } from "@/src/components/ThemeSwitch";
import { UserMenu } from "@/src/components/UserMenu";
import { Link as I18nLink, usePathname } from "@/src/i18n/routing";
import { cn } from "@/src/lib/utils";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation");

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const mobileMenuLinks = [
    { label: t("home"), href: "/" },
    { label: t("pricing"), href: "#pricing", isScroll: true },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Logo />
          <NavigationLinks />
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitch />
          <UserMenu />
        </div>

        <div className="flex sm:hidden items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitch />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 mt-8">
                {mobileMenuLinks.map((item, index) => {
                  const isActive = pathname === item.href;

                  if (item.isScroll) {
                    const href = pathname !== "/" ? `/${item.href}` : item.href;
                    return (
                      <a
                        key={index}
                        className="text-lg font-medium text-foreground/70 hover:text-primary transition-colors"
                        href={href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    );
                  }

                  return (
                    <I18nLink
                      key={index}
                      className={cn(
                        "text-lg font-medium transition-colors",
                        isActive
                          ? "text-primary font-semibold"
                          : "text-foreground/70 hover:text-foreground"
                      )}
                      href={item.href as any}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </I18nLink>
                  );
                })}

                <div className="flex flex-col gap-3 mt-6 pt-6 border-t">
                  <Button variant="outline" asChild className="w-full">
                    <I18nLink
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("login")}
                    </I18nLink>
                  </Button>
                  <Button asChild className="w-full">
                    <I18nLink
                      href="/signup"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("signup")}
                    </I18nLink>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
