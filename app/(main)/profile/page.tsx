"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { subtitle, title } from "@/components/primitives";
import { TIMEOUTS } from "@/lib/constants";
import { User } from "@/types";

// Mock user data - in real app, this would come from API/auth context
const mockUser: User = {
  id: "user-123",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  clinicName: "Downtown Medical Center",
  phone: "+1 (555) 123-4567",
  role: "admin",
  isEmailVerified: true,
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-15T10:00:00Z",
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User>(mockUser);
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

      // In real app: await apiClient.updateProfile(user);
      setSuccess(true);

      // Clear success message after delay
      setTimeout(() => setSuccess(false), TIMEOUTS.REDIRECT_DELAY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof User, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-8 px-6">
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
            Profile Settings
          </h1>
          <p className={subtitle()}>
            Manage your personal information and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Personal Information
                </h2>

                {success && (
                  <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-6">
                    <p className="text-success-600 text-sm font-medium">
                      Profile updated successfully!
                    </p>
                  </div>
                )}

                {error && (
                  <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
                    <p className="text-danger-600 text-sm font-medium">
                      {error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={user.firstName}
                      onValueChange={(value) => updateField("firstName", value)}
                      isRequired
                    />
                    <Input
                      label="Last Name"
                      value={user.lastName}
                      onValueChange={(value) => updateField("lastName", value)}
                      isRequired
                    />
                  </div>

                  <Input
                    type="email"
                    label="Email Address"
                    value={user.email}
                    onValueChange={(value) => updateField("email", value)}
                    isRequired
                    endContent={
                      user.isEmailVerified ? (
                        <Chip color="success" size="sm" variant="flat">
                          Verified
                        </Chip>
                      ) : (
                        <Chip color="warning" size="sm" variant="flat">
                          Unverified
                        </Chip>
                      )
                    }
                  />

                  <Input
                    type="tel"
                    label="Phone Number"
                    value={user.phone || ""}
                    onValueChange={(value) => updateField("phone", value)}
                    placeholder="+1 (555) 123-4567"
                  />

                  <Input
                    label="Clinic Name"
                    value={user.clinicName}
                    onValueChange={(value) => updateField("clinicName", value)}
                    isRequired
                  />

                  <Divider />

                  <div className="flex justify-end gap-4">
                    <Button
                      variant="bordered"
                      onPress={() => setUser(mockUser)}
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
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold mb-6">Security</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-default-500">
                        Update your password to keep your account secure
                      </p>
                    </div>
                    <Button variant="bordered" size="sm">
                      Change
                    </Button>
                  </div>

                  <Divider />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-default-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch size="sm" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Account Overview */}
          <div>
            <Card className="mb-6">
              <CardBody className="p-6">
                <h3 className="font-semibold mb-4">Account Overview</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-default-500">Role</p>
                    <Chip color="primary" variant="flat" size="sm">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Chip>
                  </div>

                  <div>
                    <p className="text-sm text-default-500">Member Since</p>
                    <p className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-default-500">Last Updated</p>
                    <p className="font-medium">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>

                <div className="space-y-3">
                  <Button
                    variant="bordered"
                    className="w-full justify-start"
                    onPress={() => router.push("/clinic-settings")}
                  >
                    Clinic Settings
                  </Button>
                  <Button
                    variant="bordered"
                    className="w-full justify-start"
                    onPress={() =>
                      window.open("https://dashboard.clinicflow.com", "_blank")
                    }
                  >
                    Open Dashboard
                  </Button>
                  <Button
                    variant="bordered"
                    color="danger"
                    className="w-full justify-start"
                  >
                    Delete Account
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
