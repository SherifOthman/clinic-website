"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Stepper } from "@/src/components/Stepper";
import { ClinicInfoForm } from "@/src/features/onboarding/ClinicInfoForm";
import { ClinicNameForm } from "@/src/features/onboarding/ClinicNameForm";
import { PlanSelector } from "@/src/features/onboarding/PlanSelector";

export default function OnboardingPage() {
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
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-4xl md:text-5xl mb-4">🎉</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-success">
              {t("onboarding.step4.title")}
            </h2>
            <p className="text-base md:text-lg text-default-600">
              {t("onboarding.step4.subtitle")}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
      <Card className="shadow-2xl border border-divider bg-content1 rounded-3xl overflow-hidden">
        <CardHeader className="flex flex-col gap-6 md:gap-8 px-6 md:px-10 pt-6 md:pt-8 pb-4 md:pb-6 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
              {t("onboarding.title")}
            </h1>
            <p className="text-sm md:text-base text-default-600">
              {t("onboarding.subtitle")}
            </p>
          </div>

          <div className="max-w-2xl mx-auto w-full">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
        </CardHeader>

        <CardBody className="px-8 md:px-16 pb-6 md:pb-8">
          <div className="min-h-[500px] md:min-h-[600px] flex flex-col">
            <div className="flex-grow py-4 md:py-6">{renderStepContent()}</div>

            <div className="flex justify-between items-center pt-6 md:pt-8 border-t border-divider">
              <Button
                variant="flat"
                size="lg"
                onPress={handlePrevious}
                isDisabled={currentStep === 0}
                className="font-semibold min-w-24 md:min-w-32"
              >
                {t("common.previous")}
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  color="primary"
                  size="lg"
                  onPress={handleNext}
                  className="font-semibold shadow-lg min-w-24 md:min-w-32"
                >
                  {t("common.next")}
                </Button>
              ) : (
                <Button
                  color="success"
                  size="lg"
                  className="font-semibold shadow-lg min-w-32 md:min-w-40"
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
