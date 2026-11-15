import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import FloatingChatbot from "@/components/FloatingChatbot";
import ScrollObserver from "@/components/ScrollObserver";
import Footer from "@/components/Footer";
import { LangProvider } from "@/contexts/LangContext";
import { GA_ID } from "@/lib/site";

const DESC = "팬이 작가에게 창작 재료를 선물하고, 작가는 담벼락에 창작 과정을 나누는 관계형 현물 선물 플랫폼";

export const metadata: Metadata = {
  metadataBase: new URL("https://theo-demo.vercel.app"),
  title: "Theo 나만의 고흐를 만난다",
  description: DESC,
  // 링크를 공유했을 때 나오는 카드 — 이미지는 app/opengraph-image.png
  openGraph: {
    title: "Theo 꽃다발 대신 물감을 선물하세요",
    description: DESC,
    siteName: "Theo",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Theo 꽃다발 대신 물감을 선물하세요",
    description: DESC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Noto+Sans+KR:wght@400;500;700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <LangProvider>
          {children}
          <Footer />
          <FloatingChatbot />
          <ScrollObserver />
        </LangProvider>

        {/* Google Analytics — lib/site.ts 의 GA_ID 가 채워져 있을 때만 로드 */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
