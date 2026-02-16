"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { type Group, type Mesh, MeshStandardMaterial } from "three";

/* ── Standard Rubik's cube colors ───────────────────────────── */

const FACE_COLORS = {
  right: "#B71234", // red
  left: "#FF5800", // orange
  top: "#FFFFFF", // white
  bottom: "#FFD500", // yellow
  front: "#0046AD", // blue
  back: "#009B48", // green
  inner: "#1A1A1A", // near-black for non-outer faces
} as const;

/**
 * BoxGeometry material index order:
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

/* ── Cubie sizing ───────────────────────────────────────────── */

const CUBIE_SIZE = 0.9;
const GAP = 0.05;
const STEP = CUBIE_SIZE + GAP;

/* ── Material cache (shared across cubies for performance) ─── */

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

/* ── Determine which faces are on the outside of the 3×3×3 ── */

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

/* ── All 26 visible cubie positions ─────────────────────────── */

const COORDS = [-1, 0, 1] as const;

const CUBIE_POSITIONS: [number, number, number][] = [];
for (const x of COORDS) {
  for (const y of COORDS) {
    for (const z of COORDS) {
      if (x === 0 && y === 0 && z === 0) continue;
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
    <mesh
      ref={meshRef}
      position={worldPosition}
      material={materials}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]} />
    </mesh>
  );
}

/* ── Cube group with auto-rotation ──────────────────────────── */

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

    function handleChange(event: MediaQueryListEvent) {
      setPrefersReducedMotion(event.matches);
    }

    handleChange({ matches: mql.matches } as MediaQueryListEvent);

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
