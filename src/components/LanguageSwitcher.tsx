"use client";

import { Button } from "@heroui/button";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/src/i18n/routing";

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const languages = [
    {
      code: "en",
      name: "English",
      shortName: "EN",
      fullName: "English",
      flagSvg: (
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
      ),
    },
    {
      code: "ar",
      name: "العربية",
      shortName: "ع",
      fullName: "العربية",
      flagSvg: (
        <svg className="w-5 h-4" viewBox="0 0 900 600">
          <rect width="900" height="600" fill="#165B33" />
          <text
            x="450"
            y="350"
            fontSize="200"
            fill="#fff"
            textAnchor="middle"
            fontFamily="Arial"
          >
            🗡
          </text>
        </svg>
      ),
    },
  ];

  // Get the opposite language to show on the button
  const oppositeLanguage = languages.find((lang) => lang.code !== locale);

  const handleLanguageChange = () => {
    if (!oppositeLanguage) return;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: oppositeLanguage.code }
      );
    });
  };

  return (
    <Button
      variant="light"
      size="sm"
      className="min-w-unit-24 h-8 px-3 gap-2"
      onPress={handleLanguageChange}
      isDisabled={isPending}
      title={`Switch to ${oppositeLanguage?.fullName}`}
    >
      <span className="flex items-center">{oppositeLanguage?.flagSvg}</span>
      <span className="text-sm font-medium">{oppositeLanguage?.shortName}</span>
    </Button>
  );
};
