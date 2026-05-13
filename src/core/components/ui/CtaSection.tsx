import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { Text } from "@heroui/react";
import { getTranslations } from "next-intl/server";
import { cacheLife } from "next/cache";

interface CtaSectionProps {
  titleKey: string;
  subtitleKey: string;
  primaryHref?: string;
  secondaryHref?: string;
  primaryLabelKey?: string;
  secondaryLabelKey?: string;
  locale: string;
}

export async function CtaSection({
  titleKey,
  subtitleKey,
  primaryHref,
  secondaryHref,
  primaryLabelKey = "hero.cta",
  secondaryLabelKey = "navigation.contact",
  locale,
}: CtaSectionProps) {
  "use cache";
  cacheLife("max");

  const t = await getTranslations({ locale, namespace: "" });

  return (
    <section className="bg-accent/5 py-20">
      <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
        <div className="space-y-4">
          <Text type="h2" className="text-3xl font-bold text-foreground lg:text-4xl">
            {t(titleKey as any)}
          </Text>
          <p className="text-xl text-muted">
            {t(subtitleKey as any)}
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <CtaButton href={primaryHref ?? `/${locale}/register`} variant="primary">
            {t(primaryLabelKey as any)}
          </CtaButton>
          <CtaButton href={secondaryHref ?? `/${locale}/contact`} variant="outline">
            {t(secondaryLabelKey as any)}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
