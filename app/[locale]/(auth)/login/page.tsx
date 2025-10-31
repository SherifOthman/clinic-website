'use client';

import { useAuth } from '@/contexts/AuthContext';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Spinner } from '@heroui/spinner';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const t = useTranslations('auth');
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const { isAuthenticated, isLoading, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ mode: 'onChange' });

  // Check if already authenticated on page load
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(`/${locale}/dashboard`);
    }
  }, [isAuthenticated, isLoading, locale, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      // Redirect immediately after successful login
      router.push(`/${locale}/dashboard`);
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
      alert(`${errorMessage}. Try demo@clinicflow.com / demo123`);
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-default-50 dark:bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" color="primary" className="mb-4" />
          <p className="text-default-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render login form if already authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <AuthLayout
      title={t('welcomeBack')}
      description={t('signInDescription')}
      footerText={t('dontHaveAccount')}
      footerLink={{
        text: t('signUp'),
        href: `/${locale}/signup`,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="demo@clinicflow.com"
          variant="bordered"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          classNames={{
            input: 'text-sm',
            inputWrapper: 'h-12',
          }}
        />

        <Input
          {...register('password', { required: t('passwordRequired') })}
          label={t('password')}
          type="password"
          placeholder="demo123"
          variant="bordered"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          classNames={{
            input: 'text-sm',
            inputWrapper: 'h-12',
          }}
        />

        <div className="flex items-center justify-end">
          <a
            href={`/${locale}/forgot-password`}
            className="text-sm text-primary"
          >
            {t('forgotPassword')}
          </a>
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
          color="primary"
          size="lg"
          className="w-full font-medium"
        >
          {t('signIn')}
        </Button>
      </form>

      <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-medium border border-primary-200 dark:border-primary-800">
        <p className="text-xs text-primary-800 dark:text-primary-200 font-medium text-center">
          {t('demoCredentials')}
        </p>
        <p className="text-xs text-primary-600 dark:text-primary-300 text-center mt-1">
          Email: demo@clinicflow.com
          <br />
          Password: demo123
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-default-600 mb-3">{t('dontHaveAccount')}</p>
        <Link href={`/${locale}/signup`}>
          <Button variant="bordered" className="w-full">
            {t('signUp')}
          </Button>
        </Link>
      </div>
    </AuthLayout>
  );
}
