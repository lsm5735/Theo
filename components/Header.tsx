"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useLang, useT } from "@/contexts/LangContext";

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="4"/>
      <line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="2" y1="12" x2="4" y2="12"/>
      <line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function LangIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

type Lang = "ko" | "en";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { lang, setLang } = useLang();
  const t = useT();
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  // 외부 클릭 시 설정 패널 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    }
    if (settingsOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsOpen]);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }

  function toggleLang() {
    setLang(lang === "ko" ? "en" : "ko");
  }

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-[12px] border-b border-line">
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 flex items-center justify-between py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <img src="/logo-face.png" alt="THEO" className="w-8 h-8 shrink-0" />
          <b className="font-black tracking-[0.3em] text-base text-navy-900 uppercase">THEO</b>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {/* About 드롭다운 */}
          <div className="relative group">
            <button className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
              About
            </button>
            {/* 드롭다운 패널 */}
            <div className="absolute left-0 top-[calc(100%+12px)] w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50"
              style={{ transform: "translateY(-4px)" }}
            >
              <div
                className="bg-white rounded-2xl py-2 overflow-hidden"
                style={{ boxShadow: "0 8px 30px rgba(13,59,102,.14), 0 0 0 1px rgba(13,59,102,.06)" }}
              >
                <a
                  href="https://www.okrr.art/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-[13px] text-navy-700 hover:bg-navy-50 hover:text-navy-900 transition-colors"
                >
                  회사 소개
                </a>
                <Link
                  href="/"
                  className="block px-4 py-3 text-[13px] text-navy-700 hover:bg-navy-50 hover:text-navy-900 transition-colors"
                >
                  서비스 소개
                </Link>
                <Link
                  href="/partnership"
                  className="block px-4 py-3 text-[13px] text-navy-700 hover:bg-navy-50 hover:text-navy-900 transition-colors"
                >
                  제휴 문의
                </Link>
              </div>
            </div>
          </div>
          <Link href="/atelier" className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
            Atelier
          </Link>
          <Link href="/community" className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
            Community
          </Link>
          <Link href="/how" className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
            {t("nav_how")}
          </Link>
          <Link
            href="/my"
            className="font-black text-[12.5px] tracking-[0.1em] uppercase transition-colors hover:opacity-80"
            style={{ color: "var(--sv-deep)" }}
          >
            {t("nav_my")}
          </Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2">

          {/* Desktop: 설정 버튼 + 드롭다운 */}
          <div className="hidden md:block relative" ref={settingsRef}>
            <button
              className="flex items-center justify-center w-9 h-9 rounded-lg border transition-colors"
              style={{ borderColor: "var(--line)", color: "var(--muted)", background: "var(--paper)" }}
              onClick={() => setSettingsOpen((prev) => !prev)}
              aria-label="설정"
              aria-expanded={settingsOpen}
            >
              <GearIcon />
            </button>

            {/* 설정 드롭다운 패널 */}
            {settingsOpen && (
              <div
                className="absolute right-0 top-[calc(100%+8px)] w-[260px] rounded-xl overflow-hidden shadow-xl"
                style={{ background: "var(--navy-900)", border: "1px solid rgba(250,240,202,.12)" }}
              >
                {/* 언어 */}
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(250,240,202,.1)" }}>
                  <span className="text-[13px] font-semibold" style={{ color: "rgba(250,240,202,.75)" }}>
                    {t("settings_lang_label")}
                  </span>
                  <button
                    onClick={toggleLang}
                    className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-2 rounded-lg transition-colors"
                    style={{ background: "rgba(250,240,202,.12)", color: "var(--chiffon)" }}
                  >
                    <LangIcon />
                    <span>
                      {lang === "ko"
                        ? <>{t("settings_lang_to_en").split("→")[0]}<span style={{ color: "var(--sv)" }}>→ EN</span></>
                        : <>{t("settings_lang_to_ko").split("→")[0]}<span style={{ color: "var(--sv)" }}>→ KO</span></>
                      }
                    </span>
                  </button>
                </div>

                {/* 화면 모드 */}
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-[13px] font-semibold" style={{ color: "rgba(250,240,202,.75)" }}>
                    {t("settings_theme_label")}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-2 rounded-lg transition-colors"
                    style={{ background: "rgba(250,240,202,.12)", color: "var(--chiffon)" }}
                  >
                    {isDark ? <><SunIcon /> {t("theme_light")}</> : <><MoonIcon /> {t("theme_dark")}</>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile: MY 버튼 */}
          <Link
            href="/my"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:opacity-80"
            style={{ background: "var(--sv)", color: "var(--ink)" }}
            aria-label="마이테오"
          >
            <span className="text-[11px] font-black tracking-wider">MY</span>
          </Link>

          {/* Mobile: 탭 메뉴 토글 버튼 */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-navy-200 bg-paper transition-colors hover:bg-navy-100"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="메뉴"
            aria-expanded={menuOpen}
          >
            <span className="text-[11px] font-black tracking-wider text-navy-800">Tab</span>
          </button>

          <a
            href="/#start"
            className="inline-flex items-center bg-navy-800 text-chiffon font-bold rounded-lg hover:bg-navy-700 transition-colors"
            style={{ fontSize: "13px", padding: "9px 17px" }}
          >
            {t("btn_start")}
          </a>
        </div>

      </div>

      {/* Mobile 탭 드롭다운 */}
      {menuOpen && (
        <ul className="md:hidden border-t border-line bg-paper/95 backdrop-blur-[12px] px-5 py-3 flex flex-col gap-0">
          <li>
            <p className="pt-3 pb-1 text-[10px] tracking-[0.18em] font-bold text-navy-400 uppercase">About</p>
          </li>
          <li>
            <a
              href="https://www.okrr.art/"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2.5 pl-3 text-[13px] text-muted border-b border-line/60"
              onClick={() => setMenuOpen(false)}
            >
              회사 소개
            </a>
          </li>
          <li>
            <Link
              href="/"
              className="block py-2.5 pl-3 text-[13px] text-muted border-b border-line/60"
              onClick={() => setMenuOpen(false)}
            >
              서비스 소개
            </Link>
          </li>
          <li>
            <Link
              href="/partnership"
              className="block py-2.5 pl-3 text-[13px] text-muted border-b border-line/60"
              onClick={() => setMenuOpen(false)}
            >
              제휴 문의
            </Link>
          </li>
          <li>
            <Link
              href="/atelier"
              className="block py-3 text-[13px] tracking-[0.1em] uppercase text-muted border-b border-line/60"
              onClick={() => setMenuOpen(false)}
            >
              Atelier
            </Link>
          </li>
          <li>
            <Link
              href="/community"
              className="block py-3 text-[13px] tracking-[0.1em] uppercase text-muted border-b border-line/60"
              onClick={() => setMenuOpen(false)}
            >
              Community
            </Link>
          </li>
          <li>
            <Link
              href="/how"
              className="block py-3 text-[13px] tracking-[0.1em] uppercase text-muted border-b border-line/60"
              onClick={() => setMenuOpen(false)}
            >
              {t("nav_how")}
            </Link>
          </li>
          {/* 모바일 설정 영역 */}
          <li className="pt-3 flex items-center justify-between gap-3">
            <button
              onClick={toggleLang}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-bold rounded-lg transition-colors"
              style={{ background: "var(--navy-100)", color: "var(--navy-700)" }}
            >
              <LangIcon />
              {lang === "ko" ? "KO → EN" : "EN → KO"}
            </button>
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-bold rounded-lg transition-colors"
              style={{ background: "var(--navy-100)", color: "var(--navy-700)" }}
            >
              {isDark ? <><SunIcon /> {t("theme_light")}</> : <><MoonIcon /> {t("theme_dark")}</>}
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}
