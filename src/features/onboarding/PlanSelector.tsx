"use client";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { useLocale, useTranslations } from "next-intl";

interface Plan {
  id: "starter" | "professional" | "enterprise";
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
}

interface PlanSelectorProps {
  selectedPlan: "starter" | "professional" | "enterprise";
  onPlanSelect: (plan: "starter" | "professional" | "enterprise") => void;
}

export const PlanSelector = ({
  selectedPlan,
  onPlanSelect,
}: PlanSelectorProps) => {
  const t = useTranslations("pricing.plans");
  const tOnboarding = useTranslations("onboarding.step1");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const plans: Plan[] = [
    {
      id: "starter",
      name: t("starter.name"),
      price: t("starter.price"),
      period: t("starter.period"),
      features: [
        t("starter.features.0"),
        t("starter.features.1"),
        t("starter.features.2"),
        t("starter.features.3"),
        t("starter.features.4"),
      ],
    },
    {
      id: "professional",
      name: t("professional.name"),
      price: t("professional.price"),
      period: t("professional.period"),
      popular: true,
      features: [
        t("professional.features.0"),
        t("professional.features.1"),
        t("professional.features.2"),
        t("professional.features.3"),
        t("professional.features.4"),
        t("professional.features.5"),
        t("professional.features.6"),
      ],
    },
    {
      id: "enterprise",
      name: t("enterprise.name"),
      price: t("enterprise.price"),
      period: t("enterprise.period"),
      features: [
        t("enterprise.features.0"),
        t("enterprise.features.1"),
        t("enterprise.features.2"),
        t("enterprise.features.3"),
        t("enterprise.features.4"),
        t("enterprise.features.5"),
        t("enterprise.features.6"),
      ],
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          {tOnboarding("title")}
        </h2>
        <p className="text-sm md:text-base text-default-500 max-w-3xl mx-auto">
          {tOnboarding("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] relative h-full ${
              selectedPlan === plan.id
                ? "border-2 border-primary bg-primary/5 shadow-xl ring-4 ring-primary/20"
                : "hover:border-primary/40 hover:shadow-lg hover:bg-primary/5"
            }`}
            onClick={() => onPlanSelect(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Chip
                  color="primary"
                  className="text-xs font-bold px-3 shadow-lg"
                >
                  Most Popular
                </Chip>
              </div>
            )}

            <CardBody className="p-5 md:p-6 text-center flex flex-col h-full">
              <div className="mb-4">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-sm text-default-500">
                    {plan.period}
                  </span>
                </div>

                <div className="flex justify-center mb-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedPlan === plan.id
                        ? "bg-primary border-primary scale-110"
                        : "border-divider"
                    }`}
                  >
                    {selectedPlan === plan.id && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              </div>

              <ul
                className={`space-y-2 flex-grow ${isRTL ? "text-right" : "text-left"}`}
              >
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`text-foreground/80 flex items-start gap-2 text-sm ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <span className="text-primary font-bold mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
