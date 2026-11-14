"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLang, useT } from "@/contexts/LangContext";

const NAV = [
  { label: "Show", href: "/show" },
  { label: "Atelier", href: "/atelier" },
  { label: "Arty", href: "/community" },
];

const ABOUT_LINKS = [
  { label: "회사 소개", href: "https://www.okrr.art/", external: true },
  { label: "서비스 소개", href: "/" },
  { label: "제휴 문의", href: "/partnership" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLang();
  const t = useT();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 bg-paper text-ink">
      <div className="flex w-full items-center h-16 px-[var(--gap)]">
        {/* 로고 — 왼쪽 라벨 영역 */}
        <div className="md:w-[calc((100vw-var(--gap)*2)*0.25)] shrink-0 flex items-center">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-face.png" alt="THEO" className="w-7 h-7 shrink-0" />
            <b className="logo-wordmark tracking-[0.08em] text-[24px] text-navy-900">Theo</b>
          </Link>
        </div>

        <div className="flex w-full items-center justify-end md:justify-between text-[18px] md:text-[20px]">
          {/* Desktop nav — About, Show, Atelier, Arty. */}
          <nav className="hidden md:flex">
            <ul className="flex gap-x-10">
              <li className="flex relative group">
                <button className="underlined cursor-pointer">About</button>
                <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 z-50">
                  <ul className="bg-paper border border-ink/60 min-w-[160px] py-2">
                    {ABOUT_LINKS.map((l) =>
                      l.external ? (
                        <li key={l.label}>
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:bg-sv transition-colors">
                            {l.label}
                          </a>
                        </li>
                      ) : (
                        <li key={l.label}>
                          <Link href={l.href} className="block px-4 py-2 hover:bg-sv transition-colors">
                            {l.label}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </li>
              {NAV.map((n) => (
                <li key={n.href} className="flex">
                  <Link
                    href={n.href}
                    className={`underlined ${isActive(n.href) ? "underline underline-offset-[3px] decoration-1" : ""}`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right */}
          <ul className="flex gap-x-6 md:gap-x-8 items-center">
            <li className="flex">
              <button onClick={() => setLang(lang === "ko" ? "en" : "ko")} className="underlined cursor-pointer" aria-label="Language">
                {lang === "ko" ? "EN" : "KO"}
              </button>
            </li>
            <li className="hidden md:flex">
              <Link href="/#start" className="underlined">{t("btn_start")}</Link>
            </li>
            <li className="flex md:hidden">
              <button
                className="underlined flex cursor-pointer items-center gap-x-2"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label="Menu"
                aria-expanded={menuOpen}
              >
                <svg width="11" height="8" fill="none" viewBox="0 0 11 8">
                  <path fill="currentColor" d="M.625 7.25V6.167h9.75V7.25zm0-2.708V3.458h9.75v1.084zm0-2.709V.75h9.75v1.083z" />
                </svg>
                <span>{menuOpen ? "Close" : "Menu"}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <hr className="dots-x" />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-paper border-b border-ink/40 px-[var(--gap)] pt-6 pb-8">
          <ul className="flex flex-col gap-4">
            {NAV.map((n) => (
              <li key={n.href} className="type-xl leading-none">
                <Link href={n.href} className="underlined" onClick={() => setMenuOpen(false)}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <hr className="dots-x my-6" />
          <p className="type-label mb-3">About</p>
          <ul className="flex flex-col gap-2 text-[15px]">
            {ABOUT_LINKS.map((l) => (
              <li key={l.label}>
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="underlined">{l.label}</a>
                ) : (
                  <Link href={l.href} className="underlined" onClick={() => setMenuOpen(false)}>{l.label}</Link>
                )}
              </li>
            ))}
            <li className="pt-2">
              <Link href="/#start" className="link-line" onClick={() => setMenuOpen(false)}>{t("btn_start")}</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
