"use client";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

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
  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      price: "$29",
      period: "/month",
      features: [
        "Up to 100 patients",
        "Basic scheduling",
        "Patient records",
        "Email support",
        "Mobile app access",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: "$79",
      period: "/month",
      popular: true,
      features: [
        "Up to 1,000 patients",
        "Advanced scheduling",
        "Complete patient management",
        "Analytics & reports",
        "Priority support",
        "API access",
        "Custom forms",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$199",
      period: "/month",
      features: [
        "Unlimited patients",
        "Multi-location support",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated support",
        "White-label options",
        "Advanced security",
      ],
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-xl font-bold md:text-2xl">Choose Your Plan</h2>
        <p className="text-default-500 mx-auto max-w-3xl text-sm md:text-base">
          Select the plan that best fits your practice needs
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            isPressable
            onPress={() => onPlanSelect(plan.id)}
            className={`relative h-full transition-all duration-200 hover:scale-[1.02] ${
              selectedPlan === plan.id
                ? "border-primary bg-primary/5 ring-primary/20 border-2 shadow-xl ring-4"
                : "hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 transform">
                <Chip
                  color="primary"
                  className="px-3 text-xs font-bold shadow-lg"
                >
                  Most Popular
                </Chip>
              </div>
            )}

            <CardBody className="flex h-full flex-col p-5 text-center md:p-6">
              <div className="mb-4">
                <h3 className="mb-2 text-lg font-bold md:text-xl">
                  {plan.name}
                </h3>
                <div className="mb-4 flex items-baseline justify-center gap-1">
                  <span className="text-primary text-2xl font-bold md:text-3xl">
                    {plan.price}
                  </span>
                  <span className="text-default-500 text-sm">
                    {plan.period}
                  </span>
                </div>

                <div className="mb-4 flex justify-center">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                      selectedPlan === plan.id
                        ? "bg-primary border-primary scale-110"
                        : "border-divider"
                    }`}
                  >
                    {selectedPlan === plan.id && (
                      <div className="h-2.5 w-2.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>

              <ul className="flex-grow space-y-2 text-left">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-foreground/80 flex items-start gap-2 text-sm"
                  >
                    <span className="text-primary mt-0.5 flex-shrink-0 font-bold">
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
