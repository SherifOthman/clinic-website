"use client";

import { authApi } from "@/src/features/auth/api";
import { resetPasswordSchema, createResetPasswordSchema } from "@/src/features/auth/schemas/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ResetPasswordFormData } from "@/src/features/auth/schemas/resetPassword";

export function useResetPasswordForm(
  token: string | null,
  email: string | null,
  onSuccess: () => void,
  messages?: { passwordMin: string },
) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(messages ? createResetPasswordSchema(messages) : resetPasswordSchema),
    defaultValues: { newPassword: "" },
  });

  async function submit(data: ResetPasswordFormData) {
    if (!token || !email) return;
    setError(null);
    try {
      const result = await authApi.resetPassword({ token, email, newPassword: data.newPassword });
      if (result.ok) onSuccess();
      else setError(result.error);
    } finally {
      form.reset();
    }
  }

  return { form, error, isPending: form.formState.isSubmitting, submit };
}
