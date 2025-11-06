import { AuthLayoutClient } from "@/src/components/AuthLayoutClient";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>;
}
