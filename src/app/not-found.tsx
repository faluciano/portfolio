import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{ backgroundColor: "rgb(var(--color-surface))" }}
    >
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Page not found</h2>
          <p
            className="text-lg"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            Go home
          </Link>
          <Link
            href="/#contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none"
            style={{
              borderColor: "rgb(var(--color-surface-elevated))",
              color: "rgb(var(--color-text))",
            }}
          >
            Contact me
          </Link>
        </div>
      </div>
    </div>
  );
}
