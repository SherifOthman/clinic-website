import { CTASection } from "@/src/features/home/CTASection";
import { FeaturesSection } from "@/src/features/home/FeaturesSection";
import { HeroSection } from "@/src/features/home/HeroSection";
import { PricingPreviewSection } from "@/src/features/home/PricingPreviewSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <PricingPreviewSection />
      <CTASection />
    </div>
  );
}
