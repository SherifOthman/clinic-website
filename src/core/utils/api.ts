const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export interface ApiProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string | null;
  code: string | null;
  errors: Record<string, string[]> | null;
  traceId: string | null;
}

export type ApiResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; problem: ApiProblemDetails };

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
      const text = await res.text();
      return { ok: true, data: (text ? JSON.parse(text) : undefined) as T };
    }

    const err = await res.json().catch(() => ({})) as Partial<ApiProblemDetails>;
    return {
      ok: false,
      problem: {
        type: err.type ?? "",
        title: err.title ?? `Error ${res.status}`,
        status: err.status ?? res.status,
        detail: err.detail ?? null,
        code: err.code ?? null,
        errors: err.errors ?? null,
        traceId: err.traceId ?? null,
      },
    };
  } catch {
    return {
      ok: false,
      problem: {
        type: "",
        title: "Network Error",
        status: 0,
        detail: "Network error. Please check your connection.",
        code: "NETWORK_ERROR",
        errors: null,
        traceId: null,
      },
    };
  }
}
