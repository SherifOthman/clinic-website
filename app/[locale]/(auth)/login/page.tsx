"use client";

import { authApi } from "@/src/features/auth/api";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const tErr = useTranslations("auth.errors");
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();

  const [form, setForm] = useState({ emailOrUsername: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3000";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.emailOrUsername || !form.password) {
      setError(tErr("required"));
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.login(form);
      if (result.ok) {
        // Cookies are set by the backend — redirect to dashboard
        window.location.href = dashboardUrl;
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
          <label className="text-sm font-medium">{t("emailOrUsername")}</label>
          <input
            type="text"
            autoComplete="username"
            value={form.emailOrUsername}
            onChange={(e) => setForm((f) => ({ ...f, emailOrUsername: e.target.value }))}
            className="rounded-lg border border-divider bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t("password")}</label>
            <Link href={`/${locale}/forgot-password`} className="text-xs text-primary hover:underline">
              {t("forgotPassword")}
            </Link>
          </div>
          <input
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="rounded-lg border border-divider bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? t("signingIn") : t("signIn")}
        </button>
      </form>

      <p className="text-center text-sm text-default-500">
        {t("noAccount")}{" "}
        <Link href={`/${locale}/register`} className="text-primary hover:underline">
          {t("signUp")}
        </Link>
      </p>
    </div>
  );
}
