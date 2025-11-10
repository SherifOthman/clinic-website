"use client";

import { Button } from "@heroui/button";
import { AlertTriangle, Home, Mail, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="from-background to-muted/50 flex min-h-screen items-center justify-center bg-gradient-to-b px-6">
      <div className="w-full max-w-2xl text-center">
        <div className="relative mb-8">
          <div className="text-destructive/10 text-[180px] leading-none font-bold select-none sm:text-[220px]">
            ERROR
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="bg-destructive/20 absolute inset-0 rounded-full blur-3xl" />
              <AlertTriangle
                className="text-destructive relative z-10 h-20 w-20 sm:h-24 sm:w-24"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
          Something Went Wrong!
        </h1>
        <p className="text-default-500 mx-auto mb-10 max-w-lg text-lg sm:text-xl">
          We encountered an unexpected error. Please try again or contact
          support if the problem persists.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            color="primary"
            size="lg"
            onPress={reset}
            className="min-w-[180px]"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          <Button
            variant="bordered"
            size="lg"
            onPress={() => (window.location.href = "/")}
            className="min-w-[180px]"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Button>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-default-500 mb-4 text-sm">
            Need help? We're here for you
          </p>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => (window.location.href = "/contact")}
            className="text-primary"
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="bg-destructive/5 border-destructive/20 mt-8 rounded-lg border p-4 text-left">
            <p className="text-destructive mb-2 font-mono text-xs">
              Development Error Details:
            </p>
            <p className="text-default-500 font-mono text-xs break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
