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

  resetPassword: (data: { token: string; email: string; newPassword: string }) =>
    apiRequest("POST", "/auth/reset-password", data),

  logout: () => apiRequest("POST", "/auth/logout"),

  checkEmail: (email: string) =>
    apiRequest<{ isAvailable: boolean }>("GET", `/auth/check-email?email=${encodeURIComponent(email)}`),

  checkUsername: (username: string) =>
    apiRequest<{ isAvailable: boolean }>("GET", `/auth/check-username?username=${encodeURIComponent(username)}`),
};

// ── Invitation endpoints ──────────────────────────────────────────────────────

export const invitationApi = {
  getDetail: (token: string) =>
    apiRequest<{ email: string; role: string; clinicName: string; isExpired: boolean }>(
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
