"use client";

import { authApi } from "@/src/features/auth/api";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function ResetPasswordForm() {
  const t = useTranslations("auth.resetPassword");
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!email || !token) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-danger">{t("invalidLink")}</p>
        <Link href={`/${locale}/forgot-password`} className="text-sm text-primary hover:underline">
          {t("requestNew")}
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.resetPassword({ token: token!, email: email!, newPassword });
      if (result.ok) {
        router.push(`/${locale}/login?reset=1`);
      } else {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-default-500 mt-1 text-sm">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-default-500">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="rounded-lg border border-divider bg-default-50 px-3 py-2 text-sm text-default-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{t("newPassword")}</label>
          <input
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="rounded-lg border border-divider bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            required
            minLength={8}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? t("submitting") : t("submit")}
        </button>
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
