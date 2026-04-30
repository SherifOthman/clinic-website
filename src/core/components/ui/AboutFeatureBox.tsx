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
  <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-sm transition-transform hover:scale-105 dark:bg-surface">
    <Icon className="mb-2 h-8 w-8 text-accent" />
    <span className="text-center text-sm font-semibold">{label}</span>
  </div>
);
