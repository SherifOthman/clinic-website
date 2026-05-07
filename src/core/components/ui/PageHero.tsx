import { getTranslations } from "next-intl/server";

interface PageHeroProps {
  titleKey: string;
  subtitleKey: string;
  /** Gradient direction — defaults to "br" (bottom-right) */
  gradient?: "br" | "bl";
}

/**
 * Shared hero section used on About, Pricing, and similar pages.
 * Renders a centred heading + subtitle on a soft accent gradient background.
 */
export async function PageHero({ titleKey, subtitleKey, gradient = "br" }: PageHeroProps) {
  const t = await getTranslations();

  const gradientClass =
    gradient === "bl"
      ? "bg-gradient-to-bl from-accent/5 to-accent/10"
      : "bg-gradient-to-br from-accent/5 to-accent/10";

  return (
    <section className={`py-20 ${gradientClass}`}>
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
          {t(titleKey)}
        </h1>
        <p className="text-xl text-muted leading-relaxed max-w-3xl mx-auto">
          {t(subtitleKey)}
        </p>
      </div>
    </section>
  );
}
