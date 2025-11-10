// Common types used across the application

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  clinicName: string;
  plan: "starter" | "professional" | "enterprise";
  avatar?: string;
  phone?: string;
  address?: string;
  description?: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
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
