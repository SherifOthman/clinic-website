"use client";

import { authApi } from "@/src/features/auth/api";
import { createVerifyEmailOtpSchema } from "@/src/features/auth/schemas/verifyEmailOtp";
import { useValidation } from "@/src/core/hooks/useValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { VerifyEmailOtpFormData } from "@/src/features/auth/schemas/verifyEmailOtp";

export function useVerifyEmailOtp(email: string, onSuccess: () => void) {
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);
  const [otpSentAt, setOtpSentAt] = useState<number | null>(null);
  const schema = useValidation(createVerifyEmailOtpSchema);

  const form = useForm<VerifyEmailOtpFormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (email) setOtpSentAt(Date.now());
  }, [email]);

  async function submit(data: VerifyEmailOtpFormData) {
    setError(null);
    try {
      const result = await authApi.verifyEmailOtp({ email, otp: data.otp });
      if (result.ok) onSuccess();
      else setError(result.problem.code ?? result.problem.detail ?? result.problem.title);
    } finally {
      form.reset({ otp: "" }, { keepDefaultValues: true });
    }
  }

  async function resend() {
    setResendError(null);
    setResending(true);
    try {
      const result = await authApi.resendEmailVerification({ email });
      if (result.ok) {
        setOtpSentAt(Date.now());
        form.reset({ otp: "" });
      } else {
        setResendError(result.problem.code ?? result.problem.detail ?? result.problem.title);
      }
    } catch {
      setResendError("Failed to resend code");
    } finally {
      setResending(false);
    }
  }

  const clearResendError = useCallback(() => setResendError(null), []);

  return {
    form, error, isPending: form.formState.isSubmitting,
    resending, submit, resend, otpSentAt, resendError, clearResendError,
  };
}
