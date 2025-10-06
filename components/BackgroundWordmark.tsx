"use client";

import { useLayoutEffect, useRef } from "react";

export default function BackgroundWordmark({
  text = "OVPLAZA",
  sidePaddingVW = 6,
  minPx = 64,
  maxPx = 220,
  translateYvh = 0,
}: {
  text?: string;
  sidePaddingVW?: number;
  minPx?: number;
  maxPx?: number;
  translateYvh?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current, span = textRef.current;
    if (!wrap || !span) return;

    const fit = () => {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const sidePadPx = (sidePaddingVW / 100) * vw;
      const target = Math.max(0, wrap.clientWidth - sidePadPx * 2);

      span.style.fontSize = `${maxPx}px`;
      const textWidth = span.scrollWidth || span.getBoundingClientRect().width;
      if (textWidth > 0) {
        const scale = target / textWidth;
        const size = Math.max(minPx, Math.min(maxPx, Math.floor(maxPx * scale * 0.98)));
        span.style.fontSize = `${size}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [sidePaddingVW, minPx, maxPx]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center"
      style={{ transform: `translateY(${translateYvh}vh)` }}
    >
      <div ref={wrapRef} className="w-full overflow-hidden">
        <span
          ref={textRef}
          className="
            block select-none whitespace-nowrap text-center uppercase font-extrabold leading-none
            text-transparent bg-clip-text
            bg-gradient-to-r from-indigo-400/25 via-fuchsia-400/25 to-sky-400/25
            opacity-10 drop-shadow-[0_2px_20px_rgba(124,58,237,0.12)]
            tracking-[0.18em]
          "
          style={{ letterSpacing: "0.18em" }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
