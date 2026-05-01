import { AboutFeatureBox } from "@/src/core/components/ui/AboutFeatureBox";
import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { Award, Clock, HeartHandshake, Users } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

/**
 * About section: two-column layout with text on the left
 * and a 2×2 feature box grid on the right.
 */
export const AboutSection = async () => {
  const t = await getTranslations();
  const locale = await getLocale();

  const features = [
    { icon: Clock,         label: t("about.features.support247") },
    { icon: Award,         label: t("about.features.expertTeam") },
    { icon: HeartHandshake, label: t("about.features.qualityCare") },
    { icon: Users,         label: t("about.features.patientFirst") },
  ];

  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Text column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground ltr:text-left rtl:text-right lg:text-4xl">
                {t("about.title")}
              </h2>
              <p className="text-xl font-semibold text-accent ltr:text-left rtl:text-right">
                {t("about.subtitle")}
              </p>
              <p className="leading-relaxed text-muted ltr:text-left rtl:text-right">
                {t("about.description")}
              </p>
            </div>
            <CtaButton href={`/${locale}/login`} variant="outline">
              {t("navigation.login")}
            </CtaButton>
          </div>

          {/* Feature boxes grid */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 to-accent/20 dark:from-primary-900/30 dark:to-primary-800/30">
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="grid grid-cols-2 gap-4">
                  {features.map(({ icon, label }) => (
                    <AboutFeatureBox key={label} icon={icon} label={label} />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
