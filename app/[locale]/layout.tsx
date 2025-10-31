import { routing } from '@/i18n/routing';
import '@/styles/globals.css';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { Providers } from '../providers';

import { fontArabic, fontSans } from '@/config/fonts';

export const metadata: Metadata = {
  title: {
    default: 'ClinicFlow - Complete Clinic Management Solution',
    template: '%s | ClinicFlow',
  },
  description:
    'Streamline your healthcare practice with ClinicFlow. Complete clinic management platform with patient records, appointment scheduling, and analytics. HIPAA compliant and trusted by 1000+ practices.',
  keywords: [
    'clinic management',
    'healthcare software',
    'patient management',
    'appointment scheduling',
    'medical practice',
    'HIPAA compliant',
    'healthcare analytics',
    'clinic software',
  ],
  authors: [{ name: 'ClinicFlow Team' }],
  creator: 'ClinicFlow',
  publisher: 'ClinicFlow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://clinicflow.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://clinicflow.com',
    title: 'ClinicFlow - Complete Clinic Management Solution',
    description:
      'Streamline your healthcare practice with ClinicFlow. Complete clinic management platform with patient records, appointment scheduling, and analytics.',
    siteName: 'ClinicFlow',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ClinicFlow - Complete Clinic Management Solution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClinicFlow - Complete Clinic Management Solution',
    description:
      'Streamline your healthcare practice with ClinicFlow. Complete clinic management platform with patient records, appointment scheduling, and analytics.',
    images: ['/og-image.jpg'],
    creator: '@clinicflow',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background text-foreground antialiased',
          fontSans.variable,
          fontArabic.variable,
          locale === 'ar' ? 'font-arabic' : 'font-sans',
        )}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
