import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OVPLAZA — 3D Portal",
  description: "Gateway 3D premium (THE LÄND vibe), nhẹ & mượt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="h-full">
      <body className="h-full bg-[#0d0f14] text-white antialiased">{children}</body>
    </html>
  );
}
