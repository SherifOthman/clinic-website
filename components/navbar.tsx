'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Link } from '@heroui/link';
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/navbar';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ClinicIcon } from './icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitch } from './ThemeSwitch';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = params.locale as string;

  const publicNavigationLinks = [
    { label: t('home'), href: `/${locale}` },
    { label: t('pricing'), href: `/${locale}/pricing` },
    { label: t('about'), href: `/${locale}/about` },
    { label: t('contact'), href: `/${locale}/contact` },
  ];

  const authenticatedNavigationLinks = [
    { label: t('home'), href: `/${locale}` },
    { label: 'Dashboard', href: `/${locale}/dashboard` },
    { label: t('pricing'), href: `/${locale}/pricing` },
    { label: t('about'), href: `/${locale}/about` },
    { label: t('contact'), href: `/${locale}/contact` },
  ];

  const navigationLinks = isAuthenticated
    ? authenticatedNavigationLinks
    : publicNavigationLinks;

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
  };

  return (
    <HeroNavbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-background/70 backdrop-blur-md border-b border-divider"
      height="4rem"
    >
      {/* Left side - Brand and Navigation */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink href={`/${locale}`} className="flex items-center gap-2">
            <ClinicIcon className="text-primary" size={32} />
            <span className="font-bold text-xl text-foreground">
              {tCommon('clinicFlow')}
            </span>
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-6 justify-start ml-8">
          {navigationLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <NavbarItem key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-colors font-medium ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            );
          })}
        </div>
      </NavbarContent>

      {/* Right side - Language, Theme, Auth */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <LanguageSwitcher />
          <ThemeSwitch />
        </NavbarItem>

        {isAuthenticated && user ? (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="hidden sm:flex flex-col items-end">
                    <p className="text-sm font-medium text-foreground">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-default-500">
                      {user.clinicName}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold cursor-pointer">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu actions">
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={handleLogout}
                  textValue="Logout"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                href={`/${locale}/login`}
                className="text-foreground/70 hover:text-foreground font-medium"
              >
                {t('login')}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <NextLink href={`/${locale}/signup`}>
                <Button
                  color="primary"
                  variant="solid"
                  size="sm"
                  className="font-medium"
                >
                  {t('signup')}
                </Button>
              </NextLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <LanguageSwitcher />
        <ThemeSwitch />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="bg-background/95 backdrop-blur-md">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navigationLinks.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <Link
                  className={`w-full font-medium ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            );
          })}

          {isAuthenticated && user ? (
            <>
              <NavbarMenuItem className="mt-4">
                <div className="flex items-center gap-3 p-2 bg-default-100 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-default-500">
                      {user.clinicName}
                    </p>
                  </div>
                </div>
              </NavbarMenuItem>
              <NavbarMenuItem className="mt-2">
                <Button
                  color="danger"
                  variant="light"
                  className="w-full font-medium"
                  onPress={handleLogout}
                >
                  Log Out
                </Button>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem>
                <Link
                  className="w-full text-foreground/70 hover:text-foreground font-medium"
                  href={`/${locale}/login`}
                  size="lg"
                >
                  {t('login')}
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem className="mt-4">
                <NextLink href={`/${locale}/signup`}>
                  <Button
                    color="primary"
                    variant="solid"
                    className="w-full font-medium"
                  >
                    {t('signup')}
                  </Button>
                </NextLink>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroNavbar>
  );
}
