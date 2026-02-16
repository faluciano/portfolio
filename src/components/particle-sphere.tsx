"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PointMaterial, Points } from "@react-three/drei";
import { type Points as PointsType } from "three";
import { useTheme } from "next-themes";

/* ── Constants ──────────────────────────────────────────────── */

const PARTICLE_COUNT = 2000;
const SPHERE_RADIUS = 1.5;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ≈ 2.399963

const ROTATION_SPEED = 0.1; // rad/s on Y axis

// Color shimmer: wave pattern travels across the sphere surface
const SHIMMER_SPEED = 0.6;
const SHIMMER_AMPLITUDE = 0.25;
// How many color bands wrap around the sphere (higher = more bands)
const SHIMMER_WAVE_BANDS = 4;

// Dark mode palette (blue tones)
const DARK_DEEP_BLUE = "#60A5FA"; // (96, 165, 250)
const DARK_LIGHT_BLUE = "#93C5FD"; // (147, 197, 253)
const DARK_ACCENT = "#67E8F9"; // (103, 232, 249) - cyan-ish

// Light mode palette (warm tones)
const LIGHT_PURPLE = "#6D28D9"; // (109, 40, 217)
const LIGHT_MAGENTA = "#A21CAF"; // (162, 28, 175)
const LIGHT_INDIGO = "#4F46E5"; // (79, 70, 229)
const LIGHT_ACCENT = "#DB2777"; // (219, 39, 119) - pink

/* ── Fibonacci sphere distribution ──────────────────────────── */

function generateSphereData(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const phis = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // range: 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = GOLDEN_ANGLE * i;

    phis[i] = Math.acos(Math.max(-1, Math.min(1, y)));

    const index = i * 3;
    positions[index] = Math.cos(theta) * radiusAtY * radius;
    positions[index + 1] = y * radius;
    positions[index + 2] = Math.sin(theta) * radiusAtY * radius;
  }

  return { positions, phis };
}

/* ── Generate per-particle color buffer ─────────────────────── */

function generateColors(count: number, isDark: boolean): Float32Array {
  const colors = new Float32Array(count * 3);

  if (isDark) {
    // Dark mode: Deep blue and light blue
    // Deep blue: #60A5FA → (96, 165, 250) / 255
    const deepR = 96 / 255;
    const deepG = 165 / 255;
    const deepB = 250 / 255;

    // Light blue: #93C5FD → (147, 197, 253) / 255
    const lightR = 147 / 255;
    const lightG = 197 / 255;
    const lightB = 253 / 255;

    for (let i = 0; i < count; i++) {
      // ~30% of particles get the lighter shade for depth variation
      const useLighter = Math.random() < 0.3;
      const index = i * 3;
      colors[index] = useLighter ? lightR : deepR;
      colors[index + 1] = useLighter ? lightG : deepG;
      colors[index + 2] = useLighter ? lightB : deepB;
    }
  } else {
    // Light mode: Purple, indigo, magenta (~50% purple, ~30% indigo, ~20% magenta)
    // Purple: #6D28D9 → (109, 40, 217) / 255
    const purpleR = 109 / 255;
    const purpleG = 40 / 255;
    const purpleB = 217 / 255;

    // Magenta: #A21CAF → (162, 28, 175) / 255
    const magentaR = 162 / 255;
    const magentaG = 28 / 255;
    const magentaB = 175 / 255;

    // Indigo: #4F46E5 → (79, 70, 229) / 255
    const indigoR = 79 / 255;
    const indigoG = 70 / 255;
    const indigoB = 229 / 255;

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      const index = i * 3;

      if (rand < 0.5) {
        // Purple (~50%)
        colors[index] = purpleR;
        colors[index + 1] = purpleG;
        colors[index + 2] = purpleB;
      } else if (rand < 0.8) {
        // Indigo (~30%)
        colors[index] = indigoR;
        colors[index + 1] = indigoG;
        colors[index + 2] = indigoB;
      } else {
        // Magenta (~20%)
        colors[index] = magentaR;
        colors[index + 1] = magentaG;
        colors[index + 2] = magentaB;
      }
    }
  }

  return colors;
}

/* ── Scene with particles ───────────────────────────────────── */

interface ParticleSphereSceneProps {
  enableAnimation: boolean;
  isDark: boolean;
}

function ParticleSphereScene({ enableAnimation, isDark }: ParticleSphereSceneProps) {
  const pointsRef = useRef<PointsType>(null);

  const sphereData = useMemo(
    () => generateSphereData(PARTICLE_COUNT, SPHERE_RADIUS),
    [],
  );
  const basePositions = sphereData.positions;
  const phis = sphereData.phis;

  const colors = useMemo(() => generateColors(PARTICLE_COUNT, isDark), [isDark]);

  // Store base colors in a ref so shimmer can reference originals
  const baseColorsRef = useRef<Float32Array>(colors);

  // Update base colors ref when theme changes
  useEffect(() => {
    baseColorsRef.current = colors;
  }, [colors]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const elapsed = state.clock.elapsedTime;

    // Shimmer animation: subtle color shifts
    if (enableAnimation) {
      const colorAttr = points.geometry.getAttribute("color");
      const colorArray = colorAttr.array as Float32Array;
      const baseColors = baseColorsRef.current;

      // Accent colors for shimmer
      const accentR = isDark ? 103 / 255 : 219 / 255;
      const accentG = isDark ? 232 / 255 : 39 / 255;
      const accentB = isDark ? 249 / 255 : 119 / 255;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Use phi (polar angle) for spatially coherent color bands
        const phi = phis[i]!;
        const shimmerFactor =
          (Math.sin(elapsed * SHIMMER_SPEED + phi * SHIMMER_WAVE_BANDS) + 1) *
          0.5 *
          SHIMMER_AMPLITUDE;

        const i3 = i * 3;
        const baseR = baseColors[i3]!;
        const baseG = baseColors[i3 + 1]!;
        const baseB = baseColors[i3 + 2]!;

        // Lerp between base color and accent color
        colorArray[i3] = baseR + (accentR - baseR) * shimmerFactor;
        colorArray[i3 + 1] = baseG + (accentG - baseG) * shimmerFactor;
        colorArray[i3 + 2] = baseB + (accentB - baseB) * shimmerFactor;
      }

      colorAttr.needsUpdate = true;
    }

    // Auto-rotation
    if (enableAnimation) {
      points.rotation.y += delta * ROTATION_SPEED;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={basePositions}
      colors={colors}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

/* ── Main component ─────────────────────────────────────────── */

export default function ParticleSphere() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
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

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ParticleSphereScene enableAnimation={!prefersReducedMotion} isDark={isDark} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}
