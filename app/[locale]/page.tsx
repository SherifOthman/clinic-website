import { routing } from "@/i18n/routing";
import { HomePage } from "@/src/features/home";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <HomePage />;
}
