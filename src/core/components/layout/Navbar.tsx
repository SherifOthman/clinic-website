"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Globe, HeartHandshake } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "pricing", href: "/pricing" },
    { key: "contact", href: "/contact" },
  ];

  const switchLocale = (newLocale: string) => {
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  return (
    <HeroNavbar
      onMenuOpenChange={setIsMenuOpen}
      className="border-b border-divider"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex items-center gap-6">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <HeartHandshake className="h-8 w-8 text-primary" />
            <p className="font-bold text-xl text-inherit">ClinicCare</p>
          </Link>

          {/* Navigation items directly next to logo */}
          <div className="hidden sm:flex gap-4">
            {menuItems.map((item) => {
              const isActive =
                pathname === `/${locale}${item.href}` ||
                (item.href === "/" && pathname === `/${locale}`);

              return (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={`transition-colors ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </div>
        </NavbarBrand>

        {/* Remove the separate navigation div */}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button
            variant="light"
            size="sm"
            startContent={<Globe className="h-4 w-4" />}
            onClick={() => switchLocale(locale === "en" ? "ar" : "en")}
          >
            {locale === "en" ? "العربية" : "English"}
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            color="primary"
            href="http://localhost:3001/login"
            target="_blank"
          >
            {t("login")}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => {
          const isActive =
            pathname === `/${locale}${item.href}` ||
            (item.href === "/" && pathname === `/${locale}`);

          return (
            <NavbarMenuItem key={item.key}>
              <Link
                href={`/${locale}${item.href}`}
                className={`w-full transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
                size="lg"
              >
                {t(item.key)}
              </Link>
            </NavbarMenuItem>
          );
        })}
        <NavbarMenuItem>
          <Button
            as={Link}
            href="http://localhost:3001/login"
            target="_blank"
            color="primary"
            className="w-full font-semibold"
            size="lg"
          >
            {t("login")}
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            size="sm"
            variant="light"
            startContent={<Globe className="h-4 w-4" />}
            onClick={() => switchLocale(locale === "en" ? "ar" : "en")}
            className="w-full justify-start"
          >
            {locale === "en" ? "العربية" : "English"}
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
};
