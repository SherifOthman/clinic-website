import { Award, HeartPulse, UserCheck, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface PublicStats {
  totalClinics: number;
  totalPatients: number;
  totalStaff: number;
}

async function getPublicStats(): Promise<PublicStats | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
    const res = await fetch(
      `${apiUrl}/dashboard/stats/public`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k+`;
  if (n > 0) return `${n}+`;
  return "—";
}

export const StatsSection = async () => {
  const t = await getTranslations();
  const data = await getPublicStats();

  const stats = [
    {
      icon: Users,
      value: data ? fmt(data.totalClinics) : "—",
      label: t("about.stats.activeClinics"),
    },
    {
      icon: UserCheck,
      value: data ? fmt(data.totalStaff) : "—",
      label: t("about.stats.healthcareUsers"),
    },
    {
      icon: HeartPulse,
      value: data ? fmt(data.totalPatients) : "—",
      label: t("about.stats.patientRecords"),
    },
    {
      icon: Award,
      value: "297",
      label: t("about.stats.passingTests"),
    },
  ];

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-accent/10 p-4">
                  <stat.icon className="h-8 w-8 text-accent" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
