"use client";

import { authApi } from "@/src/features/auth/api";
import { createResetPasswordSchema } from "@/src/features/auth/schemas/resetPassword";
import { useValidation } from "@/src/core/hooks/useValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ResetPasswordFormData } from "@/src/features/auth/schemas/resetPassword";

export function useResetPasswordForm(
  token: string | null,
  email: string | null,
  onSuccess: () => void,
) {
  const [error, setError] = useState<string | null>(null);
  const schema = useValidation(createResetPasswordSchema);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { newPassword: "" },
  });

  async function submit(data: ResetPasswordFormData) {
    if (!token || !email) return;
    setError(null);
    const result = await authApi.resetPassword({ token, email, newPassword: data.newPassword });
    if (result.ok) {
      form.reset();
      onSuccess();
    } else {
      setError(result.error);
    }
  }

  return { form, error, isPending: form.formState.isSubmitting, submit };
}
