"use client";

import { useEffect } from "react";

interface LocaleHandlerProps {
  locale: string;
}

export function LocaleHandler({ locale }: LocaleHandlerProps) {
  useEffect(() => {
    const isRTL = locale === "ar";
    const html = document.documentElement;

    // Only update if different to avoid unnecessary DOM manipulation
    if (html.lang !== locale) {
      html.lang = locale;
    }

    const newDir = isRTL ? "rtl" : "ltr";
    if (html.dir !== newDir) {
      html.dir = newDir;
    }
  }, [locale]);

  return null; // This component doesn't render anything
}
