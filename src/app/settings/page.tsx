"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";

import { PageHeader, ThemeSwitch } from "@/src/components";

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16">
      <PageHeader
        title="Settings"
        subtitle="Customize your ClinicFlow experience"
      />

      <div className="space-y-8">
        {/* General Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">General Settings</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-default-500 text-sm">
                  Choose between light and dark mode
                </p>
              </div>
              <ThemeSwitch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-default-500 text-sm">
                  Manage your notification preferences
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardBody>
        </Card>

        {/* Clinic Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">Clinic Settings</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <Select
                defaultSelectedKeys={["utc"]}
                placeholder="Select your timezone"
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
              <label className="text-sm font-medium">Date Format</label>
              <Select
                defaultSelectedKeys={["mm-dd-yyyy"]}
                placeholder="Select date format"
              >
                <SelectItem key="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                <SelectItem key="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                <SelectItem key="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Automatic Reminders</h3>
                <p className="text-default-500 text-sm">
                  Send automatic appointment reminders to patients
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardBody>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">Security Settings</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Button variant="bordered" className="w-full">
              Change Password
            </Button>
            <Button variant="bordered" className="w-full">
              Two-Factor Authentication
            </Button>
            <Button variant="bordered" className="w-full">
              Login History
            </Button>
          </CardBody>
        </Card>

        <div className="flex justify-end">
          <Button color="primary" size="lg" className="font-semibold">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
