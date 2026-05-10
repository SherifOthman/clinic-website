import { NavbarActions } from "@/src/core/components/layout/NavbarActions";
import { NavbarLinks } from "@/src/core/components/layout/NavbarLinks";
import { NavbarMobile } from "@/src/core/components/layout/NavbarMobile";
import { Link } from "@heroui/react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

/**
 * Main navigation bar — server component.
 *
 * Static parts (logo) render on the server.
 * Interactive parts are isolated into small client components:
 *   - NavbarLinks    → desktop nav links with active state (needs usePathname)
 *   - NavbarActions  → login/dashboard button, locale switcher, theme toggle
 *   - NavbarMobile   → hamburger + drawer (needs useState/useEffect)
 */
export async function Navbar() {
  const locale = await getLocale();
  const t = await getTranslations("navigation");

  const menuItems = [
    { key: "home",    href: "/",        label: t("home") },
    { key: "about",   href: "/about",   label: t("about") },
    { key: "pricing", href: "/pricing", label: t("pricing") },
    { key: "contact", href: "/contact", label: t("contact") },
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

            {/* Desktop links — client component for active state */}
            <NavbarLinks locale={locale} items={menuItems} />
          </div>

          {/* Desktop actions (client) + Mobile hamburger (client) */}
          <NavbarActions locale={locale} />
          <NavbarMobile locale={locale} />
        </div>
      </div>
    </nav>
  );
}
