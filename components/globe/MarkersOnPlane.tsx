"use client";

import * as THREE from "three";
import { Html } from "@react-three/drei";
import { Fragment, useMemo } from "react";

export type PlaneMarker = {
  key: string;
  name: string;
  color?: string;
  /** UV 0..1, tính theo ảnh: u trái→phải, v trên→dưới */
  uv: { u: number; v: number };
  side?: "left" | "right"; // để sau này bạn muốn nối label bên nào
};

export default function MarkersOnPlane({
  items,
  planeSize, // { w, h } chính là width/height của plane (phải khớp với component Tower/Globe bạn đang dùng)
  onPick,
}: {
  items: PlaneMarker[];
  planeSize: { w: number; h: number };
  onPick?: (key: string) => void;
}) {
  const positions = useMemo(() => {
    // UV -> local position của plane
    return items.map((m) => {
      const x = (m.uv.u - 0.5) * planeSize.w;
      const y = (0.5 - m.uv.v) * planeSize.h;
      return { ...m, pos: new THREE.Vector3(x, y, 0.01) };
    });
  }, [items, planeSize.w, planeSize.h]);

  return (
    <group>
      {positions.map((m) => (
        <Fragment key={m.key}>
          {/* dot 3D nhỏ ngay trên bề mặt ảnh */}
          <mesh
            position={m.pos}
            onClick={(e) => {
              e.stopPropagation();
              onPick?.(m.key);
            }}
          >
            <sphereGeometry args={[0.03, 24, 24]} />
            <meshBasicMaterial color={m.color || "#ff4da6"} />
          </mesh>

          {/* hiệu ứng ping nhẹ bằng Html để luôn sắc nét */}
          <Html position={m.pos} transform occlude={false}>
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <span className="block h-3 w-3 rounded-full bg-pink-500 opacity-0" />
              <span className="pointer-events-none absolute -inset-2 animate-ping rounded-full bg-pink-500/40" />
            </div>
          </Html>
        </Fragment>
      ))}
    </group>
  );
}
