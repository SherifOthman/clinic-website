import { getTranslations } from "next-intl/server";

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3000";
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3001";

export const HeroContent = async () => {
  const t = await getTranslations();

  return (
    <div className="space-y-8">
      <div className="inline-block rounded-full bg-warning/10 px-4 py-2 text-sm font-medium text-warning">
        🚧 Prototype — full implementation coming soon
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold leading-tight text-foreground lg:text-6xl">
          {t("hero.title")}
        </h1>
        <p className="text-xl leading-relaxed text-muted">
          {t("hero.subtitle")}
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href={`${AUTH_URL}/en/register`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover"
        >
          {t("hero.cta")}
        </a>
        <a
          href={`${AUTH_URL}/en/login`}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent/10"
        >
          {t("navigation.login")}
        </a>
      </div>
    </div>
  );
};
