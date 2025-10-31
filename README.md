# ClinicFlow - Clean SaaS Onboarding Website

A clean, production-ready SaaS onboarding website built with Next.js 16, React 19, and Hero UI. Features a modular architecture with reusable components and placeholder server actions ready for backend integration.

## 🎯 Project Overview

This is a **UI-focused refactor** of an existing Next.js project. The goal was to create a clean, modular structure with:

- Hero UI components with blue theme (#2563eb)
- Reusable auth components
- Placeholder server actions (no real API logic)
- Clean navigation flow from landing → signup → dashboard

## 📁 Project Structure

```
project/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Home page (hero, pricing CTA)
│   ├── pricing/page.tsx         # Full pricing page
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact page
│   ├── login/page.tsx           # Login form
│   ├── signup/page.tsx          # Signup form
│   ├── verify-email/page.tsx    # Email verification instructions
│   ├── verified/page.tsx        # Success page with dashboard redirect
│   ├── forgot-password/page.tsx # Password reset request
│   ├── reset-password/page.tsx  # Password reset form
│   ├── not-found.tsx           # Clean 404 page
│   └── layout.tsx              # Root layout with shared components
├── features/auth/               # Auth-specific logic
│   ├── actions/authActions.ts   # Placeholder server actions
│   ├── components/              # Reusable auth components
│   │   ├── AuthCard.tsx        # Form wrapper card
│   │   ├── InputField.tsx      # Styled input component
│   │   └── SubmitButton.tsx    # Loading-aware submit button
│   └── hooks/useAuthForm.ts    # Auth form utilities
├── components/                  # Shared components
│   ├── Layout.tsx              # Main layout wrapper
│   ├── Navbar.tsx              # Navigation with Hero UI
│   ├── Footer.tsx              # Footer component
│   └── Toast.tsx               # Toast notification component
├── hooks/                      # Custom hooks
│   ├── useToast.ts            # Toast management
│   └── useTheme.ts            # Theme utilities
├── lib/                        # Utilities
│   ├── constants.ts           # Site config and data
│   └── helpers.ts             # Helper functions
└── styles/globals.css         # Global styles
```

## � Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation & Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment is already configured**

   - `.env.local` - Development settings
   - `.env.production` - Production settings

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Theme

- **Primary**: #2563eb (Blue)
- **Primary Light**: #3b82f6
- **Primary Dark**: #1e40af

### Components

- **Hero UI**: Consistent component library throughout
- **AuthCard**: Reusable form wrapper with title/description
- **InputField**: Styled Hero UI Input with consistent styling
- **SubmitButton**: Loading-aware button using useFormStatus()

## 📱 User Flow

1. **Landing Page** (`/`) → Hero section with "Get Started" CTA
2. **Signup** (`/signup`) → Simple form → server action logs data → redirect to `/verify-email`
3. **Verify Email** (`/verify-email`) → Instructions page
4. **Verified** (`/verified`) → Success page with "Go to Dashboard" button
5. **Login** (`/login`) → Form → server action logs data → redirect to dashboard
6. **Password Reset** → Complete forgot/reset flow with placeholder actions

## 🔧 Placeholder Server Actions

All forms use placeholder server actions in `features/auth/actions/authActions.ts`:

```typescript
export async function signupAction(formData: FormData) {
  console.log('SIGNUP', Object.fromEntries(formData));
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  redirect('/verify-email');
}

export async function loginAction(formData: FormData) {
  console.log('LOGIN', Object.fromEntries(formData));
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redirect(
    process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://dashboard.myapp.com',
  );
}
```

### Ready for Backend Integration

- ✅ Actions log form data to console
- ✅ Loading states with `useFormStatus()`
- ✅ Proper redirects after submission
- ✅ Error handling structure in place

## 🧩 Reusable Components

### AuthCard

```tsx
<AuthCard title="Create Account" description="Get started today">
  <form>{/* Form content */}</form>
</AuthCard>
```

### InputField

```tsx
<InputField
  name="email"
  label="Email Address"
  type="email"
  required
  autoComplete="email"
/>
```

### SubmitButton

```tsx
<SubmitButton>Create Account</SubmitButton>
// Automatically shows loading state during form submission
```

## � ADevelopment

### Available Scripts

- `npm run dev` - Development server with Turbopack
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint with auto-fix

### Code Quality

- **ESLint**: Next.js core web vitals rules
- **Prettier**: Single quotes, semicolons, trailing commas
- **TypeScript**: Full type safety
- **Modular Structure**: Easy to extend and maintain

## 🌐 Environment Configuration

### Development (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_DASHBOARD_URL=https://dashboard.myapp.com
NEXT_PUBLIC_PRIMARY_COLOR=blue
```

### Production (.env.production)

```env
NEXT_PUBLIC_API_URL=https://api.myapp.com
NEXT_PUBLIC_DASHBOARD_URL=https://dashboard.myapp.com
NEXT_PUBLIC_PRIMARY_COLOR=blue
```

## 🔄 Next Steps for Backend Integration

1. **Replace Placeholder Actions**: Update server actions in `features/auth/actions/authActions.ts` with real API calls
2. **Add Form Validation**: Implement client-side and server-side validation
3. **Error Handling**: Add proper error states and toast notifications
4. **Authentication State**: Add auth context and protected routes
5. **API Integration**: Connect to your backend API endpoints

## 📋 Features Implemented

### ✅ Pages

- [x] Home page with hero, features, pricing preview
- [x] Full pricing page with FAQ
- [x] About page
- [x] Contact page with form
- [x] Signup/login forms with placeholder actions
- [x] Email verification flow
- [x] Password reset flow
- [x] Clean 404 page

### ✅ Components

- [x] Responsive navbar with Hero UI
- [x] Footer with links
- [x] Reusable auth components (AuthCard, InputField, SubmitButton)
- [x] Toast notification system
- [x] Loading states with useFormStatus

### ✅ Architecture

- [x] Clean folder structure with features/ organization
- [x] Placeholder server actions ready for backend
- [x] TypeScript throughout
- [x] Hero UI with blue theme
- [x] Mobile-responsive design

## 🎯 Key Decisions Made

1. **Features Structure**: Auth-related components live in `features/auth/` for modularity
2. **Placeholder Actions**: All forms log data and redirect appropriately
3. **Blue Theme**: Consistent #2563eb primary color throughout
4. **No API Logic**: Pure UI focus as requested
5. **Hero UI**: Leveraged existing component library for consistency

## � License

This project is licensed under the MIT License.

## 🆘 Support

For questions about this refactor or extending the functionality, check the code comments and component documentation.
