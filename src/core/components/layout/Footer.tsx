import { Link } from "@heroui/react";
import { cacheLife } from "next/cache";
import {
  Facebook,
  HeartHandshake,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

interface Props {
  locale: string;
}

/**
 * 'use cache' — pure translation + locale-based hrefs, cached per locale.
 * Locale passed as prop so getTranslations doesn't read from headers().
 */
export async function Footer({ locale }: Props) {
  "use cache";
  cacheLife("daily");

  const t     = await getTranslations({ locale, namespace: "footer" });
  const tNav  = await getTranslations({ locale, namespace: "navigation" });
  const tSvc  = await getTranslations({ locale, namespace: "services" });

  const quickLinks = [
    { key: "home",    href: "/" },
    { key: "about",   href: "/about" },
    { key: "pricing", href: "/pricing" },
    { key: "contact", href: "/contact" },
  ];

  const services = ["general", "cardiology", "pediatrics", "dermatology", "orthopedics"];

  return (
    <footer className="bg-surface border-t border-divider">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <HeartHandshake className="h-8 w-8 text-accent" />
              <span className="font-bold text-xl">ClinicCare</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">{t("description")}</p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="text-muted hover:text-accent">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-muted hover:text-accent text-sm transition-colors"
                  >
                    {tNav(link.key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("services")}</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href={`/${locale}/services#${service}`}
                    className="text-muted hover:text-accent text-sm transition-colors"
                  >
                    {tSvc(`${service}.title` as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 space-y-4 lg:col-span-1">
            <h3 className="font-semibold text-foreground">{t("contact")}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-muted">
              <div><p className="font-medium">📍 Address</p><p>Egypt, Kafr El Sheikh<br />Borg El Bruls</p></div>
              <div><p className="font-medium">✉️ Email</p><p>sheriff.a.othman@gmail.com</p></div>
              <div><p className="font-medium">📞 Phone</p><p>+20 01098021259</p></div>
              <div><p className="font-medium">🕒 Hours</p><p>Sun-Thu: 8:00 AM - 5:00 PM<br />Fri-Sat: Closed</p></div>
            </div>
          </div>
        </div>

        <div className="border-t border-divider mt-8 pt-8 text-center">
          <p className="text-muted text-sm">© {new Date().getFullYear()} ClinicCare. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
