'use client';

import { ClinicIcon, ThemeSwitch } from '@/components';
import { Button } from '@heroui/button';
import NextLink from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;

  const isLoginPage = pathname.includes('/login');
  const isSignupPage = pathname.includes('/signup');

  return (
    <div className="min-h-screen bg-default-50 dark:bg-background">
      {/* Header with Logo, Auth Navigation, and Theme Switch */}
      <div className="flex justify-between items-center p-6">
        <NextLink href={`/${locale}`} className="flex items-center gap-2">
          <ClinicIcon className="text-primary" size={32} />
          <span className="font-bold text-xl text-foreground">ClinicFlow</span>
        </NextLink>

        <div className="flex items-center gap-4">
          {/* Auth Navigation */}
          {isLoginPage && (
            <NextLink href={`/${locale}/signup`}>
              <Button variant="bordered" size="sm" className="font-medium">
                Sign Up
              </Button>
            </NextLink>
          )}
          {isSignupPage && (
            <NextLink href={`/${locale}/login`}>
              <Button variant="bordered" size="sm" className="font-medium">
                Login
              </Button>
            </NextLink>
          )}
          <ThemeSwitch />
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-120px)]">
        {children}
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-sm text-default-500">
          © 2024 ClinicFlow. All rights reserved.
        </p>
      </div>
    </div>
  );
}
