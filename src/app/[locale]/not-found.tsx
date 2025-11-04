"use client";

import { Button } from "@/src/components/ui/button";
import { Home, Mail, Search } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import { Link } from "@/src/i18n/routing";

export default function NotFound() {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback translations
  const translations = {
    en: {
      title: "Page Not Found",
      description:
        "The page you're looking for doesn't exist or has been moved.",
      goHome: "Go Home",
      contactSupport: "Contact Support",
      helpfulLinks: "You might be looking for:",
      home: "Home",
      about: "About",
      pricing: "Pricing",
      contact: "Contact",
    },
    ar: {
      title: "الصفحة غير موجودة",
      description: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
      goHome: "العودة للرئيسية",
      contactSupport: "اتصل بالدعم",
      helpfulLinks: "قد تبحث عن:",
      home: "الرئيسية",
      about: "حولنا",
      pricing: "الأسعار",
      contact: "اتصل بنا",
    },
  };

  const t =
    translations[locale as keyof typeof translations] || translations.en;
  const isRTL = locale === "ar";

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background to-muted/50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-8">
          <div className="text-[180px] sm:text-[220px] font-bold text-primary/10 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search
              className="w-20 h-20 sm:w-24 sm:h-24 text-primary/40"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {t.title}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg mx-auto">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="min-w-[180px]">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              {t.goHome}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[180px]">
            <Link href="/contact">
              <Mail className="w-5 h-5 mr-2" />
              {t.contactSupport}
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">{t.helpfulLinks}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              {t.home}
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/about"
              className="text-sm text-primary hover:underline"
            >
              {t.about}
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/pricing"
              className="text-sm text-primary hover:underline"
            >
              {t.pricing}
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/contact"
              className="text-sm text-primary hover:underline"
            >
              {t.contact}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
