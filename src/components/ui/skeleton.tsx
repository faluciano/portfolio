import { memo } from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = memo(function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md ${className}`}
      style={{ backgroundColor: "rgb(var(--color-surface-elevated))" }}
      aria-hidden="true"
    />
  );
});

export const ProjectCardSkeleton = memo(function ProjectCardSkeleton() {
  return (
    <div
      className="block overflow-hidden rounded-xl border p-6 shadow-md"
      style={{
        borderColor: "rgb(var(--color-surface-elevated))",
        backgroundColor: "rgb(var(--color-surface))",
      }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-3">
          <Skeleton className="h-7 w-3/4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-11 w-11 rounded-lg" />
          <Skeleton className="h-11 w-11 rounded-lg" />
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <Skeleton className="h-4 w-40" />
    </div>
  );
});

export const ProjectsGridSkeleton = memo(function ProjectsGridSkeleton() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
});

export const SkillsSkeleton = memo(function SkillsSkeleton() {
  return (
    <section
      className="border-y py-12 sm:py-16 md:py-20"
      style={{
        borderColor: "rgb(var(--color-surface-elevated))",
        backgroundColor: "rgb(var(--color-surface) / 0.6)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto h-8 w-48 animate-pulse rounded"
            style={{ backgroundColor: "rgb(var(--color-surface-elevated))" }}
          />
          <div
            className="mx-auto mt-4 h-4 w-96 animate-pulse rounded"
            style={{ backgroundColor: "rgb(var(--color-surface-elevated))" }}
          />
        </div>
        <div className="mt-12 flex justify-center gap-8">
          {[...Array<undefined>(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 animate-pulse rounded-xl sm:h-20 sm:w-20"
                style={{
                  backgroundColor: "rgb(var(--color-surface-elevated))",
                }}
              />
              <div
                className="h-3 w-12 animate-pulse rounded"
                style={{
                  backgroundColor: "rgb(var(--color-surface-elevated))",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
