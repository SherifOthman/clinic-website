"use client";

import { FieldError as FieldErrorComponent, Label } from "@heroui/react";
import { PhoneInput as LibPhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./PhoneInput.css";

interface PhoneInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

export function PhoneInput({ label, value, onChange, required, isInvalid, errorMessage }: PhoneInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}{required && " *"}</Label>
      <div dir="ltr" className="phone-input-theme relative">
        <LibPhoneInput
          value={value}
          onChange={(phone) => onChange(phone)}
          defaultCountry="eg"
          inputClassName="w-full h-10 bg-transparent px-3 text-sm outline-none"
          countrySelectorStyleProps={{
            buttonClassName: "flex h-10 items-center border border-border bg-surface-secondary text-sm transition hover:bg-surface-tertiary",
            buttonStyle: { paddingInline: "1rem" },
            buttonContentWrapperStyle: { gap: "0.75rem" },
          }}
        />
      </div>
      {errorMessage && <FieldErrorComponent>{errorMessage}</FieldErrorComponent>}
    </div>
  );
}
