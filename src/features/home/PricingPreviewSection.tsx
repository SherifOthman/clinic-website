"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Switch } from "@heroui/switch";
import { Building2, Check, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Link } from "@/src/i18n/navigation";

export function PricingPreviewSection() {
  const t = useTranslations("home");
  const tPricing = useTranslations("pricing");
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: "starter",
      name: tPricing("plans.starter.name"),
      description: tPricing("plans.starter.description"),
      price: 29,
      icon: <Sparkles className="h-6 w-6" />,
      features: tPricing.raw("plans.starter.features") || [],
    },
    {
      id: "professional",
      name: tPricing("plans.professional.name"),
      description: tPricing("plans.professional.description"),
      price: 79,
      popular: true,
      icon: <Zap className="h-6 w-6" />,
      features: tPricing.raw("plans.professional.features") || [],
    },
    {
      id: "enterprise",
      name: tPricing("plans.enterprise.name"),
      description: tPricing("plans.enterprise.description"),
      price: 199,
      icon: <Building2 className="h-6 w-6" />,
      features: tPricing.raw("plans.enterprise.features") || [],
    },
  ];

  const calculatePrice = (basePrice: number) => {
    return isYearly ? Math.round(basePrice * 12 * 0.8) : basePrice;
  };

  return (
    <section
      id="pricing"
      className="bg-background relative overflow-hidden py-24 lg:py-32"
    >
      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Chip variant="flat" className="mb-6 px-4 py-2 text-base">
            {tPricing("title")}
          </Chip>
          <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
            {t("pricingTitle")}
          </h2>
          <p className="text-default-500 mx-auto mb-10 max-w-2xl text-xl">
            {t("pricingDescription")}
          </p>

          <div className="mb-4 flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-default-500"}`}
            >
              {tPricing("monthly")}
            </span>
            <Switch
              isSelected={isYearly}
              onValueChange={setIsYearly}
              aria-label="Toggle between monthly and yearly billing"
            />
            <span
              className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-default-500"}`}
            >
              {tPricing("yearly")}
            </span>
          </div>
          {isYearly && (
            <p className="text-primary text-sm font-semibold">
              🎉 {tPricing("save")} {tPricing("yearly")}!
            </p>
          )}
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`${
                plan.popular
                  ? "ring-primary z-10 shadow-xl ring-2 md:scale-105"
                  : "hover:shadow-md"
              } relative w-full max-w-sm overflow-hidden transition-all`}
            >
              {plan.popular && (
                <div className="absolute top-4 z-20 ltr:right-4 rtl:left-4">
                  <Chip color="primary" className="font-semibold">
                    <Sparkles className="h-3 w-3 ltr:mr-1 rtl:ml-1" />
                    {tPricing("mostPopular")}
                  </Chip>
                </div>
              )}

              <CardBody className="p-8 text-start">
                <div className="bg-primary/10 text-primary mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
                  {plan.icon}
                </div>

                <h3 className="mb-3 text-2xl font-bold">{plan.name}</h3>
                <p className="text-default-500 mb-8 min-h-[48px] leading-relaxed">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">
                      ${calculatePrice(plan.price)}
                    </span>
                    <span className="text-default-500 text-lg">
                      /{isYearly ? tPricing("perYear") : tPricing("perMonth")}
                    </span>
                  </div>
                  {isYearly && (
                    <p className="text-primary mt-2 text-sm font-medium">
                      {tPricing("save")} ${Math.round(plan.price * 12 * 0.2)}/
                      {tPricing("perYear")}
                    </p>
                  )}
                </div>

                <ul className="mb-8 flex-grow space-y-3">
                  {plan.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 ltr:mr-0 rtl:ml-0">
                        <Check className="text-primary h-5 w-5 flex-shrink-0" />
                      </div>
                      <span className="text-foreground/80 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  as={Link}
                  href="/signup"
                  color={plan.popular ? "primary" : "default"}
                  variant={plan.popular ? "solid" : "bordered"}
                  size="lg"
                  className="w-full font-semibold"
                >
                  {tPricing("getStarted")}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-default-500 mb-4">
            {tPricing("customPlanQuestion")}
          </p>
          <Button
            as={Link}
            href="/contact"
            variant="bordered"
            size="lg"
            className="font-semibold"
          >
            {tPricing("contactSales")}
          </Button>
        </div>
      </div>
    </section>
  );
}
