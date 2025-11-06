"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
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
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { Logo } from "@/src/components/Logo";
import { NavigationLinks } from "@/src/components/NavigationLinks";
import { ThemeSwitch } from "@/src/components/ThemeSwitch";
import { UserMenu } from "@/src/components/UserMenu";
import { Link as I18nLink, usePathname, useRouter } from "@/src/i18n/routing";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
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
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Logo />
        </NavbarBrand>
        <div className="hidden sm:flex ltr:ml-4 rtl:mr-4">
          <NavigationLinks />
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex gap-2">
          <LanguageSwitcher />
          <ThemeSwitch />
          <UserMenu />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="sm:hidden basis-1 ltr:pl-4 rtl:pr-4"
        justify="end"
      >
        <LanguageSwitcher />
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {mobileMenuLinks.map((item, index) => {
            const isActive = pathname === item.href;

            if ("isScroll" in item && item.isScroll) {
              return (
                <NavbarMenuItem key={index}>
                  <Link
                    color="foreground"
                    size="lg"
                    className="cursor-pointer"
                    onPress={() => {
                      setIsMenuOpen(false);
                      if (pathname === "/") {
                        const pricingElement =
                          document.getElementById("pricing");
                        if (pricingElement) {
                          pricingElement.scrollIntoView({ behavior: "smooth" });
                        }
                      } else {
                        router.push("/");
                        setTimeout(() => {
                          const pricingElement =
                            document.getElementById("pricing");
                          if (pricingElement) {
                            pricingElement.scrollIntoView({
                              behavior: "smooth",
                            });
                          }
                        }, 100);
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              );
            }

            return (
              <NavbarMenuItem key={index}>
                <I18nLink
                  className={isActive ? "text-primary font-semibold" : ""}
                  href={item.href as any}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link
                    color={isActive ? "primary" : "foreground"}
                    size="lg"
                    as="span"
                  >
                    {item.label}
                  </Link>
                </I18nLink>
              </NavbarMenuItem>
            );
          })}

          <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-divider">
            <Button
              variant="bordered"
              as={I18nLink}
              href="/login"
              className="w-full"
            >
              {t("login")}
            </Button>
            <Button
              color="primary"
              as={I18nLink}
              href="/signup"
              className="w-full"
            >
              {t("signup")}
            </Button>
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
