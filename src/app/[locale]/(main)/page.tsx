import { setRequestLocale } from "next-intl/server";

import { TestimonialsSection } from "@/src/components/TestimonialsSection";
import { CTASection } from "@/src/features/home/CTASection";
import { FeaturesSection } from "@/src/features/home/FeaturesSection";
import { HeroSection } from "@/src/features/home/HeroSection";
import { PricingPreviewSection } from "@/src/features/home/PricingPreviewSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <HeroSection locale={locale} />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <CTASection />
    </div>
  );
}
