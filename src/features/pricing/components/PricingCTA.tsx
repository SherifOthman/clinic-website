import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { getTranslations } from "next-intl/server";

export const PricingCTA = async () => {
  const t = await getTranslations();

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
          {t("pricing.cta.title")}
        </h2>
        <p className="text-xl text-default-600">{t("pricing.cta.subtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            as={Link}
            href="http://localhost:3000/register"
            target="_blank"
            color="primary"
            size="lg"
            className="font-semibold"
          >
            {t("hero.cta")}
          </Button>
          <Button
            as={Link}
            href="/contact"
            variant="bordered"
            size="lg"
            className="font-semibold"
          >
            {t("navigation.contact")}
          </Button>
        </div>
      </div>
    </section>
  );
};
