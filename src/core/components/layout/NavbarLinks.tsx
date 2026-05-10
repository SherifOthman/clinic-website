"use client";

import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";

interface NavItem {
  key: string;
  href: string;
  label: string;
}

interface NavbarLinksProps {
  locale: string;
  items: NavItem[];
}

/**
 * Desktop nav links — client component so usePathname() can highlight the active route.
 * Kept minimal: no state, no effects, just pathname comparison.
 */
export function NavbarLinks({ locale, items }: NavbarLinksProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`);

  return (
    <div className="hidden items-center gap-6 sm:flex">
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.key}
            href={`/${locale}${item.href}`}
            className={`relative text-sm font-medium transition-colors no-underline pb-0.5 ${
              active
                ? "text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-accent"
                : "text-foreground hover:text-accent"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
