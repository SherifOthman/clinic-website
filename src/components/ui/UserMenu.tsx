import { Button } from "@heroui/button";
import { NavbarItem } from "@heroui/navbar";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export const UserMenu = () => {
  const t = useTranslations("navigation");

  return (
    <>
      <NavbarItem className="hidden lg:flex">
        <Link
          href="/login"
          className="text-foreground/70 hover:text-foreground font-medium"
        >
          {t("login")}
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/signup">
          <Button
            color="primary"
            variant="solid"
            size="sm"
            className="font-medium"
          >
            {t("signup")}
          </Button>
        </Link>
      </NavbarItem>
    </>
  );
};
