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
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-8">
          <div className="text-[180px] sm:text-[220px] font-bold text-destructive/10 leading-none select-none">
            ERROR
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/20 blur-3xl rounded-full" />
              <AlertTriangle
                className="w-20 h-20 sm:w-24 sm:h-24 text-destructive relative z-10"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Something Went Wrong!
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg mx-auto">
          We encountered an unexpected error. Please try again or contact
          support if the problem persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            color="primary"
            size="lg"
            onPress={reset}
            className="min-w-[180px]"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button
            variant="bordered"
            size="lg"
            onPress={() => (window.location.href = "/")}
            className="min-w-[180px]"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Need help? We're here for you
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (window.location.href = "/contact")}
            className="text-primary"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-destructive/5 border border-destructive/20 rounded-lg text-left">
            <p className="text-xs font-mono text-destructive mb-2">
              Development Error Details:
            </p>
            <p className="text-xs font-mono text-muted-foreground break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
