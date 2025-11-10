"use client";

import { PricingCardPreview } from "./PricingCardPreview";

interface PricingListProps {
  plans: Array<{
    id: string;
    nameKey: string;
    descriptionKey: string;
    price: number;
    popular?: boolean;
    icon: React.ReactNode;
    featureKeys: string[];
  }>;
  isYearly: boolean;
}

export function PricingList({ plans, isYearly }: PricingListProps) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <PricingCardPreview key={plan.id} plan={plan} isYearly={isYearly} />
      ))}
    </div>
  );
}
