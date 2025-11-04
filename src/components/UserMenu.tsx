import { Button } from "@/src/components/ui/button";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export const UserMenu = () => {
  const t = useTranslations("navigation");

  return (
    <>
      <Button variant="ghost" asChild className="hidden lg:flex">
        <Link href="/login">{t("login")}</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/signup">{t("signup")}</Link>
      </Button>
    </>
  );
};

