"use client";

import { invitationApi } from "@/src/features/auth/api";
import { DASHBOARD_URL } from "@/src/core/constants/env";
import { useEffect, useState } from "react";

export interface InvitationDetail {
  email: string;
  role: string;
  clinicName: string;
  specializationName?: string | null;
  isExpired: boolean;
  isAccepted: boolean;
}

export interface AcceptInvitationForm {
  fullName: string;
  userName: string;
  password: string;
  phoneNumber: string;
  gender: string;
}

/**
 * Encapsulates all state and logic for the accept-invitation page.
 * Fetches invitation details on mount, handles form submission.
 */
export function useAcceptInvitation(token: string | null, invalidLabel: string, expiredLabel: string, acceptedLabel: string) {
  const [invitation, setInvitation] = useState<InvitationDetail | null>(null);
  const [loadError, setLoadError]   = useState<string | null>(null);
  const [form, setForm]             = useState<AcceptInvitationForm>({
    fullName: "", userName: "", password: "", phoneNumber: "", gender: "Male",
  });
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  useEffect(() => {
    if (!token) { setLoadError(invalidLabel); return; }
    invitationApi.getDetail(token).then((res) => {
      if (res.ok) {
        if (res.data.isAccepted) setLoadError(acceptedLabel);
        else if (res.data.isExpired) setLoadError(expiredLabel);
        else setInvitation(res.data);
      } else {
        setLoadError(invalidLabel);
      }
    });
  }, [token, invalidLabel, expiredLabel, acceptedLabel]);

  function setField(field: keyof AcceptInvitationForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function setPhone(value: string) {
    setForm((f) => ({ ...f, phoneNumber: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setLoading(true);
    try {
      const result = await invitationApi.accept(token, form);
      if (result.ok) {
        setDone(true);
        setTimeout(() => { window.location.href = DASHBOARD_URL; }, 1500);
      } else {
        const firstError = result.errors ? Object.values(result.errors)[0]?.[0] : null;
        setError(firstError ?? result.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return { invitation, loadError, form, error, loading, done, setField, setPhone, submit };
}
