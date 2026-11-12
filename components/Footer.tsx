"use client";

import Link from "next/link";
import { useT } from "@/contexts/LangContext";

const MARQUEE = ["GIVE PAINT,", "NOT FLOWERS"];

export default function Footer() {
  const t = useT();

  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Sitemap",
      links: [
        { label: "Show", href: "/show" },
        { label: "Atelier", href: "/atelier" },
        { label: "Community", href: "/community" },
        { label: "About", href: "/partnership" },
      ],
    },
    {
      title: t("footer_service"),
      links: [
        { label: t("footer_link_artist"), href: "/onboarding/artist" },
        { label: t("footer_link_bot"), href: "/bot" },
        { label: t("footer_link_projects"), href: "/atelier" },
        { label: t("footer_link_arty"), href: "/community" },
      ],
    },
    {
      title: t("footer_help"),
      links: [
        { label: t("footer_link_how"), href: "/#how" },
        { label: t("footer_link_contact"), href: "/partnership" },
      ],
    },
    {
      title: t("footer_company"),
      links: [
        { label: t("footer_link_story"), href: "https://www.okrr.art/" },
        { label: t("footer_link_terms"), href: "#" },
        { label: t("footer_link_privacy"), href: "#" },
        { label: t("footer_link_trade"), href: "#" },
      ],
    },
  ];

  return (
    <footer className="mt-auto pt-[10rem] md:pt-6 text-ink">
      <div className="px-[var(--gap)]">
        <hr className="dots-x" />
      </div>

      {/* 마퀴 */}
      <div className="flex flex-nowrap overflow-hidden py-6" aria-hidden="true">
        <div className="animate-marquee flex flex-nowrap shrink-0">
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="flex items-center justify-center h-[14rem] w-[100vw] md:w-[49rem] shrink-0">
              <span className="type-label-xl text-center">{MARQUEE[n % 2]}</span>
            </div>
          ))}
        </div>
        <div className="animate-marquee flex flex-nowrap shrink-0">
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="flex items-center justify-center h-[14rem] w-[100vw] md:w-[49rem] shrink-0">
              <span className="type-label-xl text-center">{MARQUEE[n % 2]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-[var(--gap)]">
        <hr className="dots-x" />
      </div>

      <div className="px-[var(--gap)] py-10 flex flex-col md:flex-row gap-10 md:gap-0">
        <div className="md:grid-left md:w-[calc((100vw-var(--gap)*2)*0.25)] shrink-0">
          <div className="flex items-center gap-2 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-face.png" alt="THEO" className="w-7 h-7" />
            <b className="logo-wordmark tracking-[0.06em] text-[21px]">Theo</b>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:flex-1">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="type-label mb-4">{c.title}</p>
              <ul className="space-y-2 text-[15px]">
                {c.links.map((l) => (
                  <li key={l.label + l.href}>
                    {l.href.startsWith("http") ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="underlined">{l.label}</a>
                    ) : (
                      <Link href={l.href} className="underlined">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="px-[var(--gap)]">
        <hr className="dots-x" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 py-6 text-[13px] text-muted">
          <span>{t("footer_copy")}</span>
          <span>{t("footer_disclaimer")}</span>
        </div>
      </div>
    </footer>
  );
}
