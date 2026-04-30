"use client";

import { useAcceptInvitation } from "@/src/features/auth/hooks/useAcceptInvitation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const inputCls = "rounded-lg border border-divider bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function AcceptInvitationForm() {
  const t = useTranslations("auth.invitation");
  const token = useSearchParams().get("token");

  const { invitation, loadError, form, error, loading, done, setField, submit } =
    useAcceptInvitation(token, t("invalid"), t("expired"));

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

  const fields = [
    { key: "fullName"    as const, label: t("fullName"), type: "text",     auto: "name" },
    { key: "userName"    as const, label: t("username"), type: "text",     auto: "username" },
    { key: "phoneNumber" as const, label: t("phone"),    type: "tel",      auto: "tel" },
    { key: "password"    as const, label: t("password"), type: "password", auto: "new-password" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="mt-1 text-sm text-default-500">
          {t("subtitle")} <span className="font-semibold text-foreground">{invitation.clinicName}</span>
        </p>
        <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {invitation.role}
        </span>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        {fields.map(({ key, label, type, auto }) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-sm font-medium">{label}</label>
            <input
              type={type}
              autoComplete={auto}
              value={form[key]}
              onChange={setField(key)}
              className={inputCls}
              required
            />
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{t("gender")}</label>
          <select value={form.gender} onChange={setField("gender")} className={inputCls}>
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
