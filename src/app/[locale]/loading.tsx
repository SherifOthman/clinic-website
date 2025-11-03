import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-default-600">Loading...</p>
      </div>
    </div>
  );
}
