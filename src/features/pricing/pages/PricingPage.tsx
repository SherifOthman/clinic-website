import { getSubscriptionPlans } from "@/src/core/utils/serverApi";
import { getTranslations } from "next-intl/server";
import {
  PricingCTA,
  PricingFAQ,
  PricingHero,
  PricingPlans,
} from "../components";

export const PricingPage = async () => {
  const t = await getTranslations();
  const plans = await getSubscriptionPlans();

  return (
    <div className="min-h-screen">
      <PricingHero />
      <PricingPlans plans={plans} />
      <PricingFAQ />
      <PricingCTA />
    </div>
  );
};
