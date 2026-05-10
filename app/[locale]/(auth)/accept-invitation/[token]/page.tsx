import { AcceptInvitationClient } from "@/src/features/auth/components/AcceptInvitationClient";
import { Suspense } from "react";

/**
 * With cacheComponents: true, `params` is a runtime API (dynamic data).
 * The page itself must NOT await params directly — instead, pass the
 * params Promise to a child component wrapped in <Suspense>.
 *
 * Pattern from Next.js docs:
 * - Page: renders static shell + Suspense boundary
 * - Child: awaits params (runtime data) inside the Suspense boundary
 */

async function AcceptInvitationContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ token: string }>;
}) {
  const { token } = await paramsPromise;
  return <AcceptInvitationClient token={token} />;
}

export default function AcceptInvitationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      }
    >
      <AcceptInvitationContent paramsPromise={params} />
    </Suspense>
  );
}
