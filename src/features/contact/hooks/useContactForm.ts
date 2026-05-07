"use client";

import { apiClient } from "@/src/core/utils/api";
import { useState } from "react";

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: ContactForm = {
  firstName: "", lastName: "", email: "",
  subject: "", message: "",
};

/**
 * Encapsulates all state and logic for the contact form.
 * ContactPage only renders — no fetch or state there.
 */
export function useContactForm(somethingWentWrong: string) {
  const [form, setForm]       = useState<ContactForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState<string | null>(null);

  function setField(field: keyof ContactForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function reset() {
    setSent(false);
    setForm(EMPTY_FORM);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await apiClient.post("/contact", form);
      if (result.ok) setSent(true);
      else setError(result.error ?? somethingWentWrong);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, sent, error, setField, reset, submit };
}
