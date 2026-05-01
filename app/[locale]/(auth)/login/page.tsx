"use client";

import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { useLoginForm } from "@/src/features/auth/hooks/useLoginForm";
import { Input, Label, TextField } from "@heroui/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const DEMO_USERS = [
  { label: "Super Admin",  email: "superadmin@clinic.com",   password: "SuperAdmin123!" },
  { label: "Clinic Owner", email: "owner@clinic.com",        password: "ClinicOwner123!" },
  { label: "Doctor",       email: "doctor@clinic.com",       password: "Doctor123!" },
  { label: "Receptionist", email: "receptionist@clinic.com", password: "Receptionist123!" },
];

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const { locale } = useParams<{ locale: string }>();
  const { form, error, loading, checking, googleOAuthUrl, setField, fillDemo, submit } = useLoginForm();

  if (checking) return null;

  return (
    <div className="w-full max-w-[22rem]">
      <div className="rounded-2xl border border-border bg-background shadow-lg px-8 py-8 flex flex-col gap-5">

        {/* Logo + brand */}
        <div className="flex flex-col items-center gap-2 mb-1">
          <Image src="/logo.svg" alt="ClinicCare" width={40} height={40} priority />
          <span className="text-xl font-bold text-foreground">ClinicCare</span>
          <p className="text-sm text-muted text-center">{t("subtitle")}</p>
        </div>

        {/* Demo credentials */}
        <div className="rounded-lg border border-border bg-surface p-3">
          <p className="mb-2 text-xs font-medium text-muted">Test accounts</p>
          <div className="flex flex-wrap gap-1.5">
            {DEMO_USERS.map((u) => (
              <button
                key={u.email}
                type="button"
                onClick={() => fillDemo(u.email, u.password)}
                className="rounded-md border border-border px-2 py-1 text-xs transition hover:border-accent hover:text-accent"
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}

          {/* Email / username */}
          <TextField isRequired className="flex flex-col gap-1">
            <Label>{t("emailOrUsername")}</Label>
            <Input
              type="text"
              autoComplete="username"
              value={form.emailOrUsername}
              onChange={setField("emailOrUsername")}
              className="w-full"
            />
          </TextField>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("password")}</span>
              <Link href={`/${locale}/forgot-password`} className="text-xs text-accent hover:underline">
                {t("forgotPassword")}
              </Link>
            </div>
            <PasswordInput
              label=""
              value={form.password}
              onChange={setField("password")}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 disabled:opacity-60"
          >
            {loading ? t("signingIn") : t("signIn")}
          </button>
        </form>

        <p className="text-center text-sm text-muted">
          {t("noAccount")}{" "}
          <Link href={`/${locale}/register`} className="text-accent hover:underline">
            {t("signUp")}
          </Link>
        </p>

        <OAuthDivider />
        <GoogleButton href={googleOAuthUrl} />
      </div>
    </div>
  );
}

function OAuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted">OR</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function GoogleButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium transition hover:bg-surface"
    >
      <GoogleIcon />
      Continue with Google
    </a>
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
