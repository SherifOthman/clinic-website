"use client";

import { Input } from "@heroui/input";
import { useFormContext } from "react-hook-form";

import type { OnboardingFormData } from "./schemas";

export const ClinicNameForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-xl font-bold md:text-2xl">Clinic Name</h2>
        <p className="text-default-500 text-sm md:text-base">
          What's the name of your clinic?
        </p>
      </div>

      <div className="space-y-6">
        <Input
          label="Clinic Name"
          size="lg"
          {...register("clinicName")}
          isInvalid={!!errors.clinicName}
          errorMessage={errors.clinicName?.message}
        />

        <div className="text-center">
          <p className="text-default-500 text-xs md:text-sm">
            This will be displayed on your clinic's profile and documents
          </p>
        </div>
      </div>
    </div>
  );
};
