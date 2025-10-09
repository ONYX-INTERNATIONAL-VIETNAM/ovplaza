"use client";

import React from "react";
import { TOKENS } from "@/tokens/tokens";

type GlowPillProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  align?: "left" | "right";
  compact?: boolean;
  disabled?: boolean;
  title?: string;
  className?: string;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function GlowPill({
  children,
  onClick,
  align = "left",
  compact = false,
  disabled = false,
  title,
  className = "",
  fullWidth = false,
  type = "button",
}: GlowPillProps) {
  const dotLeft = align === "right";

  // 🔹 padding và text size responsive
  const basePadding = compact
    ? "px-2 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5"
    : "px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3";

  const baseText = compact
    ? "text-[8px] sm:text-[12px] md:text-base"
    : "text-[12px] sm:text-[14px] md:text-[16px]";

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={[
        "relative inline-flex items-center",
        fullWidth ? "w-full justify-between" : "justify-center",
        "gap-2 sm:gap-3 rounded-[18px] sm:rounded-[22px]",
        basePadding,
        baseText,
        "leading-none",
        "min-h-[36px] sm:min-h-[42px] md:min-h-[44px]",
        "text-white/90 whitespace-nowrap",
        fullWidth ? "truncate" : "max-w-full truncate",
        "backdrop-blur",
        "transition-[transform,box-shadow,background-color] duration-200",
        "motion-safe:hover:scale-[1.015]",
        "active:scale-[0.985]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.22) 100%)",
        border: `1.5px solid ${TOKENS.pillBorder}`,
        boxShadow: compact ? TOKENS.labelGlowMobile : TOKENS.labelGlowDesk,
        WebkitTapHighlightColor: "transparent",
      }}
      aria-disabled={disabled || undefined}
    >
      {dotLeft && (
        <span
          aria-hidden
          className="shrink-0 rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3"
          style={{
            background: TOKENS.pink,
            boxShadow: "0 0 10px 1.5px " + TOKENS.pinkSoft,
          }}
        />
      )}

      <span className="tracking-wide truncate">{children}</span>

      {!dotLeft && (
        <span
          aria-hidden
          className="shrink-0 rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3"
          style={{
            background: TOKENS.pink,
            boxShadow: "0 0 10px 1.5px " + TOKENS.pinkSoft,
          }}
        />
      )}
    </button>
  );
}
