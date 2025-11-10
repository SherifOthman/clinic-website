"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { signupAction } from "./actions";
import { signupSchema, type SignupFormData } from "./schemas";

export const SignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const result = await signupAction(data);

      if (result.success) {
        router.push("/onboarding");
        router.refresh();
      } else {
        setApiError(result.error || "Server error. Please try again later");
      }
    } catch {
      setApiError("Network error. Please check your connection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-2xl">
      <CardHeader className="flex-col gap-4 px-8 pt-8 pb-6 text-center">
        <h1 className="text-2xl font-bold">Get Started</h1>
        <p className="text-default-500">Create your ClinicFlow account</p>
      </CardHeader>
      <CardBody className="space-y-6 px-8 pb-8 text-start">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {apiError && (
            <div className="bg-danger-50 text-danger dark:bg-danger-50/10 rounded-lg p-3 text-sm">
              {apiError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              {...register("firstName")}
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName?.message}
            />

            <Input
              label="Last Name"
              {...register("lastName")}
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName?.message}
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />

          <Input
            label="Clinic Name"
            {...register("clinicName")}
            isInvalid={!!errors.clinicName}
            errorMessage={errors.clinicName?.message}
          />

          <Input
            label="Password"
            type="password"
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold"
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-default-500">Already have an account? </span>
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign in here
          </Link>
        </div>

        <p className="text-default-500 text-center text-xs">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </CardBody>
    </Card>
  );
};
