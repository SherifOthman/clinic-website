"use client";

import { apiFetch } from "@/src/core/utils/api";
import { DASHBOARD_URL, API_URL } from "@/src/core/constants/env";
import { authApi } from "@/src/features/auth/api";
import { loginSchema, createLoginSchema } from "@/src/features/auth/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "@/src/features/auth/schemas/login";

export function useLoginForm(messages?: { required: string }) {
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(messages ? createLoginSchema(messages) : loginSchema),
    defaultValues: { emailOrUsername: "", password: "" },
  });

  const googleOAuthUrl = `${API_URL}/auth/oauth/google?returnUrl=${encodeURIComponent(DASHBOARD_URL)}`;

  useEffect(() => {
    apiFetch("GET", "/auth/me").then((result) => {
      if (result.ok) window.location.replace(DASHBOARD_URL);
      else setChecking(false);
    });
  }, []);

  function fillDemo(email: string, password: string) {
    form.setValue("emailOrUsername", email);
    form.setValue("password", password);
  }

  async function submit(data: LoginFormData) {
    setError(null);
    try {
      const result = await authApi.login(data);
      if (result.ok) window.location.replace(DASHBOARD_URL);
      else setError(result.error);
    } finally {
      form.reset();
    }
  }

  return { form, error, isPending: form.formState.isSubmitting, checking, googleOAuthUrl, fillDemo, submit };
}
