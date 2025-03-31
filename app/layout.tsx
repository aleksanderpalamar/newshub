import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { NewsSkeleton } from "@/components/news-skeleton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NewsHub",
  description: "NewsHub agregador de noticias brasileiras",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#000000" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <Suspense fallback={<NewsSkeleton />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
