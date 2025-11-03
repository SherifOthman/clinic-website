"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Link as HeroLink } from "@heroui/link";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export const LoginForm = () => {
  const t = useTranslations("auth.login");

  return (
    <Card className="shadow-2xl border border-divider">
      <CardHeader className="flex flex-col gap-3 pb-6">
        <h1 className="text-2xl font-bold text-center">{t("title")}</h1>
        <p className="text-default-600 text-center">{t("subtitle")}</p>
      </CardHeader>
      <CardBody className="gap-6">
        <form className="flex flex-col gap-4">
          <Input
            type="email"
            label={t("email")}
            variant="bordered"
            placeholder={t("emailPlaceholder")}
          />

          <Input
            type="password"
            label={t("password")}
            variant="bordered"
            placeholder={t("passwordPlaceholder")}
          />

          <div className="flex justify-end">
            <HeroLink href="#" size="sm" className="text-primary">
              {t("forgotPassword")}
            </HeroLink>
          </div>

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="font-semibold"
          >
            {t("submit")}
          </Button>
        </form>

        <Divider />

        <div className="text-center">
          <span className="text-default-600">{t("noAccount")} </span>
          <Link href="/signup" className="text-primary font-medium">
            {t("signupLink")}
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
