"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { loginAction } from "./actions";
import { loginSchema, type LoginFormData } from "./schemas";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const result = await loginAction(data);

      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setApiError(result.error || "Server error. Please try again later");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setApiError("Network error. Please check your connection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-2xl">
      <CardHeader className="flex-col gap-4 px-8 pt-8 pb-6 text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-default-500">Sign in to your ClinicFlow account</p>
      </CardHeader>
      <CardBody className="space-y-6 px-8 pb-8 text-start">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {apiError && (
            <div className="bg-danger-50 text-danger dark:bg-danger-50/10 rounded-lg p-3 text-sm">
              {apiError}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <div className="flex justify-end">
            <Link href="#" className="text-primary text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <Divider />

        <p className="text-center text-sm">
          <span className="text-default-500">Don't have an account? </span>
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </CardBody>
    </Card>
  );
};
