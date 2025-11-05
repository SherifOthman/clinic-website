"use client";

import { Label } from "@/src/components/Label";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const t = useTranslations("contact.form");

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <h2 className="text-2xl font-bold">{t("title")}</h2>
      </CardHeader>
      <CardBody>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input id="name" placeholder={t("namePlaceholder")} />
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
            <Label htmlFor="company">{t("company")}</Label>
            <Input id="company" placeholder={t("companyPlaceholder")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea
              id="message"
              rows={4}
              placeholder={t("messagePlaceholder")}
            />
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
      </CardBody>
    </Card>
  );
};
