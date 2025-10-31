'use client';

import { CheckIcon, Stepper } from '@/components';
import { authTokenManager, mockAuthFunctions } from '@/lib/mockData';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
}

export default function OnboardingPage() {
  const t = useTranslations('pricing');
  const tOnboarding = useTranslations('onboarding');
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plans: Plan[] = [
    {
      id: 'starter',
      name: t('plans.starter.name'),
      price: 29,
      description: t('plans.starter.description'),
      features: t.raw('plans.starter.features') || [],
    },
    {
      id: 'professional',
      name: t('plans.professional.name'),
      price: 79,
      description: t('plans.professional.description'),
      features: t.raw('plans.professional.features') || [],
      popular: true,
      recommended: true,
    },
    {
      id: 'enterprise',
      name: t('plans.enterprise.name'),
      price: 199,
      description: t('plans.enterprise.description'),
      features: t.raw('plans.enterprise.features') || [],
    },
  ];

  useEffect(() => {
    // Check if user is authenticated and needs onboarding
    const currentUser = mockAuthFunctions.getCurrentUser();

    if (!currentUser.success || !currentUser.user) {
      router.push(`/${locale}/login`);
      return;
    }

    // Check if user already has a plan selected (completed onboarding)
    if (currentUser.user.plan && currentUser.user.plan !== 'starter') {
      router.push(`/${locale}/dashboard`);
      return;
    }

    setUser(currentUser.user);
    setLoading(false);
  }, [locale, router]);

  const handlePlanSelection = async () => {
    if (!user || !selectedPlan) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to update user plan
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update user data with selected plan
      const updatedUser = {
        ...user,
        plan: selectedPlan,
      };

      // Update localStorage
      const token = authTokenManager.getToken();
      if (token) {
        authTokenManager.setToken(token, updatedUser);
      }

      // Redirect to dashboard
      router.push(`/${locale}/dashboard`);
    } catch (error) {
      console.error('Plan selection failed:', error);
      alert('Failed to select plan. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-default-50 dark:bg-background flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-default-50 dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stepper */}
        <Stepper
          steps={[
            {
              id: 'account',
              title: 'Account',
              description: 'Create your account',
            },
            {
              id: 'clinic',
              title: 'Clinic Setup',
              description: 'Configure your clinic',
            },
            {
              id: 'plan',
              title: 'Choose Plan',
              description: 'Select subscription',
            },
          ]}
          currentStep={3}
          className="mb-12"
        />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-default-600 max-w-2xl mx-auto mb-2">
            Select the perfect plan for <strong>{user.clinicName}</strong>
          </p>
          <p className="text-default-500">
            You can upgrade or downgrade your plan anytime
          </p>
        </div>

        {/* Plan Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`${
                plan.popular
                  ? 'border-2 border-primary shadow-lg scale-105'
                  : ''
              } ${
                selectedPlan === plan.id
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                  : ''
              } hover:shadow-lg transition-all bg-content1 cursor-pointer relative overflow-hidden`}
              isPressable
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-2 -left-8 z-10">
                  <Chip
                    color="primary"
                    className="rotate-[-45deg] px-6 py-1 text-xs font-semibold shadow-lg"
                  >
                    {t('mostPopular')}
                  </Chip>
                </div>
              )}

              <CardBody className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </h3>
                  {selectedPlan === plan.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <p className="text-default-600 mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-default-500">/{t('perMonth')}</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckIcon className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-default-600 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.recommended && (
                  <Chip
                    color="success"
                    variant="flat"
                    size="sm"
                    className="mb-4"
                  >
                    Recommended for most clinics
                  </Chip>
                )}
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            color="primary"
            size="lg"
            className="font-medium px-12 h-12"
            onPress={handlePlanSelection}
            isLoading={isSubmitting}
            disabled={!selectedPlan || isSubmitting}
          >
            {isSubmitting
              ? 'Setting up your clinic...'
              : 'Continue with Selected Plan'}
          </Button>

          <p className="text-sm text-default-500 mt-4">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>

        {/* Features Comparison */}
        <div className="mt-16 text-center">
          <p className="text-default-600 mb-4">
            All plans include: HIPAA compliance, 24/7 support, data backup, and
            mobile access
          </p>
          <Button variant="light" size="sm" className="text-primary">
            Compare all features →
          </Button>
        </div>
      </div>
    </div>
  );
}
