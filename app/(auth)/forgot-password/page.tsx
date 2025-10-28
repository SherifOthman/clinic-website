"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { useState } from "react";

import { CheckIcon, ClinicIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { apiClient } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await apiClient.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset email"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <ClinicIcon className="text-primary" size={48} />
            </div>
          </div>

          <Card className="bg-default-50">
            <CardBody className="text-center py-8">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
              <p className="text-default-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-default-500 mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="space-y-3">
                <Button
                  color="primary"
                  className="w-full"
                  onPress={() => {
                    setSuccess(false);
                    setEmail("");
                  }}
                >
                  Try Again
                </Button>
                <NextLink href="/login">
                  <Button variant="bordered" className="w-full">
                    Back to Sign In
                  </Button>
                </NextLink>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ClinicIcon className="text-primary" size={48} />
          </div>
          <h1 className={title({ size: "md", className: "mb-2" })}>
            Reset Your Password
          </h1>
          <p className={subtitle()}>
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        {/* Reset Form */}
        <Card className="bg-default-50">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-6">Forgot Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-danger-50 border border-danger-200 rounded-lg p-3">
                  <p className="text-danger-600 text-sm">{error}</p>
                </div>
              )}

              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                value={email}
                onValueChange={setEmail}
                isRequired
                autoComplete="email"
                description="We'll send a password reset link to this email"
              />

              <Button
                type="submit"
                color="primary"
                className="w-full"
                size="lg"
                isLoading={loading}
                isDisabled={!email}
              >
                Send Reset Link
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-default-600">
                Remember your password?{" "}
                <NextLink
                  href="/login"
                  className="text-primary font-medium hover:opacity-80 transition-opacity"
                >
                  Sign in
                </NextLink>
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-default-500">
            Need help? Contact our{" "}
            <Link
              href="mailto:support@clinicflow.com"
              size="sm"
              className="text-primary"
            >
              support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
