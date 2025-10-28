import { CheckIcon } from "@/components/icons";
import { UI } from "@/lib/constants";
import { SubscriptionPlan } from "@/types";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";

interface PricingCardProps {
  plan: SubscriptionPlan;
  isAnnual: boolean;
  isSelected: boolean;
  onSelect: (planId: string) => void;
}

export function PricingCard({
  plan,
  isAnnual,
  isSelected,
  onSelect,
}: PricingCardProps) {
  const getPrice = (price: number) => {
    return isAnnual ? Math.round(price * UI.PRICING_DISCOUNT) : price;
  };

  const getPlanDescription = (doctorLimit: number) => {
    if (doctorLimit === 2) return "small practices";
    if (doctorLimit === 10) return "growing clinics";
    return "large organizations";
  };

  return (
    <Card
      className={`relative h-full transition-all duration-300 hover:scale-105 overflow-hidden ${
        plan.isPopular
          ? "border-2 border-primary shadow-2xl shadow-primary/20"
          : "hover:shadow-xl"
      }`}
    >
      {plan.isPopular && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-primary text-white text-xs font-bold py-1 px-8 transform -rotate-45 -translate-x-6 translate-y-4 shadow-lg">
            🔥 Most Popular
          </div>
        </div>
      )}

      <CardBody className="p-8">
        {/* Plan Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <div className="mb-4">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-primary">
                ${getPrice(plan.price)}
              </span>
              <span className="text-default-500">
                /{isAnnual ? "month" : "month"}
              </span>
            </div>
            {isAnnual && (
              <p className="text-sm text-success mt-1">
                Billed annually (${getPrice(plan.price) * 12}/year)
              </p>
            )}
          </div>
          <div className="text-sm text-default-600 space-y-1">
            <p>Perfect for {getPlanDescription(plan.doctorLimit)}</p>
            <p className="font-medium">
              Up to {plan.doctorLimit} doctors •{" "}
              {plan.appointmentLimit.toLocaleString()} appointments/month
            </p>
          </div>
        </div>

        <Divider className="mb-6" />

        {/* Features List */}
        <div className="flex-1 mb-8">
          <h4 className="font-semibold mb-4 text-default-700">
            Everything included:
          </h4>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckIcon className="text-success w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-default-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <Button
          color="primary"
          variant={plan.isPopular ? "solid" : "bordered"}
          size="lg"
          className="w-full font-semibold"
          onPress={() => onSelect(plan.id)}
          isLoading={isSelected}
        >
          {plan.price === 0 ? "Start Free Trial" : "Start 14-Day Free Trial"}
        </Button>

        <p className="text-xs text-center text-default-500 mt-3">
          No credit card required • Cancel anytime
        </p>
      </CardBody>
    </Card>
  );
}
