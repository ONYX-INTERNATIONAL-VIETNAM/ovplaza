export type ModuleItem = {
  key: string;
  label: string;
  lat: number;
  lng: number;
  color: string;
  url: string;    // website riêng của từng OV (link ngoài)
  image: string;  // ảnh cover trong drawer (đặt trong /public/banners)
  desc: string;   // mô tả ngắn
};

export const MODULES: ModuleItem[] = [
  {
    key: "ovvideo",
    label: "OVVIDEO",
    lat: -50, lng: -170, color: "#ffd34d",
    url: "https://ovvideo.yourdomain.com",
    image: "/banners/ovvideo.jpg",
    desc: "Nền tảng video & livestream tích hợp tương tác, vé và quảng cáo."
  },
  {
    key: "ovlab",
    label: "OVLAB",
    lat: 28, lng: 10, color: "#9ae6b4",
    url: "https://ovlab.yourdomain.com",
    image: "/banners/ovlab.jpg",
    desc: "Không gian R&D: thử nghiệm ý tưởng, prototyping và showcase."
  },
  {
    key: "ovtutor",
    label: "OVTUTOR",
    lat: -25, lng: 20, color: "#60a5fa",
    url: "https://ovtutor.yourdomain.com",
    image: "/banners/ovtutor.jpg",
    desc: "Gia sư 1-1/nhóm, bài tập, quiz & theo dõi tiến độ học tập."
  },
  {
    key: "ovpay",
    label: "OVBAY",
    lat: 20, lng: 60, color: "#a78bfa",
    url: "https://ovpay.yourdomain.com",
    image: "/banners/ovpay.jpg",
    desc: "Thanh toán đa kênh: QR, thẻ, subscription và payout."
  },
  {
    key: "ovcoffe",
    label: "OVCOFFE",
    lat: 15, lng: -120, color: "#f472b6",
    url: "https://ovcoffe.yourdomain.com",
    image: "/banners/ovcoffe.jpg",
    desc: "Cộng đồng cà phê: sự kiện, ưu đãi, đặt chỗ và networking."
  },
];
