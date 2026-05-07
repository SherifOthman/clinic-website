import { routing } from "@/i18n/routing";
import {
  PricingCTA,
  PricingFAQ,
  PricingHero,
  PricingPlans,
} from "@/src/features/pricing/components";
import { getSubscriptionPlans } from "@/src/core/utils/serverApi";
import { setRequestLocale } from "next-intl/server";

// Revalidate every hour — plans don't change often
export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const plans = await getSubscriptionPlans();

  return (
    <>
      <PricingHero />
      <PricingPlans plans={plans} />
      <PricingFAQ />
      <PricingCTA />
    </>
  );
}
