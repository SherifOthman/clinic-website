import {
  CTASection,
  FeaturesSection,
  HeroSection,
  PricingPreviewSection,
  TestimonialsSection,
} from "@/src/features/home";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <CTASection />
    </div>
  );
}
