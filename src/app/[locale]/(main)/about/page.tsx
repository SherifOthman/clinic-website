import { Card, CardBody } from "@heroui/card";
import { BarChart3, Calendar, Shield, Users } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });

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
    <div
      className="container mx-auto max-w-7xl px-6 py-24"
      // data-locale={locale}
    >
      {/* Hero Section */}
      <div className="mb-20">
        <h1 className="mb-6 text-5xl font-bold lg:text-6xl">{t("title")}</h1>
        <p className="text-default-500 max-w-3xl text-xl leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold">{t("story.title")}</h2>
          <div className="text-default-500 space-y-4 leading-relaxed">
            <p>{t("story.paragraph1")}</p>
            <p>{t("story.paragraph2")}</p>
            <p>{t("story.paragraph3")}</p>
          </div>
        </div>
        <div className="from-primary/10 to-primary/20 flex items-center justify-center rounded-2xl bg-gradient-to-br p-8">
          <div className="text-center">
            <div className="text-primary mb-2 text-4xl font-bold">1000+</div>
            <div className="text-default-500 mb-6">{t("stats.practices")}</div>
            <div className="text-primary mb-2 text-4xl font-bold">50,000+</div>
            <div className="text-default-500 mb-6">{t("stats.patients")}</div>
            <div className="text-primary mb-2 text-4xl font-bold">99.9%</div>
            <div className="text-default-500">{t("stats.uptime")}</div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">{t("values.title")}</h2>
          <p className="text-default-500 max-w-2xl text-xl">
            {t("values.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Card key={index} className="transition-shadow hover:shadow-md">
              <CardBody className="p-8 text-center">
                <div className="mb-6 flex justify-center">{value.icon}</div>
                <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                <p className="text-default-500 leading-relaxed">
                  {value.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-3xl font-bold">{t("team.title")}</h2>
        <p className="text-default-500 mb-8 max-w-3xl text-xl leading-relaxed">
          {t("team.description")}
        </p>
        <div className="bg-default-50 mx-auto max-w-4xl rounded-2xl p-8">
          <p className="mb-4 text-lg font-medium italic">
            "{t("team.testimonial.quote")}"
          </p>
          <p className="text-default-500 font-medium">
            - {t("team.testimonial.author")}
          </p>
        </div>
      </div>
    </div>
  );
}
