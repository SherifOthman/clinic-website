import { apiFetch } from "@/src/core/utils/api";

export const authApi = {
  login: (data: { emailOrUsername: string; password: string }) =>
    apiFetch("POST", "/auth/login", data),

  register: (data: {
    fullName: string; userName: string; email: string;
    password: string; phoneNumber: string; gender: string;
  }) => apiFetch("POST", "/auth/register", data),

  forgotPassword: (data: { email: string }) =>
    apiFetch("POST", "/auth/forgot-password", data),

  verifyResetOtp: (data: { email: string; otp: string }) =>
    apiFetch<{ email: string; token: string }>("POST", "/auth/verify-reset-otp", data),

  resetPassword: (data: { token: string; email: string; newPassword: string }) =>
    apiFetch("POST", "/auth/reset-password", data),

  verifyEmailOtp: (data: { email: string; otp: string }) =>
    apiFetch("POST", "/auth/verify-email-otp", data),

  resendEmailVerification: (data: { email: string }) =>
    apiFetch("POST", "/auth/resend-email-verification", data),

  logout: () => apiFetch("POST", "/auth/logout"),
};

export const invitationApi = {
  getDetail: (token: string) =>
    apiFetch<{
      email: string; role: string; clinicName: string;
      specializationName?: string | null; isExpired: boolean; isAccepted: boolean;
    }>("GET", `/staff/invitations/${token}/detail`),

  accept: (token: string, data: {
    fullName: string; userName: string; password: string;
    phoneNumber: string; gender: string;
  }) => apiFetch("POST", `/staff/invitations/${token}/accept-with-registration`, data),
};
