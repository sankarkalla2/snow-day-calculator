import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { PostHogProvider } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snow Day Calculator",
  description: "Know whether you should go to school or not",
  keywords: [
    "snow day",
    "school closure",
    "weather prediction",
    "calculator",
    "student tool",
  ],
  icons: {
    icon: "/logo.png",
  },
  authors: [{ name: "GowriSankar Kalla" }],
  openGraph: {
    title: "Snow Day Calculator",
    description: "Calculate the likelihood of a snow day for your school",
    type: "website",
    url: "https://your-domain.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Snow Day Calculator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snow Day Calculator",
    description: "Calculate the likelihood of a snow day for your school",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
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
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
