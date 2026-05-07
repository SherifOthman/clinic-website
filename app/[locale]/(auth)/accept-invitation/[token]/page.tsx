"use client";

import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { useAcceptInvitation } from "@/src/features/auth/hooks/useAcceptInvitation";
import { Alert, Button, Chip, Input, Label, ListBox, Select, TextField } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

// Token is dynamic — can't be pre-rendered at build time
export const dynamic = "force-dynamic";

export default function AcceptInvitationPage() {
  const t = useTranslations("auth.invitation");
  const { token } = useParams<{ token: string }>();

  const { invitation, loadError, form, error, loading, done, setField, submit } =
    useAcceptInvitation(token ?? null, t("invalid"), t("expired"));

  const handleGenderChange = (value: React.Key | null) => {
    if (value) {
      const syntheticEvent = { target: { value: String(value) } } as React.ChangeEvent<HTMLSelectElement>;
      setField("gender")(syntheticEvent);
    }
  };

  if (loadError) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-danger">{loadError}</p>
      </div>
    );
  }

  if (!invitation) {
    return <div className="text-center text-muted">Loading...</div>;
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl">✓</div>
        <p className="font-semibold text-success">{t("accepted")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted">
          {t("subtitle")} <span className="font-semibold text-foreground">{invitation.clinicName}</span>
        </p>
        <span className="mt-2 inline-block">
          <Chip color="accent" variant="soft" size="sm">
            {invitation.role}
          </Chip>
        </span>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        {error && (
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>{error}</Alert.Description>
            </Alert.Content>
          </Alert>
        )}

        <TextField isRequired className="flex flex-col gap-1">
          <Label>{t("fullName")}</Label>
          <Input type="text" autoComplete="name" value={form.fullName} onChange={setField("fullName")} variant="secondary" className="w-full" />
        </TextField>

        <TextField isRequired className="flex flex-col gap-1">
          <Label>{t("username")}</Label>
          <Input type="text" autoComplete="username" value={form.userName} onChange={setField("userName")} variant="secondary" className="w-full" />
        </TextField>

        <TextField isRequired className="flex flex-col gap-1">
          <Label>{t("phone")}</Label>
          <Input type="tel" autoComplete="tel" value={form.phoneNumber} onChange={setField("phoneNumber")} variant="secondary" className="w-full" />
        </TextField>

        <PasswordInput
          label={t("password")}
          value={form.password}
          onChange={setField("password")}
          autoComplete="new-password"
          required
        />

        <Select
          isRequired
          variant="secondary"
          defaultValue="Male"
          value={form.gender}
          onChange={handleGenderChange}
          placeholder={t("gender")}
          className="flex flex-col gap-1"
        >
          <Label>{t("gender")}</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="Male" textValue={t("male")}>
                {t("male")}
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="Female" textValue={t("female")}>
                {t("female")}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        <Button type="submit" variant="primary" fullWidth isPending={loading}>
          {({ isPending }) => isPending ? t("submitting") : t("submit")}
        </Button>
      </form>
    </div>
  );
}
