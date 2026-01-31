import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Award, Clock, HeartHandshake, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const AboutSection = async () => {
  const t = await getTranslations();

  return (
    <section className="py-20 bg-content1">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground rtl:text-right ltr:text-left">
                {t("about.title")}
              </h2>
              <p className="text-xl text-primary font-semibold rtl:text-right ltr:text-left">
                {t("about.subtitle")}
              </p>
              <p className="text-default-600 leading-relaxed rtl:text-right ltr:text-left">
                {t("about.description")}
              </p>
            </div>
            <Button
              as={Link}
              href="http://localhost:3000/login"
              target="_blank"
              color="primary"
              variant="bordered"
              size="lg"
            >
              {t("navigation.login")}
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="bg-white dark:bg-content1 p-4 rounded-lg shadow-sm transform hover:scale-105 transition-transform flex flex-col items-center">
                    <Clock className="h-8 w-8 text-primary mb-2" />
                    <div className="text-sm font-semibold text-center">
                      {t("about.features.support247")}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-content1 p-4 rounded-lg shadow-sm transform hover:scale-105 transition-transform flex flex-col items-center">
                    <Award className="h-8 w-8 text-primary mb-2" />
                    <div className="text-sm font-semibold text-center">
                      {t("about.features.expertTeam")}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-content1 p-4 rounded-lg shadow-sm transform hover:scale-105 transition-transform flex flex-col items-center">
                    <HeartHandshake className="h-8 w-8 text-primary mb-2" />
                    <div className="text-sm font-semibold text-center">
                      {t("about.features.qualityCare")}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-content1 p-4 rounded-lg shadow-sm transform hover:scale-105 transition-transform flex flex-col items-center">
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <div className="text-sm font-semibold text-center">
                      {t("about.features.patientFirst")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
