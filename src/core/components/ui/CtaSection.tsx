import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { getLocale, getTranslations } from "next-intl/server";

interface CtaSectionProps {
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
 */
export async function CtaSection({
  titleKey,
  subtitleKey,
  primaryHref,
  secondaryHref,
  primaryLabelKey = "hero.cta",
  secondaryLabelKey = "navigation.contact",
  variant = "plain",
}: CtaSectionProps) {
  const t = await getTranslations();
  const locale = await getLocale();

  const isAccent = variant === "accent";

  return (
    <section className={`py-20 ${isAccent ? "bg-accent text-accent-foreground" : ""}`}>
      <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
        <div className="space-y-4">
          <h2 className={`text-3xl font-bold lg:text-4xl ${isAccent ? "" : "text-foreground"}`}>
            {t(titleKey)}
          </h2>
          <p className={`text-xl ${isAccent ? "opacity-90" : "text-muted"}`}>
            {t(subtitleKey)}
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {isAccent ? (
            <>
              <CtaButton
                href={primaryHref ?? `/${locale}/register`}
                className="bg-white !text-accent hover:bg-white/90"
              >
                {t(primaryLabelKey)}
              </CtaButton>
              <CtaButton href={secondaryHref ?? `/${locale}/contact`} variant="outline-white">
                {t(secondaryLabelKey)}
              </CtaButton>
            </>
          ) : (
            <>
              <CtaButton href={primaryHref ?? `/${locale}/register`} variant="primary">
                {t(primaryLabelKey)}
              </CtaButton>
              <CtaButton href={secondaryHref ?? `/${locale}/contact`} variant="outline">
                {t(secondaryLabelKey)}
              </CtaButton>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
