"use client";

import { useEffect } from "react";

interface LocaleHandlerProps {
  locale: string;
}

export function LocaleHandler({ locale }: LocaleHandlerProps) {
  useEffect(() => {
    const isRTL = locale === "ar";

    // Set HTML attributes
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [locale]);

  return null; // This component doesn't render anything
}
