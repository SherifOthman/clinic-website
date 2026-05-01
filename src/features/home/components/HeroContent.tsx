import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { getLocale, getTranslations } from "next-intl/server";

export const HeroContent = async () => {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold leading-tight text-foreground lg:text-6xl">
          {t("hero.title")}
        </h1>
        <p className="text-xl leading-relaxed text-muted">{t("hero.subtitle")}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <CtaButton href={`/${locale}/register`} variant="primary">
          {t("hero.cta")}
        </CtaButton>
        <CtaButton href={`/${locale}/login`} variant="outline">
          {t("navigation.login")}
        </CtaButton>
      </div>
    </div>
  );
};
