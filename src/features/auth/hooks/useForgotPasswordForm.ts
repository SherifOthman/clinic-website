"use client";

import { authApi } from "@/src/features/auth/api";
import { createForgotPasswordSchema } from "@/src/features/auth/schemas/forgotPassword";
import { useValidation } from "@/src/core/hooks/useValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ForgotPasswordFormData } from "@/src/features/auth/schemas/forgotPassword";

export function useForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const schema = useValidation(createForgotPasswordSchema);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { email: "" },
  });

  async function submit(data: ForgotPasswordFormData) {
    setError(null);
    try {
      const result = await authApi.forgotPassword(data);
      if (result.ok) setSent(true);
      else setError(result.problem.detail ?? result.problem.title);
    } finally {
      form.reset();
    }
  }

  return { form, sent, error, isPending: form.formState.isSubmitting, submit };
}
