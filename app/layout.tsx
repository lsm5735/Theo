import type { Metadata } from "next";
import "./globals.css";
import FloatingChatbot from "@/components/FloatingChatbot";
import ScrollObserver from "@/components/ScrollObserver";
import { LangProvider } from "@/contexts/LangContext";

export const metadata: Metadata = {
  title: "Theo — 모두의 고흐가 되기 전, 나만의 고흐를 만난다",
  description: "팬이 작가에게 창작 재료를 선물하고, 작가는 창작 과정을 편지로 답하는 관계형 현물 후원 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})()` }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <LangProvider>
          {children}
          <FloatingChatbot />
          <ScrollObserver />
        </LangProvider>
      </body>
    </html>
  );
}
