"use client";

import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/navigation";
import { spacing, textStyles } from "@/src/lib/styles";
import { cn } from "@/src/lib/utils";

export function CTASection() {
  const t = useTranslations("home");

  return (
    <section
      className={cn(
        "from-muted/50 to-background bg-gradient-to-b",
        spacing.section
      )}
    >
      <div className="relative z-10 container mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className={textStyles.sectionTitle}>{t("ctaTitle")}</h2>
        <p className={cn(textStyles.sectionSubtitle, "text-default-500 mb-12")}>
          {t("ctaDescription")}
        </p>
        <Button
          as={Link}
          href="/signup"
          color="primary"
          size="lg"
          className="px-12 font-semibold shadow-lg"
        >
          {t("startFreeTrial")}
        </Button>
        <p className="text-default-500 mt-8 text-sm">{t("ctaFooter")}</p>
      </div>
    </section>
  );
}
