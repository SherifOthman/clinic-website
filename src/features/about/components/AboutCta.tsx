import { getTranslations } from "next-intl/server";
import Link from "next/link";

interface AboutCtaProps {
  locale: string;
}

export async function AboutCta({ locale }: AboutCtaProps) {
  const t = await getTranslations();

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
          {t("about.cta.title")}
        </h2>
        <p className="text-xl text-muted">{t("about.cta.subtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/register`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
          >
            {t("hero.cta")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent/10"
          >
            {t("navigation.contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}
