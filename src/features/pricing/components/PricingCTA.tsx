import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { getLocale, getTranslations } from "next-intl/server";

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3001";

export const PricingCTA = async () => {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
          {t("pricing.cta.title")}
        </h2>
        <p className="text-xl text-muted">{t("pricing.cta.subtitle")}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <CtaButton href={`${AUTH_URL}/${locale}/register`} variant="primary">
            {t("hero.cta")}
          </CtaButton>
          <CtaButton href={`/${locale}/contact`} variant="outline">
            {t("navigation.contact")}
          </CtaButton>
        </div>
      </div>
    </section>
  );
};
