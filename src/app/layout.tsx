import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import AntdConfigProvider from "@/provider/AntdConfigProvider";
import MainLayout from "@/layouts/MainLayout";
import Favicon from "./favicon.ico"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Population Growth Dashboard",
  description: "Interactive world population growth visualization",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <AntdConfigProvider>
            <MainLayout>{children}</MainLayout>
          </AntdConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
