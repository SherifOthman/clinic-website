import { SectionHeader } from "@/src/core/components/ui/SectionHeader";
import { Card, CardBody } from "@heroui/card";
import { getTranslations } from "next-intl/server";

export const PricingFAQ = async () => {
  const t = await getTranslations();

  return (
    <section className="py-20 bg-content1">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          title={t("pricing.faq.title")}
          subtitle={t("pricing.faq.subtitle")}
        />

        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardBody className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  {t(`pricing.faq.question${i}`)}
                </h3>
                <p className="text-default-600">
                  {t(`pricing.faq.answer${i}`)}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
