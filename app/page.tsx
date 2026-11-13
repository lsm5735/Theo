"use client";

import Link from "next/link";
import Header from "@/components/Header";
import BigTitle from "@/components/BigTitle";
import ArtistCard from "@/components/ArtistCard";
import artists from "@/data/artists.json";
import { useT } from "@/contexts/LangContext";
import { INQUIRY_EMAIL } from "@/lib/site";

const LEFT = "md:w-[calc((100vw-var(--gap)*2)*0.25-1.5rem)] shrink-0";
const RIGHT = "w-full md:w-[calc((100vw-var(--gap)*2)*0.75)] lp-fit";
// 서비스 소개서 요청 — 누르면 메일 작성 창이 열린다 (받는 사람: INQUIRY_EMAIL)
const DECK_MAILTO =
  `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent("[테오] 서비스 소개서 요청")}` +
  `&body=${encodeURIComponent("안녕하세요, 테오 서비스 소개서를 요청드립니다.\n\n이름:\n소속·역할 (작가 / 후원자 / 기관 등):\n회신받을 이메일:\n")}`;

const SERIF = { fontFamily: "'PT Serif','Noto Sans KR',serif", fontWeight: 400 } as const;

/** 레퍼런스식 2단 행 — 왼쪽 라벨(25%) / 오른쪽 본문(75%) */
function Row({ label, children, id, tone = "paper", rule = true }: { label: string; children: React.ReactNode; id?: string; tone?: "paper" | "ink" | "sun"; rule?: boolean }) {
  return (
    <section className={`px-[var(--gap)] ${tone === "ink" ? "tone-ink" : tone === "sun" ? "tone-sun" : ""}`} id={id}>
      <div className="flex flex-col md:flex-row py-24 md:py-40 gap-6 md:gap-0">
        <div className={LEFT}>
          <span className="type-section lp-label">{label}</span>
        </div>
        <div className={RIGHT}>{children}</div>
      </div>
      {rule && tone === "paper" && <hr className="dots-x" />}
    </section>
  );
}


const PROGRAMS = [
  { name: "팝업 전시 [CONTINUE]", date: "11. 28 – 11. 29" },
  { name: "오픈 스튜디오", date: "11. 28" },
  { name: "라이브 페인팅", date: "11. 28" },
  { name: "Theo 아트 나이트", date: "11. 28" },
];

const STEPS = [
  {
    n: "01", label: "ARTIST", title: "작가님이 새로운 프로젝트를 등록해요", img: "/how/step-1.jpg",
    items: [
      "새로 시작하려는 작품의 구상과 필요한 재료 목록을 올립니다.",
      "작가님의 아틀리에에 입장해 새로운 작품을 준비하기 위한 과정을 살펴보세요.",
      "내가 응원하고 싶은 작가님이 테오에 없다면, 테오에게 작가님 초대를 요청해주세요.",
    ],
  },
  {
    n: "02", label: "GIFTER", title: "물감을 골라 선물하세요", img: "/how/step-2.jpg",
    items: [
      "다음 작품을 만들기 위한 재료를 선물해 보세요.",
      "QR 혹은 온라인 링크를 통해 쉽게 선물할 수 있어요.",
      "마음에 드는 재료를 골라 결제해주세요.",
      "선물은 작가님의 작업실로 안전하게 배송해드립니다.",
    ],
  },
  {
    n: "03", label: "WALL", title: "아틀리에 담벼락에서 창작 과정을 함께 해요", img: "/how/step-3.jpg",
    items: [
      "선물이 작업실에 도착하면 담벼락에 도착 인증 사진이 올라와요.",
      "선물한 테오도 응원 메세지를 남길 수 있어요.",
      "작품이 만들어지는 과정과 완성된 작품의 사진을 확인해보세요.",
    ],
  },
  {
    n: "04", label: "THANK YOU", title: "작품이 완성되면 선물이 와요", img: "/how/step-4.jpg",
    items: ["작품으로 만들어지는 굿즈", "전시회 초대권", "커뮤니티 입장권", "작품 선구매권", "더 많은 혜택이 열립니다."],
  },
];

export default function Home() {
  const t = useT();

  return (
    <div className="min-h-screen bg-paper" id="start">
      <Header />

      <main>
        {/* ═══ HERO 타이틀 ═══ */}
        <section className="px-[var(--gap)]">
          {/* 슬로건 — 큰 사진을 뒷 배경으로 */}
          <div className="relative -mx-[var(--gap)] px-[var(--gap)] pt-24 md:pt-44 overflow-hidden text-[var(--theo-yellow)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero-museum.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-navy-900/45" />
            <div data-sr="fade" className="relative pr-[calc(var(--gap)*0.5)] md:pr-[var(--gap)] pb-24 md:pb-44">
              <BigTitle text={"GIVE PAINT,\nNOT FLOWERS"} typing />
            </div>
          </div>
          <hr className="dots-x" />

          {/* ═══ 1. INTRO ═══ */}
          <div className="flex flex-col md:flex-row py-24 md:py-40 gap-6 md:gap-0">
            <div className={LEFT}>
              <span className="type-section lp-label">Intro</span>
            </div>
            <div className={RIGHT}>
              <h2 data-sr="up" className="fit-h" style={{ wordBreak: "keep-all", ...SERIF }}>
                꽃다발 대신 물감을 선물하세요.<br />
                꽃은 시들지만 물감은 작품으로 피어납니다.
              </h2>
              <div data-sr="up" data-d="1" className="fit-p leading-[1.85] mt-8 text-muted space-y-3" style={{ wordBreak: "keep-all" }}>
                <p>테오는 당신의 ‘응원하고 싶은 마음’을 응원합니다. 작품을 사지 않더라도 작가를 아끼는 그 마음을 누구보다 잘 알기에.</p>
                <p>꽃에는 작가를 응원하는 소중한 마음이 담겨 있었습니다. 다만 꽃은 며칠이면 시들어 버립니다.</p>
                <p>꽃 대신 물감을 선물하고, 그 물감이 작품이 되는 과정에 당신이 함께할 수 있다면</p>
              </div>
            </div>
          </div>
          <hr className="dots-x" />
        </section>

        {/* ═══ 2. THEO STORY ═══ */}
        <Row label="Theo Story" tone="ink">
          <h2 data-sr="up" className="statement fit-h text-sun mb-8">
            모두의 고흐가 되기 전<br />
            나만의 고흐를 만나보세요.
          </h2>
          <div data-sr="up" data-d="1" className="fit-p leading-[1.85] text-muted space-y-3" style={{ wordBreak: "keep-all" }}>
            <p>반 고흐에게는 평생 그를 응원해준 동생 테오가 있었기에 세계가 사랑하는 명작이 탄생할 수 있었습니다.</p>
            <p>세상이 알아보기 전, 당신이 먼저 발견한 예술가에게 재료를 선물하고, 위대한 작품이 태어나는 과정을 함께 만들어 보세요.</p>
          </div>
          {/* 두 버튼은 가로 너비가 같도록: 더 긴 쪽 폭에 맞춰 동일한 칸으로 나눈다 */}
          <div data-sr="up" data-d="2" className="grid grid-cols-1 sm:grid-flow-col sm:auto-cols-fr sm:w-fit gap-3 sm:gap-4 mt-12">
            <Link href="/atelier" className="nb-btn px-7 py-3 text-[15px]">
              {t("btn_patron_main")} — {t("btn_patron_sub")} →
            </Link>
            <Link href="/onboarding/artist" className="nb-btn-outline px-7 py-3 text-[15px]">
              {t("btn_artist_main")} — {t("btn_artist_sub")} →
            </Link>
          </div>
        </Row>

        {/* ═══ 3. THE GAP ═══ */}
        <Row label="The Gap">
          <h2 data-sr="up" className="fit-h mb-12" style={{ wordBreak: "keep-all", ...SERIF }}>
            미술 시장은 커지고 있다는데,<br />
            젊은 예술가들의 현실은 어떤가요?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-16">
            <div data-sr="up" data-d="1">
              <hr className="dots-x mb-5" />
              <h3 className="text-[18px] mb-4">팬의 목소리</h3>
              <p className="text-[16px] leading-[1.8] mb-4" style={{ wordBreak: "keep-all" }}>
                “작품을 사는 게 작가님께 가장 큰 도움이 된다는 걸 우리도 알아요.<br />
                그래도 매번 작품을 살 수는 없잖아요. 그럼 우리는 미술을 좋아하면 안 되나요?”
              </p>
              <p className="text-[15px] leading-[1.8] text-muted" style={{ wordBreak: "keep-all" }}>
                완성작을 사기에는 부담스럽고, SNS 좋아요나 팔로우 만으로는 아무것도 전해지지 않는 것 같아 아쉽습니다.
              </p>
            </div>
            <div data-sr="up" data-d="2">
              <hr className="dots-x mb-5" />
              <h3 className="text-[18px] mb-4">작가의 현실</h3>
              <p className="text-[16px] leading-[1.8] mb-4" style={{ wordBreak: "keep-all" }}>
                화려한 전시장에서 꽃다발 가득 축하를 받고, 다시 캄캄한 작업실에 돌아와 다음 작업을 위한 재료비를 걱정합니다.
              </p>
              <p className="text-[15px] leading-[1.8] text-muted mb-3" style={{ wordBreak: "keep-all" }}>
                새 작업을 시작하고, 전시를 열기 위해서는 재료비가 먼저 나갑니다. 작품에 대한 고민을 하기도 전에 생계를 먼저 생각하게 됩니다.
              </p>
              <p className="text-[15px] leading-[1.8] text-muted" style={{ wordBreak: "keep-all" }}>
                그럼에도 작업을 이어 갈 수 있는 건 작품을 기다려주고 전시를 보러와주는 분들이 있기 때문입니다.
              </p>
            </div>
          </div>

          <p data-sr="up" className="fit-h" style={{ wordBreak: "keep-all", ...SERIF }}>
            THEO는 그 사이를 잇는 새로운 방법을 만들어나갑니다.
          </p>
        </Row>

        {/* ═══ 4. HOW IT WORKS — 노랑 한 색 + 진행 바·화살표로 순서 표시 ═══ */}
        <Row label="How it works" id="how" rule={false}>
          <h2 data-sr="up" className="statement fit-h">
            당신의 선물은 하나의 작품을 함께 만들어가는 일입니다.
          </h2>
        </Row>
        {/* 칸 사이는 가는 선으로 나누고, 위쪽 진행 바(1/4 → 4/4)와 화살표로 순서를 보여준다 */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-[rgba(36,24,21,.4)] border-y border-[rgba(36,24,21,.4)]">
          {STEPS.map((s, i) => (
            <div key={s.n} className="swatch swatch-sun step-card relative flex flex-col px-[var(--gap)] pt-8 pb-14 md:pb-20">
              {/* 진행 바 — i+1 칸이 채워진다 */}
              <div className="flex gap-1.5 mb-5" aria-hidden="true">
                {STEPS.map((_, j) => (
                  <span key={j} className={`h-[6px] flex-1 ${j <= i ? "bg-[var(--blk)]" : "bg-[rgba(36,24,21,.18)]"}`} />
                ))}
              </div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <p className="type-numeral" aria-hidden="true">{s.n}</p>
                <p className="type-label pt-1"><span className="sr-only">{s.n}. </span>{s.label}</p>
              </div>
              <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden mb-7">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="statement lp-m mb-5 xl:min-h-[2.6em]">{s.title}</h3>
              <ul className="space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[16px] leading-[1.7]">
                    <span aria-hidden="true">–</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              {/* 다음 단계로 이어지는 화살표 (마지막 칸 제외) */}
              {i < STEPS.length - 1 && (
                <>
                  {/* 한 줄 배치(sm 이상): 오른쪽 칸으로 → . 2열일 때는 줄이 바뀌는 2번째 칸 제외 */}
                  <span aria-hidden="true" className={`step-arrow absolute z-10 top-[1.65rem] -right-[19px] w-9 h-9 items-center justify-center bg-[var(--blk)] text-[var(--sun)] text-[18px] ${i === 1 ? "hidden xl:flex" : "hidden sm:flex"}`}>→</span>
                  {/* 한 줄(모바일): 아래 칸으로 ↓ */}
                  <span aria-hidden="true" className="sm:hidden absolute z-10 left-1/2 -translate-x-1/2 -bottom-[19px] w-9 h-9 flex items-center justify-center bg-[var(--blk)] text-[var(--sun)] text-[18px]">↓</span>
                </>
              )}
            </div>
          ))}
        </section>

        {/* ═══ 5. ARTISTS ═══ */}
        <section className="px-[var(--gap)]" id="projects">
          <div className="flex flex-col md:flex-row pt-20 md:pt-32 pb-12 md:pb-16 gap-6 md:gap-0">
            <div className={LEFT}>
              <span className="type-section lp-label">Artists</span>
            </div>
            <div className={`${RIGHT} flex flex-wrap items-end justify-between gap-x-8 gap-y-4`}>
              <h2 data-sr="up" className="statement fit-h">테오와 함께하는 작가님들</h2>
              <Link href="/atelier" className="link-line text-[16px]">
                {t("projects_btn")} →
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12 pb-20 md:pb-32">
            {artists.map((artist, i) => (
              <div key={artist.id} data-sr="up" data-d={String((i % 4) + 1)}>
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 6. SHOW — 노란 블록 ═══ */}
        <Row label="Show" tone="sun">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-end">
            <div data-sr="up" className="relative aspect-[843/1191] overflow-hidden bg-surface-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/show-poster.jpg" alt="팝업 전시 [CONTINUE] 포스터" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div data-sr="up" data-d="1">
              <p className="type-label mb-5">Pop-up Exhibition</p>
              <h2 className="mb-8 leading-[.9]" style={{ fontSize: "clamp(40px, 5.6vw, 92px)" }}>[CONTINUE]</h2>
              <hr className="dots-x" />
              <p className="text-[16px] md:text-[18px] leading-[1.8] py-3">2026. 11. 28 (토) – 11. 29 (일)</p>
              <hr className="dots-x" />
              <p className="text-[16px] md:text-[18px] leading-[1.8] py-3">서울 종로구 창덕궁길 83-1</p>
              <hr className="dots-x mb-8" />
              <Link href="/show" className="en link-line text-[16px]">Read More →</Link>
            </div>
          </div>
        </Row>

        {/* ═══ 7. ARTY ═══ */}
        <Row label="Arty" id="community" rule={false}>
          <h2 data-sr="up" className="statement fit-h mb-14">
            내가 함께 만든 작품 앞에서<br />
            우리가 만납니다
          </h2>

          <div>
            {PROGRAMS.map((p, i) => (
              <div key={p.name}>
                <hr className="dots-x" />
                <Link href="/community" className="row-fill flex items-baseline justify-between gap-4 py-6 md:py-7">
                  <span className="font-display lp-m">{p.name}</span>
                  <span className="text-[16px] md:text-[17px] text-muted shrink-0">2026. {p.date}</span>
                </Link>
              </div>
            ))}
            <hr className="dots-x" />
          </div>
        </Row>

        {/* ═══ 8. CONTACT ═══ */}
        <section className="px-[var(--gap)]">
          <div className="flex flex-col md:flex-row py-28 md:py-44 gap-6 md:gap-0">
            <div className={LEFT}>
              <span className="type-section lp-label">Contact</span>
            </div>
            <div className={RIGHT}>
              <h2 data-sr="up" className="fit-h mb-8" style={{ wordBreak: "keep-all", ...SERIF }}>
                {t("cta_h2").split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <a
                data-sr="up" data-d="1"
                href={DECK_MAILTO}
                className="nb-btn px-7 py-3 text-[15px]"
              >
                {t("cta_btn")} →
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
