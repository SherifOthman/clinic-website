"use client";

import { Label } from "@/src/components/Label";
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
      <CardHeader className="space-y-3 pb-6">
        <h1 className="text-2xl font-bold text-center">{t("title")}</h1>
        <p className="text-muted-foreground text-center">{t("subtitle")}</p>
      </CardHeader>
      <CardBody className="space-y-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
            />
          </div>

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
