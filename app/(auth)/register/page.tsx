"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { CheckIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Stepper } from "@/components/ui/Stepper";
import { apiClient } from "@/lib/api";
import { setAuthCookies } from "@/lib/auth";
import { TIMEOUTS } from "@/lib/constants";
import {
  RegistrationFormData,
  validateStep1,
  validateStep2,
  validateStep3,
} from "@/lib/validations";
import { SubscriptionPlan } from "@/types";

type FormStep = 1 | 2 | 3 | 4;

function RegisterPageContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    subscriptionPlanId: "",
    clinicName: "",
    clinicPhone: "",
    branchCity: "",
    branchAddress: "",
    branchPhone: "",
  });

  useEffect(() => {
    fetchPlans();
    const planId = searchParams.get("plan");
    if (planId) {
      setFormData((prev) => ({ ...prev, subscriptionPlanId: planId }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (formData.subscriptionPlanId && plans.length > 0) {
      const plan = plans.find((p) => p.id === formData.subscriptionPlanId);
      setSelectedPlan(plan || null);
    }
  }, [formData.subscriptionPlanId, plans]);

  const fetchPlans = async () => {
    try {
      const data = await apiClient.getSubscriptionPlans();
      setPlans(data);
    } catch (err) {
      // Use mock data for demo
      setPlans(mockPlans);
    }
  };

  const updateFormData = (field: keyof RegistrationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
    setValidationErrors([]);
  };

  const validateStep = (step: FormStep): boolean => {
    let errors: string[] = [];

    switch (step) {
      case 1:
        errors = validateStep1({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        break;
      case 2:
        errors = validateStep2({
          subscriptionPlanId: formData.subscriptionPlanId,
        });
        break;
      case 3:
        errors = validateStep3({
          clinicName: formData.clinicName,
          clinicPhone: formData.clinicPhone,
          branchCity: formData.branchCity,
          branchAddress: formData.branchAddress,
          branchPhone: formData.branchPhone,
        });
        break;
      default:
        return true;
    }

    return errors.length === 0;
  };

  const handleNext = () => {
    let errors: string[] = [];

    switch (currentStep) {
      case 1:
        errors = validateStep1({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        break;
      case 2:
        errors = validateStep2({
          subscriptionPlanId: formData.subscriptionPlanId,
        });
        break;
    }

    setValidationErrors(errors);

    if (errors.length === 0) {
      setCurrentStep((prev) => Math.min(prev + 1, 4) as FormStep);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as FormStep);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    setError(null);

    try {
      // Mock registration - simulate API call
      await new Promise((resolve) =>
        setTimeout(resolve, TIMEOUTS.API_SIMULATION)
      );

      // Simulate successful registration
      const mockResponse = {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        user: {
          id: "mock-user-id",
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          clinicName: formData.clinicName,
          phone: formData.clinicPhone,
          role: "admin" as const,
          isEmailVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      // Set mock auth cookies (in real app, this would be the actual response)
      setAuthCookies(mockResponse);
      setCurrentStep(4);

      // Redirect after showing success message
      setTimeout(() => {
        // In demo mode, just redirect to home instead of dashboard
        window.location.href = "/";
      }, TIMEOUTS.REDIRECT_DELAY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Account Information", description: "Basic details" },
    { title: "Choose Your Plan", description: "Select pricing" },
    { title: "Clinic Setup", description: "Practice info" },
    { title: "Welcome!", description: "All done" },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8 px-6">
      <div className="text-center mb-8">
        <h1 className={title({ size: "md", className: "mb-4" })}>
          Create Your Account
        </h1>
        <p className={subtitle()}>Get started with your free trial today</p>
      </div>

      <Card className="mb-6 bg-default-50">
        <CardBody className="p-6">
          <Stepper
            currentStep={currentStep}
            totalSteps={4}
            steps={steps}
            className="mb-6"
          />

          {/* Mock Data Buttons for Testing */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-4 flex gap-2">
              {currentStep === 1 && (
                <Button
                  size="sm"
                  variant="flat"
                  color="secondary"
                  onPress={() => {
                    setFormData({
                      ...formData,
                      firstName: "John",
                      lastName: "Doe",
                      email: "john.doe@example.com",
                      password: "password123",
                      confirmPassword: "password123",
                    });
                  }}
                >
                  Fill Mock Data
                </Button>
              )}
              {currentStep === 2 && (
                <Button
                  size="sm"
                  variant="flat"
                  color="secondary"
                  onPress={() => {
                    setFormData({
                      ...formData,
                      subscriptionPlanId: "professional",
                    });
                  }}
                >
                  Select Professional
                </Button>
              )}
              {currentStep === 3 && (
                <Button
                  size="sm"
                  variant="flat"
                  color="secondary"
                  onPress={() => {
                    setFormData({
                      ...formData,
                      clinicName: "Downtown Medical Center",
                      clinicPhone: "+1 (555) 123-4567",
                      branchCity: "New York",
                      branchAddress: "123 Main Street, Suite 100",
                      branchPhone: "+1 (555) 123-4567",
                    });
                  }}
                >
                  Fill Clinic Data
                </Button>
              )}
            </div>
          )}
          {error && (
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mb-6">
              <p className="text-danger-600 text-sm">{error}</p>
            </div>
          )}

          {validationErrors.length > 0 && (
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mb-6">
              <ul className="text-danger-600 text-sm space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Step 1: Account Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onValueChange={(value) => updateFormData("firstName", value)}
                  isRequired
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onValueChange={(value) => updateFormData("lastName", value)}
                  isRequired
                />
              </div>
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onValueChange={(value) => updateFormData("email", value)}
                isRequired
              />
              <Input
                type="password"
                label="Password"
                placeholder="Create a password (min 8 characters)"
                value={formData.password}
                onValueChange={(value) => updateFormData("password", value)}
                isRequired
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onValueChange={(value) =>
                  updateFormData("confirmPassword", value)
                }
                isRequired
                color={
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                    ? "danger"
                    : "default"
                }
                errorMessage={
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                    ? "Passwords do not match"
                    : ""
                }
              />
            </div>
          )}

          {/* Step 2: Plan Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid gap-4">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    isPressable
                    className={`cursor-pointer transition-all ${
                      formData.subscriptionPlanId === plan.id
                        ? "border-2 border-primary bg-primary-50"
                        : "border border-default-200 hover:border-primary"
                    }`}
                    onPress={() =>
                      updateFormData("subscriptionPlanId", plan.id)
                    }
                  >
                    <CardBody className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">
                              {plan.name}
                            </h3>
                            {plan.isPopular && (
                              <Chip color="primary" size="sm">
                                Most Popular
                              </Chip>
                            )}
                          </div>
                          <p className="text-2xl font-bold text-primary mb-2">
                            ${plan.price}
                            <span className="text-sm font-normal text-default-500">
                              /month
                            </span>
                          </p>
                          <p className="text-sm text-default-600 mb-3">
                            Up to {plan.doctorLimit} doctors •{" "}
                            {plan.appointmentLimit} appointments/month
                          </p>
                          <div className="grid grid-cols-2 gap-1">
                            {plan.features.slice(0, 4).map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1 text-xs"
                              >
                                <CheckIcon className="w-3 h-3 text-primary" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {formData.subscriptionPlanId === plan.id && (
                          <CheckIcon className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Clinic Setup */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {selectedPlan && (
                <div className="bg-primary-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-primary mb-1">
                    Selected Plan: {selectedPlan.name}
                  </h3>
                  <p className="text-sm text-primary-600">
                    ${selectedPlan.price}/month • Up to{" "}
                    {selectedPlan.doctorLimit} doctors
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Clinic Information</h3>
                <Input
                  label="Clinic Name"
                  placeholder="Enter your clinic name"
                  value={formData.clinicName}
                  onValueChange={(value) => updateFormData("clinicName", value)}
                  isRequired
                />
                <Input
                  label="Clinic Phone"
                  placeholder="Enter clinic phone number"
                  value={formData.clinicPhone}
                  onValueChange={(value) =>
                    updateFormData("clinicPhone", value)
                  }
                  isRequired
                />
              </div>

              <div className="my-6">
                <Divider />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  First Branch (Optional)
                </h3>
                <p className="text-sm text-default-600">
                  You can add more branches later from your dashboard
                </p>
                <Input
                  label="City"
                  placeholder="Enter city"
                  value={formData.branchCity}
                  onValueChange={(value) => updateFormData("branchCity", value)}
                />
                <Input
                  label="Address"
                  placeholder="Enter full address"
                  value={formData.branchAddress}
                  onValueChange={(value) =>
                    updateFormData("branchAddress", value)
                  }
                />
                <Input
                  label="Branch Phone"
                  placeholder="Enter branch phone number"
                  value={formData.branchPhone}
                  onValueChange={(value) =>
                    updateFormData("branchPhone", value)
                  }
                />
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome to ClinicFlow!
              </h2>
              <p className="text-default-600 mb-6">
                Your account has been created successfully. You'll be redirected
                to your dashboard shortly.
              </p>
              <LoadingSpinner size="sm" label="Redirecting to dashboard..." />
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="bordered"
                onPress={handleBack}
                isDisabled={currentStep === 1}
              >
                Back
              </Button>

              {currentStep < 3 ? (
                <Button
                  color="primary"
                  onPress={handleNext}
                  isDisabled={!validateStep(currentStep)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isLoading={loading}
                  isDisabled={!validateStep(currentStep)}
                >
                  Create Account
                </Button>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

// Mock data for demo
const mockPlans: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    doctorLimit: 2,
    appointmentLimit: 500,
    features: [
      "Up to 2 doctors",
      "500 appointments/month",
      "Basic scheduling",
      "Patient records",
      "Email support",
      "Mobile app access",
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
      "Advanced scheduling",
      "Complete patient management",
      "Analytics & reports",
      "Priority support",
      "Multi-location support",
      "API access",
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
      "Custom workflows",
      "Advanced analytics",
      "Dedicated support",
      "Custom integrations",
      "White-label options",
      "SLA guarantee",
    ],
  },
];

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <LoadingSpinner size="lg" label="Loading..." />
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}
