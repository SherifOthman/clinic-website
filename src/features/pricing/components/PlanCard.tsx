import type { PlanFeature, SubscriptionPlan } from "@/src/core/types";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface PlanCardProps {
  plan: SubscriptionPlan;
  isPopular?: boolean;
  features: PlanFeature[];
}

export const PlanCard = async ({
  plan,
  isPopular = false,
  features,
}: PlanCardProps) => {
  const t = await getTranslations();

  // Get translated plan name and description
  const getTranslatedPlan = (planName: string) => {
    switch (planName) {
      case "Solo Practice":
        return {
          name: t("pricing.plans.soloPractice.name"),
          description: t("pricing.plans.soloPractice.description"),
        };
      case "Growing Clinic":
        return {
          name: t("pricing.plans.growingClinic.name"),
          description: t("pricing.plans.growingClinic.description"),
        };
      case "Healthcare Network":
        return {
          name: t("pricing.plans.healthcareNetwork.name"),
          description: t("pricing.plans.healthcareNetwork.description"),
        };
      default:
        return {
          name: plan.name,
          description: plan.description,
        };
    }
  };

  const translatedPlan = getTranslatedPlan(plan.name);

  return (
    <Card
      className={`relative ${
        isPopular ? "border-2 border-primary shadow-lg scale-105" : ""
      }`}
    >
      {isPopular && (
        <div className="absolute rtl:top-5 ltr:top-7 rtl:-left-10 ltr:-right-10 rtl:-rotate-45 ltr:rotate-45 z-10">
          <Chip
            color="primary"
            variant="solid"
            className="font-semibold px-8 py-1"
          >
            {t("pricing.popular")}
          </Chip>
        </div>
      )}

      <CardHeader className="pb-2 p-8">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground text-start">
            {translatedPlan.name}
          </h3>
          <p className="text-default-600 text-sm rtl:text-right ltr:text-left">
            {translatedPlan.description}
          </p>
          <div className="space-y-1 text-start">
            <div className="text-4xl font-bold text-primary">${plan.price}</div>
            <div className="text-sm text-default-500">
              {t("pricing.perMonth")}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="pt-4 p-8">
        <div className="space-y-4">
          <ul className="space-y-3">
            {features.map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className="flex items-start gap-3 rtl:flex-row-reverse"
              >
                <Check
                  className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                    feature.included ? "text-success" : "text-default-300"
                  }`}
                />
                <div className="flex-1 rtl:text-right ltr:text-left">
                  <span
                    className={
                      feature.included ? "text-foreground" : "text-default-400"
                    }
                  >
                    {feature.name}: {feature.value}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <Button
            as={Link}
            href="http://localhost:3000/register"
            target="_blank"
            color={isPopular ? "primary" : "default"}
            variant={isPopular ? "solid" : "bordered"}
            size="lg"
            className="w-full font-semibold"
          >
            {t("pricing.getStarted")}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
