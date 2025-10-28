import { siteConfig } from "@/config/site";
import {
  ApiError,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  SubscriptionPlan,
} from "@/types";

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = siteConfig.api.baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "An error occurred");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error occurred");
    }
  }

  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return this.request<SubscriptionPlan[]>("/subscription-plans");
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.request<{ message: string }>("/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(
    token: string,
    password: string
  ): Promise<{ message: string }> {
    return this.request<{ message: string }>("/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
  }
}

export const apiClient = new ApiClient();
