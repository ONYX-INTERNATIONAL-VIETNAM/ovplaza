"use client";

import { Html, QuadraticBezierLine } from "@react-three/drei";
import { useMemo } from "react";
import { latLngToVector3 } from "@/lib/globe";
import Pulse from "./Pulse";
import type { ModuleItem } from "@/data/modules";
import * as THREE from "three";

type MarkersProps = {
  modules: ModuleItem[];
  onOpenInfo: (m: ModuleItem) => void; // click marker -> mở info
  drawerOpen?: boolean;
  focusedKey?: string | null;
};

export default function Markers({
  modules,
  onOpenInfo,
  drawerOpen = false,
  focusedKey = null,
}: MarkersProps) {
  const radius = 1.02;

  const items = useMemo(() => {
    return modules.map((m) => {
      const pos = latLngToVector3(radius, m.lat, m.lng);
      const ctrl = pos.clone().multiplyScalar(1.6);
      const end = pos.clone().normalize().multiplyScalar(2.2);
      return { ...m, pos, ctrl, end };
    });
  }, [modules]);

  // helper: chặn mọi sự kiện pointer/chuột/chạm
  const stopAll = (
    e:
      | React.PointerEvent<HTMLDivElement>
      | React.MouseEvent<HTMLDivElement>
      | React.TouchEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <group>
      {items.map((m) => {
        const dim = focusedKey !== null && focusedKey !== m.key;

        return (
          <group key={m.key}>
            <QuadraticBezierLine
              start={m.pos as THREE.Vector3}
              end={m.end as THREE.Vector3}
              mid={m.ctrl as THREE.Vector3}
              color={m.color}
              linewidth={2}
              transparent
              opacity={dim ? 0.25 : 0.7}
            />

            {/* marker chấm nhỏ */}
            <mesh position={m.pos}>
              <sphereGeometry args={[0.02, 16, 16]} />
              <meshStandardMaterial
                color={m.color}
                emissive={m.color}
                emissiveIntensity={dim ? 0.15 : 0.6}
                transparent
                opacity={dim ? 0.6 : 1}
              />
            </mesh>

            <Pulse position={m.pos} color={m.color} />

            {/* label nổi trên địa cầu */}
            {!drawerOpen && !dim && (
              <Html
                position={m.end}
                center
                distanceFactor={6}
                occlude
                zIndexRange={[0, 40]} // backdrop dùng 70/80
              >
                <div
                  onPointerDown={stopAll}
                  onPointerUp={stopAll}
                  onMouseDown={stopAll}
                  onMouseUp={stopAll}
                  onTouchStart={stopAll}
                  onTouchEnd={stopAll}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenInfo(m);
                    }}
                    className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs tracking-widest text-white backdrop-blur transition hover:bg-white/20 cursor-pointer"
                    style={{ boxShadow: `0 0 20px ${m.color}33` }}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: m.color }}
                    />
                    {m.label}
                  </button>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
