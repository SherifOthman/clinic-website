import { HeroContent } from "./HeroContent";
import { HeroImage } from "./HeroImage";

interface Props {
  locale: string;
}

export function HeroSection({ locale }: Props) {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent locale={locale} />
          <HeroImage />
        </div>
      </div>
    </section>
  );
}
