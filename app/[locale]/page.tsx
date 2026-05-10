import { routing } from "@/i18n/routing";
import {
  AboutSection,
  CTASection,
  FeaturesSection,
  HeroSection,
  StatsSection,
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
      <StatsSection locale={locale} />
      <FeaturesSection locale={locale} />
      {/*
        TestimonialsSection has 'use cache' and fetches from the API.
        Suspense lets the static shell render immediately while the
        cached testimonials stream in.
      */}
      <Suspense>
        <TestimonialsSection locale={locale} />
      </Suspense>
      <AboutSection locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}
