"use client";

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Wireframe } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2.5, 1]} />
      <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 600;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const isGreen = Math.random() > 0.3;
      col[i * 3] = isGreen ? 0.13 : 0.13;
      col[i * 3 + 1] = isGreen ? 0.77 : 0.83;
      col[i * 3 + 2] = isGreen ? 0.36 : 0.93;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function RingSystem() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.05;
      groupRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {[3.2, 4.0, 4.8].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[radius, 0.008, 16, 128]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.15 - i * 0.03} />
        </mesh>
      ))}
    </group>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function Scene3DContent() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Icosahedron />
        <RingSystem />
        <Particles />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}

export default function Scene3D() {
  return (
    <ErrorBoundary>
      <Scene3DContent />
    </ErrorBoundary>
  );
}
