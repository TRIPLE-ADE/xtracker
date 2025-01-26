import "./globals.css";
import type { Metadata } from "next";

import localFont from "next/font/local";

import { Toaster } from "@/shared/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Xtracker - Track your expenses like a pro",
  keywords: ["expense tracking", "budget management", "financial goals", "AI-powered insights"],
  description:
    "Take control of your finances with Xtracker. AI-powered insights to help you manage your budget, track expenses, and set financial goals.",
  openGraph: {
    title: "Xtracker - Track your expenses like a pro",
    description: "Take control of your finances with Xtracker.",
    url: "https://your-website.com",
    siteName: "Xtracker",
    images: [
      {
        url: "/opengraph-image.png",
        width: 800,
        height: 600,
        alt: "Xtracker Landing Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xtracker - Track your expenses like a pro",
    description: "Take control of your finances with Xtracker.",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
