import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";

interface Props {
  locale: string;
}

/**
 * 'use cache' — pure translation output, cached per locale.
 * Locale passed as prop so getTranslations doesn't read from headers().
 */
export async function HeroContent({ locale }: Props) {
  "use cache";
  cacheLife("daily");

  const t = await getTranslations({ locale, namespace: "" });

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
}
