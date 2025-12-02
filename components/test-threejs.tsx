"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#8b5cf6" />
      </Sphere>
    </Canvas>
  );
}
