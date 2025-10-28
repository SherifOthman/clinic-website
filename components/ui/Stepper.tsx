import { CheckIcon } from "@/components/icons";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    title: string;
    description?: string;
  }>;
  className?: string;
}

export function Stepper({
  currentStep,
  totalSteps,
  steps,
  className = "",
}: StepperProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-default-200">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Step Circles */}
        <div className="relative flex">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div key={index} className="flex flex-col items-center flex-1">
                {/* Circle */}
                <div
                  className={`
                    relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-primary border-primary text-white"
                        : isCurrent
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                          : "bg-background border-default-300 text-default-400"
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>

                {/* Step Info */}
                <div className="mt-3 text-center px-2">
                  <div
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isCurrent
                        ? "text-primary"
                        : isCompleted
                          ? "text-success"
                          : "text-default-500"
                    }`}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-default-400 mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Indicator */}
      <div className="text-center">
        <div className="text-sm text-default-500 mb-1">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="text-lg font-semibold text-foreground">
          {steps[currentStep - 1]?.title}
        </div>
      </div>
    </div>
  );
}
