import { createValidators } from "@/src/core/validators";
import { z } from "zod";

export function createVerifyEmailOtpSchema(t: (key: string) => string) {
  const v = createValidators(t);
  return z.object({
    otp: v.otp(),
  });
}

export type VerifyEmailOtpFormData = z.infer<ReturnType<typeof createVerifyEmailOtpSchema>>;
