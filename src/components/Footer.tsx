"use client";

import { Link } from "@heroui/link";
import { Activity } from "lucide-react";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className="bg-default-100 dark:bg-default-50/5 border-t border-divider">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-2xl md:max-w-none mx-auto">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <div className="flex items-center gap-2 mb-3 md:mb-4 justify-center md:justify-start">
              <Activity className="text-primary" size={28} />
              <span className="font-bold text-lg md:text-xl text-foreground">
                ClinicFlow
              </span>
            </div>
            <p className="text-default-600 text-xs md:text-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Product */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">
              {t("product")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#pricing"
                  className="text-default-600 hover:text-foreground text-xs md:text-sm"
                >
                  {t("pricing")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">
              {t("company")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-default-600 hover:text-foreground text-xs md:text-sm"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-default-600 hover:text-foreground text-xs md:text-sm"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-default-600 hover:text-foreground text-xs md:text-sm"
                >
                  {t("helpCenter")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-divider mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-default-600 text-xs md:text-sm text-center md:text-left">
            © 2024 ClinicFlow. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-default-600 text-xs md:text-sm">
              {t("compliance")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
