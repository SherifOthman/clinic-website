"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const t = useTranslations("contact.form");
  const tContact = useTranslations("contact");

  return (
    <Card className="shadow-xl">
      <CardHeader className="px-8 pt-8 pb-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{tContact("title")}</h2>
          <p className="text-default-500">{tContact("subtitle")}</p>
        </div>
      </CardHeader>
      <CardBody className="px-8 pb-8">
        <form className="space-y-6">
          <Input label={t("name")} />

          <Input label={t("email")} type="email" />

          <Input label={t("company")} />

          <Textarea label={t("message")} rows={4} />

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
