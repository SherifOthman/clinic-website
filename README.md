# ClinicCare Website

## 🚀 Overview

Marketing website for clinic management SaaS built with Next.js 16 App Router. Fully static site with server-side rendering, internationalization (English/Arabic with RTL), and optimized for SEO and performance.

**Live Demo**: https://clinic-website-lime.vercel.app  
**Dashboard**: https://clinic-dashboard-ecru.vercel.app  
**API**: http://clinic-api.runasp.net/scalar/v1

**Repositories**: [Website](https://github.com/SherifOthman/clinic-website) • [Dashboard](https://github.com/SherifOthman/clinic-dashboard) • [API](https://github.com/SherifOthman/clinic-api)

---

## 🏗 Architecture Decisions

**Next.js App Router** chosen for server components by default, nested layouts, and file-based routing. Reduces client-side JavaScript significantly compared to traditional SPAs.

**Server vs Client components:** All content sections are Server Components (zero JavaScript shipped). Only Navbar uses `"use client"` for mobile menu toggle and locale switching. Total bundle: ~85 KB vs typical SPA 200-500 KB.

**Folder structure:** App directory handles routing with `[locale]` dynamic segment. Source code organized by feature (home, about, pricing, contact) with shared components in core. Each feature is self-contained with its own components and pages.

---

## 🌍 Internationalization

**next-intl usage:** Built for App Router with server-side translation resolution. Translations loaded server-side and embedded in HTML at build time. Type-safe translation keys with TypeScript. 200+ keys per locale organized by feature (navigation, hero, features, etc.).

**Locale routing:** All routes prefixed with locale (`/en/about`, `/ar/pricing`). `generateStaticParams()` pre-renders both locale variants at build time. Locale switcher in navbar preserves current path when switching languages.

**RTL handling:** HTML `dir` attribute set to `rtl` for Arabic. Tailwind automatically flips directional utilities (`ml-4` becomes `mr-4`). Font switching between Roboto (English) and Cairo (Arabic) via `next/font/google`. Fonts self-hosted and optimized at build time.

---

## ⚡ Rendering Strategy

**Static Site Generation (SSG):** All pages use `export const dynamic = "force-static"` for build-time generation. Both locale variants (`/en` and `/ar`) pre-rendered at build time. Zero server runtime cost, deployed to CDN for instant page loads globally.

**SEO benefits:** Search engines see fully rendered HTML with translations embedded. No JavaScript execution required for content. Faster indexing and better rankings. Social media previews work correctly. Lighthouse scores 95+.

**Metadata handling:** Root layout defines default metadata (title template, description, icons). Each page can export its own metadata that merges with root. Supports Open Graph and Twitter Cards for social sharing.

---

## 📱 Responsive Design

**Mobile-first approach:** All components designed for mobile first, then enhanced for larger screens using Tailwind breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px). Single column on mobile, grid layouts on desktop.

**Component reuse strategy:** Section components are self-contained and composed in page components. Shared UI components (Navbar, Footer) in core folder, reused across all pages via locale layout. No prop drilling - translations handled internally within components.

---

## 🧠 What I Learned

**Working with App Router:** Understanding the difference between Server and Client Components. Recognizing when to use `"use client"` (only for interactivity) versus keeping components on the server (default). Learning that less JavaScript shipped to the client improves performance significantly.

**SEO considerations:** Static generation provides better SEO than client-side rendering. Search engines prefer fully rendered HTML. Metadata configuration at layout and page levels. Understanding how server-side rendering benefits crawlers and social media previews.

**Internationalized web applications:** Implementing locale-based routing with next-intl. Handling RTL layouts for Arabic. Font switching based on locale. Server-side translation resolution eliminates flash of untranslated content. Understanding trade-offs between static generation and dynamic content for i18n.

---

## 📊 Project Scope

**4 pages** (home, about, pricing, contact) with 2 locales (English, Arabic with RTL).

**Technology stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, HeroUI, next-intl, Framer Motion.

**Infrastructure:** 25+ components, 200+ translation keys per locale, ~30 second build time, ~85 KB bundle size (gzipped), Lighthouse score 95+.

---

## License

MIT
