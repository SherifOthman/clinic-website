"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { subtitle, title } from "@/components/primitives";
import { TIMEOUTS } from "@/lib/constants";
import { Clinic, ClinicSettings } from "@/types";

// Mock clinic data
const mockClinic: Clinic = {
  id: "clinic-123",
  name: "Downtown Medical Center",
  address: "123 Main Street, Downtown, NY 10001",
  phone: "+1 (555) 123-4567",
  email: "info@downtownmedical.com",
  website: "https://downtownmedical.com",
  description:
    "A modern healthcare facility providing comprehensive medical services to the community.",
  ownerId: "user-123",
  settings: {
    timezone: "America/New_York",
    workingHours: {
      monday: { isOpen: true, startTime: "09:00", endTime: "17:00" },
      tuesday: { isOpen: true, startTime: "09:00", endTime: "17:00" },
      wednesday: { isOpen: true, startTime: "09:00", endTime: "17:00" },
      thursday: { isOpen: true, startTime: "09:00", endTime: "17:00" },
      friday: { isOpen: true, startTime: "09:00", endTime: "17:00" },
      saturday: { isOpen: true, startTime: "10:00", endTime: "14:00" },
      sunday: { isOpen: false, startTime: "09:00", endTime: "17:00" },
    },
    appointmentDuration: 30,
    allowOnlineBooking: true,
    requireApproval: false,
    sendReminders: true,
    reminderTime: 24,
  },
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-15T10:00:00Z",
};

const timezones = [
  { key: "America/New_York", label: "Eastern Time (ET)" },
  { key: "America/Chicago", label: "Central Time (CT)" },
  { key: "America/Denver", label: "Mountain Time (MT)" },
  { key: "America/Los_Angeles", label: "Pacific Time (PT)" },
];

const appointmentDurations = [
  { key: "15", label: "15 minutes" },
  { key: "30", label: "30 minutes" },
  { key: "45", label: "45 minutes" },
  { key: "60", label: "1 hour" },
];

export default function ClinicSettingsPage() {
  const router = useRouter();
  const [clinic, setClinic] = useState<Clinic>(mockClinic);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Mock API call
      await new Promise((resolve) =>
        setTimeout(resolve, TIMEOUTS.API_SIMULATION)
      );

      // In real app: await apiClient.updateClinic(clinic);
      setSuccess(true);

      // Clear success message after delay
      setTimeout(() => setSuccess(false), TIMEOUTS.REDIRECT_DELAY);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update clinic settings"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof Clinic, value: string) => {
    setClinic((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const updateSettings = (field: keyof ClinicSettings, value: any) => {
    setClinic((prev) => ({
      ...prev,
      settings: { ...prev.settings, [field]: value },
    }));
    setError(null);
  };

  const updateWorkingHours = (day: string, field: string, value: any) => {
    setClinic((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        workingHours: {
          ...prev.settings.workingHours,
          [day]: {
            ...prev.settings.workingHours[
              day as keyof typeof prev.settings.workingHours
            ],
            [field]: value,
          },
        },
      },
    }));
    setError(null);
  };

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="light"
              onPress={() => router.back()}
              className="text-default-600"
            >
              ← Back
            </Button>
          </div>
          <h1 className={title({ size: "lg", className: "mb-2" })}>
            Clinic Settings
          </h1>
          <p className={subtitle()}>
            Manage your clinic information and operational settings
          </p>
        </div>

        {success && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-6">
            <p className="text-success-600 text-sm font-medium">
              Clinic settings updated successfully!
            </p>
          </div>
        )}

        {error && (
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
            <p className="text-danger-600 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

              <div className="space-y-6">
                <Input
                  label="Clinic Name"
                  value={clinic.name}
                  onValueChange={(value) => updateField("name", value)}
                  isRequired
                />

                <Textarea
                  label="Address"
                  value={clinic.address || ""}
                  onValueChange={(value) => updateField("address", value)}
                  placeholder="Enter your clinic's full address"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="tel"
                    label="Phone Number"
                    value={clinic.phone || ""}
                    onValueChange={(value) => updateField("phone", value)}
                    placeholder="+1 (555) 123-4567"
                  />
                  <Input
                    type="email"
                    label="Email Address"
                    value={clinic.email || ""}
                    onValueChange={(value) => updateField("email", value)}
                    placeholder="info@yourclinic.com"
                  />
                </div>

                <Input
                  type="url"
                  label="Website"
                  value={clinic.website || ""}
                  onValueChange={(value) => updateField("website", value)}
                  placeholder="https://yourclinic.com"
                />

                <Textarea
                  label="Description"
                  value={clinic.description || ""}
                  onValueChange={(value) => updateField("description", value)}
                  placeholder="Brief description of your clinic and services"
                />
              </div>
            </CardBody>
          </Card>

          {/* Operational Settings */}
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                Operational Settings
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Timezone"
                    selectedKeys={[clinic.settings.timezone]}
                    onSelectionChange={(keys) => {
                      const timezone = Array.from(keys)[0] as string;
                      updateSettings("timezone", timezone);
                    }}
                  >
                    {timezones.map((tz) => (
                      <SelectItem key={tz.key}>{tz.label}</SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Default Appointment Duration"
                    selectedKeys={[
                      clinic.settings.appointmentDuration.toString(),
                    ]}
                    onSelectionChange={(keys) => {
                      const duration = parseInt(Array.from(keys)[0] as string);
                      updateSettings("appointmentDuration", duration);
                    }}
                  >
                    {appointmentDurations.map((duration) => (
                      <SelectItem key={duration.key}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow Online Booking</p>
                      <p className="text-sm text-default-500">
                        Let patients book appointments online
                      </p>
                    </div>
                    <Switch
                      isSelected={clinic.settings.allowOnlineBooking}
                      onValueChange={(value) =>
                        updateSettings("allowOnlineBooking", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Require Approval</p>
                      <p className="text-sm text-default-500">
                        Manually approve all online bookings
                      </p>
                    </div>
                    <Switch
                      isSelected={clinic.settings.requireApproval}
                      onValueChange={(value) =>
                        updateSettings("requireApproval", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Send Reminders</p>
                      <p className="text-sm text-default-500">
                        Automatically send appointment reminders
                      </p>
                    </div>
                    <Switch
                      isSelected={clinic.settings.sendReminders}
                      onValueChange={(value) =>
                        updateSettings("sendReminders", value)
                      }
                    />
                  </div>

                  {clinic.settings.sendReminders && (
                    <Input
                      type="number"
                      label="Reminder Time (hours before)"
                      value={clinic.settings.reminderTime.toString()}
                      onValueChange={(value) =>
                        updateSettings("reminderTime", parseInt(value) || 24)
                      }
                      min="1"
                      max="168"
                    />
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-6">Working Hours</h2>

              <div className="space-y-4">
                {days.map((day) => {
                  const daySchedule =
                    clinic.settings.workingHours[
                      day.key as keyof typeof clinic.settings.workingHours
                    ];

                  return (
                    <div
                      key={day.key}
                      className="flex items-center gap-4 p-4 border border-default-200 rounded-lg"
                    >
                      <div className="w-24">
                        <p className="font-medium">{day.label}</p>
                      </div>

                      <Switch
                        isSelected={daySchedule.isOpen}
                        onValueChange={(value) =>
                          updateWorkingHours(day.key, "isOpen", value)
                        }
                      />

                      {daySchedule.isOpen && (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            type="time"
                            value={daySchedule.startTime}
                            onValueChange={(value) =>
                              updateWorkingHours(day.key, "startTime", value)
                            }
                            size="sm"
                            className="w-32"
                          />
                          <span className="text-default-500">to</span>
                          <Input
                            type="time"
                            value={daySchedule.endTime}
                            onValueChange={(value) =>
                              updateWorkingHours(day.key, "endTime", value)
                            }
                            size="sm"
                            className="w-32"
                          />
                        </div>
                      )}

                      {!daySchedule.isOpen && (
                        <div className="flex-1">
                          <Chip color="default" variant="flat" size="sm">
                            Closed
                          </Chip>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button
              variant="bordered"
              onPress={() => setClinic(mockClinic)}
              isDisabled={loading}
            >
              Reset Changes
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={loading}
              className="font-semibold"
            >
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
