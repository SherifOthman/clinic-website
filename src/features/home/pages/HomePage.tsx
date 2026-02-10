import {
  AboutSection,
  CTASection,
  FeaturesSection,
  HeroSection,
  StatsSection,
  TestimonialsSection,
} from "../components";

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />
    </div>
  );
};
