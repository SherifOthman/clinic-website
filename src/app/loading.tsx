import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" className="text-primary" />
        <p className="text-default-500 mt-4">Loading...</p>
      </div>
    </div>
  );
}
