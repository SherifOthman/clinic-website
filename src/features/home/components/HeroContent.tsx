import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { getTranslations } from "next-intl/server";

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3001";

/**
 * Left column of the hero section: headline, subtitle, and CTA buttons.
 */
export const HeroContent = async () => {
  const t = await getTranslations();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold leading-tight text-foreground lg:text-6xl">
          {t("hero.title")}
        </h1>
        <p className="text-xl leading-relaxed text-muted">{t("hero.subtitle")}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <CtaButton href={`${AUTH_URL}/en/register`} variant="primary">
          {t("hero.cta")}
        </CtaButton>
        <CtaButton href={`${AUTH_URL}/en/login`} variant="outline">
          {t("navigation.login")}
        </CtaButton>
      </div>
    </div>
  );
};
