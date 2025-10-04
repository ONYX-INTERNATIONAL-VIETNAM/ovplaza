"use client";

import { ZONES } from "@/data/zones";

export default function MiniMap() {
  const focus = (i: number) =>
    window.dispatchEvent(new CustomEvent("focus-zone", { detail: { index: i } }));

  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        bottom: 16,
        zIndex: 15,
        background: "#ffffff12",
        border: "1px solid #ffffff2b",
        borderRadius: 12,
        backdropFilter: "blur(6px)",
        padding: 10,
        color: "#e5e7eb",
        fontFamily: "ui-sans-serif,system-ui",
        userSelect: "none",
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 6, letterSpacing: ".02em" }}>
        Plaza map
      </div>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ display: "block" }}>
        {/* vòng tròn plaza */}
        <circle cx="70" cy="70" r="55" fill="none" stroke="#94a3b8" strokeDasharray="4 4" strokeOpacity=".6" />
        {/* sông ánh sáng */}
        <rect x="10" y="66" width="120" height="8" rx="4" fill="#7c3aed" fillOpacity=".5" />
        {/* marker từng khu */}
        {ZONES.map((z, i) => {
          const angle = (i / ZONES.length) * Math.PI * 2;
          const r = 55;
          const cx = 70 + Math.cos(angle) * r;
          const cy = 70 + Math.sin(angle) * r;
          return (
            <g key={z.id} onClick={() => focus(i)} style={{ cursor: "pointer" }}>
              <circle cx={cx} cy={cy} r="8" fill={z.color ?? "#fff"} stroke="#0b0f1a" strokeWidth="1.5" />
            </g>
          );
        })}
      </svg>
      <div style={{ fontSize: 12, opacity: .8, marginTop: 6 }}>Bấm điểm trên vòng để bay tới khu</div>
    </div>
  );
}
