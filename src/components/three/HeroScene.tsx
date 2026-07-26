"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 800;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#9bb4cc" transparent opacity={0.22} sizeAttenuation />
    </points>
  );
}

function RunningRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref}>
        <torusGeometry args={[2.5, 0.08, 16, 100]} />
        <meshStandardMaterial color="#7a9bb8" emissive="#5a6d84" emissiveIntensity={0.1} metalness={0.45} roughness={0.6} />
      </mesh>
    </Float>
  );
}

function InnerRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = -state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.8, 0.04, 16, 100]} />
      <meshStandardMaterial color="#b4c9dc" emissive="#7a9bb8" emissiveIntensity={0.12} transparent opacity={0.35} />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-35 dark:opacity-45">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.15} color="#b4c9dc" />
        <pointLight position={[10, 10, 10]} intensity={0.45} color="#9bb4cc" />
        <pointLight position={[-10, -5, 5]} intensity={0.22} color="#6b8fae" />
        <ParticleField />
        <RunningRing />
        <InnerRing />
        <Stars radius={50} depth={50} count={1200} factor={1.8} saturation={0.05} fade speed={0.25} />
      </Canvas>
    </div>
  );
}
