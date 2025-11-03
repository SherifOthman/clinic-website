"use client";

import { Input } from "@heroui/input";
import { useTranslations } from "next-intl";

export const ClinicNameForm = () => {
  const t = useTranslations("onboarding.step2");
  const tForm = useTranslations("onboarding.clinicForm");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
          {t("title")}
        </h2>
        <p className="text-sm md:text-base text-default-600">{t("subtitle")}</p>
      </div>

      <form className="space-y-6">
        <div className="bg-content2/50 p-6 md:p-8 rounded-2xl border border-divider">
          <Input
            label={tForm("clinicName")}
            placeholder={tForm("clinicNamePlaceholder")}
            variant="bordered"
            size="lg"
            classNames={{
              input: "text-base md:text-lg",
              inputWrapper: "h-14 md:h-16",
            }}
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
