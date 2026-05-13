"use client";

import { DASHBOARD_URL, API_URL } from "@/src/core/constants/env";
import { useDebounce } from "@/src/core/hooks/useDebounce";
import { useValidation } from "@/src/core/hooks/useValidation";
import { useAvailabilityCheck } from "@/src/features/auth/hooks/useAvailabilityCheck";
import { authApi } from "@/src/features/auth/api";
import { createRegisterSchema } from "@/src/features/auth/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { RegisterFormData } from "@/src/features/auth/schemas/register";
import { useTranslations } from "next-intl";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useRegisterForm(
  onSuccess: (locale: string) => void,
  locale: string,
) {
  const [error, setError] = useState<string | null>(null);
  const tErr = useTranslations("auth.errors");
  const schema = useValidation(createRegisterSchema);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      fullName: "", userName: "", email: "", password: "", phoneNumber: "", gender: "Male",
    },
  });

  const debouncedEmail = useDebounce(form.watch("email"), 400);
  const debouncedUserName = useDebounce(form.watch("userName"), 400);

  const { checking: emailChecking, taken: emailTaken } = useAvailabilityCheck(
    debouncedEmail, authApi.checkEmail, { pattern: EMAIL_RE },
  );

  const { checking: usernameChecking, taken: usernameTaken } = useAvailabilityCheck(
    debouncedUserName, authApi.checkUsername, { minLength: 2 },
  );

  useEffect(() => {
    if (emailTaken) form.setError("email", { message: tErr("emailTaken") });
    else form.clearErrors("email");
  }, [emailTaken]);

  useEffect(() => {
    if (usernameTaken) form.setError("userName", { message: tErr("usernameTaken") });
    else form.clearErrors("userName");
  }, [usernameTaken]);

  const googleOAuthUrl = `${API_URL}/auth/oauth/google?returnUrl=${encodeURIComponent(DASHBOARD_URL)}`;

  async function submit(data: RegisterFormData) {
    setError(null);
    const result = await authApi.register(data);
    if (result.ok) {
      form.reset();
      onSuccess(locale);
    } else {
      if (result.problem.errors) {
        setError(null);
      } else {
        setError(result.problem.detail ?? result.problem.title);
      }
    }
  }

  return {
    form, error, isPending: form.formState.isSubmitting,
    googleOAuthUrl, submit, emailChecking, usernameChecking,
  };
}
