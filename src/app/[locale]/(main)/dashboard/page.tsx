"use client";

import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
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
          <Avatar className="w-16 h-16 md:w-20 md:h-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              DR
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{t("welcome")}</h1>
            <p className="text-muted-foreground">{t("role")}</p>
            <p className="text-sm text-muted-foreground">{t("clinicName")}</p>
          </div>
        </div>

        <Button size="lg" className="font-semibold shadow-lg">
          <ExternalLink className="w-5 h-5 mr-2" />
          {t("openManagement")}
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {t("todayAppointments")}
                </p>
                <p className="text-lg md:text-2xl font-bold text-primary">--</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {t("completed")}
                </p>
                <p className="text-lg md:text-2xl font-bold text-green-600">
                  --
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {t("newPatients")}
                </p>
                <p className="text-lg md:text-2xl font-bold text-blue-600">
                  --
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {t("satisfaction")}
                </p>
                <p className="text-lg md:text-2xl font-bold text-yellow-600">
                  --
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {t("nextAppointments")}
              </h3>
              <Button size="sm" variant="outline">
                {t("viewAll")}
              </Button>
            </div>
            <div className="text-center py-8 text-muted-foreground">
              {t("noAppointments")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                {t("clinicStatus")}
              </h3>
              <Badge className="bg-green-100 text-green-800">
                {t("active")}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("currentPlan")}
                  </p>
                  <p className="font-semibold">{t("planName")}</p>
                </div>
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  {t("manage")}
                </Button>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t("viewDetailedAnalytics")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="mt-8 text-center">
        <p className="text-sm text-default-600 mb-4">{t("needFullAccess")}</p>
        <Button size="lg" className="font-semibold shadow-lg">
          <ExternalLink className="w-5 h-5 mr-2" />
          {t("launchFullDashboard")}
        </Button>
      </div>
    </div>
  );
}
