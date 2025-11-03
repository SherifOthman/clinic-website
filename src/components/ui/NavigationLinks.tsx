import { NavbarItem } from "@heroui/navbar";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/src/i18n/routing";
import { cn } from "@/src/lib/utils";

export const NavigationLinks = () => {
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const navigationLinks = [
    { label: t("home"), href: "/", type: "link" },
    { label: t("pricing"), href: "#pricing", type: "scroll" },
    { label: t("about"), href: "/about", type: "link" },
    { label: t("contact"), href: "/contact", type: "link" },
  ];

  return (
    <div className="hidden lg:flex gap-6 justify-start ml-8">
      {navigationLinks.map((item) => {
        const isActive = pathname === item.href;

        // For scroll links, use regular anchor
        if (item.type === "scroll") {
          const href = pathname !== "/" ? `/${item.href}` : item.href;
          return (
            <NavbarItem key={item.href}>
              <a
                href={href}
                className={cn(
                  "transition-colors font-medium",
                  "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            </NavbarItem>
          );
        }

        // For regular links, use i18n Link
        return (
          <NavbarItem key={item.href}>
            <Link
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
          </NavbarItem>
        );
      })}
    </div>
  );
};
