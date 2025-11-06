import { usePathname } from "next/navigation";

import { stripLocalePrefix } from "@/src/lib/utils";

export const useActiveLink = () => {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    const pathWithoutLocale = stripLocalePrefix(pathname);

    // Hash links are never highlighted as active
    if (href.includes("#")) return false;

    // Exact match for home page
    if (href === "/") return pathWithoutLocale === "/";

    // For other pages, check if path starts with href
    return pathWithoutLocale.startsWith(href);
  };

  return { isActive };
};
