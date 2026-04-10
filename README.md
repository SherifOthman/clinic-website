# ClinicCare Website

The marketing and landing page for the Clinic Management platform. A fully static site built with Next.js 16 App Router, pre-rendered at build time in both English and Arabic, and deployed to a CDN for instant global load times.

**Live Demo**: https://clinic-website-lime.vercel.app  
**Dashboard**: https://clinic-dashboard-ecru.vercel.app  
**API**: http://clinic-api.runasp.net/scalar/v1

**Repositories**: [Website](https://github.com/SherifOthman/clinic-website) • [Dashboard](https://github.com/SherifOthman/clinic-dashboard) • [API](https://github.com/SherifOthman/clinic-api)

---

## What It Is

A four-page marketing site (home, about, pricing, contact) that presents the clinic management platform to potential customers. The goal was to build something fast, SEO-friendly, and fully bilingual — without shipping unnecessary JavaScript to the browser.

---

## How It's Built

### Next.js App Router with Server Components

All content sections are Server Components by default — they render to HTML on the server and ship zero JavaScript to the client. Only the Navbar uses `"use client"` for the mobile menu toggle and locale switcher. The result is a ~85 KB gzipped bundle, compared to 200–500 KB for a typical React SPA, and a Lighthouse score above 95.

### Static Site Generation

Every page exports `dynamic = "force-static"` and uses `generateStaticParams()` to pre-render both locale variants (`/en` and `/ar`) at build time. There is no server runtime — the entire site is static HTML served from a CDN. Build time is around 30 seconds.

### Internationalization with next-intl

Translations are resolved server-side and embedded in the HTML at build time, so there's no flash of untranslated content. The locale is part of the URL path (`/en/pricing`, `/ar/pricing`). The locale switcher in the navbar preserves the current path when switching languages. Translation keys are type-safe via TypeScript. Each locale has 200+ keys organized by page section.

### RTL Support

The `dir` attribute on the `<html>` element is set to `rtl` for Arabic. Tailwind CSS automatically flips all directional utilities (`ml-`, `mr-`, `pl-`, `pr-`, etc.) so no separate RTL stylesheet is needed. The font switches between Roboto (English) and Cairo (Arabic) using `next/font/google`, self-hosted and optimized at build time.

---

## Tech Stack

| Category      | Technology                                  |
| ------------- | ------------------------------------------- |
| Framework     | Next.js 16 (App Router)                     |
| Language      | TypeScript                                  |
| Styling       | Tailwind CSS 4                              |
| UI components | HeroUI v2                                   |
| i18n          | next-intl                                   |
| Animations    | Framer Motion                               |
| Fonts         | Google Fonts (Roboto + Cairo) via next/font |

---

## Getting Started

```bash
npm install
npm run dev
```

---

## License

MIT
