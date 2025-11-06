"use client";

import { Check } from "lucide-react";

import { cn } from "@/src/lib/utils";

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const Stepper = ({
  steps,
  currentStep,
  className = "",
}: StepperProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-1 items-center">
            {/* Step Circle and Label */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 md:h-10 md:w-10",
                  index < currentStep
                    ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/30 dark:border-green-500 dark:bg-green-500"
                    : index === currentStep
                      ? "bg-primary border-primary shadow-primary/40 scale-110 text-white shadow-lg"
                      : "bg-content1 border-divider text-default-500 shadow-sm"
                )}
              >
                {index < currentStep ? (
                  <Check size={14} className="md:h-4 md:w-4" strokeWidth={3} />
                ) : (
                  <span className="text-xs font-bold md:text-sm">
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Step Label */}
              <span
                className={cn(
                  "mt-2 max-w-[70px] text-center text-[10px] leading-tight font-medium transition-colors md:max-w-[80px] md:text-xs",
                  index === currentStep
                    ? "text-primary font-bold"
                    : index < currentStep
                      ? "font-semibold text-green-600 dark:text-green-400"
                      : "text-default-500"
                )}
              >
                {step}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 px-2 md:px-4">
                <div className="bg-border relative h-1 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500 ease-out",
                      index < currentStep
                        ? "w-full bg-gradient-to-r from-green-600 to-green-600 dark:from-green-500 dark:to-green-500"
                        : index === currentStep - 1
                          ? "to-primary w-full bg-gradient-to-r from-green-600 dark:from-green-500"
                          : "w-0"
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
