import { FeatureCard } from "@/src/core/components/ui/FeatureCard";
import { SectionHeader } from "@/src/core/components/ui/SectionHeader";
import { Clock, Eye, Heart, Stethoscope, UserCheck, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const FeaturesSection = async () => {
  const t = await getTranslations();

  const features = [
    {
      icon: Stethoscope,
      title: t("features.patientManagement.title"),
      description: t("features.patientManagement.description"),
    },
    {
      icon: Users,
      title: t("features.userManagement.title"),
      description: t("features.userManagement.description"),
    },
    {
      icon: Eye,
      title: t("features.locationServices.title"),
      description: t("features.locationServices.description"),
    },
    {
      icon: Clock,
      title: t("features.onboarding.title"),
      description: t("features.onboarding.description"),
    },
    {
      icon: Heart,
      title: t("features.fileManagement.title"),
      description: t("features.fileManagement.description"),
    },
    {
      icon: UserCheck,
      title: t("features.dataManagement.title"),
      description: t("features.dataManagement.description"),
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title={t("features.title")}
          subtitle={t("features.subtitle")}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
