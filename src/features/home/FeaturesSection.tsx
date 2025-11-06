"use client";

import { BarChart3, Calendar, Shield, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureCard } from "@/src/components/FeatureCard";
import { spacing, textStyles } from "@/src/lib/styles";
import { cn } from "@/src/lib/utils";

export function FeaturesSection() {
  const t = useTranslations("home.features");

  const features = [
    {
      Icon: Users,
      title: t("patientManagement.title"),
      description: t("patientManagement.description"),
    },
    {
      Icon: Calendar,
      title: t("smartScheduling.title"),
      description: t("smartScheduling.description"),
    },
    {
      Icon: Shield,
      title: t("hipaaCompliance.title"),
      description: t("hipaaCompliance.description"),
    },
    {
      Icon: BarChart3,
      title: t("analytics.title"),
      description: t("analytics.description"),
    },
  ];

  return (
    <section className={cn(spacing.section, "bg-background")}>
      <div className={spacing.container}>
        <div className="mb-20 text-center">
          <h2 className={cn(textStyles.sectionTitle, "text-foreground")}>
            {t("title")}
          </h2>
          <p className={textStyles.sectionSubtitle}>{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
