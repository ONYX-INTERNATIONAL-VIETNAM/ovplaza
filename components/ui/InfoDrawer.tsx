"use client";

import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { ModuleItem } from "@/data/modules";

type FeaturePack = { tagline: string; bullets: string[] };

const FEATURES: Record<string, FeaturePack> = {
  ovvideo: {
    tagline: "Nền tảng video & livestream tương tác, vé và quảng cáo.",
    bullets: [
      "Phát trực tiếp, tương tác real-time, bán vé/sự kiện.",
      "Quản lý thư viện video và lịch phát sóng.",
      "Tích hợp quảng cáo & theo dõi hiệu suất.",
      "Kết nối nhanh với hệ sinh thái OVPlaza.",
    ],
  },
  ovlab: {
    tagline:
      "Giám sát thử nghiệm vật liệu theo thời gian thực — website riêng tư cho nội bộ.",
    bullets: [
      "Cấp tài khoản, phân quyền từng phòng/ca thử.",
      "Tạo phòng theo dõi và xem dữ liệu test real-time.",
      "Chỉ người được mời mới có thể truy cập.",
      "Quản trị viên quản lý tài khoản và quyền truy cập.",
    ],
  },
  /* ✅ Sửa đúng key: ovcafe (không phải ovcoffe) */
  ovcafe: {
    tagline:
      "Mạng live video chat: tạo phòng, trò chuyện, chia sẻ đa phương tiện.",
    bullets: [
      "Đăng ký tài khoản và xác thực email.",
      "Tạo phòng chat video trực tiếp; mời bạn bè; kick/ban.",
      "Upload & chia sẻ video/ảnh, nhắn tin & kết bạn.",
      "Quản trị tắt phòng/khóa IP/xóa tài khoản vi phạm.",
    ],
  },
  ovtutor: {
    tagline:
      "Nền tảng học trực tuyến như Udemy nhưng hỗ trợ lớp học livestream.",
    bullets: [
      "Tài khoản Học viên và Giảng viên (duyệt hồ sơ).",
      "Tạo khóa học, upload video; đặt điều kiện tiên quyết.",
      "Lịch buổi dạy trực tiếp qua livestream.",
      "Danh mục & kiểm duyệt nội dung.",
    ],
  },
  ovpay: {
    tagline:
      "Thanh toán an toàn trong hệ sinh thái OVPlaza (ví, thẻ, chuyển khoản).",
    bullets: [
      "Thêm & quản lý thẻ/tài khoản ngân hàng.",
      "Thanh toán dịch vụ giữa các website OV.",
      "Báo cáo giao dịch, hóa đơn, hoàn tiền.",
      "API thanh toán nội bộ cho các module khác.",
    ],
  },
  /* ✅ Bổ sung ovbay */
  ovbay: {
    tagline:
      "Sàn thương mại & đấu giá kiểu eBay: cửa hàng, phiên đấu giá, thanh toán OVPay.",
    bullets: [
      "Danh mục sản phẩm, bộ lọc, tìm kiếm nâng cao.",
      "Cửa hàng người bán, đánh giá uy tín, chat hỏi đáp.",
      "Đấu giá theo thời gian thực, đặt bid tự động, watchlist.",
      "Thanh toán qua OVPay, quản lý đơn hàng & khiếu nại.",
    ],
  },
};

export default function InfoDrawer({
  module,
  onClose,
}: {
  module: ModuleItem | null;
  onClose: () => void;
}) {
  const open = !!module;

  const content = useMemo<FeaturePack | null>(() => {
    if (!module) return null;
    return FEATURES[module.key] ?? {
      tagline: module.desc ?? "",
      bullets: [],
    };
  }, [module]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && module && content && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 z-[80] h-full w-[min(560px,92vw)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative flex h-full flex-col rounded-l-3xl border-l border-white/10 bg-[#0b0a20]/95 shadow-2xl">
              {/* Close */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="group absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full bg-white text-[#0b0a20] shadow-[0_10px_28px_rgba(0,0,0,.35)] ring-2 ring-white/80 hover:ring-4"
                aria-label="Đóng (Esc)"
                title="Đóng (Esc)"
              >
                <X size={18} className="transition group-hover:rotate-90" />
              </motion.button>

              {/* Header */}
              <div className="relative p-6 pb-3">
                <div
                  className="relative inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white"
                  style={{ boxShadow: `0 0 24px ${module.color}33` }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: module.color }}
                  />
                  OVPLAZA • MODULE
                </div>

                <div className="mt-4">
                  <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow">
                    {module.label}
                  </h2>
                  <p className="mt-2 max-w-prose text-sm text-white/75">
                    {content.tagline}
                  </p>
                </div>

                <div
                  className="pointer-events-none absolute right-0 top-0 h-24 w-40 bg-white/70"
                  style={{
                    clipPath:
                      "polygon(10% 0%, 100% 0%, 100% 100%, 55% 100%)",
                    zIndex: 5,
                  }}
                />
              </div>

              {/* Body */}
              <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 flex-1 space-y-6 overflow-y-auto px-6 pb-6">
                {/* ✅ Chỉ render nếu có bullets */}
                {content.bullets.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
                      Tính năng nổi bật
                    </div>
                    <ul className="space-y-2">
                      {content.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[13px] text-white/85"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            className="mt-0.5 flex-none opacity-80"
                            style={{ color: module.color }}
                          >
                            <path
                              fill="currentColor"
                              d="M12 2a10 10 0 1 1-7.07 2.93A10 10 0 0 1 12 2m-1.1 13.77l6-6-1.41-1.41-4.59 4.59-2.12-2.12-1.41 1.41 3.53 3.53Z"
                            />
                          </svg>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={module.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-500/90 px-4 py-2 text-xs font-semibold tracking-wider text-white shadow hover:bg-indigo-500"
                  >
                    <ExternalLink size={16} /> Xem thêm
                  </a>
                  <button
                    onClick={onClose}
                    className="rounded-xl border border-white/20 px-4 py-2 text-xs text-white/90 hover:bg-white/10"
                  >
                    Đóng
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 p-4 text-center text-[11px] tracking-wider text-white/45">
                Một phần của hệ sinh thái <span className="text-white/70">OVPLAZA</span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
