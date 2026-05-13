"use client";

import { authApi } from "@/src/features/auth/api";
import { useCallback, useEffect, useState } from "react";

export function useVerifyEmailOtp(email: string, onSuccess: () => void) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);
  const [otpSentAt, setOtpSentAt] = useState<number | null>(null);

  useEffect(() => {
    if (email) setOtpSentAt(Date.now());
  }, [email]);

  async function submit() {
    if (otp.length !== 6) return;
    setError(null);
    setIsPending(true);
    try {
      const result = await authApi.verifyEmailOtp({ email, otp });
      if (result.ok) onSuccess();
      else setError(result.problem.code ?? result.problem.detail ?? result.problem.title);
    } finally {
      setOtp("");
      setIsPending(false);
    }
  }

  async function resend() {
    setResendError(null);
    setResending(true);
    try {
      const result = await authApi.resendEmailVerification({ email });
      if (result.ok) {
        setOtpSentAt(Date.now());
        setOtp("");
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
    otp, setOtp, error, isPending,
    resending, submit, resend, otpSentAt, resendError, clearResendError,
  };
}
