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

  // getSubscriptionPlans throws on failure (prevents caching empty results).
  // Catch here so the page still renders — PricingPlans shows a graceful empty state.
  let plans: Awaited<ReturnType<typeof getSubscriptionPlans>> = [];
  try {
    plans = await getSubscriptionPlans();
  } catch {
    // API unreachable at build/request time — render empty state
  }

  return (
    <>
      <PricingHero locale={locale} />
      <PricingPlans locale={locale} plans={plans} />
      <PricingFAQ locale={locale} />
      <PricingCTA locale={locale} />
    </>
  );
}
