import { routing } from "@/i18n/routing";
import { CtaSection } from "@/src/core/components/ui/CtaSection";
import { PageHero } from "@/src/core/components/ui/PageHero";
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
      <PageHero locale={locale} titleKey="about.hero.title" subtitleKey="about.hero.subtitle" />
      <AboutMission locale={locale} />
      <AboutValues locale={locale} />
      <CtaSection locale={locale} titleKey="about.cta.title" subtitleKey="about.cta.subtitle" variant="plain" />
    </>
  );
}
