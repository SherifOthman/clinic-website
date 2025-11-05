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
      <div className="flex items-center relative">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            {/* Step Circle and Label */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  index < currentStep
                    ? "bg-green-600 dark:bg-green-500 border-green-600 dark:border-green-500 text-white shadow-lg shadow-green-600/30"
                    : index === currentStep
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/40 scale-110"
                      : "bg-content1 border-divider text-default-500 shadow-sm"
                )}
              >
                {index < currentStep ? (
                  <Check size={14} className="md:w-4 md:h-4" strokeWidth={3} />
                ) : (
                  <span className="text-xs md:text-sm font-bold">
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Step Label */}
              <span
                className={cn(
                  "mt-2 text-[10px] md:text-xs text-center font-medium max-w-[70px] md:max-w-[80px] leading-tight transition-colors",
                  index === currentStep
                    ? "text-primary font-bold"
                    : index < currentStep
                      ? "text-green-600 dark:text-green-400 font-semibold"
                      : "text-default-500"
                )}
              >
                {step}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 px-2 md:px-4">
                <div className="relative h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500 ease-out",
                      index < currentStep
                        ? "bg-gradient-to-r from-green-600 to-green-600 dark:from-green-500 dark:to-green-500 w-full"
                        : index === currentStep - 1
                          ? "bg-gradient-to-r from-green-600 to-primary dark:from-green-500 w-full"
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
