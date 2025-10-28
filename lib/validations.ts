import { VALIDATION } from "./constants";

// Form validation schemas and types

export interface Step1FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Step2FormData {
  subscriptionPlanId: string;
}

export interface Step3FormData {
  clinicName: string;
  clinicPhone: string;
  branchCity?: string;
  branchAddress?: string;
  branchPhone?: string;
}

export interface RegistrationFormData
  extends Step1FormData,
    Step2FormData,
    Step3FormData {}

// Validation functions
export const validateStep1 = (data: Step1FormData): string[] => {
  const errors: string[] = [];

  if (!data.firstName?.trim()) errors.push("First name is required");
  if (!data.lastName?.trim()) errors.push("Last name is required");
  if (!data.email?.trim()) errors.push("Email is required");
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.push("Invalid email format");
  if (!data.password) errors.push("Password is required");
  if (data.password && data.password.length < VALIDATION.MIN_PASSWORD_LENGTH)
    errors.push(
      `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`
    );
  if (!data.confirmPassword) errors.push("Please confirm your password");
  if (
    data.password &&
    data.confirmPassword &&
    data.password !== data.confirmPassword
  )
    errors.push("Passwords do not match");

  return errors;
};

export const validateStep2 = (data: Step2FormData): string[] => {
  const errors: string[] = [];

  if (!data.subscriptionPlanId)
    errors.push("Please select a subscription plan");

  return errors;
};

export const validateStep3 = (data: Step3FormData): string[] => {
  const errors: string[] = [];

  if (!data.clinicName.trim()) errors.push("Clinic name is required");
  if (!data.clinicPhone.trim()) errors.push("Clinic phone is required");

  return errors;
};
