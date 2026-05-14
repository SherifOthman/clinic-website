"use client";

import { AuthBrandingPanel } from "@/src/core/components/ui/AuthBrandingPanel";
import { ErrorAlert } from "@/src/core/components/ui/ErrorAlert";
import { GoogleIcon } from "@/src/core/components/ui/GoogleIcon";
import { FormField } from "@/src/core/components/ui/FormField";
import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { AuthTopBar } from "@/src/core/components/ui/AuthTopBar";
import { useLoginForm } from "@/src/features/auth/hooks/useLoginForm";
import { Alert, Button, Separator } from "@heroui/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Controller } from "react-hook-form";

const DEMO_USERS = [
  {
    label: "Super Admin",
    email: "superadmin@clinic.com",
    password: "SuperAdmin123!",
  },
  {
    label: "Clinic Owner",
    email: "owner@clinic.com",
    password: "ClinicOwner123!",
  },
  { label: "Doctor", email: "doctor@clinic.com", password: "Doctor123!" },
  {
    label: "Receptionist",
    email: "receptionist@clinic.com",
    password: "Receptionist123!",
  },
];

export function LoginForm() {
  const t = useTranslations("auth.login");
  const tErr = useTranslations("auth.errors");
  const tNav = useTranslations("navigation");
  const currentLocale = useLocale();
  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified") === "1";
  const { form, error, isPending, checking, googleOAuthUrl, fillDemo, submit } =
    useLoginForm();

  if (checking) return null;

  const emailErr = form.formState.errors.emailOrUsername?.message;

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side — branding */}
      <AuthBrandingPanel locale={currentLocale}>
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold leading-tight">{t("panelHeading")}</h2>
            <p className="text-base opacity-80">{t("panelSubtitle")}</p>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <span className="text-sm">0{i}</span>
                </div>
                <p className="text-sm font-medium opacity-90">{t(`feature${i}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </AuthBrandingPanel>

      {/* Right side — form */}
      <div className="relative flex w-full lg:w-1/2 flex-col items-center justify-center bg-background px-6 py-12">
        <AuthTopBar className="absolute top-4 inset-x-4 flex items-center justify-between" />

        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
            <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="mb-2 text-xs font-medium text-muted">
              {t("testAccounts")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_USERS.map((u) => (
                <Button
                  key={u.email}
                  variant="outline"
                  size="sm"
                  onPress={() => fillDemo(u.email, u.password)}
                >
                  {u.label}
                </Button>
              ))}
            </div>
          </div>

          <form
            onSubmit={form.handleSubmit(submit)}
            noValidate
            className="space-y-4"
          >
            {isVerified && (
              <Alert status="success">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>{t("emailVerified")}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}
            {error && <ErrorAlert message={tErr(error)} />}
            <Controller
              name="emailOrUsername"
              control={form.control}
              render={({ field }) => (
                <FormField
                  label={t("emailOrUsername")}
                  error={emailErr}
                  autoComplete="username"
                  {...field}
                />
              )}
            />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t("password")}</span>
                <Link
                  href={`/${currentLocale}/forgot-password`}
                  className="text-xs text-accent hover:underline"
                >
                  {t("forgotPassword")}
                </Link>
              </div>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <PasswordInput
                    label=""
                    value={field.value}
                    onChange={field.onChange}
                    autoComplete="current-password"
                    required
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isPending={isPending}
            >
              {({ isPending: ip }) => (ip ? t("signingIn") : t("signIn"))}
            </Button>
          </form>

          <p className="text-center text-sm text-muted">
            {t("noAccount")}{" "}
            <Link
              href={`/${currentLocale}/register`}
              className="font-medium text-accent hover:underline"
            >
              {t("signUp")}
            </Link>
          </p>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted">{t("or")}</span>
            <Separator className="flex-1" />
          </div>

          <a
            href={googleOAuthUrl}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-surface-secondary"
          >
            <GoogleIcon />
            {t("continueWithGoogle")}
          </a>
        </div>
      </div>
    </div>
  );
}

