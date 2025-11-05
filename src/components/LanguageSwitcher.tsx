"use client";

import { Button } from "@heroui/button";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/src/i18n/routing";

const FlagUK = () => (
  <svg className="w-5 h-4" viewBox="0 0 60 30">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath="url(#t)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const FlagSA = () => (
  <svg className="w-5 h-4" viewBox="0 0 900 600">
    <rect width="900" height="600" fill="#165B33" />
    <g fill="#fff">
      <path d="M 150,300 Q 150,200 200,200 Q 250,200 250,250 L 250,350 Q 250,400 200,400 Q 150,400 150,300 M 200,230 Q 180,230 180,250 L 180,350 Q 180,370 200,370 Q 220,370 220,350 L 220,250 Q 220,230 200,230" />
      <path d="M 280,200 L 350,200 L 350,230 L 310,230 L 310,280 L 340,280 L 340,310 L 310,310 L 310,370 L 350,370 L 350,400 L 280,400 Z" />
      <rect x="650" y="250" width="100" height="30" />
      <rect x="680" y="220" width="40" height="90" />
    </g>
  </svg>
);

const languages = {
  en: { shortName: "EN", fullName: "English", FlagComponent: FlagUK },
  ar: { shortName: "ع", fullName: "العربية", FlagComponent: FlagSA },
} as const;

export const LanguageSwitcher = () => {
  const locale = useLocale() as keyof typeof languages;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const oppositeLocale = locale === "en" ? "ar" : "en";
  const oppositeLanguage = languages[oppositeLocale];
  const FlagComponent = oppositeLanguage.FlagComponent;

  const handleLanguageChange = () => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: oppositeLocale }
      );
    });
  };

  return (
    <Button
      variant="light"
      size="sm"
      className="h-8 px-3 gap-2"
      onPress={handleLanguageChange}
      isDisabled={isPending}
      title={`Switch to ${oppositeLanguage.fullName}`}
    >
      <FlagComponent />
      <span className="text-sm font-medium">{oppositeLanguage.shortName}</span>
    </Button>
  );
};
