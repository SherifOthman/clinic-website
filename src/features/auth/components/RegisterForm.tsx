"use client";

import { FormField } from "@/src/core/components/ui/FormField";
import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { PhoneInput } from "@/src/core/components/ui/PhoneInput";
import { useRegisterForm } from "@/src/features/auth/hooks/useRegisterForm";
import { Alert, Button, Card, FieldError, Label, ListBox, Select, Separator } from "@heroui/react";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Checking indicator for availability validation ─────────────────────────

function CheckingIndicator({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-muted">
      <Loader2 className="h-3 w-3 animate-spin" />
      <LocaleAwareChecking />
    </p>
  );
}

function LocaleAwareChecking() {
  const tErr = useTranslations("auth.errors");
  return <>{tErr("checking")}</>;
}

// ─── Gender select field ────────────────────────────────────────────────────

function GenderSelect({ t, value, onChange, error }: {
  t: (key: string) => string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) {
  return (
    <Select isRequired isInvalid={!!error} variant="secondary" defaultValue="Male"
      value={value}
      onChange={(key) => { onChange(key as string); }}
      placeholder={t("selectGender")} className="flex flex-col gap-1.5"
    >
      <Label>{t("gender")}</Label>
      <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="Male" textValue={t("male")}>{t("male")}<ListBox.ItemIndicator /></ListBox.Item>
          <ListBox.Item id="Female" textValue={t("female")}>{t("female")}<ListBox.ItemIndicator /></ListBox.Item>
        </ListBox>
      </Select.Popover>
      <FieldError>{error}</FieldError>
    </Select>
  );
}

// ─── Google icon (inline SVG) ───────────────────────────────────────────────

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

// ─── Main form ──────────────────────────────────────────────────────────────

export function RegisterForm() {
  const t = useTranslations("auth.register");
  const currentLocale = useLocale();
  const router = useRouter();

  const { form, error, isPending, googleOAuthUrl, submit, emailChecking, usernameChecking } = useRegisterForm(
    (loc) => router.push(`/${loc}/verify-email?email=${encodeURIComponent(form.getValues("email"))}`),
    currentLocale,
  );

  const err = form.formState.errors;
  const fullNameErr = err.fullName?.message;
  const userNameErr = err.userName?.message;
  const emailErr = err.email?.message;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-6 py-12">
      <Card className="w-full max-w-[26rem]">
        <Card.Content className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
            <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>
          </div>

          <form onSubmit={form.handleSubmit(submit)} noValidate className="space-y-4">
            {error && (
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content><Alert.Description>{error}</Alert.Description></Alert.Content>
              </Alert>
            )}

            {/* Full name */}
            <FormField label={t("fullName")} error={fullNameErr} autoComplete="name"
              {...form.register("fullName")} />

            {/* Username */}
            <div className="space-y-1">
              <FormField label={t("username")} error={userNameErr} autoComplete="username"
                {...form.register("userName")} />
              <CheckingIndicator visible={usernameChecking} />
            </div>

            {/* Email with availability check */}
            <div className="space-y-1">
              <FormField label={t("email")} error={emailErr} type="email" autoComplete="email"
                {...form.register("email")} />
              <CheckingIndicator visible={emailChecking} />
            </div>

            {/* Phone */}
            <PhoneInput label={t("phone")} value={form.watch("phoneNumber")}
              onChange={(value) => form.setValue("phoneNumber", value, { shouldValidate: true })}
              required searchPlaceholder={t("searchCountry")}
              isInvalid={!!err.phoneNumber} errorMessage={err.phoneNumber?.message} />

            {/* Gender */}
            <GenderSelect t={t} value={form.watch("gender")}
              onChange={(val) => form.setValue("gender", val, { shouldValidate: true })}
              error={err.gender?.message} />

            {/* Password */}
            <PasswordInput label={t("password")} value={form.watch("password")} variant="secondary"
              onChange={form.register("password").onChange} autoComplete="new-password" required
              error={err.password?.message} />

            <Button type="submit" variant="primary" fullWidth isPending={isPending}>
              {({ isPending: ip }) => ip ? t("submitting") : t("submit")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted">
            {t("haveAccount")}{" "}
            <Link href={`/${currentLocale}/login`} className="font-medium text-accent hover:underline">
              {t("signIn")}
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
            {t("signUpWithGoogle")}
          </a>
        </Card.Content>
      </Card>
    </div>
  );
}
