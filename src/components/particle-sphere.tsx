"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PointMaterial, Points } from "@react-three/drei";
import { type Points as PointsType, Vector3 } from "three";

/* ── Constants ──────────────────────────────────────────────── */

const PARTICLE_COUNT = 2000;
const SPHERE_RADIUS = 1.5;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ≈ 2.399963

const ROTATION_SPEED = 0.1; // rad/s on Y axis
const BREATHING_AMPLITUDE = 0.02;
const BREATHING_FREQUENCY = 0.3; // Hz
const BREATHING_OMEGA = 2 * Math.PI * BREATHING_FREQUENCY;

const MOUSE_INFLUENCE_RADIUS = 0.3;
const MOUSE_PUSH_STRENGTH = 0.15;
const LERP_BACK_FACTOR = 0.05;

const DEEP_BLUE = "#3B82F6";

/* ── Fibonacci sphere distribution ──────────────────────────── */

function generateSpherePositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // range: 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = GOLDEN_ANGLE * i;

    const index = i * 3;
    positions[index] = Math.cos(theta) * radiusAtY * radius;
    positions[index + 1] = y * radius;
    positions[index + 2] = Math.sin(theta) * radiusAtY * radius;
  }

  return positions;
}

/* ── Generate per-particle color buffer ─────────────────────── */

function generateColors(count: number): Float32Array {
  const colors = new Float32Array(count * 3);

  // Deep blue: #3B82F6 → (59, 130, 246) / 255
  const deepR = 59 / 255;
  const deepG = 130 / 255;
  const deepB = 246 / 255;

  // Light blue: #60A5FA → (96, 165, 250) / 255
  const lightR = 96 / 255;
  const lightG = 165 / 255;
  const lightB = 250 / 255;

  for (let i = 0; i < count; i++) {
    // ~30% of particles get the lighter shade for depth variation
    const useLighter = Math.random() < 0.3;
    const index = i * 3;
    colors[index] = useLighter ? lightR : deepR;
    colors[index + 1] = useLighter ? lightG : deepG;
    colors[index + 2] = useLighter ? lightB : deepB;
  }

  return colors;
}

/* ── Scene with particles ───────────────────────────────────── */

interface ParticleSphereSceneProps {
  enableAnimation: boolean;
}

function ParticleSphereScene({ enableAnimation }: ParticleSphereSceneProps) {
  const pointsRef = useRef<PointsType>(null);

  const basePositions = useMemo(
    () => generateSpherePositions(PARTICLE_COUNT, SPHERE_RADIUS),
    [],
  );

  const colors = useMemo(() => generateColors(PARTICLE_COUNT), []);

  // Reusable vectors to avoid allocation in the render loop
  const pointerDirectionRef = useRef(new Vector3());
  const particleNormalRef = useRef(new Vector3());

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const positionAttr = points.geometry.getAttribute("position");
    const positions = positionAttr.array as Float32Array;

    const elapsed = state.clock.elapsedTime;
    const pointer = state.pointer; // normalized -1 to 1
    const pDir = pointerDirectionRef.current;
    const pNorm = particleNormalRef.current;

    // Convert pointer to a 3D direction on a conceptual sphere
    pDir.set(pointer.x, pointer.y, 0.5).normalize();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Original position on the Fibonacci sphere (normalized direction)
      const baseX = basePositions[i3]!;
      const baseY = basePositions[i3 + 1]!;
      const baseZ = basePositions[i3 + 2]!;

      pNorm.set(baseX, baseY, baseZ).normalize();

      // Breathing: sine-wave radial oscillation
      let radialOffset = 0;
      if (enableAnimation) {
        radialOffset =
          Math.sin(elapsed * BREATHING_OMEGA + i * 0.01) * BREATHING_AMPLITUDE;
      }

      // Mouse displacement: push particles outward near pointer direction
      const dotProduct = pNorm.x * pDir.x + pNorm.y * pDir.y + pNorm.z * pDir.z;

      // Angular proximity: higher dot product = closer to pointer direction
      const proximity = Math.max(0, dotProduct);
      const withinInfluence = proximity > 1 - MOUSE_INFLUENCE_RADIUS;

      let mouseOffset = 0;
      if (withinInfluence) {
        // Smooth falloff: stronger push when closer to pointer center
        const strength =
          ((proximity - (1 - MOUSE_INFLUENCE_RADIUS)) /
            MOUSE_INFLUENCE_RADIUS) *
          MOUSE_PUSH_STRENGTH;
        mouseOffset = strength;
      }

      // Target position: base + breathing + mouse displacement along normal
      const totalOffset = radialOffset + mouseOffset;
      const targetX = baseX + pNorm.x * totalOffset;
      const targetY = baseY + pNorm.y * totalOffset;
      const targetZ = baseZ + pNorm.z * totalOffset;

      // Lerp current toward target for smooth motion
      positions[i3] =
        positions[i3]! + (targetX - positions[i3]!) * LERP_BACK_FACTOR;
      positions[i3 + 1] =
        positions[i3 + 1]! + (targetY - positions[i3 + 1]!) * LERP_BACK_FACTOR;
      positions[i3 + 2] =
        positions[i3 + 2]! + (targetZ - positions[i3 + 2]!) * LERP_BACK_FACTOR;
    }

    // Auto-rotation
    if (enableAnimation) {
      points.rotation.y += delta * ROTATION_SPEED;
    }

    // Flag the position attribute for GPU upload
    positionAttr.needsUpdate = true;
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
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        color={DEEP_BLUE}
      />
    </Points>
  );
}

/* ── Main component ─────────────────────────────────────────── */

export default function ParticleSphere() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
      <ParticleSphereScene enableAnimation={!prefersReducedMotion} />

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
