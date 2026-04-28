import { Award, HeartHandshake, UserCheck, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const StatsSection = async () => {
  const t = await getTranslations();

  const stats = [
    { icon: Users, value: "50+", label: t("about.stats.activeClinics") },
    { icon: UserCheck, value: "200+", label: t("about.stats.healthcareUsers") },
    { icon: Award, value: "297", label: t("about.stats.passingTests") },
    {
      icon: HeartHandshake,
      value: "1,000+",
      label: t("about.stats.patientRecords"),
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
