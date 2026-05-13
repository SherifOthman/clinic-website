"use client";

import { FormField } from "@/src/core/components/ui/FormField";
import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { useLoginForm } from "@/src/features/auth/hooks/useLoginForm";
import { Alert, Button, Card, Separator } from "@heroui/react";
import { HeartHandshake, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller } from "react-hook-form";

const DEMO_USERS = [
  { label: "Super Admin",  email: "superadmin@clinic.com",   password: "SuperAdmin123!" },
  { label: "Clinic Owner", email: "owner@clinic.com",        password: "ClinicOwner123!" },
  { label: "Doctor",       email: "doctor@clinic.com",       password: "Doctor123!" },
  { label: "Receptionist", email: "receptionist@clinic.com", password: "Receptionist123!" },
];

export function LoginForm() {
  const t = useTranslations("auth.login");
  const tErr = useTranslations("auth.errors");
  const currentLocale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified") === "1";
  const { form, error, isPending, checking, googleOAuthUrl, fillDemo, submit } = useLoginForm();

  if (checking) return null;

  const emailErr = form.formState.errors.emailOrUsername?.message;
  const passErr = form.formState.errors.password?.message;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-6 py-12">
      <Card className="w-full max-w-[26rem]">
        <Card.Content className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
            <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="mb-2 text-xs font-medium text-muted">{t("testAccounts")}</p>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_USERS.map((u) => (
                <Button key={u.email} variant="outline" size="sm" onPress={() => fillDemo(u.email, u.password)}>
                  {u.label}
                </Button>
              ))}
            </div>
          </div>

          <form onSubmit={form.handleSubmit(submit)} noValidate className="space-y-4">
            {isVerified && (
              <Alert status="success">
                <Alert.Indicator />
                <Alert.Content><Alert.Description>{t("emailVerified")}</Alert.Description></Alert.Content>
              </Alert>
            )}
            {error && (
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content><Alert.Description>{tErr(error)}</Alert.Description></Alert.Content>
              </Alert>
            )}
            <FormField label={t("emailOrUsername")} error={emailErr} autoComplete="username"
              {...form.register("emailOrUsername")} />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t("password")}</span>
                <Link href={`/${currentLocale}/forgot-password`} className="text-xs text-accent hover:underline">
                  {t("forgotPassword")}
                </Link>
              </div>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                <PasswordInput label="" value={field.value} onChange={field.onChange}
                  autoComplete="current-password" required error={fieldState.error?.message} />
                )}
              />
            </div>
            <Button type="submit" variant="primary" fullWidth isPending={isPending}>
              {({ isPending: ip }) => ip ? t("signingIn") : t("signIn")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted">
            {t("noAccount")}{" "}
            <Link href={`/${currentLocale}/register`} className="font-medium text-accent hover:underline">
              {t("signUp")}
            </Link>
          </p>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted">{t("or")}</span>
            <Separator className="flex-1" />
          </div>

          <a href={googleOAuthUrl}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-surface-secondary">
            <GoogleIcon />
            {t("continueWithGoogle")}
          </a>
        </Card.Content>
      </Card>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
