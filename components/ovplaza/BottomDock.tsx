"use client";

import { Globe, Gavel } from "lucide-react";

export default function BottomDock() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0">
      {/* Nền trắng SVG (luôn ở dưới) */}
      <img
        src="/images/bg.svg"
        alt=""
        className="absolute inset-x-0 bottom-0 w-full z-0"
        aria-hidden
        style={{ objectFit: "fill" }}
      />

      {/* Links trên nền (đặt nổi lên) */}
      <div className="pointer-events-auto relative z-10">
        {/* LEFT LINK */}
        <div
          className="
            absolute
            bottom-[max(44px,calc(44px+env(safe-area-inset-bottom)))]
            left-[7%] sm:left-[10%]
            text-center
            px-2
          "
        >
          <div className="mb-2 grid place-items-center">
            <Globe className="h-5 w-5 text-white sm:text-[#0b1b3a]" />
          </div>
          <a
            href="#"
            className="
              inline-block
              text-[clamp(12px,3.4vw,14px)] leading-none py-1
              text-white sm:text-[#0b1b3a]
              underline underline-offset-4
              decoration-white/60 hover:decoration-white
              sm:decoration-[#0b1b3a]/60 sm:hover:decoration-[#0b1b3a]
            "
          >
            OUR SERVICES
          </a>
        </div>

        {/* RIGHT LINK */}
        <div
          className="
            absolute
            bottom-[max(44px,calc(44px+env(safe-area-inset-bottom)))]
            right-[7%] sm:right-[10%]
            text-center
            px-2
          "
        >
          <div className="mb-2 grid place-items-center">
            <Gavel className="h-5 w-5 text-white sm:text-[#0b1b3a]" />
          </div>
          <a
            href="#"
            className="
              inline-block
              text-[clamp(12px,3.4vw,14px)] leading-none py-1
              text-white sm:text-[#0b1b3a]
              underline underline-offset-4
              decoration-white/60 hover:decoration-white
              sm:decoration-[#0b1b3a]/60 sm:hover:decoration-[#0b1b3a]
            "
          >
            FOR RENT
          </a>
        </div>
      </div>
    </div>
  );
}
