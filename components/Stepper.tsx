'use client';

import { Chip } from '@heroui/chip';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className = '' }: StepperProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-success text-white shadow-lg'
                        : isActive
                          ? 'bg-primary text-white shadow-lg ring-4 ring-primary/20'
                          : 'bg-default-200 text-default-500'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>

                {/* Step Info */}
                <div className="mt-3 text-center max-w-[120px]">
                  <p
                    className={`
                      text-sm font-semibold transition-colors
                      ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-default-500'}
                    `}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-default-400 mt-1 hidden sm:block">
                    {step.description}
                  </p>

                  {/* Status Chip */}
                  <div className="mt-2">
                    {isCompleted && (
                      <Chip color="success" variant="flat" size="sm">
                        Complete
                      </Chip>
                    )}
                    {isActive && (
                      <Chip color="primary" variant="flat" size="sm">
                        Current
                      </Chip>
                    )}
                    {isUpcoming && (
                      <Chip color="default" variant="flat" size="sm">
                        Pending
                      </Chip>
                    )}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={`
                      h-1 rounded-full transition-all duration-300
                      ${isCompleted ? 'bg-success' : 'bg-default-200'}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
