"use client";

import { DASHBOARD_URL, API_URL } from "@/src/core/constants/env";
import { authApi } from "@/src/features/auth/api";
import { registerSchema, createRegisterSchema } from "@/src/features/auth/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { RegisterFormData } from "@/src/features/auth/schemas/register";

export function useRegisterForm(
  onSuccess: (locale: string) => void,
  locale: string,
  messages?: { required: string; invalidEmail: string; passwordMin: string },
) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(messages ? createRegisterSchema(messages) : registerSchema),
    defaultValues: {
      fullName: "", userName: "", email: "", password: "", phoneNumber: "", gender: "Male",
    },
  });

  const googleOAuthUrl = `${API_URL}/auth/oauth/google?returnUrl=${encodeURIComponent(DASHBOARD_URL)}`;

  async function submit(data: RegisterFormData) {
    setError(null);
    try {
      const result = await authApi.register(data);
      if (result.ok) {
        onSuccess(locale);
      } else {
        const firstError = result.errors ? Object.values(result.errors)[0]?.[0] : null;
        setError(firstError ?? result.error);
      }
    } finally {
      form.reset();
    }
  }

  return { form, error, isPending: form.formState.isSubmitting, googleOAuthUrl, submit };
}
