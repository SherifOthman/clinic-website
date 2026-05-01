import { getTranslations } from "next-intl/server";

export async function AboutHero() {
  const t = await getTranslations();

  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 to-accent/10">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
          {t("about.hero.title")}
        </h1>
        <p className="text-xl text-muted leading-relaxed">
          {t("about.hero.subtitle")}
        </p>
      </div>
    </section>
  );
}
