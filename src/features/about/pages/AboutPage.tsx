import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { Award, Clock, HeartHandshake, Shield, Users, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const AboutPage = async () => {
  const t = await getTranslations();

  const values = [
    {
      icon: HeartHandshake,
      title: t("about.values.care.title"),
      description: t("about.values.care.description"),
    },
    {
      icon: Shield,
      title: t("about.values.security.title"),
      description: t("about.values.security.description"),
    },
    {
      icon: Zap,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
    },
    {
      icon: Users,
      title: t("about.values.collaboration.title"),
      description: t("about.values.collaboration.description"),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
            {t("about.hero.title")}
          </h1>
          <p className="text-xl text-default-600 leading-relaxed">
            {t("about.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {t("about.mission.title")}
              </h2>
              <p className="text-lg text-default-600 leading-relaxed">
                {t("about.mission.description")}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-default-600">
                    {t("about.stats.clinics")}
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary">200+</div>
                  <div className="text-sm text-default-600">
                    {t("about.stats.users")}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Clock className="h-8 w-8 text-primary mb-2" />
                    <div className="text-sm font-semibold">
                      {t("about.features.support247")}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Award className="h-8 w-8 text-primary mb-2" />
                    <div className="text-sm font-semibold">
                      {t("about.features.qualityCare")}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <div className="text-sm font-semibold">
                      {t("about.features.secureData")}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <div className="text-sm font-semibold">
                      {t("about.features.teamWork")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-content1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {t("about.values.title")}
            </h2>
            <p className="text-xl text-default-600 max-w-2xl mx-auto">
              {t("about.values.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index}>
                <CardBody className="p-6 space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-primary-100 rounded-full">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground text-center">
                    {value.title}
                  </h3>
                  <p className="text-default-600 rtl:text-right ltr:text-left">
                    {value.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            {t("about.cta.title")}
          </h2>
          <p className="text-xl text-default-600">{t("about.cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              href="http://localhost:3000/register"
              target="_blank"
              color="primary"
              size="lg"
              className="font-semibold"
            >
              {t("hero.cta")}
            </Button>
            <Button
              as={Link}
              href="/contact"
              variant="bordered"
              size="lg"
              className="font-semibold"
            >
              {t("navigation.contact")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
