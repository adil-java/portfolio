import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { DM_Sans } from "next/font/google";

import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const themeInitScript = `(() => {
  let theme = "dark";
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") theme = savedTheme;
  } catch {}
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
})();`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Adil Javed | Software Engineer",
  description:
    "Adil Javed is a software engineering student and full stack developer building web, mobile, and applied AI projects.",

  // ── Open Graph (For WhatsApp, LinkedIn, Facebook) ──
  openGraph: {
    title: "Adil Javed | Software Engineer",
    description:
      "Full stack software engineering, web and mobile applications, and applied AI projects.",
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
    title: "Adil Javed | Software Engineer",
    description:
      "Full stack software engineering, web and mobile applications, and applied AI projects.",
    images: ["https://github.com/adil-java.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${body.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
