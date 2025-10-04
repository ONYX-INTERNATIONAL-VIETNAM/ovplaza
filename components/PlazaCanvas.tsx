"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  ContactShadows,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { ZONES } from "@/data/zones";
import Hotspot from "./Hotspot";
import MiniMap from "./MiniMap";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";

/* ========= Helpers: detect mobile ========= */
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);
  return mobile;
}

/* ======= NỀN TRỜI + SAO ======= */
function Sky({ isMobile }: { isMobile: boolean }) {
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#15122a", side: THREE.BackSide }),
    []
  );
  const geo = useMemo(() => new THREE.SphereGeometry(120, 32, 16), []);
  return (
    <>
      <mesh geometry={geo} material={mat} />
      <Stars
        radius={80}
        depth={40}
        count={isMobile ? 2200 : 5000}   // giảm sao trên mobile cho nhẹ
        factor={isMobile ? 1.4 : 1.8}
        fade
        speed={0.45}
      />
    </>
  );
}

/* ======= SÀN PLAZA: tiles + ring đi bộ ======= */
function Tiles() {
  const g = useMemo(() => new THREE.CircleGeometry(28, 96).rotateX(-Math.PI / 2), []);
  const m = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1b2230", roughness: 0.96 }),
    []
  );
  return <mesh geometry={g} material={m} receiveShadow />;
}
function RingWalk() {
  const rOuter = 18, rInner = 14;
  const g = useMemo(() => new THREE.RingGeometry(rInner, rOuter, 128, 1).rotateX(-Math.PI / 2), []);
  const m = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0f1420", roughness: 0.92, metalness: 0.05 }),
    []
  );
  return <mesh geometry={g} material={m} receiveShadow />;
}

/* ======= SÔNG ÁNH SÁNG ======= */
function River() {
  const geo = useMemo(() => new THREE.PlaneGeometry(36, 3.2, 1, 1).rotateX(-Math.PI / 2), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#7c3aed",
        emissive: "#7c3aed",
        emissiveIntensity: 0.6,
        roughness: 0.85,
      }),
    []
  );
  return <mesh geometry={geo} material={mat} position={[0, 0.01, 0]} receiveShadow />;
}

/* ======= HALO dưới mỗi pavilion ======= */
function Halo({ position, color = "#fff" }: { position: [number, number, number]; color?: string }) {
  const geo = useMemo(() => new THREE.CircleGeometry(1.6, 48).rotateX(-Math.PI / 2), []);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.24 }), [color]);
  return <mesh geometry={geo} material={mat} position={[position[0], 0.015, position[2]]} />;
}

/* ======= CỘT CỜ/BANNER ======= */
function Banner({ position, color = "#f59e0b" }: { position: [number, number, number]; color?: string }) {
  const pole = useMemo(() => new THREE.CylinderGeometry(0.05, 0.05, 2.4, 12), []);
  const flag = useMemo(() => new THREE.PlaneGeometry(1.1, 0.5).translate(0.55, 0.9, 0), []);
  return (
    <group position={[position[0] - 1.2, 0, position[2] + 0.2]}>
      <mesh geometry={pole} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh geometry={flag} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ======= CỔNG CHÀO (ARCH) ======= */
function Arch({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  const pillar = useMemo(() => new THREE.CylinderGeometry(0.25, 0.25, 4.2, 16), []);
  const bar = useMemo(() => new THREE.BoxGeometry(5.4, 0.35, 0.6), []);
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[-2.7, 2.1, 0]} geometry={pillar}>
        <meshStandardMaterial color="#e5e7eb" metalness={0.1} roughness={0.6} />
      </mesh>
      <mesh position={[2.7, 2.1, 0]} geometry={pillar}>
        <meshStandardMaterial color="#e5e7eb" metalness={0.1} roughness={0.6} />
      </mesh>
      <mesh position={[0, 4.05, 0]} geometry={bar}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

/* ======= ĐÈN ĐƯỜNG ======= */
function Lamp({ position }: { position: [number, number, number] }) {
  const pole = useMemo(() => new THREE.CylinderGeometry(0.06, 0.06, 2.8, 12), []);
  const head = useMemo(() => new THREE.SphereGeometry(0.18, 16, 16), []);
  return (
    <group position={[position[0], 0, position[2]]}>
      <mesh position={[0, 1.4, 0]} geometry={pole}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.8, 0]} geometry={head}>
        <meshStandardMaterial color="#f1f5f9" emissive="#fde68a" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

/* ======= PAVILION ======= */
function Pavilion({
  position,
  color = "#f59e0b",
  href,
}: {
  position: [number, number, number];
  color?: string;
  href: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const geom = useMemo(() => {
    const r = Math.abs(Math.sin(position[0] + position[2]));
    if (r < 0.33) return new THREE.BoxGeometry(2.6, 1.5, 2.0);
    if (r < 0.66) return new THREE.CylinderGeometry(1.2, 1.2, 1.7, 24);
    return new THREE.ConeGeometry(1.2, 1.8, 24);
  }, [position]);
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color, metalness: 0.18, roughness: 0.6 }),
    [color]
  );

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(performance.now() / 900 + position[0]) * 0.04;
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      geometry={geom}
      material={mat}
      castShadow
      receiveShadow
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
      onClick={(e) => {
        e.stopPropagation();
        window.location.assign(href);
      }}
    />
  );
}

/* ======= AUTO-LAYOUT THEO VÒNG ======= */
function useRingPositions(n: number, radius = 16): [number, number, number][] {
  return useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2;
      const jitter = i % 2 === 0 ? 0.6 : -0.4;
      arr.push([Math.cos(t) * (radius + jitter), 0.75, Math.sin(t) * (radius + jitter)]);
    }
    return arr;
  }, [n, radius]);
}

/* ======= CAMERA FOCUS CONTROLLER ======= */
function FocusController({ positions }: { positions: [number, number, number][] }) {
  const { camera, controls } = useThree() as {
    camera: THREE.PerspectiveCamera;
    controls: OrbitControlsType;
  };

  const state = useRef({
    fromPos: new THREE.Vector3(),
    toPos: new THREE.Vector3(),
    fromTar: new THREE.Vector3(),
    toTar: new THREE.Vector3(),
    t: 1,
  });

  useEffect(() => {
    const handler = (e: CustomEvent<{ index: number }>) => {
      const i = e.detail?.index ?? 0;
      const target = new THREE.Vector3(...positions[i]);
      const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
      const dist = THREE.MathUtils.clamp(camera.position.distanceTo(controls.target), 12, 22);
      const toPos = new THREE.Vector3().addVectors(target, dir.multiplyScalar(dist));

      state.current.fromPos.copy(camera.position);
      state.current.toPos.copy(toPos);
      state.current.fromTar.copy(controls.target);
      state.current.toTar.copy(target.clone().setY(1.0));
      state.current.t = 0;
    };

    window.addEventListener("focus-zone", handler as EventListener);
    return () => window.removeEventListener("focus-zone", handler as EventListener);
  }, [camera, controls, positions]);

  useFrame((_, dt) => {
    if (state.current.t < 1) {
      const k = Math.min(1, state.current.t + dt * 1.6);
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const e = ease(k);

      camera.position.lerpVectors(state.current.fromPos, state.current.toPos, e);
      const tar = new THREE.Vector3().lerpVectors(state.current.fromTar, state.current.toTar, e);
      controls.target.copy(tar);
      controls.update();

      state.current.t = k;
    }
  });

  return null;
}

/* ======= SCENE CHÍNH ======= */
function Scene({ isMobile }: { isMobile: boolean }) {
  const dir = useRef<THREE.DirectionalLight>(null);
  useFrame(() => dir.current?.position.set(10, 12, 8));

  const positions = useRingPositions(ZONES.length, 16);
  const lampPositions = useRingPositions(isMobile ? 8 : 12, 20); // ít đèn hơn trên mobile

  return (
    <>
      <Sky isMobile={isMobile} />
      <hemisphereLight args={["#b3c5ff", "#0d0f14", 0.55]} />
      <directionalLight ref={dir} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <fog attach="fog" args={["#0d0f14", 18, 60]} />

      <Tiles />
      <RingWalk />
      <River />

      <Arch position={[-10, 0, 0]} rotation={0} />
      <Arch position={[10, 0, 0]} rotation={Math.PI} />

      {lampPositions.map((p, i) => (
        <Lamp key={i} position={p} />
      ))}

      {ZONES.map((z, i) => (
        <group key={z.id}>
          <Pavilion position={positions[i]} color={z.color} href={z.href} />
          <Halo position={positions[i]} color={z.color} />
          <Banner position={positions[i]} color={z.color} />
          <Hotspot position={positions[i]} label={z.label} sub={z.desc} href={z.href} color={z.color} />
        </group>
      ))}

      {/* tắt bóng tiếp xúc trên mobile để nhẹ hơn */}
      {!isMobile && (
        <ContactShadows position={[0, 0, 0]} opacity={0.35} scale={100} blur={3} far={30} />
      )}

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={isMobile ? 11 : 10}
        maxDistance={isMobile ? 32 : 42}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 1.0, 0]}
        mouseButtons={{
          LEFT: THREE.MOUSE.PAN,
          RIGHT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
        }}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
      />

      <FocusController positions={positions} />
    </>
  );
}

export default function PlazaCanvas() {
  const isMobile = useIsMobile();
  const [dpr, setDpr] = useState<[number, number]>(() =>
    typeof window !== "undefined" && window.devicePixelRatio > 2 ? [1, 1.5] : [1, 2]
  );

  return (
    <>
      <div className="topbar">
        <span className="logo-dot"></span> OVPLAZA — Plaza 3D
      </div>

      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [14, 9, 14], fov: 42 }}
        dpr={dpr}
        style={{ width: "100vw", height: "100vh", touchAction: "none" }} // tránh kéo trang khi gesture
      >
        <PerformanceMonitor
          onDecline={() => setDpr([1, 1])}
          onIncline={() => setDpr([1, isMobile ? 1.5 : 2])}
        />
        <Scene isMobile={isMobile} />
      </Canvas>

      <div className="hud">
        <b>Controls</b>
        <br />
        <span className="badge">1 ngón xoay</span>
        <span className="badge">2 ngón zoom/pan</span>
        <br />
        Click label/khối để vào trang · Dùng mini-map để bay nhanh.
      </div>

      <MiniMap />
    </>
  );
}
