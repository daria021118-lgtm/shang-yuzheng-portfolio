import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "尚雨正｜运营作品集",
  description: "尚雨正的商品运营、电商运营与产品运营求职作品集。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
