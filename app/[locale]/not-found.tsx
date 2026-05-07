import { Link } from "@heroui/react";
import { HeartHandshake } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations();

  const links = [
    { href: `/${locale}`,         label: t("navigation.home") },
    { href: `/${locale}/about`,   label: t("navigation.about") },
    { href: `/${locale}/pricing`, label: t("navigation.pricing") },
    { href: `/${locale}/contact`, label: t("navigation.contact") },
  ];

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">

      {/* Large 404 with icon overlay */}
      <div className="relative mb-8 select-none">
        <span className="text-[9rem] font-black leading-none text-border/30 sm:text-[13rem]">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 sm:h-24 sm:w-24">
            <HeartHandshake className="h-10 w-10 text-accent sm:h-12 sm:w-12" />
          </div>
        </div>
      </div>

      {/* Message */}
      <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
        {t("notFound.title")}
      </h1>
      <p className="mb-10 max-w-md text-muted">
        {t("notFound.subtitle")}
      </p>

      {/* Action buttons — plain <a> tags styled as buttons */}
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <a
          href={`/${locale}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover"
        >
          {t("notFound.goHome")}
        </a>
        <a
          href="javascript:history.back()"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-secondary"
        >
          {t("notFound.goBack")}
        </a>
      </div>

      {/* Quick nav links */}
      <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className="transition-colors hover:text-accent">
            {label}
          </Link>
        ))}
      </div>

    </div>
  );
}
