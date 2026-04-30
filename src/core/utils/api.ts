/**
 * Unified API client for clinic-website.
 *
 * - Client-side calls (auth pages, contact form): use `apiRequest` or the
 *   named helpers on `apiClient`. Returns `ApiResult<T>` — never throws.
 * - Server-side calls (RSC / page.tsx): use `serverFetch`. Throws on error
 *   so Next.js error boundaries / try-catch can handle it.
 */

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

// ── Shared error shape (matches backend RFC 7807 ApiProblemDetails) ───────────

export interface ApiError {
  detail?: string;
  title?: string;
  code?: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export type ApiResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string; code?: string; errors?: Record<string, string[]> };

// ── Client-side fetch (returns ApiResult — never throws) ──────────────────────

export async function apiRequest<T = void>(
  method: string,
  path: string,
  body?: unknown,
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API}${path}`, {
      method,
      credentials: "include",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.ok) {
      const text = await res.text();
      return { ok: true, data: (text ? JSON.parse(text) : undefined) as T };
    }

    const err: ApiError = await res.json().catch(() => ({}));
    return {
      ok: false,
      error: err.detail ?? err.title ?? `Error ${res.status}`,
      code: err.code,
      errors: err.errors,
    };
  } catch {
    return { ok: false, error: "Network error. Please check your connection." };
  }
}

/** Convenience wrappers for common HTTP methods */
export const apiClient = {
  get:    <T>(path: string)                  => apiRequest<T>("GET",    path),
  post:   <T>(path: string, body?: unknown)  => apiRequest<T>("POST",   path, body),
  put:    <T>(path: string, body?: unknown)  => apiRequest<T>("PUT",    path, body),
  patch:  <T>(path: string, body?: unknown)  => apiRequest<T>("PATCH",  path, body),
  delete: <T>(path: string)                  => apiRequest<T>("DELETE", path),
};

// ── Server-side fetch (for React Server Components — throws on error) ─────────

export async function serverFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  if (!res.ok) {
    const err: ApiError = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? err.title ?? `HTTP ${res.status}`);
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
