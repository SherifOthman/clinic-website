import { useTranslations } from "next-intl";
import { useMemo } from "react";

export function useValidation<T>(factory: (t: (key: string) => string) => T): T {
  const t = useTranslations("auth.errors");
  return useMemo(() => factory(t), [t]);
}
