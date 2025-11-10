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
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/src/lib/auth";

import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            {...(user.avatar && { src: user.avatar })}
            name={`${user.firstName} ${user.lastName}`}
            className="bg-primary text-primary-foreground h-16 w-16 text-xl md:h-20 md:w-20"
          />
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Welcome, {user.firstName}!
            </h1>
            <p className="text-default-500">{user.clinicName}</p>
            <p className="text-default-500 text-sm capitalize">
              {user.plan} Plan
            </p>
          </div>
        </div>

        <DashboardClient />
      </div>

      {/* User Info Card */}
      <Card className="mb-8">
        <CardBody className="p-6">
          <h2 className="mb-4 text-xl font-bold">Account Information</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-default-500 text-sm">Full Name</p>
              <p className="font-medium">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              <p className="text-default-500 text-sm">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-default-500 text-sm">Clinic Name</p>
              <p className="font-medium">{user.clinicName}</p>
            </div>
            <div>
              <p className="text-default-500 text-sm">Plan</p>
              <p className="font-medium capitalize">{user.plan}</p>
            </div>
            {user.phone && (
              <div>
                <p className="text-default-500 text-sm">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            )}
            {user.address && (
              <div>
                <p className="text-default-500 text-sm">Address</p>
                <p className="font-medium">{user.address}</p>
              </div>
            )}
            {user.description && (
              <div className="md:col-span-2">
                <p className="text-default-500 text-sm">Description</p>
                <p className="font-medium">{user.description}</p>
              </div>
            )}
            <div>
              <p className="text-default-500 text-sm">Member Since</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Stats Overview */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        <Card className="border-primary/20 from-primary/10 to-primary/5 border bg-gradient-to-br">
          <CardBody className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 rounded-lg p-2">
                <Calendar className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-default-500 text-xs md:text-sm">
                  Today's Appointments
                </p>
                <p className="text-primary text-lg font-bold md:text-2xl">--</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-green-500/20 bg-gradient-to-br from-green-500/10 to-green-500/5">
          <CardBody className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/20 p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-default-500 text-xs md:text-sm">Completed</p>
                <p className="text-lg font-bold text-green-600 md:text-2xl">
                  --
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <CardBody className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/20 p-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-default-500 text-xs md:text-sm">
                  New Patients
                </p>
                <p className="text-lg font-bold text-blue-600 md:text-2xl">
                  --
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
          <CardBody className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-500/20 p-2">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-default-500 text-xs md:text-sm">
                  Satisfaction
                </p>
                <p className="text-lg font-bold text-yellow-600 md:text-2xl">
                  --
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardBody className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="text-primary h-5 w-5" />
                Next Appointments
              </h3>
              <Button size="sm" variant="bordered">
                View All
              </Button>
            </div>
            <div className="text-default-500 py-8 text-center">
              No appointments scheduled for today
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Activity className="text-primary h-5 w-5" />
                Clinic Status
              </h3>
              <Chip color="success" className="bg-green-100 text-green-800">
                Active
              </Chip>
            </div>

            <div className="space-y-4">
              <div className="bg-default-100 flex items-center justify-between rounded-lg p-3">
                <div>
                  <p className="text-default-500 text-sm">Current Plan</p>
                  <p className="font-semibold capitalize">{user.plan} Plan</p>
                </div>
                <Button size="sm" variant="bordered">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage
                </Button>
              </div>

              <div className="border-t pt-4">
                <Button variant="bordered" className="w-full">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Detailed Analytics
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="mt-8 text-center">
        <p className="text-default-600 mb-4 text-sm">
          Need full access to patient management, scheduling, and reports?
        </p>
        <Button color="primary" size="lg" className="font-semibold shadow-lg">
          <ExternalLink className="mr-2 h-5 w-5" />
          Launch Full Management Dashboard
        </Button>
      </div>
    </div>
  );
}
