// components/globe/FocusCamera.tsx
"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { latLngToVector3 } from "@/lib/globe";
import type { ModuleItem } from "@/data/modules";

export default function FocusCamera({
  controlsRef,
  target,
  radius = 1.02,
  distance = 2.6,
  lerp = 0.08,
  defaultDistance = 5.2,
  defaultTarget = new THREE.Vector3(0, 0, 0),
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>; // 👈 cho phép null
  target: ModuleItem | null;
  radius?: number;
  distance?: number;
  lerp?: number;
  defaultDistance?: number;
  defaultTarget?: THREE.Vector3;
}) {
  const { camera } = useThree();
  const desiredPos = useRef<THREE.Vector3 | null>(null);
  const desiredTarget = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (!target) {
      desiredPos.current = new THREE.Vector3(0, 0, defaultDistance);
      desiredTarget.current = defaultTarget.clone();
      return;
    }
    const surface = latLngToVector3(radius, target.lat, target.lng);
    const look = surface.clone().normalize();
    desiredPos.current = look.clone().multiplyScalar(distance);
    desiredTarget.current = surface;
  }, [target, radius, distance, defaultDistance, defaultTarget]);

  useFrame(() => {
    if (!desiredPos.current || !desiredTarget.current) return;
    const controls = controlsRef.current;
    if (!controls) return;

    camera.position.lerp(desiredPos.current, lerp);
    controls.target.lerp(desiredTarget.current, lerp);
    controls.update();

    const done =
      camera.position.distanceTo(desiredPos.current) < 0.004 &&
      controls.target.distanceTo(desiredTarget.current) < 0.004;

    if (done) {
      camera.position.copy(desiredPos.current);
      controls.target.copy(desiredTarget.current);
      desiredPos.current = desiredTarget.current = null;
    }
  });

  return null;
}
