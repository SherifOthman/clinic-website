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
    <section className="py-16 bg-content1">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-primary-100 rounded-full">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-default-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
