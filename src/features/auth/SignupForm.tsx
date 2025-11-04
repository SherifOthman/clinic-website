"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export const SignupForm = () => {
  const t = useTranslations("auth.signup");

  return (
    <Card className="shadow-2xl">
      <CardHeader className="space-y-3 pb-6">
        <h1 className="text-2xl font-bold text-center">{t("title")}</h1>
        <p className="text-muted-foreground text-center">{t("subtitle")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("firstName")}</Label>
              <Input id="firstName" placeholder={t("firstNamePlaceholder")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">{t("lastName")}</Label>
              <Input id="lastName" placeholder={t("lastNamePlaceholder")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clinicName">{t("clinicName")}</Label>
            <Input id="clinicName" placeholder={t("clinicNamePlaceholder")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder={t("confirmPasswordPlaceholder")}
            />
          </div>

          <Button type="submit" size="lg" className="w-full font-semibold">
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
      </CardContent>
    </Card>
  );
};
