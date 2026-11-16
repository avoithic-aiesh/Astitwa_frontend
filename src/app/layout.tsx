import { AuthProvider } from "@/Components/auth/AuthContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../Components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventra | Event & Social Media Management",
  description:
    "A centralized platform to manage events, social media, and organizational collaboration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior = "smooth"
    >
      <body className="min-h-full flex flex-col"><AuthProvider><Navbar />{children}</AuthProvider></body>
    </html>
  );
}