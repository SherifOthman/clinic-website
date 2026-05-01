import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { getLocale, getTranslations } from "next-intl/server";

export const CTASection = async () => {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <section className="bg-accent py-20 text-accent-foreground">
      <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold lg:text-4xl">{t("cta.title")}</h2>
          <p className="text-xl opacity-90">{t("cta.subtitle")}</p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <CtaButton
            href={`/${locale}/register`}
            className="bg-white text-accent hover:bg-white/90"
          >
            {t("hero.cta")}
          </CtaButton>
          <CtaButton href={`/${locale}/contact`} variant="outline-white">
            {t("navigation.contact")}
          </CtaButton>
        </div>
      </div>
    </section>
  );
};
