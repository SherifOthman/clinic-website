import { Link as HeroUILink } from "@heroui/link";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/src/i18n/routing";

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

        if ("isScroll" in item && item.isScroll) {
          const href = pathname !== "/" ? `/${item.href}` : item.href;
          return (
            <HeroUILink
              key={index}
              href={href}
              color="foreground"
              className="font-medium"
            >
              {item.label}
            </HeroUILink>
          );
        }

        return (
          <Link key={index} href={item.href as any}>
            <HeroUILink
              color={isActive ? "primary" : "foreground"}
              className={isActive ? "font-semibold" : "font-medium"}
              as="span"
            >
              {item.label}
            </HeroUILink>
          </Link>
        );
      })}
    </div>
  );
};
