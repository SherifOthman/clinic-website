import { fontSans } from '@/config/fonts';
import '@/styles/globals.css';
import clsx from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from './providers';

export const metadata = {
  title: 'ClinicFlow - Complete Clinic Management Solution',
  description: 'Streamline your healthcare practice with ClinicFlow.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default to English for root layout
  const messages = await getMessages({ locale: 'en' });

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
