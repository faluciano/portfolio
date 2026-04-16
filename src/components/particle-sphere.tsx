"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PointMaterial, Points } from "@react-three/drei";
import {
  BufferAttribute,
  BufferGeometry,
  LineBasicMaterial,
  LineSegments,
  type Points as PointsType,
} from "three";
import { useTheme } from "next-themes";

/* ── Constants ──────────────────────────────────────────────── */

const NODE_COUNT = 180;
const SPHERE_RADIUS = 1.5;
const EDGE_DISTANCE_THRESHOLD = 0.95;
const EDGE_RECOMPUTE_INTERVAL = 8; // frames between edge recalculations

const ROTATION_SPEED = 0.1; // rad/s on Y axis
const DRIFT_SPEED = 0.3;
const DRIFT_AMPLITUDE = 0.06;

// Dark mode palette (blue tones)
const DARK_BASE = [96 / 255, 165 / 255, 250 / 255] as const; // #60A5FA
const DARK_LIGHT = [147 / 255, 197 / 255, 253 / 255] as const; // #93C5FD
const DARK_EDGE = [96 / 255, 165 / 255, 250 / 255] as const; // #60A5FA

// Light mode palette (purple/indigo tones)
const LIGHT_PURPLE = [109 / 255, 40 / 255, 217 / 255] as const; // #6D28D9
const LIGHT_INDIGO = [79 / 255, 70 / 255, 229 / 255] as const; // #4F46E5
const LIGHT_MAGENTA = [162 / 255, 28 / 255, 175 / 255] as const; // #A21CAF
const LIGHT_EDGE = [79 / 255, 70 / 255, 229 / 255] as const; // #4F46E5

/* ── Generate random nodes in a spherical volume ────────────── */

function generateNodeData(count: number, radius: number) {
  const basePositions = new Float32Array(count * 3);
  const phases = new Float32Array(count * 3); // per-node per-axis phase offsets

  for (let i = 0; i < count; i++) {
    // Random point inside sphere using rejection-free spherical coords
    const u = Math.random();
    const cosTheta = 2 * Math.random() - 1;
    const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
    const phi = 2 * Math.PI * Math.random();
    const r = radius * Math.cbrt(u); // cube root for uniform volume distribution

    const i3 = i * 3;
    basePositions[i3] = r * sinTheta * Math.cos(phi);
    basePositions[i3 + 1] = r * cosTheta;
    basePositions[i3 + 2] = r * sinTheta * Math.sin(phi);

    phases[i3] = Math.random() * Math.PI * 2;
    phases[i3 + 1] = Math.random() * Math.PI * 2;
    phases[i3 + 2] = Math.random() * Math.PI * 2;
  }

  return { basePositions, phases };
}

/* ── Generate per-node color buffer ─────────────────────────── */

function generateColors(count: number, isDark: boolean): Float32Array {
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    let c: readonly [number, number, number];

    if (isDark) {
      c = Math.random() < 0.3 ? DARK_LIGHT : DARK_BASE;
    } else {
      const rand = Math.random();
      c = rand < 0.5 ? LIGHT_PURPLE : rand < 0.8 ? LIGHT_INDIGO : LIGHT_MAGENTA;
    }

    colors[i3] = c[0];
    colors[i3 + 1] = c[1];
    colors[i3 + 2] = c[2];
  }

  return colors;
}

/* ── Scene with network graph ───────────────────────────────── */

interface NetworkGraphSceneProps {
  enableAnimation: boolean;
  isDark: boolean;
}

function NetworkGraphScene({
  enableAnimation,
  isDark,
}: NetworkGraphSceneProps) {
  const pointsRef = useRef<PointsType>(null);
  const edgesRef = useRef<LineSegments>(null);
  const frameCountRef = useRef(0);

  const { basePositions, phases } = useMemo(
    () => generateNodeData(NODE_COUNT, SPHERE_RADIUS),
    [],
  );

  const driftedPositions = useMemo(
    () => new Float32Array(basePositions.length),
    [basePositions],
  );

  const colors = useMemo(() => generateColors(NODE_COUNT, isDark), [isDark]);

  // Edge geometry + material (created once, updated in useFrame)
  const edgeGeometry = useMemo(() => {
    const geo = new BufferGeometry();
    // Pre-allocate for worst case: each node connected to ~6 others = ~540 edges
    // Each edge = 2 vertices * 3 floats
    const maxEdges = NODE_COUNT * 6;
    const positions = new Float32Array(maxEdges * 2 * 3);
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  const edgeMaterial = useMemo(() => {
    const [r, g, b] = isDark ? DARK_EDGE : LIGHT_EDGE;
    return new LineBasicMaterial({
      color:
        (Math.round(r * 255) << 16) |
        (Math.round(g * 255) << 8) |
        Math.round(b * 255),
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
  }, [isDark]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const elapsed = state.clock.elapsedTime;

    // Apply drift to node positions
    if (enableAnimation) {
      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        driftedPositions[i3] =
          basePositions[i3]! +
          Math.sin(elapsed * DRIFT_SPEED + phases[i3]!) * DRIFT_AMPLITUDE;
        driftedPositions[i3 + 1] =
          basePositions[i3 + 1]! +
          Math.sin(elapsed * DRIFT_SPEED * 0.8 + phases[i3 + 1]!) *
            DRIFT_AMPLITUDE;
        driftedPositions[i3 + 2] =
          basePositions[i3 + 2]! +
          Math.sin(elapsed * DRIFT_SPEED * 1.2 + phases[i3 + 2]!) *
            DRIFT_AMPLITUDE;
      }
    } else {
      driftedPositions.set(basePositions);
    }

    // Update point positions
    const posAttr = points.geometry.getAttribute("position");
    (posAttr.array as Float32Array).set(driftedPositions);
    posAttr.needsUpdate = true;

    // Recompute edges every N frames
    frameCountRef.current++;
    if (
      frameCountRef.current % EDGE_RECOMPUTE_INTERVAL === 0 ||
      frameCountRef.current === 1
    ) {
      const edgePositions = edgeGeometry.getAttribute("position")
        .array as Float32Array;
      let edgeVertexCount = 0;
      const maxVertices = edgePositions.length / 3;
      const thresholdSq = EDGE_DISTANCE_THRESHOLD * EDGE_DISTANCE_THRESHOLD;

      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        const ax = driftedPositions[i3]!;
        const ay = driftedPositions[i3 + 1]!;
        const az = driftedPositions[i3 + 2]!;

        for (let j = i + 1; j < NODE_COUNT; j++) {
          const j3 = j * 3;
          const dx = ax - driftedPositions[j3]!;
          const dy = ay - driftedPositions[j3 + 1]!;
          const dz = az - driftedPositions[j3 + 2]!;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < thresholdSq && edgeVertexCount + 2 <= maxVertices) {
            const vi = edgeVertexCount * 3;
            edgePositions[vi] = ax;
            edgePositions[vi + 1] = ay;
            edgePositions[vi + 2] = az;
            edgePositions[vi + 3] = driftedPositions[j3]!;
            edgePositions[vi + 4] = driftedPositions[j3 + 1]!;
            edgePositions[vi + 5] = driftedPositions[j3 + 2]!;
            edgeVertexCount += 2;
          }
        }
      }

      edgeGeometry.getAttribute("position").needsUpdate = true;
      edgeGeometry.setDrawRange(0, edgeVertexCount);
    }

    // Auto-rotation
    if (enableAnimation) {
      points.rotation.y += delta * ROTATION_SPEED;
      if (edgesRef.current) {
        edgesRef.current.rotation.y = points.rotation.y;
      }
    }
  });

  return (
    <>
      <Points
        ref={pointsRef}
        positions={driftedPositions}
        colors={colors}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          vertexColors
          size={0.07}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </Points>

      <lineSegments
        ref={edgesRef}
        geometry={edgeGeometry}
        material={edgeMaterial}
        frustumCulled={false}
      />
    </>
  );
}

/* ── Main component ─────────────────────────────────────────── */

export default function ParticleSphere() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // Default to dark theme during SSR or when theme is undefined
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleChange(event: MediaQueryListEvent) {
      setPrefersReducedMotion(event.matches);
    }

    handleChange({ matches: mql.matches } as MediaQueryListEvent);

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // Pause rendering when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry?.isIntersecting ?? false);
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
        frameloop={isVisible ? "always" : "never"}
      >
        <NetworkGraphScene
          enableAnimation={!prefersReducedMotion && isVisible}
          isDark={isDark}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
