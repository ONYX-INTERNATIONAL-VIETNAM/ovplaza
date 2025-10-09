"use client";

import { Html, QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useCallback } from "react";
import type { TowerItem } from "@/data/towerModules";

export default function TowerLabels({
  items,
  onOpen,
}: {
  items: TowerItem[];
  onOpen: (m: TowerItem) => void;
}) {
  const computed = useMemo(() => {
    return items.map((m) => {
      const start = m.anchor.clone();
      // điểm control kéo ra ngoài cho đường cong
      const ctrl = m.anchor.clone().add(new THREE.Vector3(m.side === "right" ? 0.5 : -0.5, 0.15, 0));
      // điểm kết thúc (gần đầu pill)
      const end  = m.anchor.clone().add(new THREE.Vector3((m.side === "right" ? 1 : -1) * (m.dist ?? 0.9), 0, 0));
      return { ...m, start, ctrl, end };
    });
  }, [items]);

  const Pill = useCallback((m: TowerItem) => (
    <button
      onClick={(e) => { e.stopPropagation(); onOpen(m); }}
      className={[
        "group relative h-[56px] w-[380px] rounded-[30px] border border-[#6f68a3]/45",
        "bg-[#2a2746]/85 text-white/95 shadow-[0_12px_30px_rgba(0,0,0,.35)]",
        "backdrop-blur supports-[backdrop-filter]:backdrop-blur",
        "pl-6 pr-8 text-[22px] tracking-wide flex items-center select-none",
        m.side === "right" ? "before:-right-7" : "before:-left-7",
        "before:absolute before:inset-y-0 before:w-[96px] before:rounded-full",
        "before:bg-[radial-gradient(52px_52px_at_center,rgba(188,182,255,.55),rgba(188,182,255,0))]",
      ].join(" ")}
      style={{ boxShadow: `0 0 0 0 rgba(0,0,0,0)` }}
    >
      <span className="mr-3">{m.label}</span>
      <span className="mt-1 inline-block size-1.5 rounded-full bg-[#ff4dd2]" />
    </button>
  ), [onOpen]);

  return (
    <group>
      {computed.map((m) => (
        <group key={m.key}>
          {/* đường cong */}
          <QuadraticBezierLine
            start={[m.start.x, m.start.y, m.start.z]}
            end={[m.end.x, m.end.y, m.end.z]}
            mid={[m.ctrl.x, m.ctrl.y, m.ctrl.z]}
            color="#ff56d7"
            linewidth={1.5}
            transparent
            opacity={0.55}
          />
          {/* dot hồng ở đầu đường cong (gần pill) */}
          <mesh position={[m.end.x, m.end.y, m.end.z]}>
            <sphereGeometry args={[0.012, 16, 16]} />
            <meshBasicMaterial color="#ff4dd2" />
          </mesh>

          {/* pill 2D dán vào không gian 3D */}
          <Html
            position={[m.end.x + (m.side === "right" ? 0.06 : -0.06), m.end.y, m.end.z]}
            transform
            sprite
            distanceFactor={2}
            style={{ pointerEvents: "auto" }}
            occlude
          >
            <div
              className={m.side === "right" ? "translate-x-2" : "-translate-x-[calc(100%+8px)]"}
            >
              {Pill(m)}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
