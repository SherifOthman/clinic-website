"use client";

import { Activity } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export const Footer = () => {
  const t = useTranslations("footer");
  const locale = useLocale();
  const isRTL = locale === "ar";
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-2xl md:max-w-none mx-auto">
          <div
            className={`col-span-2 md:col-span-1 text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
          >
            <div
              className={`flex items-center gap-2 mb-3 md:mb-4 justify-center ${isRTL ? "md:justify-end" : "md:justify-start"}`}
            >
              <Activity className="text-primary" size={28} />
              <span className="font-bold text-lg md:text-xl">ClinicFlow</span>
            </div>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div
            className={`text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
          >
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">
              {t("product")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#pricing"
                  className="text-muted-foreground hover:text-foreground text-xs md:text-sm transition-colors"
                >
                  {t("pricing")}
                </a>
              </li>
            </ul>
          </div>

          <div
            className={`text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
          >
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">
              {t("company")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground text-xs md:text-sm transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground text-xs md:text-sm transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-foreground text-xs md:text-sm transition-colors"
                >
                  {t("helpCenter")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p
            className={`text-muted-foreground text-xs md:text-sm text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
          >
            © 2024 ClinicFlow. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-xs md:text-sm">
              {t("compliance")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
