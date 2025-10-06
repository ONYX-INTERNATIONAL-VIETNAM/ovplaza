"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Pulse({ position, color }: { position: THREE.Vector3; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() % 1.5) / 1.5;
    const s = THREE.MathUtils.lerp(0.04, 0.22, t);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 1 - t;
    ref.current.scale.setScalar(s / 0.04);
  });
  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}
