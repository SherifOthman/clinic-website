"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useTranslations } from "next-intl";

import { PageHeader } from "@/src/components/layout/PageHeader";

export default function HelpPage() {
  const t = useTranslations("help");

  const helpSections = [
    {
      title: t("gettingStarted.title"),
      description: t("gettingStarted.description"),
      items: [
        t("gettingStarted.items.setup"),
        t("gettingStarted.items.patients"),
        t("gettingStarted.items.appointments"),
        t("gettingStarted.items.reports"),
      ],
    },
    {
      title: t("features.title"),
      description: t("features.description"),
      items: [
        t("features.items.patientManagement"),
        t("features.items.scheduling"),
        t("features.items.billing"),
        t("features.items.reports"),
      ],
    },
    {
      title: t("troubleshooting.title"),
      description: t("troubleshooting.description"),
      items: [
        t("troubleshooting.items.login"),
        t("troubleshooting.items.sync"),
        t("troubleshooting.items.performance"),
        t("troubleshooting.items.backup"),
      ],
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl py-24">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 mt-16">
        {helpSections.map((section, index) => (
          <Card
            key={index}
            className="bg-content1 hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <h3 className="text-xl font-bold">{section.title}</h3>
            </CardHeader>
            <CardBody>
              <p className="text-default-600 mb-6">{section.description}</p>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-default-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Card className="bg-primary/5 max-w-2xl mx-auto hover:shadow-md transition-shadow">
          <CardBody className="p-10">
            <h3 className="text-3xl font-bold mb-4">{t("support.title")}</h3>
            <p className="text-xl text-default-600 mb-8">
              {t("support.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="primary"
                size="lg"
                className="font-semibold shadow-lg"
              >
                {t("support.contact")}
              </Button>
              <Button variant="flat" size="lg" className="font-semibold">
                {t("support.documentation")}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
