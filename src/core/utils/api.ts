const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export type ApiResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string; errors?: Record<string, string[]> };

export async function apiFetch<T = void>(
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
      const data = await res.json().catch(() => undefined) as T;
      return { ok: true, data };
    }

    const err = await res.json().catch(() => ({}));
    return { ok: false, error: err.detail ?? err.title ?? `Error ${res.status}`, errors: err.errors };
  } catch {
    return { ok: false, error: "Network error. Please check your connection." };
  }
}
