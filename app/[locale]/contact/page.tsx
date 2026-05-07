import { routing } from "@/i18n/routing";
import { ContactForm } from "@/src/features/contact/components/ContactForm";
import { ContactInfoSidebar } from "@/src/features/contact/components/ContactInfoCard";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent/10 to-accent/5 py-20">
        <div className="mx-auto max-w-4xl space-y-6 px-6 text-center">
          <h1 className="text-4xl font-bold lg:text-6xl">{t("contact.hero.title")}</h1>
          <p className="text-xl text-muted">{t("contact.hero.subtitle")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold">{t("contact.form.title")}</h2>
                <p className="mt-2 text-muted">{t("contact.form.subtitle")}</p>
              </div>
              <ContactForm />
            </div>

            {/* Info column */}
            <ContactInfoSidebar />
          </div>
        </div>
      </section>
    </>
  );
}
