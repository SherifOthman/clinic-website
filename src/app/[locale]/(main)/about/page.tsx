"use client";

import { Card, CardBody } from "@heroui/card";
import { BarChart3, Calendar, Shield, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  const values = [
    {
      icon: <Users className="text-primary" size={32} />,
      title: t("values.patientCare.title"),
      description: t("values.patientCare.description"),
    },
    {
      icon: <Shield className="text-primary" size={32} />,
      title: t("values.security.title"),
      description: t("values.security.description"),
    },
    {
      icon: <Calendar className="text-primary" size={32} />,
      title: t("values.efficiency.title"),
      description: t("values.efficiency.description"),
    },
    {
      icon: <BarChart3 className="text-primary" size={32} />,
      title: t("values.insights.title"),
      description: t("values.insights.description"),
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-6 py-24">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-5xl lg:text-6xl font-bold mb-6">{t("title")}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">{t("story.title")}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t("story.paragraph1")}</p>
            <p>{t("story.paragraph2")}</p>
            <p>{t("story.paragraph3")}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground mb-6">
              {t("stats.practices")}
            </div>
            <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-muted-foreground mb-6">
              {t("stats.patients")}
            </div>
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">{t("stats.uptime")}</div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("values.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("values.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardBody className="p-8 text-center">
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">{t("team.title")}</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          {t("team.description")}
        </p>
        <div className="bg-muted/50 rounded-2xl p-8 max-w-4xl mx-auto">
          <p className="text-lg font-medium italic mb-4">
            "{t("team.testimonial.quote")}"
          </p>
          <p className="text-muted-foreground font-medium">
            - {t("team.testimonial.author")}
          </p>
        </div>
      </div>
    </div>
  );
}
