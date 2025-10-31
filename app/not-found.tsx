'use client';

import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootNotFound() {
  const pathname = usePathname();

  // Detect if URL contains Arabic locale
  const isArabic = pathname?.startsWith('/ar');
  const locale = isArabic ? 'ar' : 'en';

  // Static translations to avoid hydration issues
  const messages = {
    en: {
      title: 'Page Not Found',
      description:
        'Sorry, the page you are looking for does not exist or has been moved.',
      goHome: 'Go Home',
      contactSupport: 'Contact Support',
    },
    ar: {
      title: 'الصفحة غير موجودة',
      description: 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
      goHome: 'العودة للرئيسية',
      contactSupport: 'اتصل بنا',
    },
  };

  const t = messages[locale as keyof typeof messages];

  return (
    <div className="min-h-screen bg-default-50 dark:bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-content1 shadow-xl">
        <CardBody className="p-8 text-center">
          <div className="text-8xl font-bold text-primary mb-6">404</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">{t.title}</h1>
          <p className="text-default-600 mb-8">{t.description}</p>
          <div className="space-y-3">
            <Link href={`/${locale}`}>
              <Button color="primary" size="lg" className="w-full font-medium">
                {t.goHome}
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button
                variant="bordered"
                size="lg"
                className="w-full font-medium"
              >
                {t.contactSupport}
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
