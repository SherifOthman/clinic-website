"use client";

import { useTranslations } from "next-intl";

import { NAV_LINKS } from "@/src/config/navigation";
import { useActiveLink } from "@/src/hooks/useActiveLink";
import { Link } from "@/src/i18n/navigation";

export const NavigationLinks = () => {
  const t = useTranslations("navigation");
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
          {t(item.key)}
        </Link>
      ))}
    </div>
  );
};
