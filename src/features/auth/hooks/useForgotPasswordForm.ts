"use client";

import { authApi } from "@/src/features/auth/api";
import { useState } from "react";

/**
 * Encapsulates all state and logic for the forgot-password page.
 */
export function useForgotPasswordForm() {
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.forgotPassword({ email });
      if (result.ok) setSent(true);
      else setError(result.error);
    } finally {
      setLoading(false);
    }
  }

  return { email, setEmail, sent, error, loading, submit };
}
