import { ContactForm } from "@/src/features/contact/ContactForm";
import { routing } from "@/src/i18n/routing";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

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
        <h1 className="mb-4 text-3xl font-bold lg:text-4xl">{t("title")}</h1>
        <p className="text-default-500 max-w-2xl text-xl">{t("subtitle")}</p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-6 text-2xl font-bold">{t("getInTouch")}</h2>
            <p className="text-default-500 mb-8">{t("description")}</p>
          </div>

          {contactInfo.map((info, index) => (
            <Card key={index} className="transition-shadow hover:shadow-md">
              <CardBody className="p-8 text-start">
                <h3 className="mb-3 text-xl font-bold">{info.title}</h3>
                <p className="text-default-500 mb-6">{info.description}</p>
                <div className="space-y-2">
                  <p className="font-medium">{info.contact}</p>
                  <p className="text-default-500">{info.phone}</p>
                </div>
              </CardBody>
            </Card>
          ))}

          <Card className="bg-primary/5 transition-shadow hover:shadow-md">
            <CardBody className="p-8 text-start">
              <h3 className="mb-3 text-xl font-bold">{t("demo.title")}</h3>
              <p className="text-default-500 mb-6">{t("demo.description")}</p>
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
