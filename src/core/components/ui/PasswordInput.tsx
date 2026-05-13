"use client";

import { Button, InputGroup, Label, TextField } from "@heroui/react";
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

export function PasswordInput({
  label, value, onChange, autoComplete, required, minLength, placeholder, error, className,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <TextField isRequired={required} isInvalid={!!error} className={`flex flex-col gap-1 ${className ?? ""}`}>
      <Label>{label}</Label>
      <InputGroup>
        <InputGroup.Input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          minLength={minLength}
          placeholder={placeholder ?? "••••••••"}
        />
        <InputGroup.Suffix className="pr-0">
          <Button
            isIconOnly
            aria-label={show ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setShow((s) => !s)}
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
      {error && <p className="text-xs text-danger">{error}</p>}
    </TextField>
  );
}
