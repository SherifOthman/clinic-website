"use client";

import { Switch } from "@heroui/switch";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (value: boolean) => void;
}

export function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="mb-4 flex items-center justify-center gap-4">
      <span
        className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-default-500"}`}
      >
        Monthly
      </span>
      <Switch
        isSelected={isYearly}
        onValueChange={onToggle}
        aria-label="Toggle between monthly and yearly billing"
      />
      <span
        className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-default-500"}`}
      >
        Yearly
      </span>
    </div>
  );
}
