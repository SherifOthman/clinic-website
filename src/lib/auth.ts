import type { AuthResponse, User } from "@/src/types";
import { cookies } from "next/headers";

// Get current user from cookies
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    return null;
  }

  try {
    return JSON.parse(userCookie.value);
  } catch {
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has("accessToken");
}

// Set auth cookies (called from server actions)
export async function setAuthCookies(authResponse: AuthResponse) {
  const cookieStore = await cookies();

  // Set access token (httpOnly, secure)
  cookieStore.set("accessToken", authResponse.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15, // 15 minutes
    path: "/",
  });

  // Set refresh token (httpOnly, secure)
  cookieStore.set("refreshToken", authResponse.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // Set user data (httpOnly, secure - server-side only)
  cookieStore.set("user", JSON.stringify(authResponse.user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

// Clear auth cookies
export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("user");
}

// Get access token (for API calls)
export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  return token?.value || null;
}
