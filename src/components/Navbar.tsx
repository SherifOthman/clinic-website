"use client";

import { Button } from "@heroui/button";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { Logo } from "@/src/components/Logo";
import { NavigationLinks } from "@/src/components/NavigationLinks";
import { ThemeSwitch } from "@/src/components/ThemeSwitch";
import { UserMenu } from "@/src/components/UserMenu";
import { AUTH_LINKS, NAV_LINKS } from "@/src/config/navigation";
import { useActiveLink } from "@/src/hooks/useActiveLink";
import { Link } from "@/src/i18n/navigation";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("navigation");
  const { isActive } = useActiveLink();

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="max-w-fit gap-3">
          <Logo />
        </NavbarBrand>
        <div className="hidden sm:flex ltr:ml-4 rtl:mr-4">
          <NavigationLinks />
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex gap-2">
          <LanguageSwitcher />
          <ThemeSwitch />
          <UserMenu />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="basis-1 sm:hidden ltr:pl-4 rtl:pr-4"
        justify="end"
      >
        <LanguageSwitcher />
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {NAV_LINKS.map((item) => (
            <NavbarMenuItem key={item.key}>
              <Link
                href={item.href}
                className={`w-full text-lg ${
                  isActive(item.href) ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            </NavbarMenuItem>
          ))}

          <div className="border-divider mt-6 flex flex-col gap-3 border-t pt-6">
            {AUTH_LINKS.map((item) => (
              <Button
                key={item.key}
                as={Link}
                href={item.href}
                variant={item.key === "login" ? "bordered" : undefined}
                color={item.key === "signup" ? "primary" : undefined}
                className="w-full"
              >
                {t(item.key)}
              </Button>
            ))}
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
