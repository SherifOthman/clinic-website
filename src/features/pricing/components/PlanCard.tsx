import type { PlanFeature, SubscriptionPlan } from "@/src/core/types";
import { Button, Card, Chip } from "@heroui/react";
import { Check, X } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface PlanCardProps {
  plan: SubscriptionPlan;
  isAr: boolean;
  features: PlanFeature[];
}

export const PlanCard = async ({ plan, isAr, features }: PlanCardProps) => {
  const t = await getTranslations();

  const name = isAr ? plan.nameAr : plan.name;
  const description = isAr ? plan.descriptionAr : plan.description;
  const registerUrl = `/${isAr ? "ar" : "en"}/register`;

  return (
    <Card
      className={`relative flex flex-col ${
        plan.isPopular ? "border-2 border-accent shadow-xl scale-[1.02]" : ""
      }`}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Chip color="accent" variant="primary" className="px-4 font-semibold">
            {t("pricing.popular")}
          </Chip>
        </div>
      )}

      <Card.Header className="p-8 pb-4">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-sm text-muted">{description}</p>
          <div>
            <span className="text-4xl font-bold text-accent">
              ${plan.monthlyFee.toFixed(0)}
            </span>
            <span className="text-sm text-muted ms-1">/ {t("pricing.perMonth")}</span>
          </div>
          {plan.yearlyFee > 0 && (
            <p className="text-xs text-muted">
              ${plan.yearlyFee.toFixed(0)} / year
              {" "}
              <span className="text-success font-medium">
                (save ${((plan.monthlyFee * 12) - plan.yearlyFee).toFixed(0)})
              </span>
            </p>
          )}
        </div>
      </Card.Header>

      <Card.Content className="flex flex-1 flex-col p-8 pt-4">
        <ul className="flex-1 space-y-2.5 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              {feature.included ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              ) : (
                <X className="mt-0.5 h-4 w-4 shrink-0 text-muted/40" />
              )}
              <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted/60"}`}>
                <span className="font-medium">{feature.name}:</span>{" "}
                {feature.value}
              </span>
            </li>
          ))}
        </ul>

        <a href={registerUrl}>
          <Button
            variant={plan.isPopular ? "primary" : "outline"}
            fullWidth
            className="font-semibold"
          >
            {t("pricing.getStarted")}
          </Button>
        </a>
      </Card.Content>
    </Card>
  );
};
