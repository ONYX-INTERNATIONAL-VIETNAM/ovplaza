"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import { useRef, useState } from "react";

import Globe from "@/components/globe/Globe";
import Markers from "@/components/globe/Markers";
import ModuleList from "@/components/ui/ModuleList";
import InfoDrawer from "@/components/ui/InfoDrawer";
import { MODULES, type ModuleItem } from "@/data/modules";
import FocusCamera from "@/components/globe/FocusCamera";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import BackgroundWordmark from "@/components/BackgroundWordmark";

export default function Page() {
  const [focus, setFocus] = useState<ModuleItem | null>(null); // focus camera
  const [selected, setSelected] = useState<ModuleItem | null>(null); // mở Info Drawer
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div className="relative h-[100svh] w-full bg-[#0b0a20] text-white overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,#263270_0%,transparent_60%)]" />

      <BackgroundWordmark text="OVPLAZA" />

      <div className="absolute inset-x-0 top-6 z-20 text-center">
        <h1 className="text-3xl font-extrabold tracking-[0.2em] md:text-5xl">
          WELCOME TO <span className="text-indigo-300">OVPLAZA</span>
        </h1>
        <p className="mt-2 text-sm text-indigo-200/70">Interactive globe • Click any marker</p>
      </div>

      {/* Nút Thoát camera */}
      {focus && (
        <button
          onClick={() => setFocus(null)}
          className="absolute right-4 top-4 z-[40] grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 transition"
          title="Thoát camera"
          aria-label="Thoát camera"
        >
          ✕
        </button>
      )}

      {/* Map panel — focus camera */}
      <ModuleList
        modules={MODULES}
        selectedKey={focus?.key ?? null}
        onSelect={(m) => {
          setSelected(null); // đảm bảo Drawer đóng trước khi focus mới
          setFocus(m);
        }}
        open={!!selected}
      />

      {/* Drawer — mở khi bấm ô trên địa cầu */}
      <InfoDrawer module={selected} onClose={() => setSelected(null)} />

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
        className="relative z-10"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 2, 1]} intensity={1.1} />

        <Environment preset="city" />
        <Stars radius={80} depth={40} factor={2} saturation={0} fade speed={0.7} />

        <Globe />

        <Markers
          modules={MODULES}
          onOpenInfo={(m) => setSelected(m)}
          drawerOpen={!!selected}
          focusedKey={focus?.key ?? null}
        />

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          enableDamping
          dampingFactor={0.06}
          /* 🚫 KHÔNG xóa focus trong onStart nữa,
             vì với Markers đã chặn pointer ở label HTML rồi */
        />

        {/* target = null → tween về góc nhìn mặc định */}
        <FocusCamera controlsRef={controlsRef} target={focus} />
      </Canvas>

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 w-[92%] max-w-xl -translate-x-1/2 rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur md:hidden">
        <p className="text-xs tracking-widest text-white/80">
          Drag to rotate • Pinch/scroll to zoom
        </p>
      </div>
    </div>
  );
}
