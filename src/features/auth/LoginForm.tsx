"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/navigation";

export const LoginForm = () => {
  const t = useTranslations("auth.login");

  return (
    <Card className="shadow-2xl">
      <CardHeader className="flex-col gap-4 px-8 pt-8 pb-6 text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-default-500">{t("subtitle")}</p>
      </CardHeader>
      <CardBody className="space-y-6 px-8 pb-8 text-start">
        <form className="space-y-4">
          <Input label={t("email")} type="email" />
          <Input label={t("password")} type="password" />

          <div className="flex justify-end">
            <Link href="#" className="text-primary text-sm hover:underline">
              {t("forgotPassword")}
            </Link>
          </div>

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold"
          >
            {t("submit")}
          </Button>
        </form>

        <Divider />

        <p className="text-center text-sm">
          <span className="text-default-500">{t("noAccount")} </span>
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline"
          >
            {t("signupLink")}
          </Link>
        </p>
      </CardBody>
    </Card>
  );
};
