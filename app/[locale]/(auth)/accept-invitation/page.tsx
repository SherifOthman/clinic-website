"use client";

import { invitationApi } from "@/src/features/auth/api";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface InvitationDetail {
  email: string;
  role: string;
  clinicName: string;
  isExpired: boolean;
}

function AcceptInvitationForm() {
  const t = useTranslations("auth.invitation");
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [invitation, setInvitation] = useState<InvitationDetail | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "", userName: "", password: "", phoneNumber: "", gender: "Male",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3000";

  useEffect(() => {
    if (!token) { setLoadError(t("invalid")); return; }
    invitationApi.getDetail(token).then((res) => {
      if (res.ok) {
        if (res.data.isExpired) setLoadError(t("expired"));
        else setInvitation(res.data);
      } else {
        setLoadError(t("invalid"));
      }
    });
  }, [token]);

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setLoading(true);
    try {
      const result = await invitationApi.accept(token, form);
      if (result.ok) {
        setDone(true);
        setTimeout(() => { window.location.href = dashboardUrl; }, 1500);
      } else {
        const firstError = result.errors ? Object.values(result.errors)[0]?.[0] : null;
        setError(firstError ?? result.error);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-danger">{loadError}</p>
      </div>
    );
  }

  if (!invitation) {
    return <div className="text-center text-default-500">Loading...</div>;
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl">✓</div>
        <p className="font-semibold text-success">Invitation accepted! Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-default-500 mt-1 text-sm">
          {t("subtitle")} <span className="font-semibold text-foreground">{invitation.clinicName}</span>
        </p>
        <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {invitation.role}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        {[
          { field: "fullName", label: t("fullName"), type: "text", auto: "name" },
          { field: "userName", label: t("username"), type: "text", auto: "username" },
          { field: "phoneNumber", label: t("phone"), type: "tel", auto: "tel" },
          { field: "password", label: t("password"), type: "password", auto: "new-password" },
        ].map(({ field, label, type, auto }) => (
          <div key={field} className="flex flex-col gap-1">
            <label className="text-sm font-medium">{label}</label>
            <input
              type={type}
              autoComplete={auto}
              value={(form as any)[field]}
              onChange={set(field)}
              className="rounded-lg border border-divider bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              required
            />
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{t("gender")}</label>
          <select
            value={form.gender}
            onChange={set("gender")}
            className="rounded-lg border border-divider bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="Male">{t("male")}</option>
            <option value="Female">{t("female")}</option>
          </select>
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

export default function AcceptInvitationPage() {
  return (
    <Suspense>
      <AcceptInvitationForm />
    </Suspense>
  );
}
