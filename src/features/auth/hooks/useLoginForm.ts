"use client";

import { apiClient } from "@/src/core/utils/api";
import { authApi } from "@/src/features/auth/api";
import { DASHBOARD_URL, API_URL } from "@/src/core/constants/env";
import { useEffect, useState } from "react";

export interface LoginForm {
  emailOrUsername: string;
  password: string;
}

/**
 * Encapsulates all state and logic for the login page.
 * The page component only renders — no fetch or state here.
 */
export function useLoginForm() {
  const [form, setForm]       = useState<LoginForm>({ emailOrUsername: "", password: "" });
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const googleOAuthUrl = `${API_URL}/auth/oauth/google?returnUrl=${encodeURIComponent(DASHBOARD_URL)}`;

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    apiClient.get("/auth/me").then((result) => {
      if (result.ok) window.location.replace(DASHBOARD_URL);
      else setChecking(false);
    });
  }, []);

  function setField(field: keyof LoginForm) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function fillDemo(email: string, password: string) {
    setForm({ emailOrUsername: email, password });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.emailOrUsername || !form.password) return;
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.login(form);
      if (result.ok) window.location.replace(DASHBOARD_URL);
      else setError(result.error);
    } finally {
      setLoading(false);
    }
  }

  return { form, error, loading, checking, googleOAuthUrl, setField, fillDemo, submit };
}
