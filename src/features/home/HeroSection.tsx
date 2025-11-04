"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="secondary" className="mb-8 text-base px-4 py-2">
            {t("trustedBy")}
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {t("heroTitle")}
            <span className="text-primary block mt-2">{t("heroSubtitle")}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="font-semibold px-10 shadow-lg">
              <Link href="/signup">{t("getStartedFree")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-semibold px-10"
            >
              <Link href="/pricing">{t("viewPricing")}</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{t("noCardRequired")}</p>
        </div>
      </div>
    </section>
  );
}

