"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/navigation";
import { cn } from "@/src/lib/utils";
import { PricingPlan } from "@/src/types";

interface PricingCardProps {
  plan: PricingPlan;
  isYearly?: boolean;
}

export function PricingCard({ plan, isYearly = false }: PricingCardProps) {
  const t = useTranslations("pricing");

  const planData = t.raw(`plans.${plan.id}`);
  const features = planData?.features || [];

  const displayPrice = isYearly
    ? Math.round(plan.price * 12 * 0.8)
    : plan.price;
  const priceLabel = isYearly ? t("perYear") : t("perMonth");

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all",
        plan.popular
          ? "ring-primary scale-105 shadow-xl ring-2"
          : "hover:shadow-md"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-2 -left-8 z-10">
          <Chip
            color="primary"
            className="rotate-[-45deg] px-6 py-1 text-xs font-semibold shadow-lg"
          >
            {t("mostPopular")}
          </Chip>
        </div>
      )}
      <CardBody className="p-8 text-start">
        <h3 className="mb-2 text-2xl font-bold">{planData?.name || plan.id}</h3>
        <p className="text-default-500 mb-4">
          {planData?.description || `Perfect for ${plan.id} practices`}
        </p>
        <div className="mb-6">
          <span className="text-4xl font-bold">${displayPrice}</span>
          <span className="text-default-500">/{priceLabel}</span>
          {isYearly && (
            <div className="mt-2">
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Save ${Math.round(plan.price * 12 * 0.2)}/year
              </span>
            </div>
          )}
        </div>
        <ul className="mb-8 space-y-3">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 flex-shrink-0 text-green-600 ltr:mt-0.5 rtl:mt-0.5 dark:text-green-400" />
              <span className="text-default-500 text-start text-sm">
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
          className="w-full font-semibold"
        >
          {t("getStarted")}
        </Button>
      </CardBody>
    </Card>
  );
}
