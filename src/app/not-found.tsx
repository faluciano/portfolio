import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Page not found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400 inline-flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            Go home
          </Link>
          <Link
            href="/#contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Contact me
          </Link>
        </div>
      </div>
    </div>
  );
}
