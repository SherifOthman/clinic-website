"use client";

import { FieldError as FieldErrorComponent, Input, Label, TextField } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  placeholder?: string;
  error?: string;
  className?: string;
}

/**
 * HeroUI TextField + Input with show/hide toggle.
 * Used across all website auth pages.
 */
export function PasswordInput({
  label,
  value,
  onChange,
  autoComplete,
  required,
  minLength,
  placeholder,
  error,
  className,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <TextField
      isRequired={required}
      isInvalid={!!error}
      className={`flex flex-col gap-1 ${className ?? ""}`}
    >
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          minLength={minLength}
          placeholder={placeholder ?? "••••••••"}
          className="w-full pe-10"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted hover:text-foreground transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <FieldErrorComponent>{error}</FieldErrorComponent>}
    </TextField>
  );
}
