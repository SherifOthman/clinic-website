// Common types used across the application

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  clinicName: string;
  role?: "admin" | "doctor" | "staff";
  plan: "starter" | "professional" | "enterprise";
  isFirstLogin: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  clinic: string;
  avatar: string;
  quote: string;
  rating: number;
}
