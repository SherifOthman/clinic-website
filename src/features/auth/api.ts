const API = process.env.NEXT_PUBLIC_API_URL!;

type ApiResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string; code?: string; errors?: Record<string, string[]> };

async function request<T = void>(
  method: string,
  path: string,
  body?: unknown,
): Promise<ApiResult<T>> {
  const res = await fetch(`${API}${path}`, {
    method,
    credentials: "include", // sends HttpOnly cookies automatically
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.ok) {
    const text = await res.text();
    return { ok: true, data: (text ? JSON.parse(text) : undefined) as T };
  }

  try {
    const err = await res.json();
    return { ok: false, error: err.detail ?? err.title ?? "Something went wrong", code: err.code, errors: err.errors };
  } catch {
    return { ok: false, error: `Error ${res.status}` };
  }
}

// ── Auth endpoints ────────────────────────────────────────────────────────────

export const authApi = {
  login: (data: { emailOrUsername: string; password: string }) =>
    request("POST", "/auth/login", data),

  register: (data: {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: string;
  }) => request("POST", "/auth/register", data),

  forgotPassword: (data: { email: string }) =>
    request("POST", "/auth/forgot-password", data),

  resetPassword: (data: { token: string; email: string; newPassword: string }) =>
    request("POST", "/auth/reset-password", data),

  logout: () => request("POST", "/auth/logout"),

  checkEmail: (email: string) =>
    request<{ isAvailable: boolean }>("GET", `/auth/check-email?email=${encodeURIComponent(email)}`),

  checkUsername: (username: string) =>
    request<{ isAvailable: boolean }>("GET", `/auth/check-username?username=${encodeURIComponent(username)}`),
};

// ── Invitation endpoints ──────────────────────────────────────────────────────

export const invitationApi = {
  getDetail: (token: string) =>
    request<{ email: string; role: string; clinicName: string; isExpired: boolean }>(
      "GET", `/staff/invitations/${token}/detail`
    ),

  accept: (token: string, data: {
    fullName: string;
    userName: string;
    password: string;
    phoneNumber: string;
    gender: string;
  }) => request("POST", `/staff/invitations/${token}/accept-with-registration`, data),
};
