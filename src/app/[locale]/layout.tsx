import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { Providers } from "../providers";

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
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // Pass the locale to getMessages to load the correct translations
  const messages = await getMessages({ locale });

  const isRTL = locale === "ar";
  const fontClass = isRTL ? "font-arabic" : "font-sans";

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
        <div
          lang={locale}
          dir={isRTL ? "rtl" : "ltr"}
          className={`min-h-screen ${fontClass}`}
        >
          {children}
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
