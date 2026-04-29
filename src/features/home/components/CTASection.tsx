import { Button } from "@heroui/react";
import { Link } from "@heroui/react";
import { getLocale, getTranslations } from "next-intl/server";

export const CTASection = async () => {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <section className="py-20 bg-accent text-accent-foreground">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold">{t("cta.title")}</h2>
          <p className="text-xl opacity-90">{t("cta.subtitle")}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="http://localhost:3000/register" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover">
            {t("hero.cta")}
          </a>
          <a href="#" className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent/10">
            {t("navigation.contact")}
          </a>
        </div>
      </div>
    </section>
  );
};
