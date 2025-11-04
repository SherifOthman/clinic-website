import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/src/i18n/routing";
import { cn } from "@/src/lib/utils";

export const NavigationLinks = () => {
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const navigationLinks = [
    { label: t("home"), href: "/" },
    { label: t("pricing"), href: "#pricing", isScroll: true },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ] as const;

  return (
    <div className="hidden lg:flex gap-6 justify-start ml-8">
      {navigationLinks.map((item, index) => {
        const isActive = pathname === item.href;

        if (item.isScroll) {
          const href = pathname !== "/" ? `/${item.href}` : item.href;
          return (
            <a
              key={index}
              href={href}
              className="transition-colors font-medium text-foreground/70 hover:text-foreground"
            >
              {item.label}
            </a>
          );
        }

        return (
          <Link
            key={index}
            href={item.href as any}
            className={cn(
              "transition-colors font-medium",
              isActive
                ? "text-primary font-semibold"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};
