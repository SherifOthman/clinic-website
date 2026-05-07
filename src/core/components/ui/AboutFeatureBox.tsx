import type { LucideIcon } from "lucide-react";

interface AboutFeatureBoxProps {
  icon: LucideIcon;
  label: string;
}

/**
 * Single feature highlight box used in the About section grid.
 * Shows an icon + label in a card with a hover scale effect.
 */
export const AboutFeatureBox = ({ icon: Icon, label }: AboutFeatureBoxProps) => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-surface p-4 shadow-sm text-center transition-transform hover:scale-105">
    <Icon className="h-8 w-8 text-accent" />
    <span className="text-center text-sm font-semibold text-foreground">{label}</span>
  </div>
);
