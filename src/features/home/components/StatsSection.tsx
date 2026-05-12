import { getPublicStats } from "@/src/core/utils/serverApi";
import { cacheLife } from "next/cache";
import { Award, HeartPulse, UserCheck, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { StatItem } from "./StatItem";

interface Props {
  locale: string;
}

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k+`;
  if (n > 0) return `${n}+`;
  return "—";
}

/**
 * 'use cache' — public stats fetched from API, cached per locale.
 * Locale passed as prop so getTranslations doesn't read from headers().
 */
export async function StatsSection({ locale }: Props) {
  "use cache";
  cacheLife("daily");

  const t = await getTranslations({ locale, namespace: "" });
  const data = await getPublicStats();

  const stats = [
    { icon: Users,      value: data ? fmt(data.totalClinics)  : "—", label: t("about.stats.activeClinics") },
    { icon: UserCheck,  value: data ? fmt(data.totalStaff)    : "—", label: t("about.stats.healthcareUsers") },
    { icon: HeartPulse, value: data ? fmt(data.totalPatients) : "—", label: t("about.stats.patientRecords") },
    { icon: Award,      value: "297",                                 label: t("about.stats.passingTests") },
  ];

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
