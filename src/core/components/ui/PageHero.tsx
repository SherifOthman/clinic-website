import { Text } from "@heroui/react";
import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";

interface PageHeroProps {
  locale: string;
  titleKey: string;
  subtitleKey: string;
  /** Gradient direction — defaults to "br" (bottom-right) */
  gradient?: "br" | "bl";
}

/**
 * Shared hero section used on About, Pricing, and similar pages.
 * 'use cache' — pure translation output, cached per locale.
 * Locale passed as prop so getTranslations doesn't read from headers().
 */
export async function PageHero({ locale, titleKey, subtitleKey, gradient = "br" }: PageHeroProps) {
  "use cache";
  cacheLife("daily");

  const t = await getTranslations({ locale, namespace: "" });

  const gradientClass =
    gradient === "bl"
      ? "bg-gradient-to-bl from-accent/5 to-accent/10"
      : "bg-gradient-to-br from-accent/5 to-accent/10";

  return (
    <section className={`py-20 ${gradientClass}`}>
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <Text type="h1" className="text-4xl lg:text-6xl font-bold text-foreground">
          {t(titleKey as any)}
        </Text>
        <p className="text-xl text-muted leading-relaxed max-w-3xl mx-auto">
          {t(subtitleKey as any)}
        </p>
      </div>
    </section>
  );
}
