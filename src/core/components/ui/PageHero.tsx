import { Text } from "@heroui/react";
import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";

interface PageHeroProps {
  titleKey: string;
  subtitleKey: string;
  locale: string;
}

export async function PageHero({ titleKey, subtitleKey, locale }: PageHeroProps) {
  "use cache";
  cacheLife("max");

  const t = await getTranslations({ locale, namespace: "" });

  return (
    <section className="bg-gradient-to-bl from-accent/5 to-accent/10 py-20">
      <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
        <Text type="h1" className="text-4xl font-bold text-foreground lg:text-6xl">
          {t(titleKey as any)}
        </Text>
        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted">
          {t(subtitleKey as any)}
        </p>
      </div>
    </section>
  );
}
