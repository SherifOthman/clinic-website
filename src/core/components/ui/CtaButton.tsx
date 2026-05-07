import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "outline-white";

interface CtaButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover",
  outline:
    "border border-accent text-accent hover:bg-accent/10",
  "outline-white":
    "border border-white/40 text-white hover:bg-white/10",
};

/**
 * Anchor-based CTA button used across hero, CTA, and about sections.
 * Renders as a native <a> tag styled to match HeroUI Button appearance.
 */
export const CtaButton = ({ variant = "primary", className = "", children, ...props }: CtaButtonProps) => (
  <a
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${VARIANT_CLASSES[variant]} ${className}`}
  >
    {children}
  </a>
);
