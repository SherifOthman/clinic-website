"use client";

import { useDebounce } from "@/src/core/hooks/useDebounce";
import { useAvailabilityCheck } from "@/src/features/auth/hooks/useAvailabilityCheck";
import { extractApiError } from "@/src/core/utils/api";
import { DASHBOARD_URL } from "@/src/core/constants/env";
import { useValidation } from "@/src/core/hooks/useValidation";
import { authApi, invitationApi } from "@/src/features/auth/api";
import { createAcceptInvitationSchema } from "@/src/features/auth/schemas/acceptInvitation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { setError(invalidLabel); setLoading(false); return; }
    invitationApi.getDetail(token).then((res) => {
      if (res.ok) {
        if (res.data.isAccepted) setError(acceptedLabel);
        else if (res.data.isExpired) setError(expiredLabel);
        else setInvitation(res.data);
      } else {
        setError(invalidLabel);
      }
      setLoading(false);
    });
  }, [token, invalidLabel, expiredLabel, acceptedLabel]);

  return { invitation, error, isLoading: loading };
}

export function useAcceptInvitationForm(token: string) {
  const tErr = useTranslations("auth.errors");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [done, setDone] = useState(false);
  const schema = useValidation(createAcceptInvitationSchema);

  const form = useForm<AcceptInvitationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "", userName: "", password: "", phoneNumber: "", gender: "Male",
    },
  });

  const debouncedUserName = useDebounce(form.watch("userName"), 400);

  const { checking: usernameChecking, taken: usernameTaken } =
    useAvailabilityCheck(debouncedUserName, authApi.checkUsername, {
      minLength: 2,
    });

  useEffect(() => {
    if (usernameTaken)
      form.setError("userName", { message: tErr("usernameTaken") });
    else form.clearErrors("userName");
  }, [usernameTaken]);

  async function submit(data: AcceptInvitationFormData) {
    setError(null);
    setIsPending(true);
    const result = await invitationApi.accept(token, data);
    setIsPending(false);
    if (result.ok) {
      setDone(true);
      setTimeout(() => { window.location.href = DASHBOARD_URL; }, 1500);
    } else {
      setError(extractApiError(result));
    }
  }

  return { form, error, isPending, done, submit, usernameChecking };
}
