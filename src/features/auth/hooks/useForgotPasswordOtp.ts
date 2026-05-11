"use client";

import { authApi } from "@/src/features/auth/api";
import { useState } from "react";

type Step = "email" | "otp" | "password";

/**
 * Three-step OTP-based password reset:
 *   1. email  — user enters their email, we send an OTP
 *   2. otp    — user enters the 6-digit code, we get back an Identity reset token
 *   3. password — user sets a new password using the reset token
 */
export function useForgotPasswordOtp(onSuccess: () => void) {
  const [step, setStep]           = useState<Step>("email");
  const [email, setEmail]         = useState("");
  const [otp, setOtp]             = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError]         = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);

  // Step 1: send OTP
  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.forgotPassword({ email });
      if (result.ok) setStep("otp");
      else setError(result.error);
    } finally {
      setLoading(false);
    }
  }

  // Step 2: verify OTP → get reset token
  async function submitOtp(e?: React.FormEvent) {
    e?.preventDefault();
    if (otp.length !== 6) return;
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.verifyResetOtp({ email, otp });
      if (result.ok) {
        setResetToken(result.data.token);
        setStep("password");
      } else {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  }

  // Step 3: set new password
  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.resetPassword({ email, token: resetToken, newPassword });
      if (result.ok) onSuccess();
      else setError(result.error);
    } finally {
      setLoading(false);
    }
  }

  async function resendOtp() {
    setError(null);
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setOtp("");
    } finally {
      setLoading(false);
    }
  }

  return {
    step, email, setEmail, otp, setOtp, newPassword, setNewPassword,
    error, loading,
    submitEmail, submitOtp, submitPassword, resendOtp,
  };
}
