"use client";

import { Globe, Gavel } from "lucide-react";

export default function BottomDock() {
  return (
    <div
      /* Bọc ngoài, dính đáy, cao linh hoạt theo breakpoint */
      className="
        pointer-events-none
        fixed inset-x-0 bottom-0 z-50
        h-[110px] sm:h-[120px] md:h-[140px] lg:h-[160px]
      "
    >
      {/* NỀN SVG: inline để chắc chắn hiển thị */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="
            M0,200 L0,70 Q0,0 0,0
            L600,0
            Q720,30 840,0
            L1360,0
            Q1440,0 1440,0
            L1440,200 Z
          "
          fill="#ffffff"
        />
      </svg>

      {/* LINKS */}
      <div
        className="
          pointer-events-auto relative
          pb-[max(env(safe-area-inset-bottom),12px)]
        "
      >
        <div
          className="
            absolute inset-x-0
            bottom-[24px] sm:bottom-[32px] md:bottom-[40px] lg:bottom-[48px]
            mx-auto
            flex flex-wrap items-center justify-center gap-6
            px-4
            md:justify-between md:px-[10%]
            text-[#0b1b3a]
          "
        >
          {/* LEFT */}
          <DockLink
            icon={<Globe className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
            label="OUR SERVICES"
            href="#"
            className="text-center md:text-left"
          />
          {/* RIGHT */}
          <DockLink
            icon={<Gavel className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
            label="FOR RENT"
            href="#"
            className="text-center md:text-right"
          />
        </div>
      </div>
    </div>
  );
}

function DockLink({
  icon,
  label,
  href,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 grid place-items-center md:mb-2">{icon}</div>
      <a
        href={href}
        className="
          text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]
          underline underline-offset-4
          decoration-[#0b1b3a]/50 hover:decoration-[#0b1b3a]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b1b3a]/40
          px-1 py-0.5 rounded
        "
      >
        {label}
      </a>
    </div>
  );
}
