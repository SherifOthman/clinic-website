import { CTASection } from '@/features/home/components/CTASection';
import { FeaturesSection } from '@/features/home/components/FeaturesSection';
import { HeroSection } from '@/features/home/components/HeroSection';
import { PricingPreviewSection } from '@/features/home/components/PricingPreviewSection';

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
