"use client";

import { DASHBOARD_URL } from "@/src/core/constants/env";
import { invitationApi } from "@/src/features/auth/api";
import { acceptInvitationSchema, createAcceptInvitationSchema } from "@/src/features/auth/schemas/acceptInvitation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { AcceptInvitationFormData } from "@/src/features/auth/schemas/acceptInvitation";

export interface InvitationDetail {
  email: string;
  role: string;
  clinicName: string;
  specializationName?: string | null;
  isExpired: boolean;
  isAccepted: boolean;
}

export function useInvitationDetail(
  token: string | null,
  invalidLabel: string,
  expiredLabel: string,
  acceptedLabel: string,
) {
  const [invitation, setInvitation] = useState<InvitationDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) { setError(invalidLabel); return; }
    invitationApi.getDetail(token).then((res) => {
      if (res.ok) {
        if (res.data.isAccepted) setError(acceptedLabel);
        else if (res.data.isExpired) setError(expiredLabel);
        else setInvitation(res.data);
      } else {
        setError(invalidLabel);
      }
    });
  }, [token, invalidLabel, expiredLabel, acceptedLabel]);

  return { invitation, error, isLoading: !error && !invitation };
}

export function useAcceptInvitationForm(
  token: string,
  messages?: { required: string; passwordMin: string },
) {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const form = useForm<AcceptInvitationFormData>({
    resolver: zodResolver(messages ? createAcceptInvitationSchema(messages) : acceptInvitationSchema),
    defaultValues: {
      fullName: "", userName: "", password: "", phoneNumber: "", gender: "Male",
    },
  });

  async function submit(data: AcceptInvitationFormData) {
    setError(null);
    try {
      const result = await invitationApi.accept(token, data);
      if (result.ok) {
        setDone(true);
        setTimeout(() => { window.location.href = DASHBOARD_URL; }, 1500);
      } else {
        const firstError = result.errors ? Object.values(result.errors)[0]?.[0] : null;
        setError(firstError ?? result.error);
      }
    } finally {
      form.reset();
    }
  }

  return { form, error, isPending: form.formState.isSubmitting, done, submit };
}
