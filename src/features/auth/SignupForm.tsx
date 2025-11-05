"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export const SignupForm = () => {
  const t = useTranslations("auth.signup");

  return (
    <Card className="shadow-2xl">
      <CardHeader className="px-8 pt-8 pb-6" style={{ textAlign: "center" }}>
        <div
          className="space-y-4 flex flex-col items-center justify-center w-full"
          style={{ textAlign: "center" }}
        >
          <h1
            className="text-2xl font-bold w-full"
            style={{ textAlign: "center" }}
          >
            {t("title")}
          </h1>
          <p
            className="text-muted-foreground w-full"
            style={{ textAlign: "center" }}
          >
            {t("subtitle")}
          </p>
        </div>
      </CardHeader>
      <CardBody className="px-8 pb-8 space-y-6">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label={t("firstName")} />

            <Input label={t("lastName")} />
          </div>

          <Input label={t("email")} type="email" />

          <Input label={t("clinicName")} />

          <Input label={t("password")} type="password" />

          <Input label={t("confirmPassword")} type="password" />

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold"
          >
            {t("submit")}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">{t("hasAccount")} </span>
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            {t("loginLink")}
          </Link>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          {t("terms")}
        </p>
      </CardBody>
    </Card>
  );
};
