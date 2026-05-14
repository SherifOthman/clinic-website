export function maskEmail(email: string): string {
  if (!email) return "your email";
  return email.replace(/(.{2}).+(@.+)/, "$1***$2");
}
