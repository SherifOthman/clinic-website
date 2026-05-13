import { getPublicStats } from "@/src/core/utils/serverApi";
import { cacheLife } from "next/cache";
import { Award, HeartPulse, UserCheck, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { StatItem } from "./StatItem";

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k+`;
  if (n > 0) return `${n}+`;
  return "—";
}

/**
 * 'use cache' — public stats fetched from API, cached per locale.
 *
 * getPublicStats() throws on failure, which propagates here and prevents
 * this component's output from being cached. The parent Suspense boundary
 * catches the error and renders the fallback instead.
 */
interface Props {
  locale: string;
}

export async function StatsSection({ locale }: Props) {
  "use cache";
  cacheLife("daily");

  const [t, data] = await Promise.all([
    getTranslations({ locale, namespace: "" }),
    getPublicStats(), // throws on failure — prevents null from being cached
  ]);

  const stats = [
    { icon: Users,      value: fmt(data.totalClinics),  label: t("about.stats.activeClinics") },
    { icon: UserCheck,  value: fmt(data.totalStaff),    label: t("about.stats.healthcareUsers") },
    { icon: HeartPulse, value: fmt(data.totalPatients), label: t("about.stats.patientRecords") },
    { icon: Award,      value: "297",                   label: t("about.stats.passingTests") },
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

/**
 * Skeleton shown while StatsSection loads or when the API is unreachable.
 */
export function StatsSectionSkeleton() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="h-14 w-14 animate-pulse rounded-full bg-accent/10" />
              <div className="h-7 w-16 animate-pulse rounded bg-muted/20" />
              <div className="h-4 w-24 animate-pulse rounded bg-muted/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
