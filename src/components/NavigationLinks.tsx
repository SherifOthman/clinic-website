import { Link as HeroUILink } from "@heroui/link";
import { useTranslations } from "next-intl";

import { Link, usePathname, useRouter } from "@/src/i18n/routing";

export const NavigationLinks = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("navigation");

  const navigationLinks = [
    { label: t("home"), href: "/" },
    { label: t("pricing"), href: "#pricing", isScroll: true },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ] as const;

  return (
    <div className="ml-8 hidden justify-start gap-6 lg:flex">
      {navigationLinks.map((item, index) => {
        const isActive = pathname === item.href;

        if ("isScroll" in item && item.isScroll) {
          return (
            <HeroUILink
              key={index}
              color="foreground"
              className="cursor-pointer font-medium"
              onClick={() => {
                if (pathname === "/") {
                  // If we're on home page, just scroll to pricing
                  const pricingElement = document.getElementById("pricing");
                  if (pricingElement) {
                    pricingElement.scrollIntoView({ behavior: "smooth" });
                  }
                } else {
                  // If we're on another page, navigate to home first
                  router.push("/");
                  // Then scroll after navigation (with a small delay)
                  setTimeout(() => {
                    const pricingElement = document.getElementById("pricing");
                    if (pricingElement) {
                      pricingElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }
              }}
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
