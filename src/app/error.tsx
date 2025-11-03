"use client";

import { Button } from "@heroui/button";
import { AlertTriangle, Home, Mail, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background to-default-50 dark:to-default-100/10">
      <div className="max-w-2xl w-full text-center">
        {/* Error Illustration */}
        <div className="relative mb-8">
          <div className="text-[180px] sm:text-[220px] font-bold text-danger/10 leading-none select-none">
            ERROR
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-danger/20 blur-3xl rounded-full" />
              <AlertTriangle
                className="w-20 h-20 sm:w-24 sm:h-24 text-danger relative z-10"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Something Went Wrong!
        </h1>
        <p className="text-lg sm:text-xl text-default-600 mb-10 max-w-lg mx-auto">
          We encountered an unexpected error. Please try again or contact
          support if the problem persists.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            color="primary"
            size="lg"
            onPress={reset}
            startContent={<RefreshCw className="w-5 h-5" />}
            className="min-w-[180px]"
          >
            Try Again
          </Button>
          <Button
            variant="bordered"
            size="lg"
            onPress={() => (window.location.href = "/")}
            startContent={<Home className="w-5 h-5" />}
            className="min-w-[180px]"
          >
            Go Home
          </Button>
        </div>

        {/* Support Link */}
        <div className="mt-12 pt-8 border-t border-divider">
          <p className="text-sm text-default-500 mb-4">
            Need help? We're here for you
          </p>
          <Button
            variant="light"
            size="sm"
            onPress={() => (window.location.href = "/contact")}
            startContent={<Mail className="w-4 h-4" />}
            className="text-primary"
          >
            Contact Support
          </Button>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-danger/5 border border-danger/20 rounded-lg text-left">
            <p className="text-xs font-mono text-danger mb-2">
              Development Error Details:
            </p>
            <p className="text-xs font-mono text-default-600 break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
