// Auth pages handle their own full-screen layout (split panel).
// This layout just passes children through without any wrapper.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
