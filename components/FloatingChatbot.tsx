"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FloatingChatbot() {
  const pathname = usePathname();

  // 봇 페이지 자체에선 표시 안 함
  if (pathname === "/bot") return null;

  return (
    <div className="fixed bottom-6 right-5 md:right-8 z-50 pointer-events-none select-none">
      <Link
        href="/bot"
        className="flex flex-col items-center pointer-events-auto group"
        aria-label="테오 봇 — 취향 작가 추천받기"
      >
        {/* 말풍선 */}
        <div className="relative mb-4">
          <div
            className="bg-card border border-line rounded-2xl px-4 py-2.5 whitespace-nowrap group-hover:border-navy-400 transition-colors duration-200"
            style={{ boxShadow: "0 4px 20px rgba(13,59,102,.14)" }}
          >
            <p className="text-[12.5px] font-semibold text-navy-800 leading-snug">
              당신의 취향을 찾아드려요
            </p>
          </div>

          {/* 말풍선 꼬리 — 외곽(border색) */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              bottom: -10,
              width: 0,
              height: 0,
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderTop: "10px solid #E8E2CD",
            }}
          />
          {/* 말풍선 꼬리 — 내부(배경색) */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              bottom: -8,
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "9px solid #ffffff",
            }}
          />
        </div>

        {/* 캐릭터 이미지 */}
        <div
          className="w-20 md:w-[88px] transition-transform duration-200 group-hover:scale-105"
          style={{
            animation: "chatbotFloat 3s ease-in-out infinite",
            willChange: "transform",
          }}
        >
          <img
            src="/chatbot-character.png"
            alt="테오 봇 캐릭터"
            className="w-full h-auto"
            style={{
              filter: "drop-shadow(0 8px 18px rgba(13,59,102,.22))",
            }}
          />
        </div>
      </Link>
    </div>
  );
}
