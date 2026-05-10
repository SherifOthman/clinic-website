import { PageHero } from "@/src/core/components/ui/PageHero";

interface Props {
  locale: string;
}

export function PricingHero({ locale }: Props) {
  return <PageHero locale={locale} titleKey="pricing.hero.title" subtitleKey="pricing.hero.subtitle" gradient="bl" />;
}
