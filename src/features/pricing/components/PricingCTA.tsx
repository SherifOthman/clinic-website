import { CtaSection } from "@/src/core/components/ui/CtaSection";

interface Props {
  locale: string;
}

export function PricingCTA({ locale }: Props) {
  return (
    <CtaSection
      locale={locale}
      titleKey="pricing.cta.title"
      subtitleKey="pricing.cta.subtitle"
      variant="plain"
    />
  );
}
