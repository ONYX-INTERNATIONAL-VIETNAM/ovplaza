"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, useTexture } from "@react-three/drei";

export default function Globe() {
  // Tải các texture với type rõ ràng
  const textures = useTexture([
    "/images/earth_color.png",
    "/images/earth_bump.png",
    "/images/earth_night.png",
    "/images/earth_spec.png",
    "/images/earth_clouds.png",
  ]) as [
    THREE.Texture,
    THREE.Texture,
    THREE.Texture,
    THREE.Texture,
    THREE.Texture
  ];

  const [colorMap, bumpMap, nightMap, specMask, cloudsMap] = textures;

  // Đặt colorSpace chính xác (TypeScript sẽ hiểu đúng)
  colorMap.colorSpace = THREE.SRGBColorSpace;
  nightMap.colorSpace = THREE.SRGBColorSpace;

  const group = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.05;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={group}>
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.045, 64, 64]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.08} />
      </mesh>

      {/* Earth */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhysicalMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.04}
          emissive={new THREE.Color("#ffffff")}
          emissiveMap={nightMap}
          emissiveIntensity={0.6}
          specularIntensityMap={specMask}
          specularIntensity={0.6}
          roughness={0.85}
          metalness={0.0}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.015, 128, 128]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>

      {/* Equator guide */}
      <Line
        points={new THREE.EllipseCurve(0, 0, 1.001, 1.001, 0, 2 * Math.PI)
          .getSpacedPoints(128)
          .map((p) => new THREE.Vector3(p.x, 0, p.y))}
        color="#ffffff"
        lineWidth={1}
        dashed
        dashSize={0.1}
        gapSize={0.08}
        opacity={0.2}
        transparent
      />
    </group>
  );
}
