import { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { LocaleHandler } from "@/src/components/LocaleHandler";
import { siteConfig } from "@/src/config/site";
import { routing } from "@/src/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    title: {
      default: isArabic
        ? "ClinicFlow - إدارة العيادات الشاملة"
        : siteConfig.name,
      template: isArabic ? `%s - ClinicFlow` : `%s - ${siteConfig.name}`,
    },
    description: isArabic
      ? "منصة إدارة عيادات شاملة للمهنيين الصحيين"
      : siteConfig.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      locale: isArabic ? "ar_SA" : "en_US",
      alternateLocale: isArabic ? "en_US" : "ar_SA",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <LocaleHandler locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
