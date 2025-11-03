"use client";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { ThemeSwitch } from "@/src/components/ThemeSwitch";
import { Logo } from "@/src/components/ui/Logo";
import { NavigationLinks } from "@/src/components/ui/NavigationLinks";
import { UserMenu } from "@/src/components/ui/UserMenu";
import { Link as I18nLink, usePathname } from "@/src/i18n/routing";
import { cn } from "@/src/lib/utils";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation");

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const mobileMenuLinks = [
    { label: t("home"), href: "/", type: "link" },
    { label: t("pricing"), href: "#pricing", type: "scroll" },
    { label: t("about"), href: "/about", type: "link" },
    { label: t("contact"), href: "/contact", type: "link" },
  ];

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-background/70 backdrop-blur-lg border-b border-divider"
      height="4.5rem"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Logo />
        </NavbarBrand>
        <NavigationLinks />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <LanguageSwitcher />
          <ThemeSwitch />
        </NavbarItem>
        <UserMenu />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <LanguageSwitcher />
        <ThemeSwitch />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu className="bg-background/95 dark:bg-background/98 backdrop-blur-md border-t border-divider dark:border-default-700 overflow-x-hidden">
        <div className="px-4 mt-2 flex flex-col gap-2 w-full">
          {mobileMenuLinks.map((item, index) => {
            const isActive = pathname === item.href;

            // For scroll links, use regular anchor
            if (item.type === "scroll") {
              const href = pathname !== "/" ? `/${item.href}` : item.href;
              return (
                <NavbarMenuItem key={`${item.label}-${index}`}>
                  <a
                    className={cn(
                      "w-full font-medium text-lg",
                      "text-foreground/70 hover:text-foreground"
                    )}
                    href={href}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                </NavbarMenuItem>
              );
            }

            // For regular links, use i18n Link
            return (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <I18nLink
                  className={cn(
                    "w-full font-medium text-lg",
                    isActive
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                  href={item.href as any}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </I18nLink>
              </NavbarMenuItem>
            );
          })}

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-3 mt-6 pt-6 border-t-2 border-primary/20 w-full">
            <NavbarMenuItem className="w-full list-none">
              <I18nLink
                href="/login"
                className="w-full bg-default-100 dark:bg-default-50 text-foreground font-semibold py-2.5 px-3 rounded-lg hover:bg-default-200 dark:hover:bg-default-100 transition-colors border border-default-200 dark:border-default-100 text-sm block text-center"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                {t("login")}
              </I18nLink>
            </NavbarMenuItem>
            <NavbarMenuItem className="w-full list-none">
              <I18nLink
                href="/signup"
                className="w-full bg-primary text-white font-bold py-2.5 px-3 rounded-lg hover:bg-primary/90 transition-colors shadow-md text-sm block text-center"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                {t("signup")}
              </I18nLink>
            </NavbarMenuItem>
          </div>
        </div>
      </NavbarMenu>
    </HeroNavbar>
  );
};
