"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export const SignupForm = () => {
  const t = useTranslations("auth.signup");

  return (
    <Card className="shadow-2xl border border-divider">
      <CardHeader className="flex flex-col gap-3 pb-6">
        <h1 className="text-2xl font-bold text-center">{t("title")}</h1>
        <p className="text-default-600 text-center">{t("subtitle")}</p>
      </CardHeader>
      <CardBody className="gap-6">
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t("firstName")}
              variant="bordered"
              placeholder={t("firstNamePlaceholder")}
            />

            <Input
              label={t("lastName")}
              variant="bordered"
              placeholder={t("lastNamePlaceholder")}
            />
          </div>

          <Input
            type="email"
            label={t("email")}
            variant="bordered"
            placeholder={t("emailPlaceholder")}
          />

          <Input
            label={t("clinicName")}
            variant="bordered"
            placeholder={t("clinicNamePlaceholder")}
          />

          <Input
            type="password"
            label={t("password")}
            variant="bordered"
            placeholder={t("passwordPlaceholder")}
          />

          <Input
            type="password"
            label={t("confirmPassword")}
            variant="bordered"
            placeholder={t("confirmPasswordPlaceholder")}
          />

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="font-semibold"
          >
            {t("submit")}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-default-600">{t("hasAccount")} </span>
          <Link href="/login" className="text-primary font-medium">
            {t("loginLink")}
          </Link>
        </div>

        <p className="text-xs text-default-500 text-center">{t("terms")}</p>
      </CardBody>
    </Card>
  );
};
