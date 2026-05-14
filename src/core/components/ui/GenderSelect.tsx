"use client";

import { FieldError, Label, ListBox, Select } from "@heroui/react";

interface GenderSelectProps {
  t: (key: string) => string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export function GenderSelect({ t, value, onChange, error }: GenderSelectProps) {
  return (
    <Select isRequired isInvalid={!!error} variant="secondary" defaultValue="Male"
      value={value}
      onChange={(key) => { onChange(key as string); }}
      placeholder={t("selectGender")} className="flex flex-col gap-1.5"
    >
      <Label>{t("gender")}</Label>
      <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="Male" textValue={t("male")}>{t("male")}<ListBox.ItemIndicator /></ListBox.Item>
          <ListBox.Item id="Female" textValue={t("female")}>{t("female")}<ListBox.ItemIndicator /></ListBox.Item>
        </ListBox>
      </Select.Popover>
      <FieldError>{error}</FieldError>
    </Select>
  );
}
