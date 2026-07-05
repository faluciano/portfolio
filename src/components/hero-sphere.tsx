"use client";

import dynamic from "next/dynamic";

const ParticleSphere = dynamic(() => import("~/components/particle-sphere"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="h-12 w-12 animate-pulse rounded-xl"
        style={{ backgroundColor: "rgb(var(--color-surface-elevated))" }}
      />
    </div>
  ),
});

export default function HeroSphere() {
  return <ParticleSphere />;
}
