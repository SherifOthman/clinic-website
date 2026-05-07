import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { getTranslations } from "next-intl/server";

interface AboutCtaProps {
  locale: string;
}

export async function AboutCta({ locale }: AboutCtaProps) {
  const t = await getTranslations();

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
          {t("about.cta.title")}
        </h2>
        <p className="text-xl text-muted">{t("about.cta.subtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CtaButton href={`/${locale}/register`} variant="primary">
            {t("hero.cta")}
          </CtaButton>
          <CtaButton href={`/${locale}/contact`} variant="outline">
            {t("navigation.contact")}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
