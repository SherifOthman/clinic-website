'use client';

import { authTokenManager, mockAuthFunctions } from '@/lib/mockData';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'doctor' | 'staff';
  clinicName: string;
  plan: 'starter' | 'professional' | 'enterprise';
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFirstLogin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearAuth: () => void;
  markWelcomeShown: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  useEffect(() => {
    // Mark as hydrated first to prevent hydration mismatches
    setIsHydrated(true);

    // Check for existing authentication on mount (client-side only)
    const currentUser = mockAuthFunctions.getCurrentUser();
    if (currentUser.success && currentUser.user) {
      setUser(currentUser.user as User);

      // Check if welcome has been shown before
      const welcomeShown = localStorage.getItem(
        `clinicflow_welcome_shown_${currentUser.user.id}`,
      );

      // For demo user (id: '1'), automatically mark welcome as shown
      if (currentUser.user.id === '1' && !welcomeShown) {
        localStorage.setItem(
          `clinicflow_welcome_shown_${currentUser.user.id}`,
          'true',
        );
      }

      // Only show welcome if user is verified (completed onboarding) AND welcome hasn't been shown
      setIsFirstLogin(Boolean(currentUser.user.verified) && !welcomeShown);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await mockAuthFunctions.login(email, password);
    if (result.success) {
      setUser(result.user as User);

      // Check if welcome has been shown before for this user
      const welcomeShown = localStorage.getItem(
        `clinicflow_welcome_shown_${result.user.id}`,
      );
      // Only show welcome if user is verified (completed onboarding) AND welcome hasn't been shown
      setIsFirstLogin(Boolean(result.user.verified) && !welcomeShown);
    } else {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    mockAuthFunctions.logout();
    setUser(null);
  };

  const clearAuth = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clinicflow_token');
      localStorage.removeItem('clinicflow_user');
    }
    setUser(null);
    setIsFirstLogin(false);
  };

  const markWelcomeShown = () => {
    if (user && typeof window !== 'undefined') {
      localStorage.setItem(`clinicflow_welcome_shown_${user.id}`, 'true');
      setIsFirstLogin(false);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);

      // Update localStorage
      const token = authTokenManager.getToken();
      if (token) {
        authTokenManager.setToken(token, updatedUser);
      }
    }
  };

  const value = {
    user,
    isAuthenticated: isHydrated && !!user, // Only consider authenticated after hydration
    isLoading: isLoading || !isHydrated, // Loading until hydrated
    isFirstLogin,
    login,
    logout,
    updateUser,
    clearAuth,
    markWelcomeShown,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
