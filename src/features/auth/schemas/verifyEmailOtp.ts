import { z } from "zod";

export const verifyEmailOtpSchema = z.object({
  otp: z.string().length(6),
});

export type VerifyEmailOtpFormData = z.infer<typeof verifyEmailOtpSchema>;

export function createVerifyEmailOtpSchema(messages: { otpLength: string }) {
  return z.object({
    otp: z.string().length(6, messages.otpLength),
  });
}
