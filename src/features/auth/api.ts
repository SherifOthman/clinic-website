import { apiRequest } from "@/src/core/utils/api";

// ── Auth endpoints ────────────────────────────────────────────────────────────

export const authApi = {
  login: (data: { emailOrUsername: string; password: string }) =>
    apiRequest("POST", "/auth/login", data),

  register: (data: {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: string;
  }) => apiRequest("POST", "/auth/register", data),

  forgotPassword: (data: { email: string }) =>
    apiRequest("POST", "/auth/forgot-password", data),

  /** Step 1 of OTP reset: verify the 6-digit code, get back a reset token */
  verifyResetOtp: (data: { email: string; otp: string }) =>
    apiRequest<{ email: string; token: string }>("POST", "/auth/verify-reset-otp", data),

  resetPassword: (data: { token: string; email: string; newPassword: string }) =>
    apiRequest("POST", "/auth/reset-password", data),

  /** Verify email address with a 6-digit OTP sent after registration */
  verifyEmailOtp: (data: { email: string; otp: string }) =>
    apiRequest("POST", "/auth/verify-email-otp", data),

  resendEmailVerification: (data: { email: string }) =>
    apiRequest("POST", "/auth/resend-email-verification", data),

  logout: () => apiRequest("POST", "/auth/logout"),
};

export const invitationApi = {
  getDetail: (token: string) =>
    apiRequest<{ email: string; role: string; clinicName: string; specializationName?: string | null; isExpired: boolean; isAccepted: boolean }>(
      "GET", `/staff/invitations/${token}/detail`
    ),

  accept: (token: string, data: {
    fullName: string;
    userName: string;
    password: string;
    phoneNumber: string;
    gender: string;
  }) => apiRequest("POST", `/staff/invitations/${token}/accept-with-registration`, data),
};
