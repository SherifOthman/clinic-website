"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import { useState } from "react";

import { subtitle, title } from "@/components/primitives";
import { apiClient } from "@/lib/api";
import { redirectToDashboard, setAuthCookies } from "@/lib/auth";
import { LoginRequest } from "@/types";

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = (field: keyof LoginRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.login(formData);
      setAuthCookies(response);
      redirectToDashboard(response.accessToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <Chip color="primary" variant="flat" className="mb-4">
          Welcome Back! 👋
        </Chip>
        <h1 className={title({ size: "lg", className: "mb-2" })}>Sign In</h1>
        <p className={subtitle()}>
          Access your ClinicFlow dashboard and manage your practice
        </p>
      </div>

      {/* Login Form */}
      <Card className="mb-6 bg-default-50">
        <CardBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
                <p className="text-danger-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <Input
              type="email"
              label="Email Address"
              placeholder="doctor@clinic.com"
              value={formData.email}
              onValueChange={(value) => updateFormData("email", value)}
              isRequired
              autoComplete="email"
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onValueChange={(value) => updateFormData("password", value)}
              isRequired
              autoComplete="current-password"
            />

            <div className="flex justify-end">
              <NextLink
                href="/forgot-password"
                className="text-sm text-primary hover:opacity-80 transition-opacity font-medium"
              >
                Forgot your password?
              </NextLink>
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold"
              size="lg"
              isLoading={loading}
              isDisabled={!formData.email || !formData.password}
            >
              {loading ? "Signing In..." : "Sign In to Dashboard"}
            </Button>
          </form>

          <Divider className="my-8" />

          <div className="text-center">
            <p className="text-default-600 mb-4">New to ClinicFlow?</p>
            <NextLink href="/register">
              <Button
                variant="bordered"
                color="primary"
                size="lg"
                className="w-full font-semibold"
              >
                Start Your Free Trial
              </Button>
            </NextLink>
          </div>
        </CardBody>
      </Card>

      {/* Trust Indicators */}
      <div className="mt-8 text-center">
        <div className="flex justify-center items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-default-600">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-default-600">
              Bank-Level Security
            </span>
          </div>
        </div>
        <p className="text-xs text-default-500">
          By signing in, you agree to our{" "}
          <NextLink href="/terms" className="text-primary hover:underline">
            Terms of Service
          </NextLink>{" "}
          and{" "}
          <NextLink href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </NextLink>
        </p>
      </div>
    </div>
  );
}
