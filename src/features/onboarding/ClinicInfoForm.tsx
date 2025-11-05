"use client";

import { Input, Textarea } from "@heroui/input";
import { useTranslations } from "next-intl";

export const ClinicInfoForm = () => {
  const t = useTranslations("onboarding.step3");
  const tForm = useTranslations("onboarding.clinicForm");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2">{t("title")}</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <form className="space-y-6">
        <div className="bg-muted/50 p-6 md:p-8 rounded-2xl border space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label={tForm("clinicName")} className="h-12 md:h-14" />

            <Input label={tForm("phone")} className="h-12 md:h-14" />
          </div>

          <Textarea label={tForm("address")} rows={3} />

          <Textarea label={tForm("description")} rows={4} />
        </div>

        <div className="text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            {tForm("clinicInfoHelper")}
          </p>
        </div>
      </form>
    </div>
  );
};
