"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Stepper } from "@/src/components/Stepper";
import { ClinicInfoForm } from "@/src/features/onboarding/ClinicInfoForm";
import { ClinicNameForm } from "@/src/features/onboarding/ClinicNameForm";
import { PlanSelector } from "@/src/features/onboarding/PlanSelector";

export function OnboardingClient() {
  const t = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<
    "starter" | "professional" | "enterprise"
  >("professional");

  const steps = [
    t("onboarding.step1.title"),
    t("onboarding.step2.title"),
    t("onboarding.step3.title"),
    t("onboarding.step4.title"),
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PlanSelector
            selectedPlan={selectedPlan}
            onPlanSelect={setSelectedPlan}
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
              {t("onboarding.step4.title")}
            </h2>
            <p className="text-default-500 text-base md:text-lg">
              {t("onboarding.step4.subtitle")}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6 md:py-6">
      <Card className="overflow-hidden rounded-3xl shadow-2xl">
        <CardHeader className="from-primary/8 via-primary/4 flex flex-col gap-6 bg-gradient-to-br to-transparent px-6 pt-6 pb-4 md:gap-8 md:px-10 md:pt-8 md:pb-6">
          <div className="text-center">
            <h1 className="mb-1 text-xl font-bold md:mb-2 md:text-2xl">
              {t("onboarding.title")}
            </h1>
            <p className="text-default-500 text-sm md:text-base">
              {t("onboarding.subtitle")}
            </p>
          </div>

          <div className="mx-auto w-full max-w-2xl">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
        </CardHeader>

        <CardBody className="px-8 pb-6 md:px-16 md:pb-8">
          <div className="flex min-h-[500px] flex-col md:min-h-[600px]">
            <div className="flex-grow py-4 md:py-6">{renderStepContent()}</div>

            <div className="flex items-center justify-between border-t pt-6 md:pt-8">
              <Button
                variant="bordered"
                size="lg"
                onPress={handlePrevious}
                isDisabled={currentStep === 0}
                className="min-w-24 font-semibold md:min-w-32"
              >
                {t("common.previous")}
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  color="primary"
                  size="lg"
                  onPress={handleNext}
                  className="min-w-24 font-semibold shadow-lg md:min-w-32"
                >
                  {t("common.next")}
                </Button>
              ) : (
                <Button
                  color="success"
                  size="lg"
                  className="min-w-32 font-semibold shadow-lg md:min-w-40"
                >
                  {t("onboarding.completeSetup")}
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
