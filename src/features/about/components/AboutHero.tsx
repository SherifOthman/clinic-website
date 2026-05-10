import { PageHero } from "@/src/core/components/ui/PageHero";

interface Props {
  locale: string;
}

export function AboutHero({ locale }: Props) {
  return <PageHero locale={locale} titleKey="about.hero.title" subtitleKey="about.hero.subtitle" />;
}
