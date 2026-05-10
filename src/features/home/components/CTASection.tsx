import { CtaSection } from "@/src/core/components/ui/CtaSection";

interface Props {
  locale: string;
}

export function CTASection({ locale }: Props) {
  return (
    <CtaSection
      locale={locale}
      titleKey="cta.title"
      subtitleKey="cta.subtitle"
      variant="accent"
    />
  );
}
