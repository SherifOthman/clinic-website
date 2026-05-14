"use client";

import { ThemeSwitch } from "@/src/core/components/ui/ThemeSwitch";
import { Button } from "@heroui/react";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function AuthTopBar({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.push(pathname.replace(`/${locale}/`, `/${newLocale}/`));
  };

  return (
    <div className={className}>
      <Button variant="ghost" size="sm" onPress={switchLocale}>
        <Globe className="me-1 h-4 w-4" />
        {locale === "en" ? "العربية" : "English"}
      </Button>
      <ThemeSwitch />
    </div>
  );
}
