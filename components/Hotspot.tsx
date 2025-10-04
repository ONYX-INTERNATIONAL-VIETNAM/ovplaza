"use client";

import { Html } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import React, { useEffect, useState } from "react";

export default function Hotspot({
  label,
  sub,
  href,
  color = "#fff",
  position,
  yOffset = 1.25,
}: {
  label: string;
  sub?: string;
  href: string;
  color?: string;
  position: [number, number, number];
  yOffset?: number;
}) {
  /* ========= detect mobile to scale touch targets ========= */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  /* ========= stop events so OrbitControls doesn't eat the tap/click ========= */
  const stopThree = (e: ThreeEvent<PointerEvent> | ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
  };

  // for real DOM events coming from <a>
  const stopDOM = (e: React.PointerEvent<HTMLAnchorElement> | React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  // iOS Safari sometimes needs explicit touch handlers
  const stopTouchOnHtml = (e: React.TouchEvent) => {
    e.stopPropagation();
    // prevent page scroll while tapping the label
    e.preventDefault();
  };

  /* ========= styles scaled for mobile ========= */
  const pad = isMobile ? "12px 14px" : "10px 12px";
  const minW = isMobile ? 184 : 160;
  const fz = isMobile ? 14 : 13;
  const dot = isMobile ? 12 : 10;
  const gap = isMobile ? 10 : 8;

  return (
    <group position={position}>
      <Html
        transform
        sprite
        center
        distanceFactor={12}
        position={[0, yOffset, 0]}
        style={{
          pointerEvents: "auto",
          WebkitTapHighlightColor: "transparent",
          touchAction: "none", // tránh kéo trang khi chạm
        }}
        onPointerDown={stopThree}
        onPointerUp={stopThree}
        onClick={stopThree}
        onTouchStart={stopTouchOnHtml}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <a
          href={href}
          target="_self"
          rel="noopener"
          aria-label={`Mở ${label}`}
          onPointerDown={stopDOM}
          onClick={stopDOM}
          onTouchStart={stopDOM}
          onTouchEnd={stopDOM}
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap,
            padding: pad,
            borderRadius: 14,
            textDecoration: "none",
            background: "#fffffff0",
            color: "#0b0f1a",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(0,0,0,.25)",
            cursor: "pointer",
            fontFamily: "ui-sans-serif,system-ui",
            minWidth: minW,
            fontSize: fz,
            // mở rộng thêm vùng chạm vô hình xung quanh
            // (giúp dễ bấm mà không thay đổi layout)
            position: "relative",
          }}
          onMouseEnter={() => (document.body.style.cursor = "pointer")}
          onMouseLeave={() => (document.body.style.cursor = "auto")}
        >
          {/* invisible hit area padding for easier taps */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: -8, // tăng vùng chạm
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap,
              fontWeight: 900,
              letterSpacing: ".01em",
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                width: dot,
                height: dot,
                borderRadius: 6,
                background: color,
                flex: "0 0 auto",
              }}
            />
            {label}
          </div>

          {sub && (
            <div
              style={{
                fontSize: Math.max(12, fz - 1),
                color: "#475569",
                fontWeight: 600,
                lineHeight: 1.15,
              }}
            >
              {sub}
            </div>
          )}
        </a>
      </Html>
    </group>
  );
}
