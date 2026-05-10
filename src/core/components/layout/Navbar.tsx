import { NavbarActions } from "@/src/core/components/layout/NavbarActions";
import { NavbarMobile } from "@/src/core/components/layout/NavbarMobile";
import { Link } from "@heroui/react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

/**
 * Main navigation bar — server component.
 *
 * Static parts (logo, desktop nav links) render on the server.
 * Interactive parts are isolated into small client components:
 *   - NavbarActions  → login/dashboard button, locale switcher, theme toggle
 *   - NavbarMobile   → hamburger + drawer (needs useState/useEffect)
 */
export async function Navbar() {
  const locale = await getLocale();
  const t = await getTranslations("navigation");

  const menuItems = [
    { key: "home",    href: "/" },
    { key: "about",   href: "/about" },
    { key: "pricing", href: "/pricing" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo + Desktop nav links */}
          <div className="flex items-center gap-8">
            <Link href={`/${locale}`} className="flex items-center gap-2 no-underline">
              <Image src="/logo.svg" alt="ClinicCare" width={28} height={28} priority />
              <span className="text-lg font-bold text-foreground">ClinicCare</span>
            </Link>

            {/* Desktop links — static, rendered on server */}
            <div className="hidden items-center gap-6 sm:flex">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className="text-sm text-foreground hover:text-accent transition-colors no-underline"
                >
                  {t(item.key as any)}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop actions (client) + Mobile hamburger (client) */}
          <NavbarActions locale={locale} />
          <NavbarMobile locale={locale} />
        </div>
      </div>
    </nav>
  );
}
