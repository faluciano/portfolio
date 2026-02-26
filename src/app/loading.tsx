import { LoadingSpinner } from "~/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "rgb(var(--color-surface))" }}
    >
      <div className="space-y-4 text-center">
        <LoadingSpinner />
        <p
          className="text-sm"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
