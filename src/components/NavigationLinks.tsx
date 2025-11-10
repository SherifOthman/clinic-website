"use client";

import Link from "next/link";

import { NAV_LINKS } from "@/src/config/navigation";
import { useActiveLink } from "@/src/hooks/useActiveLink";

const navLabels: Record<string, string> = {
  home: "Home",
  pricing: "Pricing",
  about: "About",
  contact: "Contact",
};

export const NavigationLinks = () => {
  const { isActive } = useActiveLink();

  return (
    <div className="ml-8 hidden justify-start gap-6 lg:flex">
      {NAV_LINKS.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className={`font-medium transition-opacity hover:opacity-80 ${
            isActive(item.href) ? "text-primary" : "text-foreground"
          }`}
        >
          {navLabels[item.key]}
        </Link>
      ))}
    </div>
  );
};
