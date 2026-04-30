"use client";

import { authApi } from "@/src/features/auth/api";
import { useState } from "react";

/**
 * Encapsulates all state and logic for the reset-password page.
 */
export function useResetPasswordForm(
  token: string | null,
  email: string | null,
  onSuccess: () => void,
) {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError]             = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !email) return;
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.resetPassword({ token, email, newPassword });
      if (result.ok) onSuccess();
      else setError(result.error);
    } finally {
      setLoading(false);
    }
  }

  return { newPassword, setNewPassword, error, loading, submit };
}
