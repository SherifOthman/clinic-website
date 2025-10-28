import { SVGProps } from "react";

// Icon component props
export interface IconSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  clinicName: string;
  phone?: string;
  planId?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  clinicName: string;
  phone?: string;
  role: "admin" | "doctor" | "staff";
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Subscription types
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  doctorLimit: number;
  appointmentLimit: number;
  features: string[];
  isPopular?: boolean;
  isCustom?: boolean;
}

export interface Subscription {
  id: string;
  planId: string;
  plan: SubscriptionPlan;
  userId: string;
  status: "active" | "inactive" | "cancelled" | "past_due";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

// Clinic types
export interface Clinic {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  ownerId: string;
  settings: ClinicSettings;
  createdAt: string;
  updatedAt: string;
}

export interface ClinicSettings {
  timezone: string;
  workingHours: WorkingHours;
  appointmentDuration: number;
  allowOnlineBooking: boolean;
  requireApproval: boolean;
  sendReminders: boolean;
  reminderTime: number;
}

export interface WorkingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  startTime: string;
  endTime: string;
  breakStart?: string;
  breakEnd?: string;
}

// Patient types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  address?: Address;
  emergencyContact?: EmergencyContact;
  medicalHistory?: MedicalHistory;
  clinicId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface MedicalHistory {
  allergies: string[];
  medications: string[];
  conditions: string[];
  notes?: string;
}

// Appointment types
export interface Appointment {
  id: string;
  patientId: string;
  patient: Patient;
  doctorId: string;
  doctor: User;
  clinicId: string;
  startTime: string;
  endTime: string;
  status:
    | "scheduled"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "no_show";
  type: "consultation" | "follow_up" | "emergency" | "routine";
  notes?: string;
  symptoms?: string;
  diagnosis?: string;
  treatment?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState {
  isValid: boolean;
  errors: ValidationError[];
  touched: Record<string, boolean>;
}

// Dashboard types
export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  thisWeekAppointments: number;
  thisMonthRevenue: number;
  patientGrowth: number;
  appointmentGrowth: number;
  revenueGrowth: number;
}

export interface RecentActivity {
  id: string;
  type: "appointment" | "patient" | "payment";
  title: string;
  description: string;
  timestamp: string;
  status?: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
}

// Settings types
export interface UserSettings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  appearance: AppearanceSettings;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  appointmentReminders: boolean;
  marketingEmails: boolean;
}

export interface PrivacySettings {
  profileVisibility: "public" | "private";
  showEmail: boolean;
  showPhone: boolean;
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
}
