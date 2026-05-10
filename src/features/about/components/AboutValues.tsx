import { Card } from "@heroui/react";
import { HeartHandshake, Shield, Users, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface Props {
  locale: string;
}

/**
 * 'use cache' — pure translation output, cached per locale.
 * Locale passed as prop so getTranslations doesn't read from headers().
 */
export async function AboutValues({ locale }: Props) {
  "use cache";

  const t = await getTranslations({ locale, namespace: "" });

  const values = [
    { icon: HeartHandshake, title: t("about.values.care.title"),          description: t("about.values.care.description") },
    { icon: Shield,         title: t("about.values.security.title"),      description: t("about.values.security.description") },
    { icon: Zap,            title: t("about.values.innovation.title"),    description: t("about.values.innovation.description") },
    { icon: Users,          title: t("about.values.collaboration.title"), description: t("about.values.collaboration.description") },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            {t("about.values.title")}
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {t("about.values.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index}>
              <Card.Content className="p-6 space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-accent/10 rounded-full">
                    <value.icon className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground text-center">
                  {value.title}
                </h3>
                <p className="text-muted rtl:text-right ltr:text-left">
                  {value.description}
                </p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
