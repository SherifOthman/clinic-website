import { Link } from "@heroui/link";
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
    <footer className="bg-content1 border-t border-divider">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HeartHandshake className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">ClinicCare</span>
            </div>
            <p className="text-default-600 text-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-default-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-default-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-default-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-default-500 hover:text-primary">
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
                    className="text-default-600 hover:text-primary text-sm transition-colors"
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
                    className="text-default-600 hover:text-primary text-sm transition-colors"
                  >
                    {tServices(`${service}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("contact")}</h3>
            <div className="space-y-3 text-sm text-default-600">
              <div>
                <p className="font-medium">📍 Address</p>
                <p>
                  123 Healthcare Street
                  <br />
                  Medical District, City 12345
                </p>
              </div>
              <div>
                <p className="font-medium">📞 Phone</p>
                <p>+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="font-medium">✉️ Email</p>
                <p>info@cliniccare.com</p>
              </div>
              <div>
                <p className="font-medium">🕒 Hours</p>
                <p>
                  Mon-Fri: 8:00 AM - 6:00 PM
                  <br />
                  Sat: 9:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-divider mt-8 pt-8 text-center">
          <p className="text-default-600 text-sm">
            © 2024 ClinicCare. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
