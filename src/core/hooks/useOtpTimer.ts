"use client";

import { useEffect, useState } from "react";

const OTP_EXPIRY_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 30 * 1000;

export function useOtpTimer(otpSentAt: number | null) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    if (!otpSentAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [otpSentAt]);

  if (!otpSentAt) {
    return { expiresIn: 0, cooldownLeft: 0, isExpired: false, canResend: true };
  }

  const elapsed = now - otpSentAt;
  const expiresIn = Math.max(0, OTP_EXPIRY_MS - elapsed);
  const cooldownLeft = Math.max(0, RESEND_COOLDOWN_MS - elapsed);

  return {
    expiresIn,
    cooldownLeft,
    isExpired: expiresIn <= 0,
    canResend: cooldownLeft <= 0,
  };
}

export function formatMs(ms: number): string {
  const totalSec = Math.ceil(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}
