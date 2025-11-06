/**
 * Reusable style constants to avoid repetition
 */

// Common icon sizes
export const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
} as const;

// Icon container styles
export const iconContainer = {
  primary:
    "bg-primary/10 text-primary rounded-2xl flex items-center justify-center",
  success:
    "bg-green-500/10 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center",
  default: "bg-default-100 rounded-2xl flex items-center justify-center",
} as const;

// Common spacing
export const spacing = {
  section: "py-24 lg:py-32",
  container: "container mx-auto max-w-7xl px-6 lg:px-8",
  cardPadding: "p-6 md:p-8",
} as const;

// Text styles
export const textStyles = {
  sectionTitle: "text-4xl sm:text-5xl font-bold mb-6",
  sectionSubtitle: "text-xl text-default-600 max-w-2xl mx-auto",
  cardTitle: "text-xl font-bold mb-3",
  cardDescription: "text-default-500 leading-relaxed",
} as const;
