import { routing } from "@/i18n/routing";
import { Footer } from "@/src/core/components/layout/Footer";
import { Navbar } from "@/src/core/components/layout/Navbar";
import { NavbarWrapper } from "@/src/core/components/layout/NavbarWrapper";
import clsx from "clsx";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RouterProviders } from "./providers";
import HtmlLocaleSync from "./HtmlLocaleSync";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!routing.locales.includes(locale as any)) notFound();

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <>
      <HtmlLocaleSync locale={locale} isRTL={isRTL} />
      <div className={clsx(isRTL ? "font-cairo" : "font-roboto")}>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={<main className="min-h-screen">{children}</main>}>
            <RouterProviders>
              <NavbarWrapper
                navbar={<Navbar />}
                footer={<Footer locale={locale} />}
                locale={locale}
              >
                {children}
              </NavbarWrapper>
            </RouterProviders>
          </Suspense>
        </NextIntlClientProvider>
      </div>
    </>
  );
}
