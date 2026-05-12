import { FeatureCard } from "@/src/core/components/ui/FeatureCard";
import { SectionHeader } from "@/src/core/components/ui/SectionHeader";
import { cacheLife } from "next/cache";
import {
  BarChart3,
  CalendarClock,
  ClipboardList,
  FileText,
  HeartPulse,
  MapPin,
  Package,
  Shield,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

interface Props {
  locale: string;
}

/**
 * 'use cache' — pure translation output, cached per locale.
 * Locale passed as prop so getTranslations doesn't read from headers().
 */
export async function FeaturesSection({ locale }: Props) {
  "use cache";
  cacheLife("daily");

  const t = await getTranslations({ locale, namespace: "" });

  const features = [
    { icon: HeartPulse,   title: t("features.patientManagement.title"),  description: t("features.patientManagement.description"),  soon: false },
    { icon: Users,        title: t("features.userManagement.title"),      description: t("features.userManagement.description"),      soon: false },
    { icon: MapPin,       title: t("features.locationServices.title"),    description: t("features.locationServices.description"),    soon: false },
    { icon: ClipboardList,title: t("features.onboarding.title"),          description: t("features.onboarding.description"),          soon: false },
    { icon: Shield,       title: t("features.dataManagement.title"),      description: t("features.dataManagement.description"),      soon: false },
    { icon: CalendarClock,title: t("features.appointments.title"),        description: t("features.appointments.description"),        soon: false },
    { icon: FileText,     title: t("features.fileManagement.title"),      description: t("features.fileManagement.description"),      soon: true  },
    { icon: BarChart3,    title: t("features.reporting.title"),           description: t("features.reporting.description"),           soon: true  },
    { icon: Package,      title: t("features.inventory.title"),           description: t("features.inventory.description"),           soon: true  },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          title={t("features.title")}
          subtitle={t("features.subtitle")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
