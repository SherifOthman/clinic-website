"use client";

import { authApi } from "@/src/features/auth/api";
import { useState } from "react";

/**
 * Handles the email OTP verification step shown after registration.
 * The user receives a 6-digit code by email and enters it here.
 */
export function useVerifyEmailOtp(email: string, onSuccess: () => void) {
  const [otp, setOtp]         = useState("");
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (otp.length !== 6) return;
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.verifyEmailOtp({ email, otp });
      if (result.ok) onSuccess();
      else setError(result.error);
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setError(null);
    setResending(true);
    try {
      await authApi.resendEmailVerification({ email });
      setOtp("");
    } finally {
      setResending(false);
    }
  }

  return { otp, setOtp, error, loading, resending, submit, resend };
}
