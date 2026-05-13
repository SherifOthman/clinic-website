"use client";

import { authApi } from "@/src/features/auth/api";
import { createForgotPasswordOtpSchema } from "@/src/features/auth/schemas/forgotPasswordOtp";
import { useValidation } from "@/src/core/hooks/useValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Step = "email" | "otp" | "password";
type FormData = z.infer<ReturnType<typeof createForgotPasswordOtpSchema>>;

export function useForgotPasswordOtp(onSuccess: () => void) {
  const [step, setStep] = useState<Step>("email");
  const [error, setError] = useState<string | null>(null);
  const [otpSentAt, setOtpSentAt] = useState<number | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);

  const schema = useValidation(createForgotPasswordOtpSchema);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", otp: "", newPassword: "" },
  });

  async function submitEmail() {
    const valid = await form.trigger("email");
    if (!valid) return;
    setError(null);
    try {
      const result = await authApi.forgotPassword({ email: form.getValues("email") });
      if (result.ok) {
        setOtpSentAt(Date.now());
        setStep("otp");
      } else {
        setError(result.problem.code ?? result.problem.detail ?? result.problem.title);
      }
    } catch {}
  }

  async function submitOtp() {
    const valid = await form.trigger("otp");
    if (!valid) return;
    setError(null);
    try {
      const { email, otp } = form.getValues();
      const result = await authApi.verifyResetOtp({ email, otp });
      if (result.ok) {
        setStep("password");
      } else {
        setError(result.problem.code ?? result.problem.detail ?? result.problem.title);
      }
    } catch {}
  }

  async function submitPassword() {
    const valid = await form.trigger("newPassword");
    if (!valid) return;
    setError(null);
    try {
      const { email, otp, newPassword } = form.getValues();
      const result = await authApi.resetPassword({ email, otp, newPassword });
      if (result.ok) onSuccess();
      else setError(result.problem.code ?? result.problem.detail ?? result.problem.title);
    } catch {}
  }

  async function resendOtp() {
    setResendError(null);
    try {
      const result = await authApi.forgotPassword({ email: form.getValues("email") });
      if (result.ok) {
        setOtpSentAt(Date.now());
        form.setValue("otp", "");
      } else {
        setResendError(result.problem.code ?? result.problem.detail ?? result.problem.title);
      }
    } catch {
      setResendError("Failed to resend code");
    }
  }

  const clearResendError = useCallback(() => setResendError(null), []);

  return {
    step, form, error, isPending: form.formState.isSubmitting,
    otpSentAt, resendError,
    submitEmail, submitOtp, submitPassword, resendOtp, clearResendError,
  };
}