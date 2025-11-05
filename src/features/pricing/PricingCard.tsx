"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";
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
          ? "ring-2 ring-primary shadow-xl scale-105"
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
      <CardBody className="p-8">
        <h3 className="text-2xl font-bold mb-2">{planData?.name || plan.id}</h3>
        <p className="text-muted-foreground mb-4">
          {planData?.description || `Perfect for ${plan.id} practices`}
        </p>
        <div className="mb-6">
          <span className="text-4xl font-bold">${displayPrice}</span>
          <span className="text-muted-foreground">/{priceLabel}</span>
          {isYearly && (
            <div className="mt-2">
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                Save ${Math.round(plan.price * 12 * 0.2)}/year
              </span>
            </div>
          )}
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="text-muted-foreground text-sm">{feature}</span>
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
