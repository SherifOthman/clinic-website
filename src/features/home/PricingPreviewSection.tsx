"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Building2, Check, Sparkles, Zap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { Link } from "@/src/i18n/routing";

export function PricingPreviewSection() {
  const t = useTranslations("home");
  const tPricing = useTranslations("pricing");
  const locale = useLocale();
  const [isYearly, setIsYearly] = useState(false);

  const isRTL = locale === "ar";

  const plans = [
    {
      id: "starter",
      name: tPricing("plans.starter.name"),
      description: tPricing("plans.starter.description"),
      price: 29,
      icon: <Sparkles className="w-6 h-6" />,
      features: tPricing.raw("plans.starter.features") || [],
    },
    {
      id: "professional",
      name: tPricing("plans.professional.name"),
      description: tPricing("plans.professional.description"),
      price: 79,
      popular: true,
      icon: <Zap className="w-6 h-6" />,
      features: tPricing.raw("plans.professional.features") || [],
    },
    {
      id: "enterprise",
      name: tPricing("plans.enterprise.name"),
      description: tPricing("plans.enterprise.description"),
      price: 199,
      icon: <Building2 className="w-6 h-6" />,
      features: tPricing.raw("plans.enterprise.features") || [],
    },
  ];

  const calculatePrice = (basePrice: number) => {
    return isYearly ? Math.round(basePrice * 12 * 0.8) : basePrice;
  };

  return (
    <section
      id="pricing"
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Chip color="primary" variant="flat" size="lg" className="mb-6">
            {tPricing("title")}
          </Chip>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
            {t("pricingTitle")}
          </h2>
          <p className="text-xl text-default-600 max-w-2xl mx-auto mb-10">
            {t("pricingDescription")}
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span
              className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-default-500"}`}
            >
              {tPricing("monthly")}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isYearly ? "bg-primary" : "bg-default-300"
              }`}
              role="switch"
              aria-checked={isYearly}
              aria-label="Toggle between monthly and yearly billing"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-default-500"}`}
            >
              {tPricing("yearly")}
            </span>
          </div>
          {isYearly && (
            <p className="text-primary font-semibold text-sm">
              🎉 {tPricing("save")} {tPricing("yearly")}!
            </p>
          )}
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`${
                plan.popular
                  ? "ring-2 ring-primary shadow-xl md:scale-105 z-10"
                  : "hover:shadow-md"
              } bg-content1 relative overflow-hidden transition-all`}
            >
              {plan.popular && (
                <div
                  className={`absolute top-4 z-20 ${isRTL ? "left-4" : "right-4"}`}
                >
                  <Chip
                    color="primary"
                    variant="shadow"
                    className="font-semibold"
                    startContent={<Sparkles className="w-3 h-3" />}
                  >
                    {tPricing("mostPopular")}
                  </Chip>
                </div>
              )}

              <CardBody className="p-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {plan.icon}
                </div>

                {/* Plan name */}
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {plan.name}
                </h3>
                <p className="text-default-600 mb-8 min-h-[48px]">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground">
                      ${calculatePrice(plan.price)}
                    </span>
                    <span className="text-default-500 text-lg">
                      /{isYearly ? tPricing("perYear") : tPricing("perMonth")}
                    </span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-primary font-medium mt-2">
                      {tPricing("save")} ${Math.round(plan.price * 12 * 0.2)}/
                      {tPricing("perYear")}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      </div>
                      <span className="text-default-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  as={Link}
                  href="/signup"
                  color="primary"
                  variant={plan.popular ? "shadow" : "bordered"}
                  size="lg"
                  className="w-full font-semibold"
                >
                  {tPricing("getStarted")}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-default-600 mb-4">
            {tPricing("customPlanQuestion")}
          </p>
          <Button
            as={Link}
            href="/contact"
            color="primary"
            variant="flat"
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
