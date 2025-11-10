"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

interface PricingCardPreviewProps {
  plan: {
    id: string;
    nameKey: string;
    descriptionKey: string;
    price: number;
    popular?: boolean;
    icon: React.ReactNode;
    featureKeys: string[];
  };
  isYearly: boolean;
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

export function PricingCardPreview({
  plan,
  isYearly,
}: PricingCardPreviewProps) {
  const calculatePrice = (basePrice: number) =>
    isYearly ? Math.round(basePrice * 12 * 0.8) : basePrice;

  return (
    <Card
      className={`${
        plan.popular
          ? "ring-primary z-10 shadow-xl ring-2 md:scale-105"
          : "hover:shadow-md"
      } relative w-full max-w-sm overflow-hidden transition-all`}
    >
      {plan.popular && (
        <div className="absolute top-4 right-4 z-20">
          <Chip color="primary" className="font-semibold">
            <Sparkles className="mr-1 h-3 w-3" />
            Most Popular
          </Chip>
        </div>
      )}

      <CardBody className="p-8 text-start">
        <div className="bg-primary/10 text-primary mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
          {plan.icon}
        </div>

        <h3 className="mb-3 text-2xl font-bold">
          {translations[plan.nameKey]}
        </h3>
        <p className="text-default-500 mb-8 min-h-[48px] leading-relaxed">
          {translations[plan.descriptionKey]}
        </p>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold">
              ${calculatePrice(plan.price)}
            </span>
            <span className="text-default-500 text-lg">
              /{isYearly ? "per year" : "per month"}
            </span>
          </div>
          {isYearly && (
            <p className="text-primary mt-2 text-sm font-medium">
              Save ${Math.round(plan.price * 12 * 0.2)}/year
            </p>
          )}
        </div>

        <ul className="mb-8 flex-grow space-y-3">
          {plan.featureKeys.map((featureKey: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3 text-sm">
              <div className="mt-0.5">
                <Check className="text-primary h-5 w-5 flex-shrink-0" />
              </div>
              <span className="text-foreground/80 leading-relaxed">
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
          size="lg"
          className="w-full font-semibold"
        >
          Get Started
        </Button>
      </CardBody>
    </Card>
  );
}
