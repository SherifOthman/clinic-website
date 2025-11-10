"use client";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { useState } from "react";

import { PageHeader } from "@/src/components";

export default function ProfilePage() {
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
      <PageHeader
        title="Profile"
        subtitle="Manage your account information and preferences"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="flex justify-between">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <Button variant="light" onPress={() => setIsEditing(!isEditing)}>
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={user.firstName}
                  readOnly={!isEditing}
                />
                <Input
                  label="Last Name"
                  value={user.lastName}
                  readOnly={!isEditing}
                />
              </div>
              <Input label="Email" value={user.email} readOnly={!isEditing} />
              <Input
                label="Clinic Name"
                value={user.clinicName}
                readOnly={!isEditing}
              />
              {isEditing && (
                <div className="flex gap-4">
                  <Button color="primary" className="flex-1">
                    Save
                  </Button>
                  <Button
                    variant="bordered"
                    className="flex-1"
                    onPress={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Profile Picture & Quick Info */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardBody className="p-8 text-center">
              <Avatar
                name={`${user.firstName} ${user.lastName}`}
                className="bg-primary text-primary-foreground mx-auto mb-4 h-16 w-16 text-lg"
              />
              <h3 className="mb-1 text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-default-500 mb-2">{user.clinicName}</p>
              <p className="text-default-500 text-sm capitalize">
                {user.plan} Plan
              </p>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <h3 className="text-lg font-semibold">Account Status</h3>
            </CardHeader>
            <CardBody className="space-y-3">
              <div className="flex justify-between">
                <span>Member Since:</span>
                <span className="font-medium">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Last Login:</span>
                <span className="font-medium">Today</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
