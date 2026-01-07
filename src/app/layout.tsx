import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Companion Platform - Virtual AI Friends",
  description: "Connect with AI companions who understand you. Chat, share moments, and build meaningful relationships with virtual friends powered by GPT-4o-mini.",
  keywords: ["AI Companion", "Virtual Friends", "AI Chat", "GPT-4o-mini", "Next.js", "TypeScript", "Tailwind CSS", "Neon"],
  authors: [{ name: "AI Companion Team" }],
  openGraph: {
    title: "AI Companion Platform",
    description: "Connect with AI companions who understand you",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Companion Platform",
    description: "Chat with virtual AI friends who understand you",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
