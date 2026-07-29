"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

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

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-[12px] border-b border-line">
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 flex items-center justify-between py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/logo-face.png"
            alt="THEO"
            className="w-8 h-8 shrink-0"
          />
          <b className="font-black tracking-[0.3em] text-base text-navy-900 uppercase">THEO</b>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="https://www.okrr.art/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase"
          >
            About
          </a>
          <Link href="/atelier" className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
            Atelier
          </Link>
          <a href="/#community" className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
            Community
          </a>
          <a href="/#how" className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
            이용방법
          </a>
          <Link
            href="/my"
            className="font-black text-[12.5px] tracking-[0.1em] uppercase transition-colors hover:opacity-80"
            style={{ color: 'var(--sv-deep)' }}
          >
            마이테오
          </Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          {/* Desktop: 다크모드 토글 */}
          <button
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg border transition-colors"
            style={{ borderColor: 'var(--line)', color: 'var(--muted)', background: 'var(--paper)' }}
            onClick={toggleTheme}
            aria-label="테마 전환"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          {/* Mobile: MY 버튼 */}
          <Link
            href="/my"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:opacity-80"
            style={{ background: 'var(--sv)', color: 'var(--ink)' }}
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
            style={{ fontSize: '13px', padding: '9px 17px' }}
          >
            시작하기
          </a>
        </div>

      </div>

      {/* Mobile 탭 드롭다운 */}
      {menuOpen && (
        <ul className="md:hidden border-t border-line bg-paper/95 backdrop-blur-[12px] px-5 py-3 flex flex-col gap-0">
          <li>
            <a
              href="https://www.okrr.art/"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 text-[13px] tracking-[0.1em] uppercase text-muted border-b border-line/60"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
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
            <a
              href="/#community"
              className="block py-3 text-[13px] tracking-[0.1em] uppercase text-muted border-b border-line/60"
              onClick={() => setMenuOpen(false)}
            >
              Community
            </a>
          </li>
          <li>
            <a
              href="/#how"
              className="block py-3 text-[13px] tracking-[0.1em] uppercase text-muted"
              onClick={() => setMenuOpen(false)}
            >
              이용방법
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
