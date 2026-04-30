import type { SubscriptionPlan } from "@/src/core/types";
import type { TestimonialDto } from "@/src/features/home/types";
import { serverFetch } from "./api";

// ── Subscription plans ────────────────────────────────────────────────────────

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    const data = await serverFetch<SubscriptionPlan[]>("/subscription-plans", {
      next: { revalidate: 3600 },
    });
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
  try {
    return await serverFetch<PublicStats>("/dashboard/stats/public", {
      next: { revalidate: 300 },
    });
  } catch {
    return null;
  }
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<TestimonialDto[]> {
  try {
    return await serverFetch<TestimonialDto[]>("/testimonials", {
      next: { revalidate: 60 },
    });
  } catch {
    return [];
  }
}
