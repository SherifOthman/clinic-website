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
import Link from "next/link";
import { useState } from "react";

import { AUTH_LINKS, NAV_LINKS } from "@/src/config/navigation";
import { useActiveLink } from "@/src/hooks/useActiveLink";
import { Logo } from "./Logo";
import { NavigationLinks } from "./NavigationLinks";
import { ThemeSwitch } from "./ThemeSwitch";
import { UserMenu } from "./UserMenu";

const navLabels: Record<string, string> = {
  home: "Home",
  pricing: "Pricing",
  about: "About",
  contact: "Contact",
  login: "Login",
  signup: "Get Started",
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isActive } = useActiveLink();

  // TODO: Implement user state management
  const user = null;

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
        <div className="ml-4 hidden sm:flex">
          <NavigationLinks />
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex gap-2">
          <ThemeSwitch />
          <UserMenu user={user} />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
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
                {navLabels[item.key]}
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
                {navLabels[item.key]}
              </Button>
            ))}
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
