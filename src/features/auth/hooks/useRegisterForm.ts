"use client";

import { authApi } from "@/src/features/auth/api";
import { DASHBOARD_URL, API_URL } from "@/src/core/constants/env";
import { useState } from "react";

export interface RegisterForm {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
}

/**
 * Encapsulates all state and logic for the register page.
 */
export function useRegisterForm(onSuccess: (locale: string) => void, locale: string) {
  const [form, setForm] = useState<RegisterForm>({
    fullName: "", userName: "", email: "", password: "", phoneNumber: "", gender: "Male",
  });
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const googleOAuthUrl = `${API_URL}/auth/oauth/google?returnUrl=${encodeURIComponent(DASHBOARD_URL)}`;

  function setField(field: keyof RegisterForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function setPhone(value: string) {
    setForm((f) => ({ ...f, phoneNumber: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.register(form);
      if (result.ok) {
        onSuccess(locale);
      } else {
        const firstError = result.errors ? Object.values(result.errors)[0]?.[0] : null;
        setError(firstError ?? result.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return { form, error, loading, googleOAuthUrl, setField, setPhone, submit };
}
