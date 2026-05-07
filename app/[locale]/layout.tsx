import { routing } from "@/i18n/routing";
import { Footer } from "@/src/core/components/layout/Footer";
import { Navbar } from "@/src/core/components/layout/Navbar";
import { NavbarWrapper } from "@/src/core/components/layout/NavbarWrapper";
import { cairo, roboto } from "@/src/core/config/fonts";
import clsx from "clsx";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Providers } from "./providers";

export const dynamic = "force-static";

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
  if (!routing.locales.includes(locale as any)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  const isRTL = locale === "ar";

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      // Inject both font CSS variables so they're available globally
      className={clsx(cairo.variable, roboto.variable)}
    >
      <body
        suppressHydrationWarning
        className={clsx(
          "min-h-screen bg-background text-foreground antialiased",
          // Apply the correct font family based on locale
          isRTL ? "font-cairo" : "font-roboto",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <NavbarWrapper
              locale={locale}
              navbar={<Navbar />}
              footer={<Footer />}
            >
              {children}
            </NavbarWrapper>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
