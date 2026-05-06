import { getTranslations } from "next-intl/server";

export const PricingHero = async () => {
  const t = await getTranslations();

  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 to-accent/5">
      <div className="max-w-4xl mx-auto px-6 space-y-8 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
          {t("pricing.hero.title")}
        </h1>
        <p className="text-xl text-muted leading-relaxed max-w-3xl mx-auto">
          {t("pricing.hero.subtitle")}
        </p>
      </div>
    </section>
  );
};
