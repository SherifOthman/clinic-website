"use client";

import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { PageHeader } from "@/src/components/layout/PageHeader";

export default function ProfilePage() {
  const t = useTranslations("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Demo user data
  const user = {
    firstName: "Demo",
    lastName: "User",
    email: "demo@example.com",
    clinicName: "Demo Clinic",
    plan: "basic",
  };

  return (
    <div className="container mx-auto max-w-4xl py-16">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="flex justify-between">
              <h2 className="text-xl font-semibold">{t("personalInfo")}</h2>
              <Button variant="ghost" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? t("cancel") : t("edit")}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("firstName")}</Label>
                  <Input value={user.firstName} readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>{t("lastName")}</Label>
                  <Input value={user.lastName} readOnly={!isEditing} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("email")}</Label>
                <Input value={user.email} readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label>{t("clinicName")}</Label>
                <Input value={user.clinicName} readOnly={!isEditing} />
              </div>
              {isEditing && (
                <div className="flex gap-4">
                  <Button className="flex-1">{t("save")}</Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsEditing(false)}
                  >
                    {t("cancel")}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Profile Picture & Quick Info */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardContent className="text-center p-8">
              <Avatar className="mx-auto mb-4 h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold mb-1">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-muted-foreground mb-2">{user.clinicName}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {user.plan} Plan
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <h3 className="text-lg font-semibold">{t("accountStatus")}</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>{t("memberSince")}:</span>
                <span className="font-medium">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span>{t("lastLogin")}:</span>
                <span className="font-medium">Today</span>
              </div>
              <div className="flex justify-between">
                <span>{t("status")}:</span>
                <span className="text-green-600 font-medium">
                  {t("active")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
