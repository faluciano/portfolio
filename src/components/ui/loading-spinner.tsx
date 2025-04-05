import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 24, className }: LoadingSpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin text-teal-500 dark:text-teal-400", className)}
      size={size}
    />
  );
}

export function LoadingScreen() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size={48} />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading projects...
        </p>
      </div>
    </div>
  );
} 