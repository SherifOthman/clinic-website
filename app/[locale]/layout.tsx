import { routing } from "@/i18n/routing";
import { Footer } from "@/src/core/components/layout/Footer";
import { Navbar } from "@/src/core/components/layout/Navbar";
import { NavbarWrapper } from "@/src/core/components/layout/NavbarWrapper";
import { cairo, roboto } from "@/src/core/config/fonts";
import clsx from "clsx";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RouterProviders, ThemeProviders } from "./providers";

/**
 * Root layout for all localized pages.
 *
 * Architecture with cacheComponents: true:
 * - ThemeProviders: static, no dynamic hooks → outside Suspense
 * - RouterProviders + NavbarWrapper: use useRouter/usePathname → inside Suspense
 *
 * The Suspense boundary prevents dynamic client hooks from blocking
 * the entire page render (required by Next.js 16 cacheComponents).
 */
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
      className={clsx(cairo.variable, roboto.variable)}
    >
      <body
        suppressHydrationWarning
        className={clsx(
          "min-h-screen bg-background text-foreground antialiased",
          isRTL ? "font-cairo" : "font-roboto",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          {/*
           * ThemeProviders has no dynamic hooks — safe outside Suspense.
           * RouterProviders + NavbarWrapper use useRouter/usePathname,
           * so they must be inside a Suspense boundary with cacheComponents.
           */}
          <ThemeProviders>
            <Suspense fallback={<main className="min-h-screen">{children}</main>}>
              <RouterProviders>
                <NavbarWrapper
                  locale={locale}
                  navbar={<Navbar />}
                  footer={<Footer locale={locale} />}
                >
                  {children}
                </NavbarWrapper>
              </RouterProviders>
            </Suspense>
          </ThemeProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
