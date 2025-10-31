'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const {
    user,
    isAuthenticated,
    logout,
    isLoading: authLoading,
    isFirstLogin,
    markWelcomeShown,
  } = useAuth();
  const t = useTranslations('dashboard');
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [loading, setLoading] = useState(true);
  const [setupProgress, setSetupProgress] = useState(0);
  const [preparingDashboard, setPreparingDashboard] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Don't redirect while AuthContext is still loading
    if (authLoading) {
      return;
    }

    if (!isAuthenticated || !user) {
      router.push(`/${locale}/login`);
      return;
    }

    // Check if user needs to complete onboarding
    if (!user.verified) {
      router.push(`/${locale}/onboarding/clinic-setup`);
      return;
    }

    setLoading(false);
  }, [isAuthenticated, user, router, locale, authLoading]);

  // Set current date on client side only
  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    );
  }, []);

  // Separate useEffect for progress animation to avoid conflicts
  useEffect(() => {
    if (!loading && !authLoading && user) {
      const interval = setInterval(() => {
        setSetupProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [loading, authLoading, user]);

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
  };

  const handleGoToDashboard = () => {
    setPreparingDashboard(true);

    // Simulate dashboard preparation
    setTimeout(() => {
      // In a real app, this would redirect to the actual dashboard
      window.open('https://dashboard.clinicflow.local', '_blank');
      setPreparingDashboard(false);
    }, 2000);
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-default-50 dark:bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" color="primary" className="mb-4" />
          <p className="text-default-600">{t('settingUpDashboard')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-default-50 dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Conditional Welcome Section - Only shown on first login */}
        {isFirstLogin && (
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-success to-success/70 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {t('welcome')}
            </h1>
            <div className="space-y-4 mb-8">
              <p className="text-xl text-success font-semibold flex items-center justify-center gap-2">
                <span className="text-2xl">🎉</span>
                <span>{t('setupComplete')}</span>
              </p>
              <p className="text-lg text-default-600 max-w-3xl mx-auto leading-relaxed">
                {t('setupDescription')}
              </p>
            </div>
          </div>
        )}

        {/* Regular Dashboard Header - Shown after welcome is dismissed */}
        {!isFirstLogin && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {t('dashboardTitle')}
                </h1>
                <p className="text-default-600">
                  Welcome back, {user?.firstName}! Here&apos;s your clinic
                  overview.
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-default-500">{currentDate}</p>
              </div>
            </div>
          </div>
        )}

        {/* Setup Progress - Only shown on first login */}
        {isFirstLogin && (
          <Card className="mb-8 bg-content1 shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {t('systemSetupProgress')}
                </h3>
                <Chip color="success" variant="flat" size="sm">
                  {setupProgress}% {t('complete')}
                </Chip>
              </div>
              <div className="w-full bg-default-200 rounded-full h-3 mb-2">
                <div
                  className="bg-success h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${setupProgress}%` }}
                />
              </div>
              <p className="text-sm text-default-600">{t('allSystemsReady')}</p>
            </CardBody>
          </Card>
        )}

        {/* Clinic Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Clinic Info Card */}
          <Card className="bg-content1 shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-default-500">{t('clinicName')}</p>
                  <p className="font-bold text-foreground text-lg">
                    {user.clinicName}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-default-500">
                    {t('administrator')}
                  </span>
                  <span className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-default-500">Email</span>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-default-500">
                    {t('clinicType')}
                  </span>
                  <span className="text-sm font-medium">
                    {t('generalPractice')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-default-500">
                    {t('clinicStatus')}
                  </span>
                  <span className="text-sm font-medium text-success">
                    {t('activeStatus')}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Subscription Card */}
          <Card className="bg-content1 shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-default-500">{t('currentPlan')}</p>
                  <p className="font-bold text-foreground text-lg capitalize">
                    {user.plan}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Chip
                  color={
                    user.plan === 'enterprise'
                      ? 'success'
                      : user.plan === 'professional'
                        ? 'primary'
                        : 'default'
                  }
                  variant="flat"
                  size="sm"
                  className="capitalize"
                >
                  {user.plan} Plan
                </Chip>
                <p className="text-xs text-default-500">
                  {t('freeTrialActive')}
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Account Status Card */}
          <Card className="bg-content1 shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-warning"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-default-500">Account Status</p>
                  <p className="font-bold text-foreground text-lg">
                    {user.verified ? 'Active' : 'Setup Required'}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Chip
                  color={user.verified ? 'success' : 'warning'}
                  variant="flat"
                  size="sm"
                >
                  {user.verified ? '✓ Verified' : '⚠ Pending'}
                </Chip>
                <p className="text-xs text-default-500">
                  {user.verified
                    ? t('allSystemsReady')
                    : 'Complete setup required'}
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Quick Actions Card */}
          <Card className="bg-content1 shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-default-500">Quick Actions</p>
                  <p className="font-bold text-foreground text-lg">Ready</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  className="w-full"
                  onPress={handleGoToDashboard}
                  isLoading={preparingDashboard}
                >
                  {preparingDashboard ? 'Loading...' : t('launchDashboard')}
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  className="w-full text-danger"
                  onPress={handleLogout}
                >
                  {t('signOut')}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Plan Features Overview */}
        <Card className="mb-8 bg-content1 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">
                Your {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}{' '}
                Plan Features
              </h3>
              <Chip
                color={
                  user.plan === 'enterprise'
                    ? 'success'
                    : user.plan === 'professional'
                      ? 'primary'
                      : 'default'
                }
                variant="flat"
              >
                {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
              </Chip>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Patient Management */}
              <div className="p-4 rounded-lg border-2 border-success/20 bg-success/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-success/10 text-success">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1 text-foreground">
                      {t('patientManagement')}
                    </h4>
                    <p className="text-xs text-default-600">
                      {t('patientManagementDesc')}
                    </p>
                    <Chip
                      color="success"
                      variant="flat"
                      size="sm"
                      className="mt-2"
                    >
                      ✓ {t('included')}
                    </Chip>
                  </div>
                </div>
              </div>

              {/* Appointment Scheduling */}
              <div className="p-4 rounded-lg border-2 border-success/20 bg-success/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-success/10 text-success">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1 text-foreground">
                      {t('appointmentScheduling')}
                    </h4>
                    <p className="text-xs text-default-600">
                      {t('appointmentSchedulingDesc')}
                    </p>
                    <Chip
                      color="success"
                      variant="flat"
                      size="sm"
                      className="mt-2"
                    >
                      ✓ {t('included')}
                    </Chip>
                  </div>
                </div>
              </div>

              {/* HIPAA Compliance */}
              <div className="p-4 rounded-lg border-2 border-success/20 bg-success/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-success/10 text-success">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1 text-foreground">
                      {t('hipaaCompliance')}
                    </h4>
                    <p className="text-xs text-default-600">
                      {t('hipaaComplianceDesc')}
                    </p>
                    <Chip
                      color="success"
                      variant="flat"
                      size="sm"
                      className="mt-2"
                    >
                      ✓ {t('included')}
                    </Chip>
                  </div>
                </div>
              </div>

              {/* Analytics & Reports */}
              <div
                className={`p-4 rounded-lg border-2 transition-all ${
                  user.plan !== 'starter'
                    ? 'border-success/20 bg-success/5'
                    : 'border-default-200 bg-default-50 dark:bg-default-100 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      user.plan !== 'starter'
                        ? 'bg-success/10 text-success'
                        : 'bg-default-200 text-default-400'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold text-sm mb-1 ${
                        user.plan !== 'starter'
                          ? 'text-foreground'
                          : 'text-default-400'
                      }`}
                    >
                      {t('analyticsReports')}
                    </h4>
                    <p
                      className={`text-xs ${
                        user.plan !== 'starter'
                          ? 'text-default-600'
                          : 'text-default-400'
                      }`}
                    >
                      {t('analyticsReportsDesc')}
                    </p>
                    <Chip
                      color={user.plan !== 'starter' ? 'success' : 'default'}
                      variant="flat"
                      size="sm"
                      className="mt-2"
                    >
                      {user.plan !== 'starter'
                        ? `✓ ${t('included')}`
                        : t('upgradeRequired')}
                    </Chip>
                  </div>
                </div>
              </div>

              {/* Billing & Payments */}
              <div
                className={`p-4 rounded-lg border-2 transition-all ${
                  user.plan === 'enterprise'
                    ? 'border-success/20 bg-success/5'
                    : 'border-default-200 bg-default-50 dark:bg-default-100 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      user.plan === 'enterprise'
                        ? 'bg-success/10 text-success'
                        : 'bg-default-200 text-default-400'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold text-sm mb-1 ${
                        user.plan === 'enterprise'
                          ? 'text-foreground'
                          : 'text-default-400'
                      }`}
                    >
                      {t('billingPayments')}
                    </h4>
                    <p
                      className={`text-xs ${
                        user.plan === 'enterprise'
                          ? 'text-default-600'
                          : 'text-default-400'
                      }`}
                    >
                      {t('billingPaymentsDesc')}
                    </p>
                    <Chip
                      color={user.plan === 'enterprise' ? 'success' : 'default'}
                      variant="flat"
                      size="sm"
                      className="mt-2"
                    >
                      {user.plan === 'enterprise'
                        ? `✓ ${t('included')}`
                        : t('upgradeRequired')}
                    </Chip>
                  </div>
                </div>
              </div>

              {/* Custom Workflows */}
              <div
                className={`p-4 rounded-lg border-2 transition-all ${
                  user.plan === 'enterprise'
                    ? 'border-success/20 bg-success/5'
                    : 'border-default-200 bg-default-50 dark:bg-default-100 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      user.plan === 'enterprise'
                        ? 'bg-success/10 text-success'
                        : 'bg-default-200 text-default-400'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold text-sm mb-1 ${
                        user.plan === 'enterprise'
                          ? 'text-foreground'
                          : 'text-default-400'
                      }`}
                    >
                      {t('customWorkflows')}
                    </h4>
                    <p
                      className={`text-xs ${
                        user.plan === 'enterprise'
                          ? 'text-default-600'
                          : 'text-default-400'
                      }`}
                    >
                      {t('customWorkflowsDesc')}
                    </p>
                    <Chip
                      color={user.plan === 'enterprise' ? 'success' : 'default'}
                      variant="flat"
                      size="sm"
                      className="mt-2"
                    >
                      {user.plan === 'enterprise'
                        ? `✓ ${t('included')}`
                        : t('upgradeRequired')}
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Action Section - Different content for first login vs regular dashboard */}
        {isFirstLogin ? (
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 shadow-lg">
            <CardBody className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('readyToLaunch')}
              </h3>
              <p className="text-default-600 mb-8 max-w-2xl mx-auto">
                {t('launchDescription')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  color="primary"
                  size="lg"
                  className="font-semibold px-8 h-12 shadow-lg"
                  onPress={handleGoToDashboard}
                  isLoading={preparingDashboard}
                  disabled={preparingDashboard}
                  startContent={
                    !preparingDashboard && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )
                  }
                >
                  {preparingDashboard
                    ? t('launchingDashboard')
                    : t('launchDashboard')}
                </Button>

                <Button
                  variant="bordered"
                  size="lg"
                  className="font-medium px-6 h-12"
                  onPress={markWelcomeShown}
                >
                  {t('continueToDashboard')}
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-divider">
                <p className="text-sm text-default-500 mb-4">
                  🚀 <strong>{t('whatsNext')}</strong> {t('accessDashboard')}
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-xs text-default-400">
                  <span>✓ {t('freeTrialActive')}</span>
                  <span>✓ {t('supportIncluded')}</span>
                  <span>✓ {t('hipaaCompliant')}</span>
                  <span>✓ {t('dataBackupEnabled')}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-content1 shadow-lg">
              <CardBody className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('launchDashboardTitle')}
                </h3>
                <p className="text-sm text-default-600 mb-4">
                  {t('accessFullSystem')}
                </p>
                <Button
                  color="primary"
                  size="sm"
                  className="w-full"
                  onPress={handleGoToDashboard}
                  isLoading={preparingDashboard}
                >
                  {preparingDashboard ? t('loading') : t('openDashboard')}
                </Button>
              </CardBody>
            </Card>

            <Card className="bg-content1 shadow-lg">
              <CardBody className="p-6 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('documentationTitle')}
                </h3>
                <p className="text-sm text-default-600 mb-4">
                  {t('learnFeatures')}
                </p>
                <Button variant="bordered" size="sm" className="w-full">
                  {t('viewDocs')}
                </Button>
              </CardBody>
            </Card>

            <Card className="bg-content1 shadow-lg">
              <CardBody className="p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('supportTitle')}
                </h3>
                <p className="text-sm text-default-600 mb-4">{t('getHelp')}</p>
                <Button variant="bordered" size="sm" className="w-full">
                  {t('contactSupport')}
                </Button>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
