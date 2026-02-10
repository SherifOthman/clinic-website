import { routing } from "@/i18n/routing";
import { ContactPage } from "@/src/features/contact";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <ContactPage />;
}
