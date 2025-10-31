'use client';

import { Button } from '@heroui/button';
import { useParams, usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const switchLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Button
      variant="light"
      size="sm"
      onPress={switchLanguage}
      className="min-w-unit-16 gap-2 font-medium"
    >
      <div className="flex items-center gap-1">
        {currentLocale === 'en' ? (
          <span className="text-base">🇺🇸</span>
        ) : (
          <span className="text-base">🇸🇦</span>
        )}
        <span className="text-sm font-medium">
          {currentLocale === 'en' ? 'EN' : 'AR'}
        </span>
      </div>
    </Button>
  );
}
