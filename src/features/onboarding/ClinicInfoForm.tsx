"use client";

import { Input, Textarea } from "@heroui/input";
import { useFormContext } from "react-hook-form";

import type { OnboardingFormData } from "./schemas";

export const ClinicInfoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-xl font-bold md:text-2xl">Clinic Details</h2>
        <p className="text-default-500 text-sm md:text-base">
          Tell us more about your practice
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Clinic Name"
            size="lg"
            {...register("clinicName")}
            isInvalid={!!errors.clinicName}
            errorMessage={errors.clinicName?.message}
          />

          <Input
            label="Phone Number"
            size="lg"
            type="tel"
            {...register("phone")}
            isInvalid={!!errors.phone}
            errorMessage={errors.phone?.message}
          />
        </div>

        <Textarea
          label="Clinic Address"
          size="lg"
          minRows={3}
          {...register("address")}
          isInvalid={!!errors.address}
          errorMessage={errors.address?.message}
        />

        <Textarea
          label="Clinic Description (Optional)"
          size="lg"
          minRows={4}
          {...register("description")}
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
        />

        <div className="text-center">
          <p className="text-default-500 text-xs md:text-sm">
            This information will help patients find and contact your clinic
          </p>
        </div>
      </div>
    </div>
  );
};
