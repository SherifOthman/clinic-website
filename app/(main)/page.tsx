"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Switch } from "@heroui/switch";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  CalendarIcon,
  ChartIcon,
  ClipboardIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
} from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { PricingCard } from "@/components/ui/PricingCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { apiClient } from "@/lib/api";
import { UI } from "@/lib/constants";
import { SubscriptionPlan } from "@/types";

const features = [
  {
    icon: <CalendarIcon size={24} />,
    title: "Smart Scheduling",
    description:
      "Intelligent appointment booking with automated reminders and conflict detection.",
  },
  {
    icon: <UsersIcon size={24} />,
    title: "Patient Management",
    description:
      "Complete patient records, medical history, and treatment tracking in one place.",
  },
  {
    icon: <ClipboardIcon size={24} />,
    title: "Digital Records",
    description:
      "Secure, searchable digital medical records with easy sharing capabilities.",
  },
  {
    icon: <ShieldIcon size={24} />,
    title: "HIPAA Compliant",
    description:
      "Bank-level security ensuring patient data privacy and regulatory compliance.",
  },
  {
    icon: <ChartIcon size={24} />,
    title: "Analytics & Reports",
    description:
      "Comprehensive insights into clinic performance and patient trends.",
  },
  {
    icon: <StarIcon size={24} />,
    title: "Multi-Location",
    description:
      "Manage multiple clinic branches from a single, unified dashboard.",
  },
];

const DEMO_PLANS: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    doctorLimit: 2,
    appointmentLimit: 500,
    features: [
      "Up to 2 doctors",
      "500 appointments/month",
      "Basic appointment scheduling",
      "Patient records management",
      "Email notifications",
      "Mobile app access",
      "Basic reporting",
      "Email support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 79,
    doctorLimit: 10,
    appointmentLimit: 2000,
    isPopular: true,
    features: [
      "Up to 10 doctors",
      "2,000 appointments/month",
      "Advanced scheduling & calendar",
      "Complete patient management",
      "SMS & email notifications",
      "Analytics & custom reports",
      "Multi-location support",
      "Priority support",
      "API access",
      "Custom workflows",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    doctorLimit: 50,
    appointmentLimit: 10000,
    features: [
      "Up to 50 doctors",
      "10,000 appointments/month",
      "Advanced workflow automation",
      "Custom integrations",
      "White-label options",
      "Advanced analytics & BI",
      "Dedicated account manager",
      "24/7 phone support",
      "SLA guarantee",
      "Custom training",
      "Data migration assistance",
      "Compliance reporting",
    ],
  },
];

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Family Medicine",
    content:
      "ClinicFlow transformed our practice. Patient scheduling is now effortless and our staff productivity has increased by 40%.",
    rating: 5,
  },
  {
    name: "Dr. Michael Chen",
    role: "Pediatrics",
    content:
      "The digital records system is intuitive and secure. Our patients love the automated appointment reminders.",
    rating: 5,
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Internal Medicine",
    content:
      "Best investment we've made for our clinic. The analytics help us make better business decisions every day.",
    rating: 5,
  },
];

export default function Home() {
  const router = useRouter();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await apiClient.getSubscriptionPlans();
      setPlans(data);
    } catch (error) {
      setPlans(DEMO_PLANS);
    }
  };

  const selectPlan = (planId: string) => {
    setSelectedPlan(planId);
    router.push(`/register?plan=${planId}`);
  };

  const getPrice = (price: number) => {
    return isAnnual ? Math.round(price * UI.PRICING_DISCOUNT) : price;
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-8 py-16 md:py-24 px-6">
        <div className="max-w-4xl text-center">
          <Chip color="primary" variant="flat" className="mb-6">
            Trusted by 1000+ Healthcare Practices
          </Chip>
          <h1 className={title({ size: "lg", className: "mb-6" })}>
            Complete Clinic Management
            <br />
            <span className={title({ color: "blue", size: "lg" })}>
              Made Simple
            </span>
          </h1>
          <p className={subtitle({ className: "mb-8 max-w-2xl mx-auto" })}>
            Streamline your healthcare practice with our comprehensive clinic
            management platform. From appointment scheduling to patient records,
            everything you need in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NextLink href="/register">
              <Button color="primary" size="lg" className="font-semibold">
                Start Free Trial
              </Button>
            </NextLink>
            <NextLink href="/pricing">
              <Button variant="bordered" size="lg" className="font-semibold">
                View Pricing
              </Button>
            </NextLink>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-default-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={title({ size: "md", className: "mb-4" })}>
              Everything You Need to Run Your Clinic
            </h2>
            <p className={subtitle({ className: "max-w-2xl mx-auto" })}>
              Powerful features designed specifically for healthcare
              professionals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={title({ size: "md", className: "mb-4" })}>
              Get Started in Minutes
            </h2>
            <p className={subtitle({ className: "max-w-2xl mx-auto" })}>
              Simple setup process to get your clinic running smoothly
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Your Plan</h3>
              <p className="text-default-600">
                Select the perfect plan for your clinic size and needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Setup Your Clinic</h3>
              <p className="text-default-600">
                Add your clinic details and configure your preferences
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Start Managing</h3>
              <p className="text-default-600">
                Begin scheduling appointments and managing patients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-default-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={title({ size: "md", className: "mb-4" })}>
              Trusted by Healthcare Professionals
            </h2>
            <p className={subtitle({ className: "max-w-2xl mx-auto" })}>
              See what doctors are saying about ClinicFlow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <Chip color="primary" variant="flat" size="lg" className="mb-6">
              💰 Simple, Transparent Pricing
            </Chip>
            <h2 className={title({ size: "lg", className: "mb-6" })}>
              Choose Your{" "}
              <span className={title({ color: "blue", size: "lg" })}>Plan</span>
            </h2>
            <p className={subtitle({ className: "mb-8 max-w-3xl mx-auto" })}>
              Start with our 14-day free trial. No credit card required. Scale
              as you grow with transparent pricing and no hidden fees.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span
                className={`text-lg ${!isAnnual ? "text-primary font-semibold" : "text-default-600"}`}
              >
                Monthly
              </span>
              <Switch
                isSelected={isAnnual}
                onValueChange={setIsAnnual}
                color="primary"
                size="lg"
              />
              <span
                className={`text-lg ${isAnnual ? "text-primary font-semibold" : "text-default-600"}`}
              >
                Annual
              </span>
              <Chip color="success" variant="flat" size="sm">
                Save 20%
              </Chip>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isAnnual={isAnnual}
                isSelected={selectedPlan === plan.id}
                onSelect={selectPlan}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className={title({ size: "md", className: "mb-4" })}>
            Ready to Transform Your Practice?
          </h2>
          <p className={subtitle({ className: "mb-8 max-w-2xl mx-auto" })}>
            Join thousands of healthcare professionals who trust ClinicFlow to
            manage their practice efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NextLink href="/register">
              <Button color="primary" size="lg" className="font-semibold">
                Start Your Free Trial
              </Button>
            </NextLink>
            <Button
              variant="bordered"
              size="lg"
              className="font-semibold"
              onPress={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
