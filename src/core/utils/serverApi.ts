import type { SubscriptionPlan } from "@/src/core/types";
import type { TestimonialDto } from "@/src/features/home/types";
import { cacheLife } from "next/cache";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? err.title ?? `HTTP ${res.status}`);
  }
  return (await res.json().catch(() => undefined)) as T;
}

/**
 * Server-side data fetching utilities.
 *
 * With cacheComponents enabled, these functions use 'use cache' + cacheLife('daily').
 *
 * IMPORTANT: On failure we throw instead of returning null/[].
 * If we return null, that null gets baked into the cache and served for 24h.
 * Throwing prevents a failed fetch from being cached — Next.js will retry
 * on the next request until the API is reachable.
 *
 * Callers (StatsSection, TestimonialsSection) catch the error and render
 * a graceful fallback without caching it.
 */

// ── Subscription plans ────────────────────────────────────────────────────────

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  "use cache";
  cacheLife("daily");

  // Throws on failure — prevents empty array from being cached
  const data = await fetchJson<SubscriptionPlan[]>("/subscription-plans");
  return data
    .filter((p) => p.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

// ── Public stats ──────────────────────────────────────────────────────────────

export interface PublicStats {
  totalClinics: number;
  totalPatients: number;
  totalStaff: number;
}

export async function getPublicStats(): Promise<PublicStats> {
  "use cache";
  cacheLife("daily");

  // Throws on failure — prevents null from being cached
  return await fetchJson<PublicStats>("/dashboard/stats/public");
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<TestimonialDto[]> {
  "use cache";
  cacheLife("daily");

  // Throws on failure — prevents empty array from being cached
  return await fetchJson<TestimonialDto[]>("/testimonials?count=3");
}
