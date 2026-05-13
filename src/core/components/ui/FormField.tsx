"use client";

import { FieldError, Input, Label, TextField } from "@heroui/react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormField({ label, error, ...inputProps }: FormFieldProps) {
  return (
    <TextField isRequired isInvalid={!!error} className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Input variant="secondary" className="w-full" {...inputProps} />
      <FieldError>{error}</FieldError>
    </TextField>
  );
}
