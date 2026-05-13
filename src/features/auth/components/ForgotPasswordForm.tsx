"use client";

import { FormField } from "@/src/core/components/ui/FormField";
import { useForgotPasswordForm } from "@/src/features/auth/hooks/useForgotPasswordForm";
import { Alert, Button } from "@heroui/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

export function ForgotPasswordForm() {
  const t = useTranslations("auth.forgotPassword");
  const tErr = useTranslations("auth.errors");
  const { locale } = useParams<{ locale: string }>();
  const { form, sent, error, isPending, submit } = useForgotPasswordForm({
    required: tErr("required"),
    invalidEmail: tErr("invalidEmail"),
  });

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl">✓</div>
        <h1 className="text-xl font-bold text-success">{t("successTitle")}</h1>
        <p className="text-sm text-muted">{t("successMessage")}</p>
        <Link href={`/${locale}/login`} className="text-sm text-accent hover:underline">
          {t("backToLogin")}
        </Link>
      </div>
    );
  }

  const emailErr = form.formState.errors.email?.message;

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>
      </div>
      <form onSubmit={form.handleSubmit(submit)} noValidate className="flex flex-col gap-4">
        {error && (
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content><Alert.Description>{error}</Alert.Description></Alert.Content>
          </Alert>
        )}
        <FormField label={t("email")} error={emailErr} type="email" autoComplete="email"
          {...form.register("email")} />
        <Button type="submit" variant="primary" fullWidth isPending={isPending}>
          {({ isPending: ip }) => ip ? t("sending") : t("send")}
        </Button>
      </form>
      <p className="text-center text-sm">
        <Link href={`/${locale}/login`} className="text-accent hover:underline">
          {t("backToLogin")}
        </Link>
      </p>
    </div>
  );
}
