import { LoadingSpinner } from "~/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="bg-surface flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <LoadingSpinner />
        <p className="text-muted text-sm">Loading...</p>
      </div>
    </div>
  );
}
