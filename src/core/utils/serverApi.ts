import type { SubscriptionPlan } from "@/src/core/types";
import type { TestimonialDto } from "@/src/features/home/types";
import { cacheLife } from "next/cache";
import { serverFetch } from "./api";

/**
 * Server-side data fetching utilities.
 *
 * With cacheComponents enabled, these functions use 'use cache' + cacheLife('daily')
 * instead of next: { revalidate } in fetch options. This is the idiomatic
 * Next.js 16 approach — caching is declared at the function level, not
 * embedded in fetch call options.
 *
 * daily profile (defined in next.config.ts):
 *   stale:      1 hour  — client serves from memory for up to 1h
 *   revalidate: 24 hours — server regenerates once per day
 *   expire:     7 days  — absolute max before forcing a fresh render
 */

// ── Subscription plans ────────────────────────────────────────────────────────

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  "use cache";
  cacheLife("daily");

  try {
    const data = await serverFetch<SubscriptionPlan[]>("/subscription-plans");
    return data
      .filter((p) => p.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  } catch (err) {
    console.error("Failed to fetch subscription plans:", err);
    return [];
  }
}

// ── Public stats ──────────────────────────────────────────────────────────────

export interface PublicStats {
  totalClinics: number;
  totalPatients: number;
  totalStaff: number;
}

export async function getPublicStats(): Promise<PublicStats | null> {
  "use cache";
  cacheLife("daily");

  try {
    return await serverFetch<PublicStats>("/dashboard/stats/public");
  } catch {
    return null;
  }
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<TestimonialDto[]> {
  "use cache";
  cacheLife("daily");

  try {
    // count=3 — show 3 random approved testimonials, rotated daily by the API
    return await serverFetch<TestimonialDto[]>("/testimonials?count=3");
  } catch {
    return [];
  }
}
