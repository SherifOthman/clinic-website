"use client";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import {
  Activity,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  Settings,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="container mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Avatar size="lg" className="w-16 h-16 md:w-20 md:h-20" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{t("welcome")}</h1>
            <p className="text-default-600">{t("role")}</p>
            <p className="text-sm text-default-500">{t("clinicName")}</p>
          </div>
        </div>

        <Button
          color="primary"
          size="lg"
          className="font-semibold shadow-lg"
          startContent={<ExternalLink className="w-5 h-5" />}
        >
          {t("openManagement")}
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <CardBody className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-default-600">
                  {t("todayAppointments")}
                </p>
                <p className="text-lg md:text-2xl font-bold text-primary">--</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <CardBody className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-default-600">
                  {t("completed")}
                </p>
                <p className="text-lg md:text-2xl font-bold text-success">--</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
          <CardBody className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-default-600">
                  {t("newPatients")}
                </p>
                <p className="text-lg md:text-2xl font-bold text-secondary">
                  --
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <CardBody className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/20 rounded-lg">
                <Star className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-default-600">
                  {t("satisfaction")}
                </p>
                <p className="text-lg md:text-2xl font-bold text-warning">--</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments */}
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {t("nextAppointments")}
              </h3>
              <Button size="sm" variant="flat">
                {t("viewAll")}
              </Button>
            </div>
            <div className="text-center py-8 text-default-500">
              {t("noAppointments")}
            </div>
          </CardBody>
        </Card>

        {/* Clinic Status */}
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                {t("clinicStatus")}
              </h3>
              <Chip color="success" variant="flat">
                {t("active")}
              </Chip>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-content2/50 rounded-lg">
                <div>
                  <p className="text-sm text-default-600">{t("currentPlan")}</p>
                  <p className="font-semibold">{t("planName")}</p>
                </div>
                <Button
                  size="sm"
                  variant="flat"
                  startContent={<Settings className="w-4 h-4" />}
                >
                  {t("manage")}
                </Button>
              </div>

              <div className="pt-4 border-t border-divider">
                <Button
                  color="primary"
                  variant="flat"
                  className="w-full"
                  startContent={<TrendingUp className="w-4 h-4" />}
                >
                  {t("viewDetailedAnalytics")}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="mt-8 text-center">
        <p className="text-sm text-default-600 mb-4">{t("needFullAccess")}</p>
        <Button
          color="primary"
          size="lg"
          variant="shadow"
          className="font-semibold"
          startContent={<ExternalLink className="w-5 h-5" />}
        >
          {t("launchFullDashboard")}
        </Button>
      </div>
    </div>
  );
}
