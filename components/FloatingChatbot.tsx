"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NOTION_URL } from "@/lib/site";
import { trackNotionClick } from "@/lib/analytics";

export default function FloatingChatbot() {
  const pathname = usePathname();
  // 모바일: 스크롤을 시작하면 말풍선을 접어 본문을 가리지 않는다 (맨 위로 오면 다시 보임)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 봇 페이지 자체에선 표시 안 함
  if (pathname === "/bot") return null;

  return (
    <div className="fixed bottom-4 right-3 md:bottom-6 md:right-8 z-50 pointer-events-none select-none">
      <div className="flex flex-col items-end md:items-center">
        {/* 말풍선 → 노션 참여 모집 페이지 */}
        <a
          href={NOTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackNotionClick("chatbot_bubble")}
          className={`relative mb-4 pointer-events-auto group transition-opacity duration-200 ${scrolled ? "max-md:opacity-0 max-md:pointer-events-none" : ""}`}
          aria-label="서비스 소개서 요청하기"
        >
          <div
            className="bg-card border border-line rounded-2xl px-4 py-2.5 whitespace-nowrap group-hover:border-navy-400 transition-colors duration-200"
            style={{ boxShadow: "0 4px 20px rgba(36,24,21,.14)" }}
          >
            <p className="text-[14.5px] font-semibold text-navy-800 leading-snug">
              서비스 소개서 요청하기 →
            </p>
          </div>

          {/* 말풍선 꼬리 — 외곽(border색) */}
          <div
            className="absolute right-6 md:right-auto md:left-1/2 md:-translate-x-1/2"
            style={{
              bottom: -10,
              width: 0,
              height: 0,
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderTop: "10px solid #C2C0BA",
            }}
          />
          {/* 말풍선 꼬리 — 내부(배경색) */}
          <div
            className="absolute right-6 md:right-auto md:left-1/2 md:-translate-x-1/2"
            style={{
              bottom: -8,
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "9px solid #F3F2EE",
            }}
          />
        </a>

        {/* 캐릭터 이미지 → 테오 봇 */}
        <Link
          href="/bot"
          aria-label="테오 봇"
          className="block w-14 md:w-[88px] pointer-events-auto transition-transform duration-200 hover:scale-105"
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
              filter: "drop-shadow(0 8px 18px rgba(36,24,21,.22))",
            }}
          />
        </Link>
      </div>
    </div>
  );
}
