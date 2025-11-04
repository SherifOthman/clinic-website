"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const t = useTranslations("contact.form");

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <h2 className="text-2xl font-bold">{t("title")}</h2>
      </CardHeader>
      <CardContent>
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

          <Button type="submit" size="lg" className="w-full font-semibold">
            {t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

