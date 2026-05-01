import { Award, Clock, Shield, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function AboutMission() {
  const t = await getTranslations();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {t("about.mission.title")}
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              {t("about.mission.description")}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-accent">50+</div>
                <div className="text-sm text-muted">{t("about.stats.clinics")}</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-accent">200+</div>
                <div className="text-sm text-muted">{t("about.stats.users")}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 p-8">
                <FeatureTile icon={Clock} label={t("about.features.support247")} />
                <FeatureTile icon={Award} label={t("about.features.qualityCare")} />
                <FeatureTile icon={Shield} label={t("about.features.secureData")} />
                <FeatureTile icon={Users} label={t("about.features.teamWork")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureTile({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <Icon className="h-8 w-8 text-accent mb-2" />
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
}
