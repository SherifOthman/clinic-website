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

      <div className="mt-16 mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {helpSections.map((section, index) => (
          <Card key={index} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <h3 className="text-xl font-bold">{section.title}</h3>
            </CardHeader>
            <CardBody className="text-start">
              <p className="text-default-500 mb-6">{section.description}</p>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm">
                    • {item}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Card className="bg-primary/5 mx-auto max-w-2xl transition-shadow hover:shadow-md">
          <CardBody className="p-10 text-start">
            <h3 className="mb-4 text-center text-3xl font-bold">
              {t("support.title")}
            </h3>
            <p className="text-default-500 mb-8 text-xl">
              {t("support.description")}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                color="primary"
                size="lg"
                className="font-semibold shadow-lg"
              >
                {t("support.contact")}
              </Button>
              <Button variant="bordered" size="lg" className="font-semibold">
                {t("support.documentation")}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
