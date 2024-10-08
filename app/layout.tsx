import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";

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
  title: "Xtracker - AI-Powered Personal Finance Assistant",
  description:
    "Take control of your finances with Xtracker. AI-powered insights to help you manage your budget, track expenses, and set financial goals.",
  openGraph: {
    title: "Xtracker - AI-Powered Personal Finance Assistant",
    description: "Take control of your finances with Xtracker.",
    url: "https://your-website.com",
    siteName: "Xtracker",
    images: [
      {
        url: "https://your-website.com/image.jpg",
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
    title: "Xtracker - AI-Powered Personal Finance Assistant",
    description: "Take control of your finances with Xtracker.",
    images: ["https://your-website.com/image.jpg"],
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
      </body>
    </html>
  );
}
