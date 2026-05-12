import { routing } from "@/i18n/routing";
import { CtaSection } from "@/src/core/components/ui/CtaSection";
import { PageHero } from "@/src/core/components/ui/PageHero";
import { PricingFAQ, PricingPlans } from "@/src/features/pricing/components";
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
      <PageHero locale={locale} titleKey="pricing.hero.title" subtitleKey="pricing.hero.subtitle" gradient="bl" />
      <PricingPlans locale={locale} plans={plans} />
      <PricingFAQ locale={locale} />
      <CtaSection locale={locale} titleKey="pricing.cta.title" subtitleKey="pricing.cta.subtitle" variant="plain" />
    </>
  );
}
