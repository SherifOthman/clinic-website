import { CtaSection } from "@/src/core/components/ui/CtaSection";

interface Props {
  locale: string;
}

export function AboutCta({ locale }: Props) {
  return (
    <CtaSection
      locale={locale}
      titleKey="about.cta.title"
      subtitleKey="about.cta.subtitle"
      variant="plain"
    />
  );
}
