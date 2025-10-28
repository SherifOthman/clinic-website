# ClinicFlow - SaaS Clinic Management Platform

A modern, responsive clinic management platform built with Next.js 16, React 19, and Hero UI. This is the marketing website and user onboarding flow for healthcare practices.

## 🚀 Features

### Landing Page

- Modern hero section with clear value proposition
- Feature showcase with icons and descriptions
- Customer testimonials
- Pricing overview
- Responsive design with blue theme

### User Authentication

- **Registration Flow**: Multi-step form with plan selection and clinic setup
- **Login System**: Secure authentication with redirect to dashboard
- **Password Reset**: Forgot password and reset functionality
- **Cookie Management**: Secure token storage and management

### Subscription Management

- **Pricing Plans**: Dynamic plan fetching from API
- **Plan Selection**: Interactive pricing cards with feature comparison
- **Trial Registration**: Free trial signup with plan selection

### Technical Features

- **Next.js 16**: Latest features including Turbopack for fast development
- **React 19**: Modern React with concurrent features
- **Hero UI**: Beautiful, accessible component library
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **API Integration**: RESTful API client with error handling

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: Hero UI (NextUI successor)
- **Styling**: Tailwind CSS with custom blue theme
- **Language**: TypeScript
- **State Management**: React hooks and context
- **Authentication**: Cookie-based with secure storage
- **API Client**: Custom fetch wrapper with error handling

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── login/             # Login page
│   ├── register/          # Multi-step registration
│   ├── pricing/           # Pricing plans page
│   ├── forgot-password/   # Password reset request
│   ├── reset-password/    # Password reset form
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ui/               # Custom UI components
│   ├── navbar.tsx        # Navigation component
│   └── icons.tsx         # Icon components
├── lib/                  # Utility libraries
│   ├── api.ts           # API client
│   └── auth.ts          # Authentication utilities
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── config/              # Configuration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd clinic-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Update `.env.local` with your API configuration:

   ```env
   NEXT_PUBLIC_API_URL=https://api.clinicflow.com
   NEXT_PUBLIC_DASHBOARD_URL=https://dashboard.myapp.com
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#2563eb) - Used for CTAs, links, and brand elements
- **Success**: Green - For success states and confirmations
- **Danger**: Red - For errors and warnings
- **Default**: Gray scale - For text and neutral elements

### Typography

- **Headings**: Bold, clear hierarchy
- **Body**: Readable font sizes with proper line height
- **Interactive**: Hover states and transitions

### Components

- **Cards**: Clean, shadowed containers
- **Buttons**: Primary, secondary, and bordered variants
- **Forms**: Accessible inputs with validation
- **Navigation**: Responsive navbar with mobile menu

## 🔗 API Integration

The application integrates with a .NET API backend:

### Endpoints

- `GET /subscription-plans` - Fetch available plans
- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Password reset confirmation

### Authentication Flow

1. User registers/logs in
2. API returns access and refresh tokens
3. Tokens stored in secure cookies
4. User redirected to dashboard domain

## 📱 Pages Overview

### Landing Page (`/`)

- Hero section with value proposition
- Features showcase
- How it works section
- Customer testimonials
- Call-to-action sections

### Pricing (`/pricing`)

- Dynamic plan loading from API
- Interactive pricing cards
- FAQ section
- Plan comparison

### Registration (`/register`)

- **Step 1**: Account information (name, email, password)
- **Step 2**: Plan selection with plan details
- **Step 3**: Clinic setup (name, phone, optional branch)
- **Step 4**: Success confirmation and redirect

### Login (`/login`)

- Email and password authentication
- Forgot password link
- Registration link for new users

### Password Reset (`/forgot-password`, `/reset-password`)

- Email-based password reset flow
- Token validation
- New password confirmation

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript**: Strict type checking
- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting
- **Component Structure**: Modular, reusable components

## 🚀 Deployment

### Environment Variables

Set the following in your production environment:

```env
NEXT_PUBLIC_API_URL=https://api.clinicflow.com
NEXT_PUBLIC_DASHBOARD_URL=https://dashboard.clinicflow.com
```

### Build and Deploy

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@clinicflow.com or create an issue in the repository.
