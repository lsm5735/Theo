"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import ArtistCard from "@/components/ArtistCard";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";
import { useT } from "@/contexts/LangContext";

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
      <Header />

      {/* ════════════════════════════════════════
          § 1. HERO
          ════════════════════════════════════════ */}
      <header className="relative overflow-hidden" id="start">
        {/* 배경 도트 패턴 */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(13,59,102,.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <div className="relative max-w-[1080px] mx-auto px-5 md:px-8 pt-20 md:pt-36 pb-16 md:pb-24 text-center">

          <h1
            data-sr="up"
            className="font-black text-[36px] sm:text-[52px] md:text-[72px] leading-[1.1] tracking-tight text-navy-900 mb-8 md:mb-10"
            style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}
          >
            {t("hero_line1")}<br />
            {t("hero_line2a")}{" "}
            <span style={{
              background: "linear-gradient(transparent 50%, rgba(244,211,94,.92) 50%, rgba(244,211,94,.92) 90%, transparent 90%)",
              padding: "0 4px",
              color: "var(--navy-700)",
            }}>
              {t("hero_highlight")}
            </span>{t("hero_line2b")}
          </h1>

          <p
            data-sr="up" data-d="2"
            className="text-[15px] md:text-[18px] leading-[1.95] max-w-[580px] mx-auto mb-12"
            style={{ color: "var(--muted)", wordBreak: "keep-all" }}
          >
            {t("hero_desc")}
          </p>

          <div data-sr="up" data-d="3" className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href="/bot" className="nb-btn w-full sm:w-[260px] text-[15px] px-8 py-4 rounded-xl">
              <span className="font-black">{t("btn_patron_main")}</span>
              <span className="block text-[11px] font-semibold opacity-60 mt-0.5">{t("btn_patron_sub")}</span>
            </Link>
            <Link href="/onboarding/artist" className="nb-btn-outline w-full sm:w-[260px] text-[15px] px-8 py-4 rounded-xl">
              <span className="font-black">{t("btn_artist_main")}</span>
              <span className="block text-[11px] font-semibold opacity-50 mt-0.5">{t("btn_artist_sub")}</span>
            </Link>
          </div>

          <p data-sr="fade" data-d="4" className="text-xs text-navy-400">
            {t("hero_login")}{" "}
            <Link href="#" className="text-navy-600 font-bold hover:underline">{t("hero_login_link")}</Link>
          </p>


        </div>
      </header>

      {/* ════════════════════════════════════════
          § 2. THE GAP
          ════════════════════════════════════════ */}
      <section style={{ background: "var(--navy-900)" }} className="py-24 md:py-32">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-16">
            <span className="nb-tag-light mb-6 inline-flex">{t("gap_tag")}</span>
            <h2
              className="font-black text-[30px] md:text-[42px] leading-[1.2] mt-4 mb-5"
              style={{ color: "var(--chiffon)", wordBreak: "keep-all", letterSpacing: "-0.02em" }}
            >
              {t("gap_h2").split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p className="text-[15px] leading-[1.9] max-w-[520px] mx-auto" style={{ color: "rgba(250,240,202,.65)", wordBreak: "keep-all" }}>
              {t("gap_sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            <div data-sr="right" className="nb-card-dark rounded-[14px] p-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 shrink-0"
                style={{ background: "rgba(244,211,94,.15)", color: "var(--sv)" }}>
                <IconUser />
              </div>
              <h4 className="font-black text-[18px] mb-3" style={{ color: "var(--chiffon)" }}>{t("gap_fan_title")}</h4>
              <p className="text-[14px] leading-[2.0]" style={{ color: "rgba(250,240,202,.68)", wordBreak: "keep-all" }}>
                {t("gap_fan_body")}
              </p>
            </div>
            <div data-sr="left" className="nb-card-dark rounded-[14px] p-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 shrink-0"
                style={{ background: "rgba(244,211,94,.15)", color: "var(--sv)" }}>
                <IconPen />
              </div>
              <h4 className="font-black text-[18px] mb-3" style={{ color: "var(--chiffon)" }}>{t("gap_artist_title")}</h4>
              <p className="text-[14px] leading-[2.0]" style={{ color: "rgba(250,240,202,.68)", wordBreak: "keep-all" }}>
                {t("gap_artist_body")}
              </p>
            </div>
          </div>

          <p data-sr="up" data-d="2"
            className="text-center font-black text-[20px] md:text-[26px] leading-[1.6]"
            style={{ color: "var(--chiffon)", wordBreak: "keep-all" }}>
            {t("gap_conclusion_pre")}{" "}
            <em className="not-italic" style={{ color: "var(--sv)" }}>{t("gap_conclusion_em")}</em>{t("gap_conclusion_post")}
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
            <h2 className="font-black text-[28px] md:text-[44px] leading-[1.2] mt-4 mb-4 text-navy-900"
              style={{ letterSpacing: "-0.02em" }}>{t("how_h2")}</h2>
            <p className="text-[15px] text-muted leading-[1.9] max-w-[480px] mx-auto" style={{ wordBreak: "keep-all" }}>
              {t("how_sub_pre")} <strong className="text-navy-800">{t("how_sub_em")}</strong>{t("how_sub_post")}
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
                <h3 className="font-black text-[26px] md:text-[32px] text-navy-900 mb-4 leading-[1.2]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  {t("how_s1_h3")}
                </h3>
                <p className="text-[15px] text-muted leading-[1.95] max-w-[400px]" style={{ wordBreak: "keep-all" }}>
                  {t("how_s1_body_pre")} <strong className="text-navy-800">{t("how_s1_body_em1")}</strong>{t("how_s1_body_mid")} <strong className="text-navy-800">{t("how_s1_body_em2")}</strong>{t("how_s1_body_post")}
                </p>
              </div>
              <div data-sr="left" data-d="1" className="nb-card p-6 flex flex-col gap-3">
                {[
                  { grad: "linear-gradient(145deg,var(--navy-700),var(--navy-900))", title: "코발트블루 유화물감 세트", note: '"밤 연작의 주조색이에요"', price: "32,000원" },
                  { grad: "linear-gradient(145deg,#D8CBAA,#9B8A63)", title: "캔버스 천 10호 ×3", note: '"다음 장면의 바탕입니다"', price: "28,000원" },
                ].map((item) => (
                  <div key={item.title} className="soft-surface rounded-xl p-3.5">
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
              <div data-sr="right" data-d="1" className="order-2 md:order-1 nb-card p-6 flex flex-col gap-3"
                style={{ background: "var(--card-soft)" }}>
                <div className="soft-surface rounded-xl p-4" style={{ border: "2px solid var(--navy-700)" }}>
                  <p className="text-[9.5px] tracking-[0.16em] text-navy-700 font-black mb-2 uppercase">DEAR GOGH</p>
                  <p className="font-myeongjo text-[12.5px] text-navy-900 leading-[1.85]">
                    "밤 연작 응원해요. 이 파랑이 다음 그림의 하늘이 되면 좋겠어요."
                  </p>
                </div>
                <div className="soft-surface rounded-xl p-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "var(--sv)", border: "1.5px solid var(--brutal)" }}>
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
                <h3 className="font-black text-[26px] md:text-[32px] text-navy-900 mb-4 leading-[1.2]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  {t("how_s2_h3")}
                </h3>
                <p className="text-[15px] text-muted leading-[1.95] max-w-[400px]" style={{ wordBreak: "keep-all" }}>
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
                <h3 className="font-black text-[26px] md:text-[32px] text-navy-900 mb-4 leading-[1.2]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  {t("how_s3_h3")}
                </h3>
                <p className="text-[15px] text-muted leading-[1.95] max-w-[400px]" style={{ wordBreak: "keep-all" }}>
                  {t("how_s3_body_pre")} <strong className="text-navy-800">{t("how_s3_body_em1")}</strong> {t("how_s3_body_mid")} <strong className="text-navy-800">{t("how_s3_body_em2")}</strong>
                  {t("how_s3_body_post")}
                </p>
              </div>
              <div data-sr="left" data-d="1" className="nb-card p-6 flex flex-col gap-3">
                <div className="soft-surface rounded-xl p-3.5">
                  <div className="flex items-center gap-0 mt-1">
                    {[true, true, true, false].map((on, i) => (
                      <div key={i} className="flex items-center flex-1 last:flex-none">
                        <div className="w-[12px] h-[12px] rounded-full shrink-0"
                          style={{ background: on ? "var(--sv)" : "var(--navy-200)", border: on ? "2px solid var(--brutal)" : "2px solid var(--navy-300)" }} />
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
                <div className="soft-surface rounded-xl p-3.5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9.5px] text-navy-400 font-semibold">2026.08.14</span>
                    <div className="w-[22px] h-[27px] rounded-sm"
                      style={{ background: "var(--sv)", border: "1.5px solid var(--brutal)" }} />
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
              <div data-sr="right" data-d="1" className="order-2 md:order-1 nb-card p-6 flex flex-col gap-3"
                style={{ background: "var(--card-soft)" }}>
                <div className="rounded-xl overflow-hidden" style={{ border: "2px solid var(--brutal)" }}>
                  <div className="relative" style={{ height: "104px", background: "linear-gradient(150deg,#061A2E,var(--navy-700) 60%,var(--navy-500))" }}>
                    <span className="absolute bottom-[9px] left-3 text-[10.5px] font-bold" style={{ color: "rgba(250,240,202,.9)" }}>밤 연작 No.3 · 완성</span>
                  </div>
                  <div className="p-3" style={{ background: "var(--card)" }}>
                    <p className="font-myeongjo text-[11.5px] text-muted leading-[1.7]">재료 후원 — 지수, 하나, 무늬</p>
                  </div>
                </div>
                <div className="soft-surface rounded-xl p-3.5">
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
                <h3 className="font-black text-[26px] md:text-[32px] text-navy-900 mb-4 leading-[1.2]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  {t("how_s4_h3")}
                </h3>
                <p className="text-[15px] text-muted leading-[1.95] max-w-[400px]" style={{ wordBreak: "keep-all" }}>
                  {t("how_s4_body_pre")} <strong className="text-navy-800">{t("how_s4_body_em1")}</strong>{t("how_s4_body_mid")} <strong className="text-navy-800">{t("how_s4_body_em2")}</strong>
                  {t("how_s4_body_mid2")} <strong className="text-navy-800">{t("how_s4_body_em3")}</strong>
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
            <h2 className="font-black text-[28px] md:text-[40px] leading-[1.2] mt-4 mb-3 text-navy-900"
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
          § 5. THEO BOT
          ════════════════════════════════════════ */}
      <section className="py-20 md:py-28" id="bot"
        style={{ background: "linear-gradient(150deg,var(--navy-900) 0%,var(--navy-800) 55%,var(--navy-700) 100%)" }}>
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-14">
            <span className="nb-tag-light mb-5 inline-flex">{t("bot_section_tag")}</span>
            <h2 className="font-black text-[28px] md:text-[40px] leading-[1.2] mt-4 mb-4"
              style={{ color: "var(--chiffon)", wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
              {t("bot_section_h2").split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p className="text-[15px] leading-[1.9] max-w-[440px] mx-auto" style={{ color: "rgba(250,240,202,.65)", wordBreak: "keep-all" }}>
              {t("bot_section_sub")}
            </p>
          </div>

          <div className="max-w-[520px] mx-auto flex flex-col gap-3">
            {[
              { role: "bot", text: t("bot_sample_1"), d: "1" },
              { role: "user", text: t("bot_sample_2"), d: "2" },
              { role: "bot", text: t("bot_sample_3"), d: "3" },
              { role: "user", text: t("bot_sample_4"), d: "4" },
            ].map((m, i) => (
              <div key={i} data-sr="up" data-d={m.d}
                className={`max-w-[84%] px-4 py-3 text-[13.5px] leading-[1.8] ${m.role === "user" ? "self-end" : ""}`}
                style={m.role === "bot"
                  ? { background: "rgba(250,240,202,.1)", border: "1.5px solid rgba(250,240,202,.2)", borderRadius: "16px 16px 16px 4px", color: "var(--chiffon)", wordBreak: "keep-all" }
                  : { background: "var(--sv)", border: "2px solid var(--brutal)", boxShadow: "3px 3px 0 var(--brutal)", borderRadius: "16px 16px 4px 16px", color: "var(--brutal)", fontWeight: 700, wordBreak: "keep-all" }
                }>
                {m.role === "bot" && (
                  <div className="flex gap-2.5 items-start">
                    <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                      style={{ background: "var(--sv)", border: "1.5px solid var(--brutal)" }}>
                      <span className="font-black text-[8px]" style={{ color: "var(--brutal)" }}>T</span>
                    </div>
                    <span>{m.text}</span>
                  </div>
                )}
                {m.role === "user" && m.text}
              </div>
            ))}

            {/* 추천 결과 */}
            <div data-sr="up" data-d="5" className="nb-card p-4 mt-2">
              <div className="flex gap-[11px] items-start mb-3">
                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                  style={{ background: "var(--sv)", border: "1.5px solid var(--brutal)" }}>
                  <span className="font-black text-[8px]" style={{ color: "var(--brutal)" }}>T</span>
                </div>
                <span className="text-[13px] text-navy-800">
                  {t("bot_result_summary")}
                </span>
              </div>
              <div className="soft-surface rounded-xl p-3 flex gap-3 items-center">
                <div className="w-[52px] h-[52px] rounded-[10px] shrink-0 overflow-hidden relative bg-navy-200"
                  style={{ border: "2px solid var(--brutal)" }}>
                  <Image src={artists[0].profileImage} alt={artists[0].name} fill sizes="52px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h6 className="text-[13px] font-black text-navy-900">{artists[0].name} · {artists[0].media[0]}</h6>
                  <p className="text-[11px] text-muted leading-[1.6] mt-0.5" style={{ wordBreak: "keep-all" }}>
                    {t("bot_result_desc")}
                  </p>
                </div>
                <span className="nb-tag text-[9px]">92%</span>
              </div>
            </div>
          </div>

          <div data-sr="up" data-d="3" className="text-center mt-10">
            <Link href="/bot" className="nb-btn text-[14px] px-8 py-3.5 rounded-xl font-black">
              {t("bot_section_btn")}
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 6. BADGES
          ════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: "var(--paper)" }} id="badges">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-14">
            <span className="nb-tag mb-5 inline-flex">{t("badges_tag")}</span>
            <h2 className="font-black text-[28px] md:text-[40px] leading-[1.2] mt-4 mb-4 text-navy-900"
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
                  <div className="w-11 h-11 mx-auto nb-step flex items-center justify-center" style={{ borderRadius: "12px" }}>
                    <div className="w-5 h-7 rounded-full" style={{ border: "2px solid var(--brutal)", background: "rgba(7,34,60,.15)" }} />
                  </div>
                ),
              },
              {
                lv: "LV.02", nameKey: "badge_lv2_name" as const, condKey: "badge_lv2_cond" as const, descKey: "badge_lv2_desc" as const,
                symbol: (
                  <div className="w-11 h-11 mx-auto nb-step flex items-center justify-center" style={{ borderRadius: "12px" }}>
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
                  <div className="w-11 h-11 mx-auto nb-step flex items-center justify-center gap-0.5" style={{ borderRadius: "12px" }}>
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
                  <div className="w-11 h-11 mx-auto nb-step flex items-center justify-center" style={{ borderRadius: "12px" }}>
                    <div className="w-7 h-7" style={{
                      background: "var(--brutal)",
                      clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                    }} />
                  </div>
                ),
              },
            ].map((b, i) => (
              <div key={b.lv} data-sr="scale" data-d={String(i + 1)} className="nb-card p-6 text-center">
                <p className="text-[10px] tracking-[0.18em] text-navy-400 font-bold mb-4">{b.lv}</p>
                <div className="mb-4">{b.symbol}</div>
                <h5 className="font-black text-[16px] text-navy-900 mb-1.5">{t(b.nameKey)}</h5>
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
              <h2 className="font-black text-[28px] md:text-[36px] text-navy-900 leading-[1.2] mt-4 mb-5"
                style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                {t("arty_h2").split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="text-[15px] text-muted leading-[1.95]" style={{ wordBreak: "keep-all" }}>
                {t("arty_body1_pre")} <strong className="text-navy-800">{t("arty_body1_em")}</strong>{t("arty_body1_post")}{" "}
                <strong className="text-navy-800">{t("arty_body1_em2")}</strong>{t("arty_body1_end")}
              </p>
              <p className="text-[15px] text-muted leading-[1.95] mt-4" style={{ wordBreak: "keep-all" }}>
                {t("arty_body2_pre")}<strong className="text-navy-800">{t("arty_body2_em")}</strong>{t("arty_body2_post")}
              </p>
            </div>

            <div data-sr="left" data-d="1" className="nb-card p-7" style={{ background: "var(--navy-900)" }}>
              <span className="nb-tag-light mb-4 inline-flex">{t("arty_card_tag")}</span>
              <h4 className="font-black text-[20px] mt-3 mb-2" style={{ color: "var(--chiffon)" }}>{t("arty_card_title")}</h4>
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
              <Link href="#" className="nb-btn w-full rounded-xl font-black text-[13px] py-3">
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
      <section className="relative overflow-hidden text-center py-24 md:py-36 px-8"
        style={{ background: "linear-gradient(140deg,#061A2E 0%,#0D3B66 52%,#376590 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(244,211,94,.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        {[{ top: "28px", left: "12%" }, { top: "70px", right: "14%" }, { bottom: "40px", left: "22%" }].map((s, i) => (
          <span key={i} className="absolute w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--sv)", opacity: 0.5, border: "1.5px solid var(--brutal)",
              top: (s as {top?:string}).top, bottom: (s as {bottom?:string}).bottom,
              left: (s as {left?:string}).left, right: (s as {right?:string}).right }} />
        ))}

        <div className="relative max-w-[680px] mx-auto">
          <h2 data-sr="up" className="font-black text-[36px] md:text-[52px] leading-[1.2] mb-5"
            style={{ color: "var(--chiffon)", letterSpacing: "-0.02em", wordBreak: "keep-all" }}>
            {t("cta_h2").split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p data-sr="up" data-d="1" className="font-black text-[15px] mb-10" style={{ color: "var(--sv)" }}>
            {t("cta_sub")}
          </p>

          <div data-sr="up" data-d="2" className="flex gap-2 max-w-[460px] mx-auto rounded-xl p-2 mb-5 nb-card"
            style={{ background: "rgba(250,240,202,.08)" }}>
            <span className="flex items-center pl-1 text-[13.5px] shrink-0 font-semibold" style={{ color: "rgba(250,240,202,.5)" }}>{t("cta_prefix")}</span>
            <input type="text" placeholder={t("cta_placeholder")} aria-label="아틀리에 주소"
              className="flex-1 border-none outline-none text-sm bg-transparent min-w-0 font-semibold"
              style={{ color: "var(--chiffon)" }} readOnly />
            <Link href="/onboarding/artist" className="nb-btn shrink-0 rounded-lg font-black text-[13px] px-4 py-2">
              {t("cta_btn")}
            </Link>
          </div>

          <p data-sr="fade" data-d="3" className="text-[13px] font-semibold" style={{ color: "rgba(250,240,202,.55)" }}>
            {t("cta_patron")}{" "}
            <Link href="/bot" className="font-black hover:underline" style={{ color: "var(--sv)" }}>{t("cta_patron_link")}</Link>
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#061A2E" }} className="text-chiffon pt-14 pb-9">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/logo-face.png" alt="THEO" className="w-7 h-7" />
                <b className="font-black tracking-[0.2em] text-sm" style={{ color: "var(--chiffon)" }}>THEO</b>
              </div>
              <p className="text-[12px] leading-[1.8] max-w-[230px]" style={{ color: "rgba(250,240,202,.5)" }}>
                {t("footer_desc")}
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase font-bold" style={{ color: "rgba(250,240,202,.4)" }}>{t("footer_service")}</p>
              <ul className="space-y-2.5">
                {[
                  { labelKey: "footer_link_artist" as const, href: "/onboarding/artist" },
                  { labelKey: "footer_link_bot" as const, href: "/bot" },
                  { labelKey: "footer_link_projects" as const, href: "#projects" },
                  { labelKey: "footer_link_arty" as const, href: "#community" },
                ].map((l) => (
                  <li key={l.labelKey}><Link href={l.href} className="text-[12.5px] hover:text-chiffon transition-colors font-medium" style={{ color: "rgba(250,240,202,.7)" }}>{t(l.labelKey)}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase font-bold" style={{ color: "rgba(250,240,202,.4)" }}>{t("footer_help")}</p>
              <ul className="space-y-2.5">
                {(["footer_link_how", "footer_link_faq", "footer_link_fee", "footer_link_contact"] as const).map((key) => (
                  <li key={key}><Link href="#how" className="text-[12.5px] hover:text-chiffon transition-colors font-medium" style={{ color: "rgba(250,240,202,.7)" }}>{t(key)}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase font-bold" style={{ color: "rgba(250,240,202,.4)" }}>{t("footer_company")}</p>
              <ul className="space-y-2.5">
                {(["footer_link_story", "footer_link_terms", "footer_link_privacy", "footer_link_trade"] as const).map((key) => (
                  <li key={key}><Link href="#" className="text-[12.5px] hover:text-chiffon transition-colors font-medium" style={{ color: "rgba(250,240,202,.7)" }}>{t(key)}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-[11.5px] font-medium"
            style={{ borderTop: "1px solid rgba(250,240,202,.1)", color: "rgba(250,240,202,.4)" }}>
            <span>{t("footer_copy")}</span>
            <span>{t("footer_disclaimer")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
