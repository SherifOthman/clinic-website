import { routing } from "@/i18n/routing";
import { PricingPage } from "@/src/features/pricing";
import { setRequestLocale } from "next-intl/server";

// Revalidate every hour — plans don't change often
export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PricingPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <PricingPage />;
}
