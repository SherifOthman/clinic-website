import { z } from "zod";

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
