"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { CheckIcon, ClinicIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { apiClient } from "@/lib/api";
import { TIMEOUTS } from "@/lib/constants";

function ResetPasswordPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setError("Invalid or missing reset token");
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await apiClient.resetPassword(token, password);
      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, TIMEOUTS.REDIRECT_DELAY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
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
              <h2 className="text-xl font-semibold mb-2">
                Password Reset Successful
              </h2>
              <p className="text-default-600 mb-6">
                Your password has been successfully reset. You can now sign in
                with your new password.
              </p>
              <p className="text-sm text-default-500 mb-6">
                You'll be redirected to the sign in page in a few seconds...
              </p>
              <NextLink href="/login">
                <Button color="primary" className="w-full">
                  Sign In Now
                </Button>
              </NextLink>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  if (!token) {
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
              <h2 className="text-xl font-semibold mb-2 text-danger">
                Invalid Reset Link
              </h2>
              <p className="text-default-600 mb-6">
                This password reset link is invalid or has expired. Please
                request a new one.
              </p>
              <div className="space-y-3">
                <NextLink href="/forgot-password">
                  <Button color="primary" className="w-full">
                    Request New Reset Link
                  </Button>
                </NextLink>
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
            Set New Password
          </h1>
          <p className={subtitle()}>Enter your new password below</p>
        </div>

        {/* Reset Form */}
        <Card className="bg-default-50">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-6">Reset Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-danger-50 border border-danger-200 rounded-lg p-3">
                  <p className="text-danger-600 text-sm">{error}</p>
                </div>
              )}

              <Input
                type="password"
                label="New Password"
                placeholder="Enter your new password"
                value={password}
                onValueChange={setPassword}
                isRequired
                description="Password must be at least 8 characters long"
              />

              <Input
                type="password"
                label="Confirm New Password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                isRequired
                color={
                  confirmPassword && password !== confirmPassword
                    ? "danger"
                    : "default"
                }
                errorMessage={
                  confirmPassword && password !== confirmPassword
                    ? "Passwords do not match"
                    : ""
                }
              />

              <Button
                type="submit"
                color="primary"
                className="w-full"
                size="lg"
                isLoading={loading}
                isDisabled={
                  !password || !confirmPassword || password !== confirmPassword
                }
              >
                Reset Password
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
      </div>
    </div>
  );
}
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <ClinicIcon className="mx-auto mb-4 text-primary" size={48} />
            <p className="text-default-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordPageContent />
    </Suspense>
  );
}
