import { redirect } from "next/navigation";

// Root page - middleware should redirect to locale
// This is a fallback in case middleware doesn't catch it
export default function RootPage() {
  redirect("/en");
}
