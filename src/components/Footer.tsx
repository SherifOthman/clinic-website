import { Activity } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/src/config/site";

export const Footer = () => {
  return (
    <footer className="bg-default-50 border-divider border-t">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-6 md:max-w-none md:grid-cols-3 md:gap-8">
          <div className="col-span-2 text-center md:col-span-1 md:text-start">
            <div className="mb-3 flex items-center justify-center gap-2 md:mb-4 md:justify-start">
              <Activity className="text-primary" size={28} />
              <span className="text-lg font-bold md:text-xl">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-default-500 text-xs leading-relaxed md:text-sm">
              Streamline your healthcare practice with our comprehensive clinic
              management platform. Trusted by healthcare professionals
              worldwide.
            </p>
          </div>

          <div className="text-center md:text-start">
            <h4 className="mb-3 text-sm font-semibold md:mb-4 md:text-base">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#pricing"
                  className="text-default-500 hover:text-foreground text-xs transition-colors md:text-sm"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-start">
            <h4 className="mb-3 text-sm font-semibold md:mb-4 md:text-base">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-default-500 hover:text-foreground text-xs transition-colors md:text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-default-500 hover:text-foreground text-xs transition-colors md:text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-default-500 hover:text-foreground text-xs transition-colors md:text-sm"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t pt-6 md:mt-8 md:flex-row md:pt-8">
          <p className="text-default-500 text-center text-xs md:text-start md:text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <span className="text-default-500 text-xs md:text-sm">
              HIPAA Compliant • SOC 2 Certified • ISO 27001
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
