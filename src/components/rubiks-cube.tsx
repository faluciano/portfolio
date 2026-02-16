"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { type Group, type Mesh, MeshStandardMaterial } from "three";

/* ── Color palette ──────────────────────────────────────────── */

const FACE_COLORS = {
  right: "#3B82F6", // primary blue (accent)
  left: "#1E3A8A", // deep navy (primary-900)
  top: "#93C5FD", // light sky (primary-300)
  bottom: "#172554", // darkest navy (primary-950)
  front: "#60A5FA", // medium blue (primary-400)
  back: "#1D4ED8", // strong blue (primary-700)
  inner: "#0F172A", // near-black slate for inner faces
} as const;

/**
 * Material order for a BoxGeometry / RoundedBox:
 * [+x (right), -x (left), +y (top), -y (bottom), +z (front), -z (back)]
 */
type FaceDirection = "right" | "left" | "top" | "bottom" | "front" | "back";

const FACE_ORDER: FaceDirection[] = [
  "right",
  "left",
  "top",
  "bottom",
  "front",
  "back",
];

/* ── Cubie size & gap ───────────────────────────────────────── */

const CUBIE_SIZE = 0.9;
const GAP = 0.05;
const STEP = CUBIE_SIZE + GAP; // ~0.95

/* ── Material cache ─────────────────────────────────────────── */

const materialCache = new Map<string, MeshStandardMaterial>();

function getMaterial(color: string): MeshStandardMaterial {
  const cached = materialCache.get(color);
  if (cached) return cached;

  const mat = new MeshStandardMaterial({
    color,
    roughness: 0.35,
    metalness: 0.05,
  });
  materialCache.set(color, mat);
  return mat;
}

/* ── Determine face visibility ──────────────────────────────── */

function isOuterFace(
  position: [number, number, number],
  face: FaceDirection,
): boolean {
  const [x, y, z] = position;

  switch (face) {
    case "right":
      return x === 1;
    case "left":
      return x === -1;
    case "top":
      return y === 1;
    case "bottom":
      return y === -1;
    case "front":
      return z === 1;
    case "back":
      return z === -1;
  }
}

function buildCubieMaterials(
  position: [number, number, number],
): MeshStandardMaterial[] {
  return FACE_ORDER.map((face) => {
    const color = isOuterFace(position, face)
      ? FACE_COLORS[face]
      : FACE_COLORS.inner;
    return getMaterial(color);
  });
}

/* ── Cubie positions (26 visible) ───────────────────────────── */

const COORDS = [-1, 0, 1] as const;

const CUBIE_POSITIONS: [number, number, number][] = [];
for (const x of COORDS) {
  for (const y of COORDS) {
    for (const z of COORDS) {
      if (x === 0 && y === 0 && z === 0) continue; // skip hidden center
      CUBIE_POSITIONS.push([x, y, z]);
    }
  }
}

/* ── Single Cubie ───────────────────────────────────────────── */

interface CubieProps {
  gridPosition: [number, number, number];
}

function Cubie({ gridPosition }: CubieProps) {
  const meshRef = useRef<Mesh>(null);
  const materials = buildCubieMaterials(gridPosition);

  const worldPosition: [number, number, number] = [
    gridPosition[0] * STEP,
    gridPosition[1] * STEP,
    gridPosition[2] * STEP,
  ];

  return (
    <RoundedBox
      ref={meshRef}
      args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]}
      radius={0.06}
      smoothness={4}
      position={worldPosition}
      material={materials}
      castShadow
      receiveShadow
    />
  );
}

/* ── Cube assembly with auto-rotation ───────────────────────── */

interface CubeGroupProps {
  enableAutoRotate: boolean;
}

function CubeGroup({ enableAutoRotate }: CubeGroupProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_state, delta) => {
    if (!enableAutoRotate || !groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      {CUBIE_POSITIONS.map((pos) => (
        <Cubie key={pos.join(",")} gridPosition={pos} />
      ))}
    </group>
  );
}

/* ── Main component ─────────────────────────────────────────── */

export default function RubiksCube() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);

    function handleChange(event: MediaQueryListEvent) {
      setPrefersReducedMotion(event.matches);
    }

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return (
    <Canvas
      camera={{ position: [4, 3, 4], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
      <directionalLight position={[-3, -2, -4]} intensity={0.3} />

      <CubeGroup enableAutoRotate={!prefersReducedMotion} />

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
