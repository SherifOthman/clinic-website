import { createValidators } from "@/src/core/validators";
import { z } from "zod";

export function createForgotPasswordOtpSchema(t: (key: string) => string) {
  const v = createValidators(t);
  return z.object({
    email: v.email(),
    otp: v.otp(),
    newPassword: v.password(),
  });
}