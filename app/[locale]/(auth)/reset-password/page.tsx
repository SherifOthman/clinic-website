"use client";

import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { useResetPasswordForm } from "@/src/features/auth/hooks/useResetPasswordForm";
import { Alert, Button, Input, Label, TextField } from "@heroui/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResetPasswordForm() {
  const t = useTranslations("auth.resetPassword");
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const { newPassword, setNewPassword, error, loading, submit } = useResetPasswordForm(
    token,
    email,
    () => router.push(`/${locale}/login?reset=1`),
  );

  if (!email || !token) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-danger">{t("invalidLink")}</p>
        <Link href={`/${locale}/forgot-password`} className="text-sm text-accent hover:underline">
          {t("requestNew")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        {error && (
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>{error}</Alert.Description>
            </Alert.Content>
          </Alert>
        )}

        <TextField isReadOnly className="flex flex-col gap-1">
          <Label className="text-muted">Email</Label>
          <Input type="email" value={email} readOnly className="w-full opacity-60" />
        </TextField>

        <PasswordInput
          label={t("newPassword")}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
        />

        <Button type="submit" variant="primary" fullWidth isPending={loading}>
          {({ isPending }) => isPending ? t("submitting") : t("submit")}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
