'use client';

import { Button } from '@heroui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from './icons';

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="light"
        size="sm"
        isIconOnly
        className="text-foreground/70"
        aria-label="Toggle theme"
      >
        <SunIcon className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="light"
      size="sm"
      isIconOnly
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-foreground/70 hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="w-4 h-4" />
      ) : (
        <MoonIcon className="w-4 h-4" />
      )}
    </Button>
  );
}
