"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Check } from "lucide-react";
import Link from "next/link";

import type { PricingPlan } from "@/src/features/pricing";
import { cn } from "@/src/lib/utils";

interface PricingCardProps {
  plan: PricingPlan;
  isYearly?: boolean;
}

// Translation map for pricing features
const translations: Record<string, string> = {
  "pricing.plans.starter.name": "Starter",
  "pricing.plans.starter.description":
    "Perfect for small practices just getting started",
  "pricing.plans.starter.features.0": "Up to 100 patients",
  "pricing.plans.starter.features.1": "Basic scheduling",
  "pricing.plans.starter.features.2": "Patient records",
  "pricing.plans.starter.features.3": "Email support",
  "pricing.plans.starter.features.4": "Mobile app access",
  "pricing.plans.professional.name": "Professional",
  "pricing.plans.professional.description":
    "Advanced features for growing practices",
  "pricing.plans.professional.features.0": "Up to 1,000 patients",
  "pricing.plans.professional.features.1": "Advanced scheduling",
  "pricing.plans.professional.features.2": "Complete patient management",
  "pricing.plans.professional.features.3": "Analytics & reports",
  "pricing.plans.professional.features.4": "Priority support",
  "pricing.plans.professional.features.5": "API access",
  "pricing.plans.professional.features.6": "Custom forms",
  "pricing.plans.enterprise.name": "Enterprise",
  "pricing.plans.enterprise.description":
    "Full-featured solution for large practices",
  "pricing.plans.enterprise.features.0": "Unlimited patients",
  "pricing.plans.enterprise.features.1": "Multi-location support",
  "pricing.plans.enterprise.features.2": "Advanced analytics",
  "pricing.plans.enterprise.features.3": "Custom integrations",
  "pricing.plans.enterprise.features.4": "Dedicated support",
  "pricing.plans.enterprise.features.5": "White-label options",
  "pricing.plans.enterprise.features.6": "Advanced security",
};

export function PricingCard({ plan, isYearly = false }: PricingCardProps) {
  const displayPrice = isYearly
    ? Math.round(plan.price * 12 * 0.8)
    : plan.price;
  const priceLabel = isYearly ? "per year" : "per month";

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
            Most Popular
          </Chip>
        </div>
      )}
      <CardBody className="p-8 text-start">
        <h3 className="mb-2 text-2xl font-bold">
          {translations[plan.nameKey]}
        </h3>
        <p className="text-default-500 mb-4">
          {translations[plan.descriptionKey]}
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
          {plan.featureKeys.map((featureKey: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
              <span className="text-default-500 text-start text-sm">
                {translations[featureKey]}
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
          Get Started
        </Button>
      </CardBody>
    </Card>
  );
}
