"use client";

import { BarChart3, Calendar, Shield, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureCard } from "@/src/components/ui/FeatureCard";

export function FeaturesSection() {
  const t = useTranslations("home.features");

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: t("patientManagement.title"),
      description: t("patientManagement.description"),
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: t("smartScheduling.title"),
      description: t("smartScheduling.description"),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("hipaaCompliance.title"),
      description: t("hipaaCompliance.description"),
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t("analytics.title"),
      description: t("analytics.description"),
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-default-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
