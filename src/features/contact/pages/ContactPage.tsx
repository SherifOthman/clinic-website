"use client";

import { Card, Link } from "@heroui/react";
import { CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";

export const ContactPage = () => {
  const t = useTranslations();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", company: "", subject: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

  const set = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const err = await res.json().catch(() => ({}));
        setError(err.detail ?? t("common.somethingWentWrong"));
      }
    } catch {
      setError(t("common.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  }

  const contactInfo = [
    { icon: Mail,   title: t("contact.info.email.title"),   value: "support@cliniccare.com",       href: "mailto:support@cliniccare.com" },
    { icon: Phone,  title: t("contact.info.phone.title"),   value: "+1 (555) 123-4567",            href: "tel:+15551234567" },
    { icon: MapPin, title: t("contact.info.address.title"), value: t("contact.info.address.value"), href: "#" },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-accent/10 to-accent/5 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <h1 className="text-4xl font-bold lg:text-6xl">{t("contact.hero.title")}</h1>
          <p className="text-xl text-muted">{t("contact.hero.subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold">{t("contact.form.title")}</h2>
                <p className="mt-2 text-muted">{t("contact.form.subtitle")}</p>
              </div>
              <Card>
                <Card.Content className="p-8">
                  {sent ? (
                    <div className="flex flex-col items-center gap-4 py-8 text-center">
                      <CheckCircle className="h-16 w-16 text-success" />
                      <h3 className="text-xl font-semibold">Message Sent!</h3>
                      <p className="text-muted">We'll get back to you within 24 hours.</p>
                      <button
                        onClick={() => { setSent(false); setForm({ firstName: "", lastName: "", email: "", phone: "", company: "", subject: "", message: "" }); }}
                        className="text-sm text-accent hover:underline"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {error && (
                        <div className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                          {error}
                        </div>
                      )}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-medium">{t("contact.form.firstName")}</label>
                          <input value={form.firstName} onChange={set("firstName")} placeholder={t("contact.form.firstNamePlaceholder")} required className={inputCls} />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-medium">{t("contact.form.lastName")}</label>
                          <input value={form.lastName} onChange={set("lastName")} placeholder={t("contact.form.lastNamePlaceholder")} required className={inputCls} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">{t("contact.form.email")}</label>
                        <input type="email" value={form.email} onChange={set("email")} placeholder={t("contact.form.emailPlaceholder")} required className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">{t("contact.form.subject")}</label>
                        <input value={form.subject} onChange={set("subject")} placeholder={t("contact.form.subjectPlaceholder")} required className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">{t("contact.form.message")}</label>
                        <textarea value={form.message} onChange={set("message")} placeholder={t("contact.form.messagePlaceholder")} required rows={4} className={`${inputCls} resize-none`} />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 disabled:opacity-60"
                      >
                        {loading ? "Sending..." : t("contact.form.submit")}
                      </button>
                    </form>
                  )}
                </Card.Content>
              </Card>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold">{t("contact.info.title")}</h2>
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
                        <h3 className="font-semibold">{info.title}</h3>
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
                  <a
                    href={`${process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3001"}/en/register`}
                    className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-white/90"
                  >
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
