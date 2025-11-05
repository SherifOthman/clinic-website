import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export const UserMenu = () => {
  const t = useTranslations("navigation");

  return (
    <>
      <Button
        variant="light"
        as={Link}
        href="/login"
        className="hidden lg:flex"
      >
        {t("login")}
      </Button>
      <Button color="primary" as={Link} href="/signup" size="sm">
        {t("signup")}
      </Button>
    </>
  );
};
