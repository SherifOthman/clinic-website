"use client";

import {
  PricingCTA,
  PricingHeader,
  PricingList,
  PricingToggle,
} from "@/src/features/pricing";
import { Building2, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

export function PricingPreviewSection() {
  const [isYearly, setIsYearly] = useState(false);

  // Mock data - will be replaced with database fetch
  // TODO: Replace with: const plans = await getPricingPlans();
  const plans = [
    {
      id: "starter",
      nameKey: "pricing.plans.starter.name",
      descriptionKey: "pricing.plans.starter.description",
      price: 29,
      icon: <Sparkles className="h-6 w-6" />,
      featureKeys: [
        "pricing.plans.starter.features.0",
        "pricing.plans.starter.features.1",
        "pricing.plans.starter.features.2",
        "pricing.plans.starter.features.3",
        "pricing.plans.starter.features.4",
      ],
    },
    {
      id: "professional",
      nameKey: "pricing.plans.professional.name",
      descriptionKey: "pricing.plans.professional.description",
      price: 79,
      popular: true,
      icon: <Zap className="h-6 w-6" />,
      featureKeys: [
        "pricing.plans.professional.features.0",
        "pricing.plans.professional.features.1",
        "pricing.plans.professional.features.2",
        "pricing.plans.professional.features.3",
        "pricing.plans.professional.features.4",
        "pricing.plans.professional.features.5",
        "pricing.plans.professional.features.6",
      ],
    },
    {
      id: "enterprise",
      nameKey: "pricing.plans.enterprise.name",
      descriptionKey: "pricing.plans.enterprise.description",
      price: 199,
      icon: <Building2 className="h-6 w-6" />,
      featureKeys: [
        "pricing.plans.enterprise.features.0",
        "pricing.plans.enterprise.features.1",
        "pricing.plans.enterprise.features.2",
        "pricing.plans.enterprise.features.3",
        "pricing.plans.enterprise.features.4",
        "pricing.plans.enterprise.features.5",
        "pricing.plans.enterprise.features.6",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="bg-background relative overflow-hidden py-24 lg:py-32"
    >
      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-8">
        <PricingHeader />

        <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />
        {isYearly && (
          <p className="text-primary text-center text-sm font-semibold">
            🎉 Save 20% Yearly!
          </p>
        )}

        <div className="mt-8">
          <PricingList plans={plans} isYearly={isYearly} />
        </div>

        <PricingCTA />
      </div>
    </section>
  );
}
