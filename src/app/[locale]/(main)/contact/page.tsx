import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

import { ContactForm } from "@/src/features/contact/ContactForm";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

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
    <div className="container mx-auto max-w-7xl py-24" data-locale={locale}>
      {/* Header Section */}
      <div className="mb-16">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {t("subtitle")}
        </p>
      </div>

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
              <CardBody className="p-8">
                <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                <p className="text-muted-foreground mb-6">{info.description}</p>
                <div className="space-y-2">
                  <p className="font-medium">{info.contact}</p>
                  <p className="text-muted-foreground">{info.phone}</p>
                </div>
              </CardBody>
            </Card>
          ))}

          <Card className="bg-primary/5 hover:shadow-md transition-shadow">
            <CardBody className="p-8">
              <h3 className="text-xl font-bold mb-3">{t("demo.title")}</h3>
              <p className="text-muted-foreground mb-6">
                {t("demo.description")}
              </p>
              <Button
                color="primary"
                size="lg"
                className="font-semibold shadow-lg"
              >
                {t("demo.button")}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
