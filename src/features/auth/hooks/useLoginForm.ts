"use client";

import { apiFetch } from "@/src/core/utils/api";
import { DASHBOARD_URL, API_URL } from "@/src/core/constants/env";
import { authApi } from "@/src/features/auth/api";
import { createLoginSchema } from "@/src/features/auth/schemas/login";
import { useValidation } from "@/src/core/hooks/useValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "@/src/features/auth/schemas/login";

export function useLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const locale = useLocale();
  const schema = useValidation(createLoginSchema);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(schema) as any,
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
      if (result.ok) {
        window.location.replace(DASHBOARD_URL);
      } else if (result.problem.code === "EMAIL_NOT_CONFIRMED") {
        const email = result.problem.detail ?? data.emailOrUsername;
        window.location.replace(`/${locale}/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        setError(result.problem.code ?? result.problem.detail ?? result.problem.title);
      }
    } finally {
      form.reset();
    }
  }

  return { form, error, isPending: form.formState.isSubmitting, checking, googleOAuthUrl, fillDemo, submit };
}
