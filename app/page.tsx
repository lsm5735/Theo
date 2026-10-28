"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import ArtistCard from "@/components/ArtistCard";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";
import { useT } from "@/contexts/LangContext";
import { NOTION_URL } from "@/lib/site";
import { trackNotionClick } from "@/lib/analytics";

function IconPen() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function Home() {
  const t = useT();
  const featuredArtists = artists.slice(0, 3);
  const projectMap = Object.fromEntries(projects.map((p) => [p.artistId, p]));

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      {/* ════════════════════════════════════════
          § 0. 졸업전시 참여 모집 배너 → 노션
          ════════════════════════════════════════ */}
      <a
        href={NOTION_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackNotionClick("home_banner")}
        className="block w-full transition-opacity hover:opacity-90"
        style={{ background: "var(--navy-900)" }}
      >
        <div className="max-w-[1080px] mx-auto px-5 md:px-8 py-3 flex items-center justify-center gap-2 md:gap-3 text-center">
          <span
            className="hidden sm:inline-flex items-center text-[10px] font-black tracking-[0.14em] px-2 py-1 rounded shrink-0"
            style={{ background: "rgba(244,211,94,.16)", color: "var(--sv)" }}
          >
            2026
          </span>
          <span
            className="text-[12.5px] md:text-[13.5px] font-semibold"
            style={{ color: "rgba(250,240,202,.9)", wordBreak: "keep-all" }}
          >
            {t("grad_banner")}
          </span>
          <span
            className="text-[12.5px] md:text-[13.5px] font-black whitespace-nowrap shrink-0"
            style={{ color: "var(--sv)" }}
          >
            {t("grad_banner_cta")} →
          </span>
        </div>
      </a>

      <Header />

      {/* ════════════════════════════════════════
          § 1. HERO
          ════════════════════════════════════════ */}
      <header className="relative overflow-hidden" id="start">
        {/* 배경 사진 — 글자 뒤로 흐리게, 아래로 갈수록 캔버스색에 녹아듦 */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-museum.jpg" alt="" className="w-full h-full object-cover scale-110"
            style={{ filter: "blur(7px) saturate(.9)" }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(255,250,240,.66) 0%, rgba(255,250,240,.58) 45%, rgba(255,250,240,.9) 85%, var(--paper) 100%)" }} />
        </div>

        <div className="relative max-w-[1080px] mx-auto px-5 md:px-8 pt-24 md:pt-40 pb-20 md:pb-32 text-center">

          <h1
            data-sr="up"
            className="font-semibold text-[38px] sm:text-[56px] md:text-[76px] leading-[1.08] text-ink mb-8 md:mb-10"
            style={{ wordBreak: "keep-all", letterSpacing: "-0.045em" }}
          >
            {t("hero_line1")}<br />
            {t("hero_line2a")} {t("hero_highlight")}{t("hero_line2b")}
          </h1>

          <p
            data-sr="up" data-d="2"
            className="text-[15px] md:text-[18px] leading-[1.85] max-w-[580px] mx-auto mb-12 text-body"
            style={{ wordBreak: "keep-all" }}
          >
            {t("hero_desc")}
          </p>

          <div data-sr="up" data-d="3" className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href="/bot" className="nb-btn flex-col w-full sm:w-[240px] text-[15px] px-8 py-3.5">
              <span className="font-semibold">{t("btn_patron_main")}</span>
              <span className="block text-[11.5px] font-medium opacity-60 mt-0.5">{t("btn_patron_sub")}</span>
            </Link>
            <Link href="/onboarding/artist" className="nb-btn-outline flex-col w-full sm:w-[240px] text-[15px] px-8 py-3.5">
              <span className="font-semibold">{t("btn_artist_main")}</span>
              <span className="block text-[11.5px] font-medium text-muted mt-0.5">{t("btn_artist_sub")}</span>
            </Link>
          </div>

          <p data-sr="fade" data-d="4" className="text-[13px] text-muted">
            {t("hero_login")}{" "}
            <Link href="#" className="text-ink font-semibold underline underline-offset-2">{t("hero_login_link")}</Link>
          </p>


        </div>
      </header>

      {/* ════════════════════════════════════════
          § 2. THE GAP
          ════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-14">
            <span className="nb-tag mb-6 inline-flex">{t("gap_tag")}</span>
            <h2
              className="font-semibold text-[32px] md:text-[48px] leading-[1.12] mt-4 mb-5 text-ink"
              style={{ wordBreak: "keep-all" }}
            >
              {t("gap_h2").split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p className="text-[16px] leading-[1.8] max-w-[520px] mx-auto text-muted" style={{ wordBreak: "keep-all" }}>
              {t("gap_sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            <div data-sr="right" className="clay-card bg-clay-peach text-ink">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-10 bg-white/55">
                <IconUser />
              </div>
              <h4 className="font-semibold text-[22px] mb-3" style={{ letterSpacing: "-0.02em" }}>{t("gap_fan_title")}</h4>
              <p className="text-[15px] leading-[1.8] text-ink/75" style={{ wordBreak: "keep-all" }}>
                {t("gap_fan_body")}
              </p>
            </div>
            <div data-sr="left" className="clay-card bg-clay-lavender text-ink">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-10 bg-white/55">
                <IconPen />
              </div>
              <h4 className="font-semibold text-[22px] mb-3" style={{ letterSpacing: "-0.02em" }}>{t("gap_artist_title")}</h4>
              <p className="text-[15px] leading-[1.8] text-ink/75" style={{ wordBreak: "keep-all" }}>
                {t("gap_artist_body")}
              </p>
            </div>
          </div>

          <p data-sr="up" data-d="2"
            className="text-center font-semibold text-[22px] md:text-[30px] leading-[1.5] text-ink"
            style={{ wordBreak: "keep-all", letterSpacing: "-0.03em" }}>
            {t("gap_conclusion_pre")}{" "}
            <em className="not-italic text-navy-700">{t("gap_conclusion_em")}</em>{t("gap_conclusion_post")}
          </p>

        </div>
      </section>

      {/* ════════════════════════════════════════
          § 3. HOW IT WORKS
          ════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: "var(--paper)" }} id="how">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-20">
            <span className="nb-tag mb-5 inline-flex">{t("how_tag")}</span>
            <h2 className="font-semibold text-[32px] md:text-[48px] leading-[1.12] mt-4 mb-4 text-navy-900"
              style={{ letterSpacing: "-0.02em" }}>{t("how_h2")}</h2>
            <p className="text-[15px] text-muted leading-[1.9] max-w-[480px] mx-auto" style={{ wordBreak: "keep-all" }}>
              {t("how_sub_pre")} <strong className="text-ink font-semibold">{t("how_sub_em")}</strong>{t("how_sub_post")}
            </p>
          </div>

          <div className="space-y-20 md:space-y-28">

            {/* Step 01 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div data-sr="right">
                <div className="flex items-center gap-3 mb-6">
                  <div className="nb-step">01</div>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 font-bold uppercase">{t("how_s1_label")}</span>
                </div>
                <h3 className="font-semibold text-[28px] md:text-[36px] text-ink mb-4 leading-[1.15]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  {t("how_s1_h3")}
                </h3>
                <p className="text-[16px] text-body leading-[1.85] max-w-[420px]" style={{ wordBreak: "keep-all" }}>
                  {t("how_s1_body_pre")} <strong className="text-ink font-semibold">{t("how_s1_body_em1")}</strong>{t("how_s1_body_mid")} {t("how_s1_body_em2") && <strong className="text-ink font-semibold">{t("how_s1_body_em2")}</strong>}{t("how_s1_body_post")}
                </p>
              </div>
              <div data-sr="left" data-d="1" className="clay-card bg-clay-ochre flex flex-col gap-3">
                {[
                  { grad: "linear-gradient(145deg,var(--navy-700),var(--navy-900))", title: "코발트블루 유화물감 세트", note: '"밤 연작의 주조색이에요"', price: "32,000원" },
                  { grad: "linear-gradient(145deg,#D8CBAA,#9B8A63)", title: "캔버스 천 10호 ×3", note: '"다음 장면의 바탕입니다"', price: "28,000원" },
                ].map((item) => (
                  <div key={item.title} className="soft-surface rounded-2xl p-3.5">
                    <div className="flex gap-3 items-center">
                      <div className="w-[46px] h-[46px] rounded-[9px] shrink-0" style={{ background: item.grad }} />
                      <div>
                        <h6 className="text-[12.5px] font-black text-navy-900">{item.title}</h6>
                        <p className="font-myeongjo text-[11px] text-muted mt-0.5">{item.note}</p>
                        <p className="font-black text-[13px] text-navy-700 mt-0.5">{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 02 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div data-sr="right" data-d="1" className="order-2 md:order-1 clay-card bg-clay-pink flex flex-col gap-3">
                <div className="soft-surface rounded-2xl p-4">
                  <p className="text-[9.5px] tracking-[0.16em] text-navy-700 font-black mb-2 uppercase">DEAR GOGH</p>
                  <p className="font-myeongjo text-[12.5px] text-navy-900 leading-[1.85]">
                    "밤 연작 응원해요. 이 파랑이 다음 그림의 하늘이 되면 좋겠어요."
                  </p>
                </div>
                <div className="soft-surface rounded-2xl p-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "var(--sv)" }}>
                      <svg width="14" height="14" viewBox="0 0 36 36" fill="none">
                        {[0,45,90,135,180,225,270,315].map((deg) => (
                          <ellipse key={deg} cx="18" cy="8" rx="3" ry="5.5" fill="#07223C" opacity={0.7} transform={`rotate(${deg} 18 18)`} />
                        ))}
                        <circle cx="18" cy="18" r="6.5" fill="#07223C" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-black" style={{ color: "var(--gold-text)" }}>해바라기 배지까지</span>
                    <span className="ml-auto text-[10.5px] text-muted">8,000원</span>
                  </div>
                </div>
              </div>
              <div data-sr="left" className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="nb-step">02</div>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 font-bold uppercase">{t("how_s2_label")}</span>
                </div>
                <h3 className="font-semibold text-[28px] md:text-[36px] text-ink mb-4 leading-[1.15]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  {t("how_s2_h3")}
                </h3>
                <p className="text-[16px] text-body leading-[1.85] max-w-[420px]" style={{ wordBreak: "keep-all" }}>
                  {t("how_s2_body")}
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div data-sr="right">
                <div className="flex items-center gap-3 mb-6">
                  <div className="nb-step">03</div>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 font-bold uppercase">{t("how_s3_label")}</span>
                </div>
                <h3 className="font-semibold text-[28px] md:text-[36px] text-ink mb-4 leading-[1.15]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  {t("how_s3_h3")}
                </h3>
                <p className="text-[16px] text-body leading-[1.85] max-w-[420px]" style={{ wordBreak: "keep-all" }}>
                  {t("how_s3_body_pre")} <strong className="text-ink font-semibold">{t("how_s3_body_em1")}</strong> {t("how_s3_body_mid")} <strong className="text-ink font-semibold">{t("how_s3_body_em2")}</strong>
                  {t("how_s3_body_post")}
                </p>
              </div>
              <div data-sr="left" data-d="1" className="clay-card bg-clay-teal flex flex-col gap-3">
                <div className="soft-surface rounded-2xl p-3.5">
                  <div className="flex items-center gap-0 mt-1">
                    {[true, true, true, false].map((on, i) => (
                      <div key={i} className="flex items-center flex-1 last:flex-none">
                        <div className="w-[12px] h-[12px] rounded-full shrink-0"
                          style={{ background: on ? "var(--sv)" : "var(--navy-200)", border: on ? "2px solid var(--sv-deep)" : "2px solid var(--navy-300)" }} />
                        {i < 3 && <div className="h-[2.5px] flex-1" style={{ background: on ? "var(--sv-deep)" : "var(--navy-200)" }} />}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9.5px] mt-2.5 font-semibold">
                    <span className="text-muted">{t("how_s3_step1")}</span>
                    <span className="text-muted">{t("how_s3_step2")}</span>
                    <span className="text-navy-800">{t("how_s3_step3")}</span>
                    <span className="text-muted">{t("how_s3_step4")}</span>
                  </div>
                </div>
                <div className="soft-surface rounded-2xl p-3.5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9.5px] text-navy-400 font-semibold">2026.08.14</span>
                    <div className="w-[22px] h-[27px] rounded-sm"
                      style={{ background: "var(--sv)" }} />
                  </div>
                  <p className="font-myeongjo text-[11.5px] font-bold text-navy-900 mb-1">지수 테오님께,</p>
                  <p className="font-myeongjo text-[11.5px] text-navy-900 leading-[1.85]">
                    보내주신 코발트블루가 어제 도착했습니다. 뚜껑을 열자마자 세 번째 캔버스의 하늘부터 올렸어요.
                  </p>
                  <div className="rounded-lg mt-2 h-[44px]"
                    style={{ background: "linear-gradient(155deg,#061A2E,var(--navy-700))" }} />
                </div>
              </div>
            </div>

            {/* Step 04 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div data-sr="right" data-d="1" className="order-2 md:order-1 clay-card bg-clay-mint flex flex-col gap-3">
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--line)" }}>
                  <div className="relative" style={{ height: "104px", background: "linear-gradient(150deg,#061A2E,var(--navy-700) 60%,var(--navy-500))" }}>
                    <span className="absolute bottom-[9px] left-3 text-[10.5px] font-bold" style={{ color: "rgba(250,240,202,.9)" }}>밤 연작 No.3 · 완성</span>
                  </div>
                  <div className="p-3" style={{ background: "var(--card)" }}>
                    <p className="font-myeongjo text-[11.5px] text-muted leading-[1.7]">재료 후원 — 지수, 하나, 무늬</p>
                  </div>
                </div>
                <div className="soft-surface rounded-2xl p-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="nb-tag text-[9px]">{t("how_s4_demo_studio")}</span>
                    <span className="ml-auto text-[10.5px] text-muted font-semibold">{t("how_s4_demo_guest")}</span>
                  </div>
                </div>
              </div>
              <div data-sr="left" className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="nb-step">04</div>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 font-bold uppercase">{t("how_s4_label")}</span>
                </div>
                <h3 className="font-semibold text-[28px] md:text-[36px] text-ink mb-4 leading-[1.15]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  {t("how_s4_h3")}
                </h3>
                <p className="text-[16px] text-body leading-[1.85] max-w-[420px]" style={{ wordBreak: "keep-all" }}>
                  {t("how_s4_body_pre")} <strong className="text-ink font-semibold">{t("how_s4_body_em1")}</strong>{t("how_s4_body_mid")} <strong className="text-ink font-semibold">{t("how_s4_body_em2")}</strong>
                  {t("how_s4_body_mid2")} <strong className="text-ink font-semibold">{t("how_s4_body_em3")}</strong>
                  {t("how_s4_body_post")}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 4. OPEN PROJECTS
          ════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: "var(--paper)" }} id="projects">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-14">
            <span className="nb-tag mb-5 inline-flex">{t("projects_tag")}</span>
            <h2 className="font-semibold text-[32px] md:text-[48px] leading-[1.12] mt-4 mb-3 text-navy-900"
              style={{ letterSpacing: "-0.02em" }}>{t("projects_h2")}</h2>
            <p className="text-[15px] text-muted leading-[1.9]">{t("projects_sub")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredArtists.map((artist, i) => {
              const project = projectMap[artist.id];
              if (!project) return null;
              return (
                <div key={artist.id} data-sr="up" data-d={String(i + 1)}>
                  <ArtistCard artist={artist} project={project} />
                </div>
              );
            })}
          </div>

          {artists.length > 3 && (
            <div data-sr="up" data-d="4" className="text-center mt-12">
              <Link href="/atelier" className="nb-btn-outline text-[14px] px-7 py-3.5 rounded-xl font-black">
                {t("projects_btn")} ({artists.length}명) →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 6. BADGES
          ════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: "var(--paper)" }} id="badges">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-14">
            <span className="nb-tag mb-5 inline-flex">{t("badges_tag")}</span>
            <h2 className="font-semibold text-[32px] md:text-[48px] leading-[1.12] mt-4 mb-4 text-navy-900"
              style={{ letterSpacing: "-0.02em" }}>{t("badges_h2")}</h2>
            <p className="text-[15px] text-muted max-w-[400px] mx-auto leading-relaxed" style={{ wordBreak: "keep-all" }}>
              {t("badges_sub")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                lv: "LV.01", nameKey: "badge_lv1_name" as const, condKey: "badge_lv1_cond" as const, descKey: "badge_lv1_desc" as const,
                symbol: (
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-clay-mint flex items-center justify-center">
                    <div className="w-5 h-7 rounded-full" style={{ border: "2px solid var(--brutal)", background: "rgba(7,34,60,.15)" }} />
                  </div>
                ),
              },
              {
                lv: "LV.02", nameKey: "badge_lv2_name" as const, condKey: "badge_lv2_cond" as const, descKey: "badge_lv2_desc" as const,
                symbol: (
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-clay-ochre flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                      {[0,45,90,135,180,225,270,315].map((deg) => (
                        <ellipse key={deg} cx="18" cy="8" rx="3" ry="5.5" fill="var(--brutal)" opacity={0.6} transform={`rotate(${deg} 18 18)`} />
                      ))}
                      <circle cx="18" cy="18" r="6.5" fill="var(--brutal)" />
                      <circle cx="18" cy="18" r="4" fill="var(--sv)" opacity={0.6} />
                    </svg>
                  </div>
                ),
              },
              {
                lv: "LV.03", nameKey: "badge_lv3_name" as const, condKey: "badge_lv3_cond" as const, descKey: "badge_lv3_desc" as const,
                symbol: (
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-clay-peach flex items-center justify-center gap-0.5">
                    {[0,1,2].map((i) => (
                      <div key={i} className="flex flex-col items-center gap-0.5">
                        <div className="w-1.5 h-2 rounded-sm" style={{ background: "var(--brutal)", opacity: 0.7 }} />
                        <div className="w-0.5 h-4 rounded-full" style={{ background: "var(--brutal)", opacity: 0.5 }} />
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                lv: "LV.04", nameKey: "badge_lv4_name" as const, condKey: "badge_lv4_cond" as const, descKey: "badge_lv4_desc" as const,
                symbol: (
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-clay-lavender flex items-center justify-center">
                    <div className="w-7 h-7" style={{
                      background: "var(--brutal)",
                      clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                    }} />
                  </div>
                ),
              },
            ].map((b, i) => (
              <div key={b.lv} data-sr="scale" data-d={String(i + 1)} className="rounded-3xl bg-surface-card p-7 text-center">
                <p className="text-[10px] tracking-[0.18em] text-navy-400 font-bold mb-4">{b.lv}</p>
                <div className="mb-4">{b.symbol}</div>
                <h5 className="font-semibold text-[17px] text-ink mb-1.5">{t(b.nameKey)}</h5>
                <p className="text-[11.5px] font-bold mb-3" style={{ color: "var(--gold-text)" }}>{t(b.condKey)}</p>
                <p className="text-[11.5px] text-muted leading-[1.75]" style={{ wordBreak: "keep-all" }}>{t(b.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 7. ARTY
          ════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: "var(--paper)" }} id="community">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-12 items-center">

            <div data-sr="right">
              <span className="nb-tag mb-5 inline-flex">{t("arty_tag")}</span>
              <h2 className="font-semibold text-[30px] md:text-[42px] text-ink leading-[1.15] mt-4 mb-5"
                style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                {t("arty_h2").split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="text-[15px] text-muted leading-[1.95]" style={{ wordBreak: "keep-all" }}>
                {t("arty_body1_pre")} <strong className="text-ink font-semibold">{t("arty_body1_em")}</strong>{t("arty_body1_post")}{" "}
                <strong className="text-ink font-semibold">{t("arty_body1_em2")}</strong>{t("arty_body1_end")}
              </p>
              <p className="text-[15px] text-muted leading-[1.95] mt-4" style={{ wordBreak: "keep-all" }}>
                {t("arty_body2_pre")}<strong className="text-ink font-semibold">{t("arty_body2_em")}</strong>{t("arty_body2_post")}
              </p>
            </div>

            <div data-sr="left" data-d="1" className="clay-card" style={{ background: "var(--navy-900)" }}>
              <span className="nb-tag-light mb-4 inline-flex">{t("arty_card_tag")}</span>
              <h4 className="font-semibold text-[22px] mt-3 mb-2" style={{ color: "var(--chiffon)", letterSpacing: "-0.02em" }}>{t("arty_card_title")}</h4>
              <p className="text-[13px] leading-[1.8]" style={{ color: "rgba(250,240,202,.7)", wordBreak: "keep-all" }}>
                {t("arty_card_body")}
              </p>
              <div className="flex gap-2 flex-wrap mt-4 mb-5">
                {[t("arty_card_date"), t("arty_card_place"), t("arty_card_seats")].map((tag) => (
                  <span key={tag} className="text-[11.5px] px-3 py-1.5 rounded-lg font-semibold"
                    style={{ background: "rgba(250,240,202,.1)", border: "1px solid rgba(250,240,202,.25)", color: "var(--chiffon)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="#" className="nb-btn-light w-full text-[14px]">
                {t("arty_card_btn")}
              </Link>
              <p className="mt-4 pt-4 text-[12.5px] leading-[1.7] font-semibold"
                style={{ borderTop: "1px solid rgba(250,240,202,.16)", color: "rgba(250,240,202,.75)" }}>
                <strong style={{ color: "var(--sv)" }}>+1</strong> {t("arty_card_plus1")}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 8. CLOSING CTA
          ════════════════════════════════════════ */}
      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="relative overflow-hidden max-w-[1080px] mx-auto rounded-[28px] text-center px-6 py-20 md:py-24"
          style={{ background: "var(--surface-card)" }}>
          <div className="relative max-w-[680px] mx-auto">
            <h2 data-sr="up" className="font-semibold text-[34px] md:text-[52px] leading-[1.12] mb-5 text-ink"
              style={{ wordBreak: "keep-all" }}>
              {t("cta_h2").split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p data-sr="up" data-d="1" className="text-[16px] mb-10 text-body">
              {t("cta_sub")}
            </p>

            <a data-sr="up" data-d="2" href={NOTION_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackNotionClick("landing_cta")}
              className="nb-btn inline-flex items-center gap-2 text-[15px] px-7">
              {t("cta_btn")} <IconArrow />
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="pt-16 pb-10 border-t border-line" style={{ background: "var(--card-soft)" }}>
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/logo-face.png" alt="THEO" className="w-7 h-7" />
                <b className="logo-wordmark tracking-[0.06em] text-[20px] text-ink">Theo</b>
              </div>
              <p className="text-[12px] leading-[1.8] max-w-[230px]" style={{ color: "var(--muted)" }}>
                {t("footer_desc")}
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase font-bold" style={{ color: "var(--muted)" }}>{t("footer_service")}</p>
              <ul className="space-y-2.5">
                {[
                  { labelKey: "footer_link_artist" as const, href: "/onboarding/artist" },
                  { labelKey: "footer_link_bot" as const, href: "/bot" },
                  { labelKey: "footer_link_projects" as const, href: "#projects" },
                  { labelKey: "footer_link_arty" as const, href: "#community" },
                ].map((l) => (
                  <li key={l.labelKey}><Link href={l.href} className="text-[13px] text-body hover:text-ink transition-colors">{t(l.labelKey)}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase font-bold" style={{ color: "var(--muted)" }}>{t("footer_help")}</p>
              <ul className="space-y-2.5">
                {(["footer_link_how", "footer_link_faq", "footer_link_contact"] as const).map((key) => (
                  <li key={key}><Link href="#how" className="text-[13px] text-body hover:text-ink transition-colors">{t(key)}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase font-bold" style={{ color: "var(--muted)" }}>{t("footer_company")}</p>
              <ul className="space-y-2.5">
                {(["footer_link_story", "footer_link_terms", "footer_link_privacy", "footer_link_trade"] as const).map((key) => (
                  <li key={key}><Link href="#" className="text-[13px] text-body hover:text-ink transition-colors">{t(key)}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-[11.5px] font-medium"
            style={{ borderTop: "1px solid var(--line)", color: "var(--muted)" }}>
            <span>{t("footer_copy")}</span>
            <span>{t("footer_disclaimer")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
