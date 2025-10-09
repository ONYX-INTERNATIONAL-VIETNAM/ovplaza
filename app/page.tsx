"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, ExternalLink } from "lucide-react";

import Background from "@/components/ovplaza/Background";
import BottomDock from "@/components/ovplaza/BottomDock";
import GlowPill from "@/components/ovplaza/GlowPill";
import Modal from "@/components/ovplaza/Modal";

import useBreakpoint from "@/hooks/useBreakpoint";
import { TOKENS } from "@/tokens/tokens";
import { FLOORS } from "@/data/plaza";
import type { Floor, OV } from "@/types/plaza";

export default function Page() {
  const [openFloor, setOpenFloor] = useState<Floor | null>(null);
  const [selectedOV, setSelectedOV] = useState<OV | null>(null);
  const bp = useBreakpoint();

  useEffect(() => {
    if (!openFloor) setSelectedOV(null);
  }, [openFloor]);

  return (
    <main
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ background: TOKENS.bg, color: "white" }}
    >
      <Background />

      {/* Header */}
      <div className="absolute left-1/2 top-3 sm:top-6 -translate-x-1/2 select-none text-center px-4">
        <h1
          className="
      font-extrabold tracking-wide leading-tight
      text-[clamp(20px,6vw,44px)] lg:text-5xl
    "
        >
          WELCOME TO{" "}
          <span className="text-violet-300 drop-shadow-[0_0_6px_rgba(169,134,255,0.5)]">
            OVPLAZA
          </span>
        </h1>
      </div>


      {/* QR khung bo tròn – ẩn trên mobile */}
      <div className="absolute left-20 top-0 hidden md:block">
        <div
          className="
          relative
          w-[98px] h-[117px]   
          rounded-b-full overflow-hidden
          bg-white shadow-lg
          flex flex-col items-center pt-3 pb-9
    "
        >
          <Image
            src="/images/logo.png"
            alt="ONYX"
            width={120}
            height={32}
            className="object-contain"
            priority
          />

          <div className="relative w-24 h-24">
            <Image
              src="/images/qr.png"
              alt="QR code"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Pads & links đáy */}
      <BottomDock />

      {/* Building PNG */}
      <div className="absolute inset-x-0 bottom-[120px] top-20 sm:top-24 grid place-items-center">
        <img
          src="/images/building.png"
          alt="Building"
          className="h-[500px] md:h-[550px] drop-shadow-[0_30px_60px_rgba(0,0,0,.45)]"
        />
      </div>

      {/* Floor bars + labels */}
      {FLOORS.map((f) => {
        const b = f.bar[bp];
        const l = f.bubble[bp];
        const align = f.bubble.align[bp];
        const compact = bp !== "d";

        return (
          <div key={f.id}>
            {/* thanh hồng ngắn – cạnh phải toà nhà */}
            <div
              className="absolute -translate-x-1/2 w-[4px] sm:w-[5px] rounded-full bg-[#F668B8]"
              style={{
                left: b.left,
                top: b.top,
                height: b.height,
              }}
            />
            {/* label */}
            <div
              className="absolute z-20 pointer-events-auto px-1"
              style={{ left: l.left, top: l.top }}
            >
              {/* Tiêu đề nhỏ hẳn trên mobile */}
              <div
                className={[
                  "mb-1 font-medium text-white/70 leading-none tracking-wide",
                  // mobile rất nhỏ, tablet/desktop tăng dần
                  "text-[10px] sm:text-[12px] lg:text-[13px]",
                  align === "right" ? "text-right pr-2" : "text-left pl-2",
                ].join(" ")}
              >
                {f.title}
              </div>

              {/* Pill nổi bật hơn rõ ràng */}
              <div className="inline-block -m-1 p-1 sm:m-0 sm:p-0">
                <GlowPill align={align} onClick={() => setOpenFloor(f)} compact={compact}>
                  {f.label}
                </GlowPill>
              </div>
            </div>

          </div>
        );
      })}

      {/* Modal chọn OV / chi tiết OV */}
      <Modal
        open={!!openFloor}
        onClose={() => setOpenFloor(null)}
        title={openFloor ? openFloor.title : ""}
      >
        {!openFloor ? null : selectedOV ? (
          <div className="space-y-5">
            <button
              onClick={() => setSelectedOV(null)}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-white/10"
              style={{ borderColor: TOKENS.glassBorder, background: TOKENS.glass }}
            >
              <ChevronRight className="-scale-x-100 h-4 w-4" />
              Quay lại danh sách
            </button>
            <div
              className="rounded-2xl border p-4 sm:p-5"
              style={{ background: TOKENS.glass, borderColor: TOKENS.glassBorder }}
            >
              <div className="mb-1 text-xl sm:text-2xl font-semibold">
                {selectedOV.name}
              </div>
              <div className="mb-3 text-white/70">{selectedOV.tagline}</div>
              <p className="text-white/80 leading-relaxed">{selectedOV.description}</p>
              <div className="mt-5">
                <a
                  href={selectedOV.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[#0f0c23] hover:bg-white/90"
                >
                  Xem thêm <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {openFloor.ovs.map((ov) => (
              <button
                key={ov.id}
                onClick={() => setSelectedOV(ov)}
                className="w-full rounded-2xl bg-white text-[#0f0c23] px-5 py-3 sm:px-6 sm:py-4 text-base sm:text-lg font-semibold hover:bg-white/90"
              >
                {ov.name}
              </button>
            ))}
          </div>
        )}
      </Modal>
    </main>
  );
}
