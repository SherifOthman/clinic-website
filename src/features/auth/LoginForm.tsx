"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export const LoginForm = () => {
  const t = useTranslations("auth.login");

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
          <Input label={t("email")} type="email" />

          <Input label={t("password")} type="password" />

          <div className="flex justify-end">
            <a href="#" className="text-sm text-primary hover:underline">
              {t("forgotPassword")}
            </a>
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

        <div className="text-center text-sm">
          <span className="text-muted-foreground">{t("noAccount")} </span>
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline"
          >
            {t("signupLink")}
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
