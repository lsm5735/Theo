"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";
import { useT, useLang } from "@/contexts/LangContext";
import { DictKey } from "@/lib/translations";
import { MySponsorship, useMySponsorships } from "@/lib/sponsorships";
import { MY_WALL_ID, WallPost, useArtistUpdates, useWallPosts } from "@/lib/wall";
import { MyAtelier, hostOf, useMyAtelier } from "@/lib/myAtelier";

type Role = "theo" | "gogh";

const noopSubscribe = () => () => {};
const CARD_SHADOW = { boxShadow: "0 1px 4px rgba(23,29,43,.05)" };

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

/* ─── 공통 ───────────────────────────────────────────────────────────── */
function formatDay(iso: string, lang: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return lang === "ko" ? `${d.getMonth() + 1}월 ${d.getDate()}일` : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function firstLine(text: string) {
  return text.split("\n")[0];
}

function RoleSwitch({ role, onChange }: { role: Role; onChange: (r: Role) => void }) {
  const t = useT();
  const opts: { id: Role; label: DictKey; sub: DictKey }[] = [
    { id: "theo", label: "my_role_theo", sub: "my_role_theo_sub" },
    { id: "gogh", label: "my_role_gogh", sub: "my_role_gogh_sub" },
  ];
  return (
    <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-navy-100 mb-8" role="tablist">
      {opts.map((o) => (
        <button
          key={o.id}
          role="tab"
          aria-selected={role === o.id}
          onClick={() => onChange(o.id)}
          className={`rounded-lg py-2.5 transition-all ${role === o.id ? "bg-card shadow-sm" : "hover:bg-white/50"}`}
        >
          <span className={`block text-[14px] font-black ${role === o.id ? "text-navy-900" : "text-navy-500"}`}>{t(o.label)}</span>
          <span className="block text-[10.5px] text-muted">{t(o.sub)}</span>
        </button>
      ))}
    </div>
  );
}

/* ─── 테오(후원자) ───────────────────────────────────────────────────── */
function SponsorshipCard({ sp, stepsDisplay }: { sp: MySponsorship; stepsDisplay: string[] }) {
  const t = useT();
  const { lang } = useLang();
  const artist = artists.find((a) => a.id === sp.artistId);
  const project = projects.find((p) => p.id === sp.projectId);
  if (!artist || !project) return null;
  const pct = Math.round((project.fundedAmount / project.targetAmount) * 100);

  return (
    <div className="rounded-xl border border-line overflow-hidden bg-card" style={CARD_SHADOW}>
      <div className="p-4">
        <div className="flex gap-3 mb-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 mt-0.5" style={{ borderColor: "var(--sv-soft)" }}>
            <Image src={artist.profileImage} alt={artist.name} fill sizes="44px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <span className="font-bold text-navy-800 text-sm">{artist.name}</span>
              <time className="text-[10px] text-muted shrink-0">{formatDay(sp.sponsoredAt, lang)}{t("my_date_suf")}</time>
            </div>
            <p className="text-xs text-navy-600 truncate">{project.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "var(--navy-100)", color: "var(--navy-700)" }}>
                {sp.amount.toLocaleString()}원
              </span>
              <span className="text-[10px] text-muted">{pct}{t("my_pct_suf")}</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] mb-1 truncate" style={{ color: "var(--muted)" }}>
          <span className="font-semibold" style={{ color: "var(--navy-600)" }}>{t("my_material_pre")}</span>
          {sp.material}
        </p>

        <DeliveryTracker step={sp.deliveryStep} stepsDisplay={stepsDisplay} />

        <div className="mt-4 pt-3 border-t border-navy-100">
          <Link href={`/atelier/${artist.slug}#wall`} className="text-xs font-bold text-navy-700 hover:text-navy-900 transition-colors">
            {t("my_wall_btn")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArtistUpdate({ post }: { post: WallPost }) {
  const { lang } = useLang();
  const artist = artists.find((a) => a.id === post.wallId);
  if (!artist) return null;
  return (
    <Link
      href={`/atelier/${artist.slug}#wall`}
      className="group flex gap-4 items-start rounded-xl p-4 border transition-all hover:shadow-card"
      style={{ background: "var(--chiffon)", borderColor: "rgba(194,164,63,.22)" }}
    >
      <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 mt-0.5" style={{ borderColor: "var(--sv-soft)" }}>
        <Image src={artist.profileImage} alt={artist.name} fill sizes="44px" className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="font-bold text-navy-800 text-sm">{artist.name}</span>
          <time className="text-[11px] text-muted shrink-0">{formatDay(post.createdAt, lang)}</time>
        </div>
        <p className="font-myeongjo text-navy-700 text-[13px] leading-snug truncate">{firstLine(post.text)}</p>
      </div>
      <span className="text-navy-300 group-hover:text-navy-500 transition-colors text-base mt-1 shrink-0">›</span>
    </Link>
  );
}

function TheoView() {
  const t = useT();
  const sponsorships = useMySponsorships() ?? [];
  const STEPS_DISPLAY = [t("my_step1"), t("my_step2"), t("my_step3"), t("my_step4")];
  const artistIds = [...new Set(sponsorships.map((sp) => sp.artistId))];
  const updates = useArtistUpdates(artistIds, 5) ?? [];

  const count = sponsorships.length;
  const totalAmount = sponsorships.reduce((s, sp) => s + sp.amount, 0);

  let badgeIdx = 0;
  for (let i = BADGES.length - 1; i >= 0; i--) {
    if (count >= BADGES[i].threshold) { badgeIdx = i; break; }
  }
  const badge = BADGES[badgeIdx];
  const nextBadge = BADGES[badgeIdx + 1] ?? null;
  const progressPct = nextBadge
    ? Math.min(100, ((count - badge.threshold) / (nextBadge.threshold - badge.threshold)) * 100)
    : 100;
  const badgeName = (name: string) => t(BADGE_NAME_KEYS[name] ?? "my_badge_seed");

  return (
    <>
      {/* ── 배지 카드 ── */}
      <div className="rounded-2xl p-6 mb-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,var(--navy-800) 0%,var(--navy-900) 100%)" }}>
        <div className="absolute -right-8 -top-8 w-52 h-52 rounded-full pointer-events-none" style={{ background: "var(--sv)", opacity: 0.08 }} />

        <p className="text-white font-black text-xl mb-1">{t("my_greeting")}</p>
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,.55)" }}>
          {t("my_supporting_pre")}{count}{t("my_supporting_post")}
        </p>

        <div className="flex items-end justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <BadgeIcon name={badge.name} size={52} />
              <div>
                <p className="text-white font-black text-lg leading-none">{badgeName(badge.name)} {t("my_badge_suf")}</p>
                {nextBadge && (
                  <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,.45)" }}>
                    <BadgeIconInline name={nextBadge.name} /> {badgeName(nextBadge.name)}{t("my_badge_until")} {nextBadge.threshold - count}{t("my_badge_more")}
                  </p>
                )}
              </div>
            </div>
            {nextBadge && (
              <>
                <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: "rgba(255,255,255,.12)" }}>
                  <div className="h-full rounded-full" style={{ width: `${progressPct}%`, background: "var(--sv)" }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,.3)" }}>{badgeName(badge.name)}</span>
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,.3)" }}>{badgeName(nextBadge.name)} {nextBadge.threshold}회</span>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-5 shrink-0">
            <div className="text-right">
              <p className="text-[10px] mb-0.5" style={{ color: "rgba(255,255,255,.4)" }}>{t("my_stat_total")}</p>
              <p className="text-white font-black text-base">{totalAmount.toLocaleString()}원</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] mb-0.5" style={{ color: "rgba(255,255,255,.4)" }}>{t("my_stat_artists")}</p>
              <p className="text-white font-black text-base">{artistIds.length}{t("my_people_suf")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 내 후원 현황 ── */}
      <section className="mb-10">
        <h2 className="text-[17px] font-black text-navy-800 mb-4">{t("my_section_status")}</h2>
        <div className="space-y-4">
          {sponsorships.map((sp) => (
            <SponsorshipCard key={sp.id} sp={sp} stepsDisplay={STEPS_DISPLAY} />
          ))}
        </div>
      </section>

      {/* ── 작가 소식 (담벼락) ── */}
      <section>
        <h2 className="text-[17px] font-black text-navy-800 mb-1">{t("my_section_updates")}</h2>
        <p className="text-xs text-muted mb-4">{t("my_updates_sub")}</p>
        {updates.length > 0 ? (
          <div className="space-y-3">
            {updates.map((post) => <ArtistUpdate key={post.id} post={post} />)}
          </div>
        ) : (
          <div className="rounded-xl p-8 text-center border" style={{ background: "var(--chiffon)", borderColor: "rgba(194,164,63,.2)" }}>
            <p className="font-myeongjo text-sm text-muted">{t("my_updates_empty")}</p>
          </div>
        )}
      </section>
    </>
  );
}

/* ─── 고흐(작가) ─────────────────────────────────────────────────────── */
function GoghView({ atelier }: { atelier: MyAtelier }) {
  const t = useT();
  const { lang } = useLang();
  const posts = useWallPosts(MY_WALL_ID) ?? [];
  const theoNames = new Set(posts.filter((p) => p.role === "theo").map((p) => p.authorName));
  const project = atelier.project;

  const stats = [
    { label: t("my_gogh_stat_posts"), value: posts.length },
    { label: t("my_gogh_stat_theos"), value: theoNames.size },
    { label: t("my_gogh_stat_materials"), value: atelier.materials.length },
  ];

  return (
    <>
      {/* ── 작가 카드 ── */}
      <div className="rounded-2xl p-6 mb-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,var(--navy-800) 0%,var(--navy-900) 100%)" }}>
        <div className="absolute -right-8 -top-8 w-52 h-52 rounded-full pointer-events-none" style={{ background: "var(--sv)", opacity: 0.08 }} />
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 shrink-0 bg-navy-700 flex items-center justify-center" style={{ borderColor: "var(--sv-soft)" }}>
            {atelier.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={atelier.profileImage} alt={atelier.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-black text-chiffon">{atelier.name.slice(0, 1)}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-white font-black text-xl leading-tight">{atelier.name}{t("my_gogh_greeting_suf")}</p>
            <p className="text-sm truncate" style={{ color: "rgba(255,255,255,.55)" }}>
              {atelier.oneLiner || t("my_gogh_sub")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-[10px] mb-0.5" style={{ color: "rgba(255,255,255,.4)" }}>{s.label}</p>
              <p className="text-white font-black text-lg">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-6">
          <Link href="/atelier/me" className="flex-1 text-center bg-sv text-ink font-bold text-[13px] py-2.5 rounded-lg hover:bg-sv-soft transition-colors">
            {t("my_gogh_view")}
          </Link>
          <Link href="/atelier/me?settings=profile" className="flex-1 text-center border border-white/30 text-white font-bold text-[13px] py-2.5 rounded-lg hover:bg-white/10 transition-colors">
            {t("ma_settings")}
          </Link>
        </div>
      </div>

      {/* ── 내 프로젝트 ── */}
      <section className="mb-10">
        <h2 className="text-[17px] font-black text-navy-800 mb-4">{t("ma_project_title")}</h2>
        {project ? (
          <div className="rounded-xl border border-line bg-card p-4" style={CARD_SHADOW}>
            <p className="font-bold text-navy-800 text-sm mb-1">{project.title}</p>
            <p className="text-xs text-muted line-clamp-2 mb-3">{project.concept}</p>
            <div className="w-full bg-navy-100 rounded-full h-1.5" />
            <div className="flex justify-between text-[11px] text-muted mt-1.5">
              <span>0{t("ma_pct")}</span>
              <span>{t("ma_goal")} {project.targetAmount.toLocaleString()}원</span>
            </div>
            <div className="mt-3 pt-3 border-t border-navy-100">
              <Link href="/atelier/me?settings=project" className="text-xs font-bold text-navy-700 hover:text-navy-900">
                {t("my_gogh_edit")}
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-navy-200 p-6 text-center">
            <p className="text-[13px] text-navy-600 mb-3" style={{ wordBreak: "keep-all" }}>{t("ma_project_empty_sub")}</p>
            <Link href="/atelier/me?settings=project" className="nb-btn inline-block px-5 py-2.5 rounded-lg font-black text-[13px]">
              {t("ma_project_add")}
            </Link>
          </div>
        )}
      </section>

      {/* ── 필요한 재료 ── */}
      <section className="mb-10">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-[17px] font-black text-navy-800">{t("ma_materials_title")}</h2>
          <Link href="/atelier/me?settings=materials" className="text-xs font-semibold text-navy-600 hover:opacity-70">
            {t("my_gogh_edit")}
          </Link>
        </div>
        <div className="space-y-2">
          {atelier.materials.map((m, i) => (
            <a key={i} href={m.link} target="_blank" rel="noopener noreferrer"
              className="block rounded-xl border border-line bg-card px-4 py-3 hover:border-navy-300 transition-colors">
              <p className="text-[11px] font-bold text-navy-400 mb-0.5">{hostOf(m.link)}</p>
              <p className="text-[13px] text-navy-800 line-clamp-2" style={{ wordBreak: "keep-all" }}>{m.reason}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── 최근 담벼락 ── */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-[17px] font-black text-navy-800">{t("my_gogh_wall")}</h2>
          <Link href="/atelier/me#wall" className="text-xs font-semibold text-navy-600 hover:opacity-70">
            {t("my_gogh_wall_btn")}
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="space-y-2">
            {posts.slice(0, 3).map((p) => (
              <div key={p.id} className="rounded-xl border border-line bg-card px-4 py-3">
                <div className="flex justify-between gap-2 mb-0.5">
                  <span className="text-[12px] font-bold text-navy-700">
                    {p.role === "artist" ? t("wall_role_artist") : p.authorName}
                  </span>
                  <time className="text-[11px] text-muted">{formatDay(p.createdAt, lang)}</time>
                </div>
                <p className="text-[13px] text-ink line-clamp-2">{p.text || "📷"}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl p-6 text-center border" style={{ background: "var(--chiffon)", borderColor: "rgba(194,164,63,.2)" }}>
            <p className="text-[13px] text-muted mb-3" style={{ wordBreak: "keep-all" }}>{t("my_gogh_wall_empty")}</p>
            <Link href="/atelier/me#wall" className="text-xs font-bold text-navy-800 underline underline-offset-2">
              {t("my_gogh_wall_btn")}
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

function GoghEmpty() {
  const t = useT();
  return (
    <div className="rounded-2xl border-2 border-dashed border-navy-200 p-10 text-center">
      <p className="text-[15px] font-black text-navy-800 mb-2">{t("my_gogh_empty")}</p>
      <p className="text-[13px] text-muted mb-6" style={{ wordBreak: "keep-all" }}>{t("my_gogh_empty_sub")}</p>
      <Link href="/onboarding/artist" className="nb-btn inline-block px-6 py-3 rounded-xl font-black text-[14px]">
        {t("ma_empty_btn")}
      </Link>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function MyDashboard() {
  const t = useT();
  const atelier = useMyAtelier();
  const urlRole = useSyncExternalStore(
    noopSubscribe,
    () => (new URLSearchParams(window.location.search).get("role") === "gogh" ? "gogh" : null),
    () => null
  );
  const [picked, setPicked] = useState<Role | null>(null);
  const role: Role = picked ?? urlRole ?? "theo";

  function changeRole(r: Role) {
    setPicked(r);
    const url = new URL(window.location.href);
    if (r === "gogh") url.searchParams.set("role", "gogh");
    else url.searchParams.delete("role");
    window.history.replaceState(null, "", url);
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main className="max-w-[680px] mx-auto px-5 md:px-8 py-10">
        <Link href="/" className="text-xs text-muted hover:text-navy-700 transition-colors mb-6 inline-block">
          {t("my_back")}
        </Link>
        <p className="text-[10px] font-black tracking-[0.22em] uppercase text-navy-400 mb-3">{t("my_label")}</p>

        <RoleSwitch role={role} onChange={changeRole} />

        {role === "theo" ? (
          <TheoView />
        ) : atelier === undefined ? null : atelier ? (
          <GoghView atelier={atelier} />
        ) : (
          <GoghEmpty />
        )}
      </main>
    </div>
  );
}
