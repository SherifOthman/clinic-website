'use client';

import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  clinicName: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const t = useTranslations('auth');
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({ mode: 'onChange' });

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { mockAuthFunctions } = await import('@/lib/mockData');
      const currentUser = mockAuthFunctions.getCurrentUser();

      if (currentUser.success) {
        router.push(`/${locale}/dashboard`);
      }
    };

    checkAuth();
  }, [locale, router]);

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Use mock authentication
      const { mockAuthFunctions } = await import('@/lib/mockData');
      const result = await mockAuthFunctions.signup({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        clinicName: data.clinicName,
      });

      if (result.success) {
        // Redirect to clinic setup first
        router.push(`/${locale}/onboarding/clinic-setup`);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Signup failed';
      alert(`${errorMessage}. Please try again.`);
    }
  };

  return (
    <AuthLayout
      title={t('createAccount')}
      description={t('signUpDescription')}
      footerText={t('alreadyHaveAccount')}
      footerLink={{
        text: t('signIn'),
        href: `/${locale}/login`,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            {...register('firstName', { required: t('firstNameRequired') })}
            label={t('firstName')}
            variant="bordered"
            isInvalid={!!errors.firstName}
            errorMessage={errors.firstName?.message}
            classNames={{
              input: 'text-sm',
              inputWrapper: 'h-12',
            }}
          />
          <Input
            {...register('lastName', { required: t('lastNameRequired') })}
            label={t('lastName')}
            variant="bordered"
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName?.message}
            classNames={{
              input: 'text-sm',
              inputWrapper: 'h-12',
            }}
          />
        </div>

        <Input
          {...register('email', {
            required: t('emailRequired'),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('invalidEmail'),
            },
          })}
          label={t('email')}
          type="email"
          variant="bordered"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          classNames={{
            input: 'text-sm',
            inputWrapper: 'h-12',
          }}
        />

        <Input
          {...register('clinicName', { required: t('clinicNameRequired') })}
          label={t('clinicName')}
          variant="bordered"
          isInvalid={!!errors.clinicName}
          errorMessage={errors.clinicName?.message}
          classNames={{
            input: 'text-sm',
            inputWrapper: 'h-12',
          }}
        />

        <Input
          {...register('password', { required: t('passwordRequired') })}
          label={t('password')}
          type="password"
          variant="bordered"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          classNames={{
            input: 'text-sm',
            inputWrapper: 'h-12',
          }}
        />

        <Input
          {...register('confirmPassword', {
            required: t('passwordRequired'),
            validate: (value) => value === password || t('passwordMismatch'),
          })}
          label={t('confirmPassword')}
          type="password"
          variant="bordered"
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          classNames={{
            input: 'text-sm',
            inputWrapper: 'h-12',
          }}
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          color="primary"
          size="lg"
          className="w-full font-medium"
        >
          {t('signUp')}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-default-600 mb-3">
          {t('alreadyHaveAccount')}
        </p>
        <Link href={`/${locale}/login`}>
          <Button variant="bordered" className="w-full">
            {t('signIn')}
          </Button>
        </Link>
      </div>
    </AuthLayout>
  );
}
