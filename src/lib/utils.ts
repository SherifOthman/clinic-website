import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Remove locale prefix from pathname
 */
export const stripLocalePrefix = (pathname: string): string =>
  pathname.replace(/^\/(en|ar)/, "") || "/";
