"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";
import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { PageHeader } from "@/src/components/layout/PageHeader";
import { ThemeSwitch } from "@/src/components/ThemeSwitch";

export default function SettingsPage() {
  const t = useTranslations("settings");

  return (
    <div className="container mx-auto max-w-4xl py-16">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="space-y-8">
        {/* General Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">{t("general.title")}</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{t("general.language")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("general.languageDescription")}
                </p>
              </div>
              <LanguageSwitcher />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{t("general.theme")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("general.themeDescription")}
                </p>
              </div>
              <ThemeSwitch />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{t("general.notifications")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("general.notificationsDescription")}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardBody>
        </Card>

        {/* Clinic Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">{t("clinic.title")}</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("clinic.timezone")}
              </label>
              <Select
                defaultSelectedKeys={["utc"]}
                placeholder={t("clinic.timezonePlaceholder")}
              >
                <SelectItem key="utc">
                  UTC (Coordinated Universal Time)
                </SelectItem>
                <SelectItem key="est">EST (Eastern Standard Time)</SelectItem>
                <SelectItem key="pst">PST (Pacific Standard Time)</SelectItem>
                <SelectItem key="gmt">GMT (Greenwich Mean Time)</SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("clinic.dateFormat")}
              </label>
              <Select
                defaultSelectedKeys={["mm-dd-yyyy"]}
                placeholder={t("clinic.dateFormatPlaceholder")}
              >
                <SelectItem key="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                <SelectItem key="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                <SelectItem key="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
              </Select>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{t("clinic.autoReminders")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("clinic.autoRemindersDescription")}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardBody>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">{t("security.title")}</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Button variant="bordered" className="w-full">
              {t("security.changePassword")}
            </Button>
            <Button variant="bordered" className="w-full">
              {t("security.twoFactor")}
            </Button>
            <Button variant="bordered" className="w-full">
              {t("security.loginHistory")}
            </Button>
          </CardBody>
        </Card>

        <div className="flex justify-end">
          <Button color="primary" size="lg" className="font-semibold">
            {t("saveChanges")}
          </Button>
        </div>
      </div>
    </div>
  );
}
