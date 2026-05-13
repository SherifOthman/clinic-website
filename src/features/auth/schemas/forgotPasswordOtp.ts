import { z } from "zod";

export const forgotPasswordOtpEmailSchema = z.object({
  email: z.string().email(),
});

export const forgotPasswordOtpCodeSchema = z.object({
  otp: z.string().length(6),
});

export const forgotPasswordOtpPasswordSchema = z.object({
  newPassword: z.string().min(8),
});

export type ForgotPasswordOtpEmailData = z.infer<typeof forgotPasswordOtpEmailSchema>;
export type ForgotPasswordOtpCodeData = z.infer<typeof forgotPasswordOtpCodeSchema>;
export type ForgotPasswordOtpPasswordData = z.infer<typeof forgotPasswordOtpPasswordSchema>;

export function createForgotPasswordOtpSchemas(messages: {
  required: string;
  invalidEmail: string;
  otpLength: string;
  passwordMin: string;
}) {
  return {
    email: z.string().min(1, messages.required).email(messages.invalidEmail),
    otp: z.string().length(6, messages.otpLength),
    newPassword: z.string().min(8, messages.passwordMin),
  };
}
