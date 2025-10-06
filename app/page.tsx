"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import { JSX, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import Globe from "@/components/globe/Globe";
import Markers from "@/components/globe/Markers";
import ModuleList from "@/components/ui/ModuleList";
import InfoDrawer from "@/components/ui/InfoDrawer";
import { MODULES, type ModuleItem } from "@/data/modules";
import FocusCamera from "@/components/globe/FocusCamera";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import BackgroundWordmark from "@/components/BackgroundWordmark";

/* ==================== Detect mobile (< md) ==================== */
function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpoint - 1}px)`);
    const check = () => setIsMobile(mq.matches);
    check();
    mq.addEventListener?.("change", check);
    return () => mq.removeEventListener?.("change", check);
  }, [breakpoint]);
  return isMobile;
}

/* ==================== MAIN PAGE ==================== */
export default function Page(): JSX.Element {
  const [focus, setFocus] = useState<ModuleItem | null>(null);
  const [selected, setSelected] = useState<ModuleItem | null>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const isMobile = useIsMobile();

  // Mobile-only UI states
  const [mapOpen, setMapOpen] = useState(false);
  const [highlight, setHighlight] = useState<ModuleItem | null>(null);

  useEffect(() => {
    if (selected) setMapOpen(false);
  }, [selected]);

  // Define camera position type-safe
  const cameraPosition: [number, number, number] = isMobile ? [0, 0, 3.7] : [0, 0, 5.2];

  return (
    <div className="relative h-[100svh] w-full bg-[#0b0a20] text-white overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,#263270_0%,transparent_60%)]" />
      <BackgroundWordmark text="OVPLAZA" />

      {/* Header */}
      <div className="absolute inset-x-0 top-4 md:top-6 z-20 text-center px-3">
        <h1 className="text-2xl md:text-5xl font-extrabold tracking-[0.18em] md:tracking-[0.2em]">
          WELCOME TO <span className="text-indigo-300">OVPLAZA</span>
        </h1>
        <p className="mt-1 md:mt-2 text-[11px] md:text-sm text-indigo-200/70">
          Interactive globe • Click any marker
        </p>
      </div>

      {/* Exit focus – desktop only */}
      {!isMobile && focus && (
        <button
          onClick={() => setFocus(null)}
          className="absolute right-4 top-4 z-[40] grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 transition"
          title="Thoát camera"
          aria-label="Thoát camera"
        >
          ✕
        </button>
      )}

      {/* Desktop Map panel */}
      <div className="hidden md:block">
        <ModuleList
          modules={MODULES}
          selectedKey={focus?.key ?? null}
          onSelect={(m) => {
            setSelected(null);
            setFocus(m);
          }}
          open={!!selected}
        />
      </div>

      {/* Drawer chi tiết */}
      <InfoDrawer module={selected} onClose={() => setSelected(null)} />

      {/* Mobile label overlay */}
      {isMobile && (
        <>
          {/* Gradient nền cho vùng label */}
          <div
            className="pointer-events-none absolute inset-x-0 top-[84px] h-[64px] z-[25]
                       bg-[linear-gradient(180deg,rgba(11,10,32,0.85)_0%,rgba(11,10,32,0.0)_100%)]"
          />
          {/* Label overlay */}
          <div className="absolute inset-x-3 top-[100px] z-[35] pointer-events-none">
            {highlight && (
              <div className="pointer-events-auto flex items-center justify-center">
                <button
                  onClick={() => setSelected(highlight)}
                  className="flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.14] px-4 py-2 text-xs font-semibold tracking-widest text-white backdrop-blur-md shadow-[0_10px_32px_rgba(0,0,0,.32)] hover:bg-white/[0.2] transition"
                  style={{ boxShadow: `0 0 20px ${highlight.color}33` }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: highlight.color }}
                  />
                  {highlight.label} • Xem chi tiết
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Nút mở Map (mobile) */}
      {isMobile && (
        <button
          onClick={() => setMapOpen((v) => !v)}
          className="fixed right-4 bottom-[100px] z-[60] rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wider backdrop-blur hover:bg-white/20 transition"
          aria-expanded={mapOpen}
        >
          {mapOpen ? "Đóng Map" : "Mở Map"}
        </button>
      )}

      {/* ========== CANVAS ========== */}
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        className="relative z-10"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 2, 1]} intensity={1.1} />
        <Environment preset="city" />
        <Stars
          radius={70}
          depth={35}
          factor={isMobile ? 1.4 : 2}
          saturation={0}
          fade
          speed={0.6}
        />

        {/* Globe — phóng to + hạ thấp khi mobile */}
        <group
          scale={isMobile ? 1.72 : 1}
          position={isMobile ? new THREE.Vector3(0, -0.52, 0) : new THREE.Vector3(0, 0, 0)}
        >
          <Globe rotate={!isMobile} equator={!isMobile} />
          <Markers
            modules={MODULES}
            onOpenInfo={(m) => setSelected(m)}
            drawerOpen={isMobile ? true : !!selected}
            focusedKey={isMobile ? null : focus?.key ?? null}
          />
        </group>

        {/* Desktop controls */}
        {!isMobile && (
          <>
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              enableDamping
              dampingFactor={0.06}
            />
            <FocusCamera controlsRef={controlsRef} target={focus} />
          </>
        )}
      </Canvas>

      {/* Bottom-sheet Map (mobile) */}
      {isMobile && (
        <div
          className={[
            "fixed inset-x-0 bottom-0 z-[55] rounded-t-2xl border-t border-white/10 bg-white/10 backdrop-blur-md",
            "shadow-[0_-20px_60px_rgba(0,0,0,.35)] transition-transform duration-300",
            mapOpen ? "translate-y-0" : "translate-y-[calc(100%_-_58px)]",
          ].join(" ")}
          style={{ height: mapOpen ? "42vh" : undefined }}
        >
          <div className="flex items-center justify-center py-2">
            <div className="h-1.5 w-10 rounded-full bg-white/30" />
          </div>

          <div className="px-4 pb-4">
            <div className="mb-2 text-[10px] tracking-widest text-white/70">
              MAP • MODULES
            </div>
            <ul className="grid grid-cols-1 gap-2">
              {MODULES.map((m) => (
                <li key={m.key}>
                  <button
                    onClick={() => setHighlight(m)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm bg-white/10 hover:bg-white/15 transition"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ background: m.color }}
                      />
                      {m.label}
                    </span>
                    <span className="text-[10px] uppercase text-white/60">
                      label
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-3 text-[10px] text-white/50">
              Chọn một OV để hiển thị nhãn phía trên – chạm nhãn để mở chi tiết.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
