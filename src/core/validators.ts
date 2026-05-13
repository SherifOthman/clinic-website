import { z } from "zod";

export function validatePassword(v: string): string | null {
  if (v.length < 8) return "passwordMin";
  if (!/[A-Z]/.test(v)) return "passwordUppercase";
  if (!/[a-z]/.test(v)) return "passwordLowercase";
  if (!/\d/.test(v)) return "passwordDigit";
  if (!/[^a-zA-Z0-9]/.test(v)) return "passwordSpecial";
  return null;
}

export function createValidators(t: (key: string) => string) {
  return {
    requiredString: (max?: number) => {
      let s = z.string().min(1, t("required"));
      if (max) s = s.max(max);
      return s;
    },
    email: () => z.string().min(1, t("required")).max(100).email(t("invalidEmail")),
    password: () => z.string()
      .min(8, t("passwordMin")).max(128)
      .regex(/[A-Z]/, t("passwordUppercase"))
      .regex(/[a-z]/, t("passwordLowercase"))
      .regex(/\d/, t("passwordDigit"))
      .regex(/[^a-zA-Z0-9]/, t("passwordSpecial")),
    name: () => z.string().min(1, t("required")).max(100),
    otp: () => z.string().length(6, t("otpLength")),
    phoneNumber: () => z.string().min(1, t("required")),
  };
}

export type Validators = ReturnType<typeof createValidators>;
