import { z } from "zod";

export const acceptInvitationSchema = z.object({
  fullName: z.string().min(1),
  userName: z.string().min(1),
  password: z.string().min(8),
  phoneNumber: z.string().min(1),
  gender: z.string().min(1),
});

export type AcceptInvitationFormData = z.infer<typeof acceptInvitationSchema>;

export function createAcceptInvitationSchema(messages: {
  required: string;
  passwordMin: string;
}) {
  return z.object({
    fullName: z.string().min(1, messages.required),
    userName: z.string().min(1, messages.required),
    password: z.string().min(8, messages.passwordMin),
    phoneNumber: z.string().min(1, messages.required),
    gender: z.string().min(1, messages.required),
  });
}
