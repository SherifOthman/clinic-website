import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Link } from "@heroui/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const ContactPage = async () => {
  const t = await getTranslations();

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.info.email.title"),
      value: "support@cliniccare.com",
      href: "mailto:support@cliniccare.com",
    },
    {
      icon: Phone,
      title: t("contact.info.phone.title"),
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: t("contact.info.address.title"),
      value: t("contact.info.address.value"),
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
            {t("contact.hero.title")}
          </h1>
          <p className="text-xl text-default-600 leading-relaxed">
            {t("contact.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  {t("contact.form.title")}
                </h2>
                <p className="text-default-600">{t("contact.form.subtitle")}</p>
              </div>

              <Card>
                <CardBody className="p-8">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label={t("contact.form.firstName")}
                        placeholder={t("contact.form.firstNamePlaceholder")}
                        variant="bordered"
                        isRequired
                      />
                      <Input
                        label={t("contact.form.lastName")}
                        placeholder={t("contact.form.lastNamePlaceholder")}
                        variant="bordered"
                        isRequired
                      />
                    </div>
                    <Input
                      label={t("contact.form.email")}
                      placeholder={t("contact.form.emailPlaceholder")}
                      type="email"
                      variant="bordered"
                      isRequired
                    />
                    <Input
                      label={t("contact.form.subject")}
                      placeholder={t("contact.form.subjectPlaceholder")}
                      variant="bordered"
                      isRequired
                    />
                    <Textarea
                      label={t("contact.form.message")}
                      placeholder={t("contact.form.messagePlaceholder")}
                      variant="bordered"
                      minRows={4}
                      isRequired
                    />
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      className="w-full font-semibold"
                    >
                      {t("contact.form.submit")}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  {t("contact.info.title")}
                </h2>
                <p className="text-default-600">{t("contact.info.subtitle")}</p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardBody className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-100 rounded-lg">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">
                            {info.title}
                          </h3>
                          {info.href.startsWith("#") ? (
                            <p className="text-default-600">{info.value}</p>
                          ) : (
                            <Link
                              href={info.href}
                              className="text-primary hover:underline"
                            >
                              {info.value}
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card className="bg-primary text-primary-foreground">
                <CardBody className="p-6 text-center space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("contact.quickActions.title")}
                  </h3>
                  <p className="opacity-90">
                    {t("contact.quickActions.subtitle")}
                  </p>
                  <Button
                    as={Link}
                    href="http://localhost:3000/register"
                    target="_blank"
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 font-semibold"
                  >
                    {t("hero.cta")}
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
