import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { PostHogProvider } from "@/components/providers";
import { Navbar } from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SnowDayCalculator",
    template: "%s - SnowDayCalculator",
  },
  description: "Know whether you should go to school or not",
  keywords: [
    "snow day",
    "school closure",
    "weather prediction",
    "calculator",
    "student tool",
  ],
  authors: [{ name: "GowriSankar Kalla" }],
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <PostHogProvider>
          <Toaster />
          <Navbar />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
