import { routing } from "@/i18n/routing";
import {
  PricingCTA,
  PricingFAQ,
  PricingHero,
  PricingPlans,
} from "@/src/features/pricing/components";
import { getSubscriptionPlans } from "@/src/core/utils/serverApi";
import { setRequestLocale } from "next-intl/server";

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

  // getSubscriptionPlans has 'use cache' — result is cached, not re-fetched per request
  const plans = await getSubscriptionPlans();

  return (
    <>
      <PricingHero locale={locale} />
      <PricingPlans locale={locale} plans={plans} />
      <PricingFAQ locale={locale} />
      <PricingCTA locale={locale} />
    </>
  );
}
