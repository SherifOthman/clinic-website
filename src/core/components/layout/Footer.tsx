import { Link } from "@heroui/react";
import {
  Facebook,
  HeartHandshake,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export const Footer = async () => {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("navigation");
  const tServices = await getTranslations("services");
  const locale = await getLocale();

  const quickLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "pricing", href: "/pricing" },
    { key: "contact", href: "/contact" },
  ];

  const services = [
    "general",
    "cardiology",
    "pediatrics",
    "dermatology",
    "orthopedics",
    "gynecology",
  ];

  return (
    <footer className="bg-surface border-t border-divider">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <HeartHandshake className="h-8 w-8 text-accent" />
              <span className="font-bold text-xl">ClinicCare</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted hover:text-accent">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted hover:text-accent">
                <Linkedin className="h-5 w-5" />
              </Link>
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
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("services")}</h3>
            <ul className="space-y-2">
              {services.slice(0, 5).map((service) => (
                <li key={service}>
                  <Link
                    href={`/${locale}/services#${service}`}
                    className="text-muted hover:text-accent text-sm transition-colors"
                  >
                    {tServices(`${service}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info — 2-column grid for the 4 items */}
          <div className="col-span-2 space-y-4 lg:col-span-1">
            <h3 className="font-semibold text-foreground">{t("contact")}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-muted">
              <div>
                <p className="font-medium">📍 Address</p>
                <p>
                  Egypt, Kafr El Sheikh
                  <br />
                  Borg El Bruls
                </p>
              </div>
              <div>
                <p className="font-medium">✉️ Email</p>
                <p>sheriff.a.othman@gmail.com</p>
              </div>
              <div>
                <p className="font-medium">📞 Phone</p>
                <p>+20 01098021259</p>
              </div>
              <div>
                <p className="font-medium">🕒 Hours</p>
                <p>
                  Sun-Thu: 8:00 AM - 5:00 PM
                  <br />
                  Fri-Sat: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-divider mt-8 pt-8 text-center">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} ClinicCare. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
