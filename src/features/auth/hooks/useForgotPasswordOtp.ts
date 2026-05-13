"use client";

import { authApi } from "@/src/features/auth/api";
import { createForgotPasswordOtpSchemas } from "@/src/features/auth/schemas/forgotPasswordOtp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Step = "email" | "otp" | "password";

export function useForgotPasswordOtp(
  onSuccess: () => void,
  messages?: { required: string; invalidEmail: string; otpLength: string; passwordMin: string },
) {
  const [step, setStep] = useState<Step>("email");
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  const schemas = messages ? createForgotPasswordOtpSchemas(messages) : null;

  const fullSchema = z.object({
    email: schemas?.email ?? z.string().email(),
    otp: schemas?.otp ?? z.string().length(6),
    newPassword: schemas?.newPassword ?? z.string().min(8),
  });

  const form = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: { email: "", otp: "", newPassword: "" },
  });

  async function submitEmail() {
    const valid = await form.trigger("email");
    if (!valid) return;
    const email = form.getValues("email");
    setError(null);
    try {
      const result = await authApi.forgotPassword({ email });
      if (result.ok) setStep("otp");
      else setError(result.error);
    } catch {}
  }

  async function submitOtp() {
    const valid = await form.trigger("otp");
    if (!valid) return;
    const { email, otp } = form.getValues();
    setError(null);
    try {
      const result = await authApi.verifyResetOtp({ email, otp });
      if (result.ok) {
        setResetToken(result.data.token);
        setStep("password");
      } else {
        setError(result.error);
      }
    } catch {}
  }

  async function submitPassword() {
    const valid = await form.trigger("newPassword");
    if (!valid) return;
    const { email, newPassword } = form.getValues();
    setError(null);
    try {
      const result = await authApi.resetPassword({ email, token: resetToken, newPassword });
      if (result.ok) onSuccess();
      else setError(result.error);
    } catch {}
  }

  async function resendOtp() {
    const email = form.getValues("email");
    setError(null);
    try {
      await authApi.forgotPassword({ email });
      form.setValue("otp", "");
    } catch {}
  }

  return {
    step,
    error,
    form,
    isPending: form.formState.isSubmitting,
    submitEmail,
    submitOtp,
    submitPassword,
    resendOtp,
  };
}
