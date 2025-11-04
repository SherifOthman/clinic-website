"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Switch } from "@/src/components/ui/switch";
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
          <CardContent className="space-y-6">
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
          </CardContent>
        </Card>

        {/* Clinic Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">{t("clinic.title")}</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("clinic.timezone")}
              </label>
              <Select defaultValue="utc">
                <SelectTrigger>
                  <SelectValue placeholder={t("clinic.timezonePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">
                    UTC (Coordinated Universal Time)
                  </SelectItem>
                  <SelectItem value="est">
                    EST (Eastern Standard Time)
                  </SelectItem>
                  <SelectItem value="pst">
                    PST (Pacific Standard Time)
                  </SelectItem>
                  <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("clinic.dateFormat")}
              </label>
              <Select defaultValue="mm-dd-yyyy">
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("clinic.dateFormatPlaceholder")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
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
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">{t("security.title")}</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              {t("security.changePassword")}
            </Button>
            <Button variant="outline" className="w-full">
              {t("security.twoFactor")}
            </Button>
            <Button variant="outline" className="w-full">
              {t("security.loginHistory")}
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" className="font-semibold">
            {t("saveChanges")}
          </Button>
        </div>
      </div>
    </div>
  );
}
