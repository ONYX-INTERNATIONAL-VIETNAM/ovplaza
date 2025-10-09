"use client";

import type { Floor } from "@/types/plaza";

export const FLOORS: Floor[] = [
  {
    id: "f4",
    title: "4th Floor",
    label: "Connection",
    bubble: {
      m: { left: "12%", top: "31%" },
      t: { left: "21%", top: "34%" },
      d: { left: "30%", top: "28%" },
      align: { m: "left", t: "left", d: "left" },
    },
    bar: {
      m: { left: "39%", top: "30%", height: "10%" },
      t: { left: "43%", top: "32%", height: "11%" },
      d: { left: "45%", top: "29%", height: "13%" },
    },
    ovs: [
      {
        id: "ovvideo",
        name: "OVVIDEO",
        tagline: "Nền tảng video & livestream",
        description:
          "Phát trực tiếp, vé livestream, chat realtime, quản lý kênh & VOD.",
        href: "#",
      },
      {
        id: "ovdating",
        name: "OVDATING",
        tagline: "Kết nối & hẹn hò an toàn",
        description:
          "Ghép đôi thông minh, chat bảo mật, sự kiện cộng đồng, xác thực linh hoạt.",
        href: "#",
      },
    ],
  },
  {
    id: "f3",
    title: "3rd Floor",
    label: "Learning & Innovation",
    bubble: {
      m: { left: "67%", top: "47%" },
      t: { left: "63%", top: "44%" },
      d: { left: "60%", top: "42%" },
      align: { m: "left", t: "right", d: "right" },
    },
    bar: {
      m: { left: "66%", top: "48%", height: "8%" },
      t: { left: "60%", top: "44%", height: "7%" },
      d: { left: "56%", top: "45%", height: "10%" },
    },
    ovs: [
      {
        id: "ovtutor",
        name: "OVTUTOR",
        tagline: "Học trực tuyến & livestream lớp học",
        description:
          "Tạo khoá, lịch live, bài tập, quiz, theo dõi tiến độ học viên.",
        href: "#",
      },
    ],
  },
  {
    id: "f2",
    title: "2nd Floor",
    label: "Shopping & Services",
    bubble: {
      m: { left: "1%", top: "52%" },
      t: { left: "10%", top: "57%" },
      d: { left: "25%", top: "54%" },
      align: { m: "left", t: "left", d: "left" },
    },
    bar: {
      m: { left: "33%", top: "52%", height: "9%" },
      t: { left: "39%", top: "56%", height: "7%" },
      d: { left: "45%", top: "56%", height: "9%" },
    },
    ovs: [
      {
        id: "ovbay",
        name: "OVBAY",
        tagline: "E-commerce & Đấu giá",
        description:
          "Mua bán, đặt giá, cửa hàng người bán, quản lý đơn – thanh toán.",
        href: "#",
      },
    ],
  },
  {
    id: "f1",
    title: "1st Floor",
    label: "Community & Café",
    bubble: {
      m: { left: "67%", top: "62%" },
      t: { left: "63%", top: "57%" },
      d: { left: "60%", top: "63%" },
      align: { m: "left", t: "right", d: "right" },
    },
    bar: {
      m: { left: "66%", top: "62%", height: "11%" },
      t: { left: "60%", top: "57%", height: "6%" },
      d: { left: "56%", top: "66%", height: "11%" },
    },
    ovs: [
      {
        id: "ovcafe",
        name: "OVCAFE",
        tagline: "Video chat cộng đồng",
        description:
          "Phòng video, mời bạn bè, chia sẻ whiteboard / file, ghi hình phiên.",
        href: "#",
      },
    ],
  },
];
