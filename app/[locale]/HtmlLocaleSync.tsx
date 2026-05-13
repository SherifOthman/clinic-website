"use client";

import { useLayoutEffect } from "react";

export default function HtmlLocaleSync({ locale, isRTL }: { locale: string; isRTL: boolean }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = isRTL ? "rtl" : "ltr";
  }, [locale, isRTL]);

  return null;
}
