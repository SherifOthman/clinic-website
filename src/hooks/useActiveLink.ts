import { usePathname } from "next/navigation";

export const useActiveLink = () => {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    // Hash links are never highlighted as active
    if (href.includes("#")) return false;

    // Exact match for home page
    if (href === "/") return pathname === "/";

    // For other pages, check if path starts with href
    return pathname.startsWith(href);
  };

  return { isActive };
};
