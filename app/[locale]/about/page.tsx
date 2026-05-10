import { routing } from "@/i18n/routing";
import { AboutCta } from "@/src/features/about/components/AboutCta";
import { AboutHero } from "@/src/features/about/components/AboutHero";
import { AboutMission } from "@/src/features/about/components/AboutMission";
import { AboutValues } from "@/src/features/about/components/AboutValues";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero locale={locale} />
      <AboutMission locale={locale} />
      <AboutValues locale={locale} />
      <AboutCta locale={locale} />
    </>
  );
}
