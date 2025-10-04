"use client";

import { useEffect, useMemo, useState } from "react";
import { ZONES } from "@/data/zones";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);
  return mobile;
}

export default function MiniMap() {
  const isMobile = useIsMobile();

  // Kích thước & bán kính tự động theo thiết bị
  const size = isMobile ? 180 : 140;
  const cx0 = size / 2;
  const cy0 = size / 2;
  const ringR = isMobile ? 70 : 55;
  const markerR = isMobile ? 12 : 8; // hit-area to hơn trên mobile
  const riverH = isMobile ? 10 : 8;

  const focus = (i: number) =>
    window.dispatchEvent(new CustomEvent("focus-zone", { detail: { index: i } }));

  // Tính trước toạ độ marker
  const markers = useMemo(() => {
    return ZONES.map((z, i) => {
      const angle = (i / ZONES.length) * Math.PI * 2;
      return {
        id: z.id,
        label: z.label,
        color: z.color ?? "#fff",
        x: cx0 + Math.cos(angle) * ringR,
        y: cy0 + Math.sin(angle) * ringR,
        i,
      };
    });
  }, [ringR, cx0, cy0]);

  // Chặn kéo/scroll khi chạm trong minimap (để không kéo cả trang)
  const stop = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      style={{
        position: "fixed",
        // trên mobile đặt bên phải để không đè ngón cái khi di chuyển camera
        right: isMobile ? 12 : "auto",
        left: isMobile ? "auto" : 16,
        bottom: 12,
        zIndex: 15,
        background: "#ffffff12",
        border: "1px solid #ffffff2b",
        borderRadius: 12,
        backdropFilter: "blur(6px)",
        padding: 10,
        color: "#e5e7eb",
        fontFamily: "ui-sans-serif,system-ui",
        userSelect: "none",
        // tránh khu vực tai thỏ / gesture bar trên iOS
        paddingBottom: `calc(10px + env(safe-area-inset-bottom, 0px))`,
        touchAction: "none", // để gesture không kéo trang
      }}
      role="group"
      aria-label="Plaza mini-map"
      onTouchStart={stop}
      onTouchMove={stop}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      <div
        style={{
          fontWeight: 900,
          marginBottom: 6,
          letterSpacing: ".02em",
          fontSize: isMobile ? 12 : 13,
        }}
      >
        Plaza map
      </div>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: "block", touchAction: "none" }}
        onPointerDown={(e) => {
          // giữ pointer trong map, tránh “kéo” camera
          e.stopPropagation();
        }}
      >
        {/* vòng tròn plaza */}
        <circle
          cx={cx0}
          cy={cy0}
          r={ringR}
          fill="none"
          stroke="#94a3b8"
          strokeDasharray="4 4"
          strokeOpacity=".6"
        />

        {/* sông ánh sáng */}
        <rect
          x={size * 0.07}
          y={cy0 - riverH / 2}
          width={size * 0.86}
          height={riverH}
          rx={riverH / 2}
          fill="#7c3aed"
          fillOpacity=".5"
        />

        {/* marker từng khu (nút bấm thật sự) */}
        {markers.map((m) => (
          <g
            key={m.id}
            role="button"
            tabIndex={0}
            aria-label={`Đi tới ${m.label}`}
            onClick={(e) => {
              e.stopPropagation();
              focus(m.i);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                focus(m.i);
              }
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              focus(m.i);
            }}
            style={{ cursor: "pointer" }}
          >
            {/* Vùng chạm mở rộng (hit area) — trong suốt */}
            <circle cx={m.x} cy={m.y} r={markerR + 8} fill="transparent" />

            {/* Marker chính */}
            <circle
              cx={m.x}
              cy={m.y}
              r={markerR}
              fill={m.color}
              stroke="#0b0f1a"
              strokeWidth={1.5}
            />

            {/* Nhãn nhỏ trên mobile khi chạm/hover (tuỳ chọn) */}
            {!isMobile && (
              <title>{m.label}</title>
            )}
          </g>
        ))}
      </svg>

      <div
        style={{
          fontSize: 12,
          opacity: 0.8,
          marginTop: 6,
          maxWidth: size,
          lineHeight: 1.3,
        }}
      >
        Bấm điểm trên vòng để bay tới khu
      </div>
    </div>
  );
}
