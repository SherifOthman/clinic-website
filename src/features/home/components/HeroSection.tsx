import { HeroContent } from "./HeroContent";
import { HeroImage } from "./HeroImage";

export const HeroSection = () => {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
};
