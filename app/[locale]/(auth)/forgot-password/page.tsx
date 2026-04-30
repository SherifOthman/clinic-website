"use client";

import { useForgotPasswordForm } from "@/src/features/auth/hooks/useForgotPasswordForm";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const { locale } = useParams<{ locale: string }>();

  const { email, setEmail, sent, error, loading, submit } = useForgotPasswordForm();

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl">✓</div>
        <h1 className="text-xl font-bold text-success">{t("successTitle")}</h1>
        <p className="text-sm text-default-500">{t("successMessage")}</p>
        <Link href={`/${locale}/login`} className="text-sm text-primary hover:underline">
          {t("backToLogin")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="mt-1 text-sm text-default-500">{t("subtitle")}</p>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{t("email")}</label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-divider bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? t("sending") : t("send")}
        </button>
      </form>

      <p className="text-center text-sm">
        <Link href={`/${locale}/login`} className="text-primary hover:underline">
          {t("backToLogin")}
        </Link>
      </p>
    </div>
  );
}
