import { getTranslations } from "next-intl/server";

export const PricingHero = async () => {
  const t = await getTranslations();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40">
      <div className="max-w-4xl mx-auto px-6 space-y-8 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
          Affordable Plans for Every Practice
        </h1>
        <p className="text-xl text-default-600 leading-relaxed max-w-3xl mx-auto">
          Start managing your clinic more efficiently today. From solo
          practitioners to large healthcare networks, we have the perfect
          solution to streamline your operations and grow your practice.
        </p>
      </div>
    </section>
  );
};
