import { Button } from "@heroui/button";
import NextLink from "next/link";
import { ReactNode } from "react";

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  color?:
    | "foreground"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
}

export function CustomLink({
  href,
  children,
  className,
  color,
  size,
}: CustomLinkProps) {
  return (
    <NextLink
      href={href}
      className={`inline-flex items-center hover:opacity-80 transition-opacity ${
        color === "primary"
          ? "text-primary"
          : color === "secondary"
            ? "text-secondary"
            : color === "success"
              ? "text-success"
              : color === "warning"
                ? "text-warning"
                : color === "danger"
                  ? "text-danger"
                  : "text-foreground"
      } ${
        size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"
      } ${className || ""}`}
    >
      {children}
    </NextLink>
  );
}

interface CustomButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  isDisabled?: boolean;
}

export function CustomButtonLink({
  href,
  children,
  variant = "solid",
  color = "primary",
  size = "md",
  className,
  isDisabled,
}: CustomButtonLinkProps) {
  return (
    <Button
      as={NextLink}
      href={href}
      variant={variant}
      color={color}
      size={size}
      className={className}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}
