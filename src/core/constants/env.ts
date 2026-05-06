/**
 * Centralised environment variable access.
 * All NEXT_PUBLIC_ vars used across the website are defined here once.
 * Import from this file instead of reading process.env directly in components.
 */

export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3000";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
