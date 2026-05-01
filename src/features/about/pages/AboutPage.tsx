import { AboutCta } from "@/src/features/about/components/AboutCta";
import { AboutHero } from "@/src/features/about/components/AboutHero";
import { AboutMission } from "@/src/features/about/components/AboutMission";
import { AboutValues } from "@/src/features/about/components/AboutValues";

interface AboutPageProps {
  locale: string;
}

export const AboutPage = async ({ locale }: AboutPageProps) => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutCta locale={locale} />
    </div>
  );
};
