"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{ backgroundColor: "rgb(var(--color-surface))" }}
    >
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
          <p
            className="text-lg"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            We encountered an unexpected error. Please try again.
          </p>
        </div>

        {error.message && (
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: "rgb(239 68 68 / 0.1)",
              color: "rgb(239 68 68)",
            }}
          >
            <p className="text-sm">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none"
            style={{
              borderColor: "rgb(var(--color-surface-elevated))",
              color: "rgb(var(--color-text))",
            }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
