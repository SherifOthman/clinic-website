import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { getLocale, getTranslations } from "next-intl/server";

export const CTASection = async () => {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold">{t("cta.title")}</h2>
          <p className="text-xl opacity-90">{t("cta.subtitle")}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            as={Link}
            href="http://localhost:3000/register"
            target="_blank"
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 font-semibold"
          >
            {t("hero.cta")}
          </Button>
          <Button
            as={Link}
            href={`/${locale}/contact`}
            variant="bordered"
            size="lg"
            className="font-semibold border-white text-white hover:bg-white hover:text-primary"
          >
            {t("navigation.contact")}
          </Button>
        </div>
      </div>
    </section>
  );
};
