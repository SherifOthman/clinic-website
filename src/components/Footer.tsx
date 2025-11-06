"use client";

import { Activity } from "lucide-react";
import { useTranslations } from "next-intl";

import { useRTL } from "@/src/hooks/useRTL";
import { Link } from "@/src/i18n/navigation";

export const Footer = () => {
  const t = useTranslations("footer");
  const isRTL = useRTL();

  return (
    <footer className="bg-default-50 border-divider border-t">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-6 md:max-w-none md:grid-cols-3 md:gap-8">
          <div
            className={`col-span-2 text-center md:col-span-1 ${isRTL ? "md:text-right" : "md:text-left"}`}
          >
            <div
              className={`mb-3 flex items-center justify-center gap-2 md:mb-4 ${isRTL ? "md:justify-end" : "md:justify-start"}`}
            >
              <Activity className="text-primary" size={28} />
              <span className="text-lg font-bold md:text-xl">ClinicFlow</span>
            </div>
            <p className="text-default-500 text-xs leading-relaxed md:text-sm">
              {t("description")}
            </p>
          </div>

          <div
            className={`text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
          >
            <h4 className="mb-3 text-sm font-semibold md:mb-4 md:text-base">
              {t("product")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#pricing"
                  className="text-default-500 hover:text-foreground text-xs transition-colors md:text-sm"
                >
                  {t("pricing")}
                </Link>
              </li>
            </ul>
          </div>

          <div
            className={`text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
          >
            <h4 className="mb-3 text-sm font-semibold md:mb-4 md:text-base">
              {t("company")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-default-500 hover:text-foreground text-xs transition-colors md:text-sm"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-default-500 hover:text-foreground text-xs transition-colors md:text-sm"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-default-500 hover:text-foreground text-xs transition-colors md:text-sm"
                >
                  {t("helpCenter")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t pt-6 md:mt-8 md:flex-row md:pt-8">
          <p
            className={`text-default-500 text-center text-xs md:text-sm ${isRTL ? "md:text-right" : "md:text-left"}`}
          >
            © 2024 ClinicFlow. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-default-500 text-xs md:text-sm">
              {t("compliance")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
