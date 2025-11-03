"use client";

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
          <Input
            label={t("name")}
            variant="bordered"
            placeholder={t("namePlaceholder")}
          />

          <Input
            type="email"
            label={t("email")}
            variant="bordered"
            placeholder={t("emailPlaceholder")}
          />

          <Input
            label={t("company")}
            variant="bordered"
            placeholder={t("companyPlaceholder")}
          />

          <Textarea
            label={t("message")}
            variant="bordered"
            minRows={4}
            placeholder={t("messagePlaceholder")}
          />

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
