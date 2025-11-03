"use client";

import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export function CTASection() {
  const t = useTranslations("home");

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-default-50 to-background dark:from-default-100/50 dark:to-background relative">
      <div className="container mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
          {t("ctaTitle")}
        </h2>
        <p className="text-xl text-default-600 mb-12 max-w-2xl mx-auto">
          {t("ctaDescription")}
        </p>
        <Button
          as={Link}
          href="/signup"
          color="primary"
          size="lg"
          className="font-semibold px-12 shadow-lg"
        >
          {t("startFreeTrial")}
        </Button>
        <p className="text-sm text-default-500 mt-8">{t("ctaFooter")}</p>
      </div>
    </section>
  );
}
