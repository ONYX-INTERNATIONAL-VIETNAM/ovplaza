"use client";
import { Html } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import React from "react";

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
  // Dành cho event trong Three.js
  const stopThreeEvent = (e: ThreeEvent<MouseEvent>) => e.stopPropagation();

  // Dành cho event trong DOM thật (React)
  const stopReactEvent = (e: React.PointerEvent<HTMLAnchorElement>) => e.stopPropagation();

  return (
    <group position={position}>
      <Html
        transform
        sprite
        center
        distanceFactor={12}
        position={[0, yOffset, 0]}
        style={{ pointerEvents: "auto" }}
        onPointerDown={stopThreeEvent}
        onPointerUp={stopThreeEvent}
        onClick={stopThreeEvent}
      >
        <a
          href={href}
          target="_self"
          rel="noopener"
          onPointerDown={stopReactEvent}
          onClick={stopReactEvent}
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 4,
            padding: "10px 12px",
            borderRadius: 14,
            textDecoration: "none",
            background: "#fffffff0",
            color: "#0b0f1a",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(0,0,0,.25)",
            cursor: "pointer",
            fontFamily: "ui-sans-serif,system-ui",
            minWidth: 160,
          }}
          onMouseEnter={() => (document.body.style.cursor = "pointer")}
          onMouseLeave={() => (document.body.style.cursor = "auto")}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 900,
              letterSpacing: ".01em",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 6,
                background: color,
              }}
            />
            {label}
          </div>
          {sub && (
            <div
              style={{
                fontSize: 12,
                color: "#475569",
                fontWeight: 600,
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
