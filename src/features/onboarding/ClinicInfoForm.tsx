"use client";

import { Input, Textarea } from "@heroui/input";
import { useTranslations } from "next-intl";

export const ClinicInfoForm = () => {
  const t = useTranslations("onboarding.step3");
  const tForm = useTranslations("onboarding.clinicForm");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
          {t("title")}
        </h2>
        <p className="text-sm md:text-base text-default-600">{t("subtitle")}</p>
      </div>

      <form className="space-y-6">
        <div className="bg-content2/50 p-6 md:p-8 rounded-2xl border border-divider space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={tForm("clinicName")}
              placeholder={tForm("clinicNamePlaceholder")}
              variant="bordered"
              size="lg"
              classNames={{
                inputWrapper: "h-12 md:h-14",
              }}
            />

            <Input
              label={tForm("phone")}
              placeholder={tForm("phonePlaceholder")}
              variant="bordered"
              size="lg"
              classNames={{
                inputWrapper: "h-12 md:h-14",
              }}
            />
          </div>

          <Textarea
            label={tForm("address")}
            placeholder={tForm("addressPlaceholder")}
            variant="bordered"
            size="lg"
            minRows={3}
            maxRows={4}
          />

          <Textarea
            label={tForm("description")}
            placeholder={tForm("descriptionPlaceholder")}
            variant="bordered"
            size="lg"
            minRows={3}
            maxRows={5}
          />
        </div>

        <div className="text-center">
          <p className="text-xs md:text-sm text-default-500">
            {tForm("clinicInfoHelper")}
          </p>
        </div>
      </form>
    </div>
  );
};
