import { routing } from "@/i18n/routing";
import { CtaSection } from "@/src/core/components/ui/CtaSection";
import {
  AboutSection,
  FeaturesSection,
  HeroSection,
  StatsSection,
  StatsSectionSkeleton,
  TestimonialsSection,
} from "@/src/features/home/components";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection locale={locale} />

      {/*
       * StatsSection and TestimonialsSection fetch from the API.
       * Wrapped in Suspense so:
       *   1. The static shell renders immediately without waiting for the API
       *   2. If the API throws (unreachable), the fallback is shown instead
       *      of breaking the page — and the failure is NOT cached
       */}
      <Suspense fallback={<StatsSectionSkeleton />}>
        <StatsSection locale={locale} />
      </Suspense>

      <FeaturesSection locale={locale} />

      <Suspense fallback={null}>
        <TestimonialsSection locale={locale} />
      </Suspense>

      <AboutSection locale={locale} />
      <CtaSection locale={locale} titleKey="cta.title" subtitleKey="cta.subtitle" variant="accent" />
    </>
  );
}
