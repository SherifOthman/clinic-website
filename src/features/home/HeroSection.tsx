"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-default-50 dark:to-default-100 py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <Chip color="primary" variant="flat" size="lg" className="mb-8">
            {t("trustedBy")}
          </Chip>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {t("heroTitle")}
            <span className="text-primary block mt-2">{t("heroSubtitle")}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-default-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              as={Link}
              href="/signup"
              color="primary"
              size="lg"
              className="font-semibold px-10 shadow-lg"
            >
              {t("getStartedFree")}
            </Button>
            <Button
              as={Link}
              href="/pricing"
              variant="flat"
              size="lg"
              className="font-semibold px-10"
            >
              {t("viewPricing")}
            </Button>
          </div>
          <p className="text-sm text-default-500">{t("noCardRequired")}</p>
        </div>
      </div>
    </section>
  );
}
