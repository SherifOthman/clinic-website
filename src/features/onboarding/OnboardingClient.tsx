"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Stepper } from "@/src/components";

import { updateUserAction } from "./actions";

import { ClinicInfoForm } from "./ClinicInfoForm";
import { ClinicNameForm } from "./ClinicNameForm";
import { PlanSelector } from "./PlanSelector";
import { onboardingSchema, type OnboardingFormData } from "./schemas";

export function OnboardingClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      plan: "professional",
      clinicName: "",
      phone: "",
      address: "",
      description: "",
    },
  });

  const { watch, setValue, handleSubmit } = methods;
  const selectedPlan = watch("clinicName");

  const steps = [
    "Choose Your Plan",
    "Clinic Name",
    "Clinic Details",
    "Setup Complete",
  ];

  const handleNext = async () => {
    let isValid = true;

    if (currentStep === 1) {
      isValid = await methods.trigger("clinicName");
    } else if (currentStep === 2) {
      isValid = await methods.trigger(["clinicName", "phone", "address"]);
    }

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: OnboardingFormData) => {
    setIsLoading(true);
    try {
      const updateData: any = {
        plan: data.plan,
        clinicName: data.clinicName,
        phone: data.phone,
        address: data.address,
      };
      if (data.description) {
        updateData.description = data.description;
      }

      const result = await updateUserAction(updateData);

      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Onboarding error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PlanSelector
            selectedPlan={watch("plan")}
            onPlanSelect={(plan) => setValue("plan", plan)}
          />
        );

      case 1:
        return <ClinicNameForm />;

      case 2:
        return <ClinicInfoForm />;

      case 3:
        return (
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 text-4xl md:text-5xl">🎉</div>
            <h2 className="mb-2 text-2xl font-bold text-green-600 md:text-3xl">
              Setup Complete
            </h2>
            <p className="text-default-500 text-base md:text-lg">
              You're all set! Welcome to ClinicFlow
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6 md:py-6">
          <Card className="overflow-hidden rounded-3xl shadow-2xl">
            <CardHeader className="from-primary/8 via-primary/4 flex flex-col gap-6 bg-gradient-to-br to-transparent px-6 pt-6 pb-4 md:gap-8 md:px-10 md:pt-8 md:pb-6">
              <div className="text-center">
                <h1 className="mb-1 text-xl font-bold md:mb-2 md:text-2xl">
                  Welcome to ClinicFlow
                </h1>
                <p className="text-default-500 text-sm md:text-base">
                  Let's set up your clinic in just a few steps
                </p>
              </div>

              <div className="mx-auto w-full max-w-2xl">
                <Stepper steps={steps} currentStep={currentStep} />
              </div>
            </CardHeader>

            <CardBody className="px-8 pb-6 md:px-16 md:pb-8">
              <div className="flex min-h-[400px] flex-col md:min-h-[450px]">
                <div className="flex-grow py-4 md:py-6">
                  {renderStepContent()}
                </div>

                <div className="flex items-center justify-between border-t pt-6 md:pt-8">
                  <Button
                    variant="bordered"
                    size="lg"
                    onPress={handlePrevious}
                    isDisabled={currentStep === 0}
                    className="min-w-24 font-semibold md:min-w-32"
                  >
                    Previous
                  </Button>

                  {currentStep < steps.length - 1 ? (
                    <Button
                      color="primary"
                      size="lg"
                      onPress={handleNext}
                      className="min-w-24 font-semibold shadow-lg md:min-w-32"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      color="success"
                      size="lg"
                      className="min-w-32 font-semibold shadow-lg md:min-w-40"
                      isLoading={isLoading}
                    >
                      Complete Setup
                    </Button>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
}
