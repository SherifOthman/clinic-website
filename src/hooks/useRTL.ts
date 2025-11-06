import { useLocale } from "next-intl";

export const useRTL = () => {
  const locale = useLocale();
  return locale === "ar";
};
