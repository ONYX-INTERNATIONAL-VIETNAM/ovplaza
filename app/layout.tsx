import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OVPLAZA",
  description: "OVPlaza là hệ sinh thái kỹ thuật số đa nền tảng, hoạt động như một “trung tâm trực tuyến” kết nối thương mại, học tập, giải trí và nghiên cứu trong một không gian thống nhất.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="h-full">
      <body className="h-full bg-[#0d0f14] text-white antialiased">{children}</body>
    </html>
  );
}
