import { createValidators } from "@/src/core/validators";

export function createForgotPasswordOtpSchemas(t: (key: string) => string) {
  const v = createValidators(t);
  return {
    email: v.email(),
    otp: v.otp(),
    newPassword: v.password(),
  };
}
