"use client";

import { Input } from "@heroui/input";
import { useTranslations } from "next-intl";

export const ClinicNameForm = () => {
  const t = useTranslations("onboarding.step2");
  const tForm = useTranslations("onboarding.clinicForm");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2">{t("title")}</h2>
        <p className="text-sm md:text-base text-default-500">{t("subtitle")}</p>
      </div>

      <form className="space-y-6">
        <div className="bg-default-100 p-6 md:p-8 rounded-2xl border-divider border">
          <Input
            label={tForm("clinicName")}
            className="h-14 md:h-16 text-base md:text-lg"
          />
        </div>

        <div className="text-center">
          <p className="text-xs md:text-sm text-default-500">
            {tForm("clinicNameHelper")}
          </p>
        </div>
      </form>
    </div>
  );
};
