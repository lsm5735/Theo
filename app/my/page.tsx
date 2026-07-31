"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";
import letters from "@/data/letters.json";
import { useT, useLang } from "@/contexts/LangContext";
import { DictKey } from "@/lib/translations";

/* ─── 목 데이터: 내 후원 3건 ────────────────────────────────────────── */
const MY_SPONSORSHIPS = [
  {
    id: "my_001",
    deliveryStep: 4, // 작가가 받았어요 ✓ + 편지 도착
    sponsoredAt: "2026-07-10",
    letterId: "l1",
    artistId: "artist_theo_001",
    projectId: "project_artist_theo_001",
    material: "윈저앤뉴튼 아티스트 오일 3색 (프러시안 블루·바이리디언·화이트) 200ml",
    amount: 18000,
  },
  {
    id: "my_002",
    deliveryStep: 3, // 작가에게 가는 중
    sponsoredAt: "2026-07-18",
    letterId: null,
    artistId: "artist_theo_007",
    projectId: "project_artist_theo_007",
    material: "쉔넬리에 유화물감 대용량 4색",
    amount: 32000,
  },
  {
    id: "my_003",
    deliveryStep: 1, // 후원 완료
    sponsoredAt: "2026-07-25",
    letterId: null,
    artistId: "artist_theo_013",
    projectId: "project_artist_theo_013",
    material: "캔버스 F100호 2점",
    amount: 45000,
  },
];

const STEPS_KO = ["후원 완료", "재료 준비 중", "작가에게\n가는 중", "작가가\n받았어요"];

const BADGES = [
  { name: "씨앗",    threshold: 1 },
  { name: "해바라기", threshold: 2 },
  { name: "밀밭",    threshold: 5 },
  { name: "별밤",    threshold: 10 },
];

const BADGE_NAME_KEYS: Record<string, DictKey> = {
  "씨앗": "my_badge_seed",
  "해바라기": "my_badge_sunflower",
  "밀밭": "my_badge_wheat",
  "별밤": "my_badge_star",
};

/* ─── Badge SVG icons ────────────────────────────────────────────────── */
function SunflowerSvg({ size }: { size: number }) {
  const vb = 68, c = 34;
  const outerAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const innerAngles = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`}>
      {/* Outer petals */}
      {outerAngles.map((deg) => (
        <ellipse
          key={deg}
          cx={c} cy={14}
          rx={6} ry={13}
          fill="#F4D35E"
          transform={`rotate(${deg} ${c} ${c})`}
        />
      ))}
      {/* Inner petals (darker, between outer) */}
      {innerAngles.map((deg) => (
        <ellipse
          key={deg}
          cx={c} cy={18}
          rx={4} ry={9}
          fill="#C2A43F"
          opacity={0.75}
          transform={`rotate(${deg} ${c} ${c})`}
        />
      ))}
      {/* Center disc */}
      <circle cx={c} cy={c} r={12} fill="#58450E" />
      {/* Center inner ring */}
      <circle cx={c} cy={c} r={8} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />
      {/* Center highlight */}
      <circle cx={c} cy={c} r={3.5} fill="rgba(255,255,255,.1)" />
    </svg>
  );
}

function SeedSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <ellipse cx="24" cy="29" rx="10" ry="13" fill="#7E8F63" />
      <ellipse cx="24" cy="29" rx="5.5" ry="8" fill="#4A5A3C" opacity={0.45} />
      <path d="M24 17 Q28 11 34 9 Q29 14 24 17 Q19 14 14 9 Q20 11 24 17Z" fill="#8AA96B" />
    </svg>
  );
}

function WheatSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <line x1="24" y1="42" x2="24" y2="8" stroke="#C2A43F" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="24" cy="11" rx="5" ry="7" fill="#F4D35E" />
      <ellipse cx="17" cy="19" rx="4.5" ry="6.5" fill="#F4D35E" transform="rotate(-28 17 19)" />
      <ellipse cx="31" cy="19" rx="4.5" ry="6.5" fill="#F4D35E" transform="rotate(28 31 19)" />
      <ellipse cx="15" cy="29" rx="4" ry="5.5" fill="#C2A43F" transform="rotate(-38 15 29)" />
      <ellipse cx="33" cy="29" rx="4" ry="5.5" fill="#C2A43F" transform="rotate(38 33 29)" />
    </svg>
  );
}

function StarNightSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <polygon
        points="24,5 27.6,15.8 39,15.8 29.7,22.5 33.3,33.3 24,26.6 14.7,33.3 18.3,22.5 9,15.8 20.4,15.8"
        fill="#F4D35E"
      />
      <circle cx="37" cy="8" r="2.5" fill="#F4D35E" opacity={0.6} />
      <circle cx="41" cy="15" r="1.5" fill="#F4D35E" opacity={0.4} />
      <circle cx="42" cy="28" r="2" fill="#F4D35E" opacity={0.35} />
    </svg>
  );
}

function BadgeIcon({ name, size }: { name: string; size: number }) {
  if (name === "해바라기") return <SunflowerSvg size={size} />;
  if (name === "씨앗")    return <SeedSvg size={size} />;
  if (name === "밀밭")    return <WheatSvg size={size} />;
  if (name === "별밤")    return <StarNightSvg size={size} />;
  return null;
}

function BadgeIconInline({ name }: { name: string }) {
  return (
    <span className="inline-block align-middle" style={{ marginBottom: 1 }}>
      <BadgeIcon name={name} size={14} />
    </span>
  );
}

/* ─── 배송 트래커 ────────────────────────────────────────────────────── */
function DeliveryTracker({ step, stepsDisplay }: { step: number; stepsDisplay: string[] }) {
  return (
    <div className="mt-3">
      {/* Step circles + connecting lines */}
      <div className="flex items-center">
        {stepsDisplay.map((_, i) => {
          const num = i + 1;
          const done = num < step;
          const active = num === step;
          return (
            <div key={i} className="flex items-center" style={{ flex: i < stepsDisplay.length - 1 ? "1 1 0" : "none" }}>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0"
                style={{
                  background: done ? "var(--navy-800)" : active ? "var(--sv)" : "var(--navy-100)",
                  color: done ? "#fff" : active ? "var(--ink)" : "var(--navy-300)",
                }}
              >
                {done ? "✓" : num}
              </div>
              {i < stepsDisplay.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-0.5"
                  style={{ background: done ? "var(--navy-800)" : "var(--navy-100)" }}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Labels */}
      <div className="flex mt-1.5" style={{ gap: 0 }}>
        {stepsDisplay.map((label, i) => {
          const num = i + 1;
          const done = num < step;
          const active = num === step;
          return (
            <div
              key={i}
              className="whitespace-pre-line text-center leading-tight"
              style={{
                flex: i < stepsDisplay.length - 1 ? "1 1 0" : "none",
                width: i === stepsDisplay.length - 1 ? 60 : undefined,
                fontSize: 9.5,
                color: done ? "var(--navy-600)" : active ? "var(--navy-800)" : "var(--muted)",
                fontWeight: active ? 700 : 400,
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function MyDashboard() {
  const t = useT();
  const { lang } = useLang();

  const STEPS_DISPLAY = [t("my_step1"), t("my_step2"), t("my_step3"), t("my_step4")];

  const count = MY_SPONSORSHIPS.length;
  const totalAmount = MY_SPONSORSHIPS.reduce((s, sp) => s + sp.amount, 0);
  const letterCount = MY_SPONSORSHIPS.filter((sp) => sp.letterId).length;

  /* Badge */
  let badgeIdx = 0;
  for (let i = BADGES.length - 1; i >= 0; i--) {
    if (count >= BADGES[i].threshold) { badgeIdx = i; break; }
  }
  const badge = BADGES[badgeIdx];
  const nextBadge = BADGES[badgeIdx + 1] ?? null;
  const progressPct = nextBadge
    ? Math.min(100, ((count - badge.threshold) / (nextBadge.threshold - badge.threshold)) * 100)
    : 100;

  function getBadgeDisplayName(name: string) {
    return t(BADGE_NAME_KEYS[name] ?? "my_badge_seed");
  }

  /* Arrived letter */
  const arrivedSp = MY_SPONSORSHIPS.find((sp) => sp.letterId);
  const arrivedLetter = arrivedSp?.letterId ? letters.find((l) => l.id === arrivedSp.letterId) : null;
  const arrivedArtist = arrivedSp ? artists.find((a) => a.id === arrivedSp.artistId) : null;

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main className="max-w-[680px] mx-auto px-5 md:px-8 py-10">
        <Link
          href="/"
          className="text-xs text-muted hover:text-navy-700 transition-colors mb-6 inline-block"
        >
          {t("my_back")}
        </Link>

        {/* ── Badge / Hero card ─────────────────────────────── */}
        <div
          className="rounded-2xl p-6 mb-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg,var(--navy-800) 0%,var(--navy-900) 100%)",
          }}
        >
          {/* Decorative bg glow */}
          <div
            className="absolute -right-8 -top-8 w-52 h-52 rounded-full pointer-events-none"
            style={{ background: "var(--sv)", opacity: 0.08 }}
          />

          <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-3" style={{ color: "rgba(255,255,255,.5)" }}>
            {t("my_label")}
          </p>
          <p className="text-white font-black text-xl mb-1">{t("my_greeting")}</p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,.55)" }}>
            {t("my_supporting_pre")}{count}{t("my_supporting_post")}
          </p>

          <div className="flex items-end justify-between gap-6">
            {/* Badge + progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <BadgeIcon name={badge.name} size={52} />
                <div>
                  <p className="text-white font-black text-lg leading-none">{getBadgeDisplayName(badge.name)} {t("my_badge_suf")}</p>
                  {nextBadge && (
                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,.45)" }}>
                      <BadgeIconInline name={nextBadge.name} /> {getBadgeDisplayName(nextBadge.name)}{t("my_badge_until")} {nextBadge.threshold - count}{t("my_badge_more")}
                    </p>
                  )}
                </div>
              </div>
              {nextBadge && (
                <>
                  <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: "rgba(255,255,255,.12)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${progressPct}%`, background: "var(--sv)" }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,.3)" }}>{getBadgeDisplayName(badge.name)}</span>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,.3)" }}>{getBadgeDisplayName(nextBadge.name)} {nextBadge.threshold}회</span>
                  </div>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-5 shrink-0">
              <div className="text-right">
                <p className="text-[10px] mb-0.5" style={{ color: "rgba(255,255,255,.4)" }}>{t("my_stat_total")}</p>
                <p className="text-white font-black text-base">{totalAmount.toLocaleString()}원</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] mb-0.5" style={{ color: "rgba(255,255,255,.4)" }}>{t("my_stat_letters")}</p>
                <p className="text-white font-black text-base">{letterCount}통</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 내 후원 현황 ──────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-[17px] font-black text-navy-800 mb-4">{t("my_section_status")}</h2>
          <div className="space-y-4">
            {MY_SPONSORSHIPS.map((sp) => {
              const artist = artists.find((a) => a.id === sp.artistId)!;
              const project = projects.find((p) => p.id === sp.projectId)!;
              const letter = sp.letterId ? letters.find((l) => l.id === sp.letterId) : null;
              const pct = Math.round((project.fundedAmount / project.targetAmount) * 100);
              const d = new Date(sp.sponsoredAt);
              const dateStr = lang === "ko"
                ? `${d.getMonth() + 1}월 ${d.getDate()}일 후원`
                : `Gifted ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

              return (
                <div
                  key={sp.id}
                  className="rounded-xl border overflow-hidden"
                  style={{
                    background: letter ? "var(--chiffon)" : "var(--card)",
                    borderColor: letter ? "rgba(194,164,63,.4)" : "var(--line)",
                    boxShadow: letter
                      ? "0 4px 24px rgba(194,164,63,.14)"
                      : "0 1px 4px rgba(23,29,43,.05)",
                  }}
                >
                  {/* Letter arrived ribbon */}
                  {letter && (
                    <div
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-black"
                      style={{ background: "var(--sv)", color: "var(--ink)" }}
                    >
                      <span>✉️</span>
                      {t("my_letter_arrived")}
                    </div>
                  )}

                  <div className="p-4">
                    {/* Artist + project header */}
                    <div className="flex gap-3 mb-3">
                      <div
                        className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 mt-0.5"
                        style={{ borderColor: "var(--sv-soft)" }}
                      >
                        <Image
                          src={artist.profileImage}
                          alt={artist.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="font-bold text-navy-800 text-sm">{artist.name}</span>
                          <time className="text-[10px] text-muted shrink-0">{dateStr}</time>
                        </div>
                        <p className="text-xs text-navy-600 truncate">{project.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "var(--navy-100)", color: "var(--navy-700)" }}
                          >
                            {sp.amount.toLocaleString()}원
                          </span>
                          <span className="text-[10px] text-muted">{t("my_pct_suf").replace("%", `${pct}%`)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Material */}
                    <p className="text-[11px] mb-1 truncate" style={{ color: "var(--muted)" }}>
                      <span className="font-semibold" style={{ color: "var(--navy-600)" }}>{t("my_material_pre")}</span>
                      {sp.material}
                    </p>

                    {/* Delivery tracker */}
                    <DeliveryTracker step={sp.deliveryStep} stepsDisplay={STEPS_DISPLAY} />

                    {/* Letter preview + CTA */}
                    {letter && (
                      <div
                        className="mt-4 pt-4"
                        style={{ borderTop: "1px solid rgba(194,164,63,.28)" }}
                      >
                        <p
                          className="font-myeongjo text-[13.5px] leading-relaxed mb-3"
                          style={{ color: "var(--navy-700)" }}
                        >
                          "{letter.letter.title}"
                        </p>
                        <Link
                          href={`/my/letters/${sp.letterId}`}
                          className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
                          style={{ background: "var(--navy-800)", color: "var(--chiffon)" }}
                        >
                          {t("my_letter_btn")}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 받은 편지함 ───────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-black text-navy-800">{t("my_section_inbox")}</h2>
            <Link
              href="/my/letters"
              className="text-xs font-semibold transition-colors hover:opacity-70"
              style={{ color: "var(--navy-600)" }}
            >
              {t("my_inbox_all_pre")}{letters.length}{t("my_inbox_all_suf")}
            </Link>
          </div>

          {arrivedLetter && arrivedArtist ? (
            <Link
              href={`/my/letters/${arrivedSp!.letterId}`}
              className="group flex gap-4 items-start rounded-xl p-4 border transition-all hover:shadow-card"
              style={{ background: "var(--chiffon)", borderColor: "rgba(194,164,63,.22)" }}
            >
              <div
                className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 mt-0.5"
                style={{ borderColor: "var(--sv-soft)" }}
              >
                <Image
                  src={arrivedArtist.profileImage}
                  alt={arrivedArtist.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="font-bold text-navy-800 text-sm">{arrivedArtist.name}</span>
                  <time className="text-[11px] text-muted shrink-0">
                    {new Date(arrivedLetter.letter.createdAt).getMonth() + 1}월{" "}
                    {new Date(arrivedLetter.letter.createdAt).getDate()}일
                  </time>
                </div>
                <p className="font-myeongjo text-navy-700 text-[13px] leading-snug mb-1 truncate">
                  {arrivedLetter.letter.title}
                </p>
                <p className="text-xs text-muted line-clamp-1">
                  {arrivedLetter.letter.content
                    .replace(/\n/g, " ")
                    .replace(/Dear Theo,.*$/, "")
                    .trim()
                    .slice(0, 70)}…
                </p>
              </div>
              <span className="text-navy-300 group-hover:text-navy-500 transition-colors text-base mt-1 shrink-0">
                ›
              </span>
            </Link>
          ) : (
            <div
              className="rounded-xl p-8 text-center border"
              style={{ background: "var(--chiffon)", borderColor: "rgba(194,164,63,.2)" }}
            >
              <p className="font-myeongjo text-sm text-muted">{t("my_inbox_empty")}</p>
              <p className="text-xs text-muted mt-1">{t("my_inbox_empty_sub")}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
