import { siteConfig } from "@/config/site";
import { AuthResponse } from "@/types";

export const AUTH_COOKIES = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export function setAuthCookies(authData: AuthResponse) {
  // Set cookies with appropriate security settings
  document.cookie = `${AUTH_COOKIES.ACCESS_TOKEN}=${authData.accessToken}; path=/; secure; samesite=strict; max-age=${60 * 60 * 24 * 7}`; // 7 days
  document.cookie = `${AUTH_COOKIES.REFRESH_TOKEN}=${authData.refreshToken}; path=/; secure; samesite=strict; max-age=${60 * 60 * 24 * 30}`; // 30 days
}

export function clearAuthCookies() {
  document.cookie = `${AUTH_COOKIES.ACCESS_TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `${AUTH_COOKIES.REFRESH_TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function redirectToDashboard(token?: string) {
  const dashboardUrl = token
    ? `${siteConfig.links.dashboard}/login?token=${token}`
    : siteConfig.links.dashboard;

  window.location.href = dashboardUrl;
}

export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${AUTH_COOKIES.ACCESS_TOKEN}=`)
  );

  return tokenCookie ? tokenCookie.split("=")[1] : null;
}
