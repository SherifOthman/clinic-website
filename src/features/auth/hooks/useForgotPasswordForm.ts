"use client";

import { authApi } from "@/src/features/auth/api";
import { forgotPasswordSchema, createForgotPasswordSchema } from "@/src/features/auth/schemas/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ForgotPasswordFormData } from "@/src/features/auth/schemas/forgotPassword";

export function useForgotPasswordForm(messages?: { required: string; invalidEmail: string }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(messages ? createForgotPasswordSchema(messages) : forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function submit(data: ForgotPasswordFormData) {
    setError(null);
    try {
      const result = await authApi.forgotPassword(data);
      if (result.ok) setSent(true);
      else setError(result.error);
    } finally {
      form.reset();
    }
  }

  return { form, sent, error, isPending: form.formState.isSubmitting, submit };
}
