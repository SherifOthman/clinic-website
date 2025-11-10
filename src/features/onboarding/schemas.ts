import { z } from "zod";

export const onboardingSchema = z.object({
  plan: z.enum(["starter", "professional", "enterprise"]),
  clinicName: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(5),
  description: z.string().optional(),
});

export const clinicNameSchema = z.object({
  clinicName: z.string().min(2),
});

export const clinicInfoSchema = z.object({
  clinicName: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(5),
  description: z.string().optional(),
});

export type ClinicNameFormData = z.infer<typeof clinicNameSchema>;
export type ClinicInfoFormData = z.infer<typeof clinicInfoSchema>;
export type OnboardingFormData = z.infer<typeof onboardingSchema>;
