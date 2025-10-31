// Mock data for testing the website flow

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  lastVisit: string;
  status: 'active' | 'inactive';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phone: string;
  schedule: {
    [key: string]: { start: string; end: string; available: boolean };
  };
}

export interface ClinicStats {
  totalPatients: number;
  appointmentsToday: number;
  appointmentsThisWeek: number;
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  patientSatisfaction: number;
}

// Mock Patients Data
export const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-03-15',
    lastVisit: '2024-10-25',
    status: 'active',
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1978-07-22',
    lastVisit: '2024-10-20',
    status: 'active',
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1992-11-08',
    lastVisit: '2024-10-18',
    status: 'active',
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@email.com',
    phone: '(555) 456-7890',
    dateOfBirth: '1965-05-30',
    lastVisit: '2024-09-15',
    status: 'inactive',
  },
  {
    id: '5',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@email.com',
    phone: '(555) 567-8901',
    dateOfBirth: '1988-12-03',
    lastVisit: '2024-10-28',
    status: 'active',
  },
];

// Mock Appointments Data
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Sarah Johnson',
    doctorName: 'Dr. Smith',
    date: '2024-10-31',
    time: '09:00',
    type: 'Regular Checkup',
    status: 'scheduled',
    notes: 'Annual physical examination',
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Michael Chen',
    doctorName: 'Dr. Williams',
    date: '2024-10-31',
    time: '10:30',
    type: 'Follow-up',
    status: 'scheduled',
    notes: 'Blood pressure monitoring',
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Emily Rodriguez',
    doctorName: 'Dr. Smith',
    date: '2024-10-31',
    time: '14:00',
    type: 'Consultation',
    status: 'scheduled',
  },
  {
    id: '4',
    patientId: '1',
    patientName: 'Sarah Johnson',
    doctorName: 'Dr. Smith',
    date: '2024-10-30',
    time: '11:00',
    type: 'Lab Results',
    status: 'completed',
    notes: 'Discussed test results',
  },
  {
    id: '5',
    patientId: '5',
    patientName: 'Lisa Anderson',
    doctorName: 'Dr. Williams',
    date: '2024-11-01',
    time: '15:30',
    type: 'Vaccination',
    status: 'scheduled',
  },
];

// Mock Doctors Data
export const mockDoctors: Doctor[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    specialization: 'Family Medicine',
    email: 'dr.smith@clinicflow.com',
    phone: '(555) 111-2222',
    schedule: {
      monday: { start: '08:00', end: '17:00', available: true },
      tuesday: { start: '08:00', end: '17:00', available: true },
      wednesday: { start: '08:00', end: '17:00', available: true },
      thursday: { start: '08:00', end: '17:00', available: true },
      friday: { start: '08:00', end: '15:00', available: true },
      saturday: { start: '09:00', end: '13:00', available: false },
      sunday: { start: '00:00', end: '00:00', available: false },
    },
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Williams',
    specialization: 'Internal Medicine',
    email: 'dr.williams@clinicflow.com',
    phone: '(555) 222-3333',
    schedule: {
      monday: { start: '09:00', end: '18:00', available: true },
      tuesday: { start: '09:00', end: '18:00', available: true },
      wednesday: { start: '09:00', end: '18:00', available: true },
      thursday: { start: '09:00', end: '18:00', available: true },
      friday: { start: '09:00', end: '16:00', available: true },
      saturday: { start: '00:00', end: '00:00', available: false },
      sunday: { start: '00:00', end: '00:00', available: false },
    },
  },
];

// Mock Clinic Statistics
export const mockClinicStats: ClinicStats = {
  totalPatients: 1247,
  appointmentsToday: 12,
  appointmentsThisWeek: 67,
  revenue: {
    today: 3450,
    thisWeek: 18750,
    thisMonth: 87500,
  },
  patientSatisfaction: 4.8,
};

// Mock User Interface
export interface MockUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'doctor' | 'staff';
  clinicName: string;
  plan: 'starter' | 'professional' | 'enterprise';
  verified: boolean;
  createdAt: string;
}

// Mock Users for Authentication
const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'demo@clinicflow.com',
    password: 'demo123',
    firstName: 'Demo',
    lastName: 'User',
    role: 'admin',
    clinicName: 'Demo Medical Center',
    plan: 'professional',
    verified: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    email: 'admin@clinicflow.com',
    password: 'admin123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'admin',
    clinicName: 'Johnson Family Clinic',
    plan: 'enterprise',
    verified: true,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    email: 'doctor@clinicflow.com',
    password: 'doctor123',
    firstName: 'Dr. John',
    lastName: 'Smith',
    role: 'doctor',
    clinicName: 'Smith Medical Practice',
    plan: 'starter',
    verified: true,
    createdAt: '2024-03-10',
  },
];

// Auth Token Management
export const authTokenManager = {
  setToken: (token: string, user: Partial<MockUser>) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clinicflow_token', token);
      localStorage.setItem('clinicflow_user', JSON.stringify(user));
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('clinicflow_token');
    }
    return null;
  },

  getUser: (): Partial<MockUser> | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('clinicflow_user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clinicflow_token');
      localStorage.removeItem('clinicflow_user');
    }
  },

  isAuthenticated: (): boolean => {
    return !!authTokenManager.getToken();
  },
};

// Mock Authentication Functions
export const mockAuthFunctions = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user with matching credentials
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      const token = `mock-jwt-token-${user.id}-${Date.now()}`;
      const userResponse = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        clinicName: user.clinicName,
        plan: user.plan,
        verified: user.verified,
      };

      // Save to localStorage
      authTokenManager.setToken(token, userResponse);

      return {
        success: true,
        user: userResponse,
        token,
      };
    }

    throw new Error('Invalid credentials');
  },

  signup: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    clinicName: string;
    password: string;
  }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user (no plan selected yet - will be set in onboarding)
    const newUser: MockUser = {
      id: `user-${Date.now()}`,
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'admin',
      clinicName: userData.clinicName,
      plan: 'starter', // Default plan, will be updated in onboarding
      verified: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Add to mock users (in real app, this would be saved to database)
    mockUsers.push(newUser);

    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`;
    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      clinicName: newUser.clinicName,
      plan: newUser.plan,
      verified: newUser.verified,
    };

    // Save to localStorage
    authTokenManager.setToken(token, userResponse);

    return {
      success: true,
      user: userResponse,
      token,
      message: 'Account created successfully!',
    };
  },

  logout: () => {
    authTokenManager.clearAuth();
    return { success: true };
  },

  getCurrentUser: () => {
    const token = authTokenManager.getToken();
    const user = authTokenManager.getUser();

    if (token && user) {
      return { success: true, user, token };
    }

    return { success: false, user: null, token: null };
  },

  forgotPassword: async (email: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: 'Password reset link sent to your email.',
    };
  },

  resetPassword: async (token: string, newPassword: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: 'Password reset successfully!',
    };
  },
};

// Mock Contact Form Submission
export const mockContactSubmission = async (formData: any) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    success: true,
    message:
      "Thank you for your message! We'll get back to you within 24 hours.",
  };
};

// Mock Demo Scheduling
export const mockDemoScheduling = async (demoData: any) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message:
      "Demo scheduled successfully! You'll receive a calendar invite shortly.",
    demoId: 'demo-' + Date.now(),
  };
};
