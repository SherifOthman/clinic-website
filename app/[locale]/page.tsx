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

export const dynamic = "force-static";

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
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />
    </>
  );
}
