# Component Architecture - Server vs Client Components

This document outlines which components are Server Components vs Client Components and why.

## Server Components (using `getTranslations` from `next-intl/server`)

These components render on the server and don't require client-side JavaScript:

### Pages

- `AboutPage` - Static content, no interactivity
- `ContactPage` - Static content, no interactivity
- `PricingPage` - Static content with server-side data fetching

### Layout Components

- `Footer` - Static links and content, no interactivity needed

### Feature Components

- `AboutSection` - Static content
- `CTASection` - Static content with links
- `FeaturesSection` - Static content
- `HeroContent` - Static content with links
- `TestimonialsSection` - Static content
- `PricingCTA` - Static content with links
- `PricingFAQ` - Static content
- `PricingHero` - Static content
- `PricingPlans` - Static content with server-side data
- `PlanCard` - Static content

## Client Components (using `useTranslations` from `next-intl`)

These components require client-side JavaScript for interactivity:

### Layout Components

- `Navbar` - **MUST be client component**
  - Uses `useState` for menu toggle
  - Uses `useRouter` for navigation
  - Uses `usePathname` for active link detection
  - Has click handlers for language switching
  - Has interactive menu functionality

### System Components

- `error.tsx` - Error boundaries must be client components
- `providers.tsx` - Provider components need to be client components

## Benefits of Server-Side Rendering

By using `getTranslations` from `next-intl/server` for server components:

1. **Performance**: Translations are processed on the server, reducing client-side JavaScript
2. **SEO**: Content is fully rendered on the server for better search engine indexing
3. **Loading Speed**: No need to wait for client-side translation loading
4. **Bundle Size**: Translation logic doesn't need to be sent to the client
5. **Static Generation**: Pages can be statically generated with translations

## Key Rules

1. Use `getTranslations` from `next-intl/server` for server components (async functions)
2. Use `useTranslations` from `next-intl` only for client components that need interactivity
3. Mark components with `"use client"` only when they actually need client-side features
4. Server components should be declared as `async` functions when using `getTranslations`
5. Always `await` the result of `getTranslations()` and `getLocale()`

## Migration Checklist

- [x] Convert static components to use `getTranslations` from `next-intl/server`
- [x] Remove unnecessary `"use client"` directives
- [x] Ensure all server components are properly `async`
- [x] Keep interactive components as client components
- [x] Verify build passes without errors
- [x] Test that translations work correctly on both server and client
