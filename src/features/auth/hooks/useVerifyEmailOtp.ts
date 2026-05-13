"use client";

import { authApi } from "@/src/features/auth/api";
import { createVerifyEmailOtpSchema } from "@/src/features/auth/schemas/verifyEmailOtp";
import { useValidation } from "@/src/core/hooks/useValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { VerifyEmailOtpFormData } from "@/src/features/auth/schemas/verifyEmailOtp";

export function useVerifyEmailOtp(email: string, onSuccess: () => void) {
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const schema = useValidation(createVerifyEmailOtpSchema);

  const form = useForm<VerifyEmailOtpFormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { otp: "" },
  });

  async function submit(data: VerifyEmailOtpFormData) {
    setError(null);
    try {
      const result = await authApi.verifyEmailOtp({ email, otp: data.otp });
      if (result.ok) onSuccess();
      else setError(result.error);
    } finally {
      form.reset({ otp: "" }, { keepDefaultValues: true });
    }
  }

  async function resend() {
    setError(null);
    setResending(true);
    try {
      await authApi.resendEmailVerification({ email });
      form.reset({ otp: "" });
    } finally {
      setResending(false);
    }
  }

  return { form, error, isPending: form.formState.isSubmitting, resending, submit, resend };
}
