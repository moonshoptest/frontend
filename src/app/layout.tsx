import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "مون‌شاپ | فروشگاه پوشاک و اکسسوری",
    template: "%s | مون‌شاپ",
  },
  description: "فروشگاه آنلاین مون‌شاپ؛ انتخابی برای پوشاک و اکسسوری.",
  applicationName: "Moon Shop",
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
