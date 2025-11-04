"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { useTranslations } from "next-intl";

import { PageHeader } from "@/src/components/layout/PageHeader";
import { ContactForm } from "@/src/features/contact/ContactForm";

export default function ContactPage() {
  const t = useTranslations("contact");

  const contactInfo = [
    {
      title: t("info.sales.title"),
      description: t("info.sales.description"),
      contact: "sales@clinicflow.com",
      phone: "+1 (555) 123-4567",
    },
    {
      title: t("info.support.title"),
      description: t("info.support.description"),
      contact: "support@clinicflow.com",
      phone: "+1 (555) 123-4568",
    },
    {
      title: t("info.general.title"),
      description: t("info.general.description"),
      contact: "hello@clinicflow.com",
      phone: "+1 (555) 123-4569",
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl py-24">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">{t("getInTouch")}</h2>
            <p className="text-muted-foreground mb-8">{t("description")}</p>
          </div>

          {contactInfo.map((info, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                <p className="text-muted-foreground mb-6">{info.description}</p>
                <div className="space-y-2">
                  <p className="font-medium">{info.contact}</p>
                  <p className="text-muted-foreground">{info.phone}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-primary/5 hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-3">{t("demo.title")}</h3>
              <p className="text-muted-foreground mb-6">
                {t("demo.description")}
              </p>
              <Button size="lg" className="font-semibold shadow-lg">
                {t("demo.button")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
