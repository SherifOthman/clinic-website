import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { getTranslations } from "next-intl/server";

interface CtaSectionProps {
  locale: string;
  titleKey: string;
  subtitleKey: string;
  primaryHref?: string;
  secondaryHref?: string;
  primaryLabelKey?: string;
  secondaryLabelKey?: string;
  /** "accent" renders a solid accent background; "plain" renders on the page background */
  variant?: "accent" | "plain";
}

/**
 * Shared CTA section used on Home, About, and Pricing pages.
 * 'use cache' — pure translation + locale-based hrefs, cached per locale.
 * Locale passed as prop so getTranslations doesn't read from headers().
 */
export async function CtaSection({
  locale,
  titleKey,
  subtitleKey,
  primaryHref,
  secondaryHref,
  primaryLabelKey = "hero.cta",
  secondaryLabelKey = "navigation.contact",
  variant = "plain",
}: CtaSectionProps) {
  "use cache";

  const t = await getTranslations({ locale, namespace: "" });
  const isAccent = variant === "accent";

  return (
    <section className={`py-20 ${isAccent ? "bg-accent text-accent-foreground" : ""}`}>
      <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
        <div className="space-y-4">
          <h2 className={`text-3xl font-bold lg:text-4xl ${isAccent ? "" : "text-foreground"}`}>
            {t(titleKey as any)}
          </h2>
          <p className={`text-xl ${isAccent ? "opacity-90" : "text-muted"}`}>
            {t(subtitleKey as any)}
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {isAccent ? (
            <>
              <CtaButton
                href={primaryHref ?? `/${locale}/register`}
                className="bg-white !text-accent hover:bg-white/90"
              >
                {t(primaryLabelKey as any)}
              </CtaButton>
              <CtaButton href={secondaryHref ?? `/${locale}/contact`} variant="outline-white">
                {t(secondaryLabelKey as any)}
              </CtaButton>
            </>
          ) : (
            <>
              <CtaButton href={primaryHref ?? `/${locale}/register`} variant="primary">
                {t(primaryLabelKey as any)}
              </CtaButton>
              <CtaButton href={secondaryHref ?? `/${locale}/contact`} variant="outline">
                {t(secondaryLabelKey as any)}
              </CtaButton>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
