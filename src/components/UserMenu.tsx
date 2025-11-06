"use client";

import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/navigation";

export const UserMenu = () => {
  const t = useTranslations("navigation");

  return (
    <>
      <Button
        as={Link}
        href="/login"
        variant="light"
        className="hidden lg:flex"
      >
        {t("login")}
      </Button>
      <Button as={Link} href="/signup" color="primary" size="sm">
        {t("signup")}
      </Button>
    </>
  );
};
