import { Button, Card, Label, Link } from "@heroui/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";

export const ContactPage = async () => {
  const t = await getTranslations();

  const contactInfo = [
    { icon: Mail,   title: t("contact.info.email.title"),   value: "support@cliniccare.com",  href: "mailto:support@cliniccare.com" },
    { icon: Phone,  title: t("contact.info.phone.title"),   value: "+1 (555) 123-4567",       href: "tel:+15551234567" },
    { icon: MapPin, title: t("contact.info.address.title"), value: t("contact.info.address.value"), href: "#" },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-accent/10 to-accent/5 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h1 className="text-4xl font-bold text-foreground lg:text-6xl">{t("contact.hero.title")}</h1>
          <p className="text-xl text-muted">{t("contact.hero.subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground">{t("contact.form.title")}</h2>
                <p className="mt-2 text-muted">{t("contact.form.subtitle")}</p>
              </div>
              <Card>
                <Card.Content className="p-8">
                  <form className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="fn">{t("contact.form.firstName")}</Label>
                        <input id="fn" placeholder={t("contact.form.firstNamePlaceholder")} required className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="ln">{t("contact.form.lastName")}</Label>
                        <input id="ln" placeholder={t("contact.form.lastNamePlaceholder")} required className={inputCls} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="em">{t("contact.form.email")}</Label>
                      <input id="em" type="email" placeholder={t("contact.form.emailPlaceholder")} required className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="sub">{t("contact.form.subject")}</Label>
                      <input id="sub" placeholder={t("contact.form.subjectPlaceholder")} required className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="msg">{t("contact.form.message")}</Label>
                      <textarea id="msg" placeholder={t("contact.form.messagePlaceholder")} required rows={4} className={`${inputCls} resize-none`} />
                    </div>
                    <Button type="submit" variant="primary" className="w-full">{t("contact.form.submit")}</Button>
                  </form>
                </Card.Content>
              </Card>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">{t("contact.info.title")}</h2>
                <p className="mt-2 text-muted">{t("contact.info.subtitle")}</p>
              </div>
              {contactInfo.map((info, i) => (
                <Card key={i}>
                  <Card.Content className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-accent/10 p-3">
                        <info.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        {info.href.startsWith("#")
                          ? <p className="text-muted">{info.value}</p>
                          : <Link href={info.href} className="text-accent hover:underline">{info.value}</Link>
                        }
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              ))}
              <Card className="bg-accent text-accent-foreground">
                <Card.Content className="p-6 text-center space-y-4">
                  <h3 className="text-xl font-semibold">{t("contact.quickActions.title")}</h3>
                  <p className="opacity-90">{t("contact.quickActions.subtitle")}</p>
                  <a href="http://localhost:3000/register" className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-white/90">
                    {t("hero.cta")}
                  </a>
                </Card.Content>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
