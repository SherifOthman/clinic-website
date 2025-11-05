import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/about": "/about",
    "/contact": "/contact",
    "/pricing": "/pricing",
    "/dashboard": "/dashboard",
    "/login": "/login",
    "/signup": "/signup",
    "/onboarding": "/onboarding",
    "/settings": "/settings",
    "/profile": "/profile",
    "/help": "/help",
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

