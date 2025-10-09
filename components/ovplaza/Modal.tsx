"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import useBreakpoint from "@/hooks/useBreakpoint";
import useNoBodyScroll from "@/hooks/useNoBodyScroll";
import { TOKENS } from "@/tokens/tokens";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useNoBodyScroll(open);
  useBreakpoint(); // nếu bạn cần variant theo BP thì dùng biến trả về
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-4">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ov-modal-title"
        className="relative w-full max-w-[640px] overflow-hidden rounded-[24px] border text-white"
        style={{
          background: "rgba(16,13,36,.96)",
          borderColor: TOKENS.glassBorder,
          boxShadow:
            "0 30px 80px rgba(0,0,0,.6), 0 0 0 3px rgba(255,255,255,.06) inset",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header: 3 cột cân xứng để title thực sự ở giữa */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-5 pt-4 pb-3">
          <div className="h-9" aria-hidden /> {/* spacer trái bằng chiều cao nút */}
          <div
            id="ov-modal-title"
            className="text-center text-lg sm:text-xl font-semibold tracking-wide text-white/90"
          >
            {title}
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              aria-label="Đóng"
              className="h-9 w-9 rounded-full border p-2 hover:bg-white/10"
              style={{
                borderColor: TOKENS.glassBorder,
                background: "rgba(255,255,255,.05)",
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* divider mảnh */}
        <div
          className="mx-4 mb-4 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)" }}
        />

        {/* body có khoảng cách, tự cuộn nếu dài */}
        <div className="max-h-[min(90vh,100svh-160px)] overflow-auto px-5 pb-5 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
