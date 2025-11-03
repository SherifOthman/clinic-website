"use client";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
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
              <Button
                variant="light"
                color="primary"
                onPress={() => setIsEditing(!isEditing)}
              >
                {isEditing ? t("cancel") : t("edit")}
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={t("firstName")}
                  value={user.firstName}
                  variant="bordered"
                  isReadOnly={!isEditing}
                />
                <Input
                  label={t("lastName")}
                  value={user.lastName}
                  variant="bordered"
                  isReadOnly={!isEditing}
                />
              </div>
              <Input
                label={t("email")}
                value={user.email}
                variant="bordered"
                isReadOnly={!isEditing}
              />
              <Input
                label={t("clinicName")}
                value={user.clinicName}
                variant="bordered"
                isReadOnly={!isEditing}
              />
              {isEditing && (
                <div className="flex gap-4">
                  <Button color="primary" className="flex-1">
                    {t("save")}
                  </Button>
                  <Button
                    variant="bordered"
                    className="flex-1"
                    onPress={() => setIsEditing(false)}
                  >
                    {t("cancel")}
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Profile Picture & Quick Info */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardBody className="text-center p-8">
              <Avatar
                size="lg"
                name={`${user.firstName} ${user.lastName}`}
                className="mx-auto mb-4"
                color="primary"
              />
              <h3 className="text-lg font-semibold mb-1">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-default-600 mb-2">{user.clinicName}</p>
              <p className="text-sm text-default-500 capitalize">
                {user.plan} Plan
              </p>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <h3 className="text-lg font-semibold">{t("accountStatus")}</h3>
            </CardHeader>
            <CardBody className="space-y-3">
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
                <span className="text-success-600 font-medium">
                  {t("active")}
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
