"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export default function Tower({
  rotate = true,
  frontSrc = "/images/tower.png",
  backSrc = "/images/tower-back.png",
  width = 1.6,
  height = 3.2,
}: {
  rotate?: boolean;
  frontSrc?: string;
  backSrc?: string;
  width?: number;
  height?: number;
}) {
  // tải 2 ảnh mặt trước / sau
  const [front, back] = useTexture([frontSrc, backSrc]);
  front.colorSpace = THREE.SRGBColorSpace;
  back.colorSpace = THREE.SRGBColorSpace;
  front.anisotropy = 8;
  back.anisotropy = 8;

  const group = useRef<THREE.Group>(null);

  /* ---------- chỉ cho xoay trái phải (trục Y) ---------- */
  useFrame((_, delta) => {
    if (!rotate) return;
    if (group.current) {
      // chỉ xoay quanh trục Y
      group.current.rotation.y += delta * 0.05;
      // giữ thẳng đứng, không nghiêng
      group.current.rotation.x = 0;
      group.current.rotation.z = 0;
    }
  });

  const matProps = {
    transparent: true,
    alphaTest: 0.03, // cắt sạch viền PNG
    toneMapped: false,
    side: THREE.FrontSide,
    depthWrite: true,
  } as const;

  const eps = 0.0003; // tách 2 plane để tránh z-fighting

  return (
    <group ref={group}>
      {/* ánh sáng mờ phía sau cho cảm giác aura */}
      <mesh position={[0, 0, -0.002]}>
        {/* <planeGeometry args={[width * 1.02, height * 1.02]} /> */}
        <meshBasicMaterial   />
      </mesh>

      {/* Mặt trước */}
      <mesh position={[0, 0, eps]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={front} {...matProps} />
      </mesh>

      {/* Mặt sau */}
      <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -eps]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={back} {...matProps} />
      </mesh>
    </group>
  );
}
