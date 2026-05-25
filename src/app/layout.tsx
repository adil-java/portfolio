import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";

import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adil Javed | Portfolio",
  description: "Hi, I'm Adil Javed, a Software Engineering student and Full-Stack Developer specializing in React, TypeScript, and AI integrations.",
  
  // ── Open Graph (For WhatsApp, LinkedIn, Facebook) ──
  openGraph: {
    title: "Adil Javed | Portfolio",
    description: "Hi, I'm Adil Javed, a Software Engineering student and Full-Stack Developer specializing in React, TypeScript, and AI integrations.",
    url: "https://adiljava.netlify.app/", // Replace with your actual live domain link
    siteName: "Adil Javed App",
    type: "website",
    images: [
      {
        url: "https://github.com/adil-java.png", // Path to a preview thumbnail image (optional)
        width: 1200,
        height: 630,
        alt: "Adil Javed Portfolio Preview",
      },
    ],
  },

  // ── Twitter Cards (For Twitter/X platform) ──
  twitter: {
    card: "summary_large_image",
    title: "Adil Javed | Portfolio",
    description: "Hi, I'm Adil Javed, a Software Engineering student and Full-Stack Developer specializing in React, TypeScript, and AI integrations.",
    images: ["https://github.com/adil-java.png"],
  },
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
