"use client";

import Link from "next/link";
import Header from "@/components/Header";
import BigTitle from "@/components/BigTitle";
import ArtistCard from "@/components/ArtistCard";
import artists from "@/data/artists.json";
import { useT } from "@/contexts/LangContext";
import { NOTION_URL } from "@/lib/site";
import { trackNotionClick } from "@/lib/analytics";

const LEFT = "md:w-[calc((100vw-var(--gap)*2)*0.25)] shrink-0";
const RIGHT = "w-full md:w-[calc((100vw-var(--gap)*2)*0.75)]";
const BODY = "text-[16px] md:text-[18px] leading-[1.85] text-muted space-y-3 max-w-[46rem]";

type Tone = "paper" | "ink" | "sun";
const TONE: Record<Tone, string> = { paper: "", ink: "tone-ink", sun: "tone-sun" };

/** 2단 행 — 왼쪽 라벨(25%) / 오른쪽 본문(75%). tone 으로 섹션을 통째로 칠한다 */
function Row({ label, children, id, tone = "paper", rule = true }: { label: string; children: React.ReactNode; id?: string; tone?: Tone; rule?: boolean }) {
  return (
    <section className={`px-[var(--gap)] ${TONE[tone]}`} id={id}>
      <div className={`flex flex-col md:flex-row gap-6 md:gap-0 ${tone === "paper" ? "py-16 md:py-24" : "py-20 md:py-32"}`}>
        <div className={LEFT}>
          <span className="type-section md:sticky md:top-[calc(var(--header-h)+1.5rem)]">{label}</span>
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
        {/* ═══ HERO — 노란 면, 슬로건 두 줄 사이에 사진을 끼운다 ═══ */}
        <section className="tone-sun px-[var(--gap)] pt-6 md:pt-8 pb-8 md:pb-10 overflow-hidden">
          <BigTitle
            text={"GIVE PAINT,\nNOT FLOWERS"}
            typing
            between={
              <span className="relative z-10 block self-center w-full md:w-[46vw] -my-[1.2vw] md:-my-[2.4vw]">
                {/* 데스크톱: 슬로건 두 줄 + 버튼이 한 화면에 들어오도록 사진 높이를 화면 높이에서 역산 */}
                <span className="block relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-[clamp(170px,calc(100svh-var(--header-h)-22vw-11.5rem),26vw)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/hero-museum.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
                </span>
              </span>
            }
          />
          {/* 첫 화면에서 바로 시작할 수 있게 — Theo Story 의 두 버튼과 같은 것 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 md:mt-8">
            <Link href="/bot" className="nb-btn px-7 py-3 text-[16px]">
              {t("btn_patron_main")} — {t("btn_patron_sub")} →
            </Link>
            <Link href="/onboarding/artist" className="nb-btn-outline px-7 py-3 text-[16px]">
              {t("btn_artist_main")} — {t("btn_artist_sub")} →
            </Link>
          </div>
        </section>

        {/* ═══ 1. INTRO ═══ */}
        <Row label="Intro">
          <h2 data-sr="up" className="statement type-xl">
            꽃다발 대신 물감을 선물하세요.<br />
            꽃은 시들지만 물감은 작품으로 피어납니다.
          </h2>
          <div data-sr="up" data-d="1" className={`${BODY} mt-10`}>
            <p>테오는 당신의 ‘응원하고 싶은 마음’을 응원합니다. 작품을 사지 않더라도 작가를 아끼는 그 마음을 누구보다 잘 알기에.</p>
            <p>꽃에는 작가를 응원하는 소중한 마음이 담겨 있었습니다. 다만 꽃은 며칠이면 시들어 버립니다.</p>
            <p>꽃 대신 물감을 선물하고, 그 물감이 작품이 되는 과정에 당신이 함께할 수 있다면</p>
          </div>
        </Row>

        {/* ═══ 2. THEO STORY — 잉크 블록 ═══ */}
        <Row label="Theo Story" tone="ink">
          <h2 data-sr="up" className="statement type-xl text-sun mb-10">
            모두의 고흐가 되기 전<br />
            나만의 고흐를 만나보세요.
          </h2>
          <div data-sr="up" data-d="1" className={BODY}>
            <p>반 고흐에게는 평생 그를 응원해준 동생 테오가 있었기에 세계가 사랑하는 명작이 탄생할 수 있었습니다.</p>
            <p>세상이 알아보기 전, 당신이 먼저 발견한 예술가에게 재료를 선물하고, 위대한 작품이 태어나는 과정을 함께 만들어 보세요.</p>
          </div>
          <div data-sr="up" data-d="2" className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-14">
            <Link href="/bot" className="nb-btn px-7 py-3 text-[16px]">
              {t("btn_patron_main")} — {t("btn_patron_sub")} →
            </Link>
            <Link href="/onboarding/artist" className="nb-btn-outline px-7 py-3 text-[16px]">
              {t("btn_artist_main")} — {t("btn_artist_sub")} →
            </Link>
          </div>
        </Row>

        {/* ═══ 3. THE GAP ═══ */}
        <Row label="The Gap">
          <h2 data-sr="up" className="statement type-l mb-14">
            미술 시장은 커지고 있다는데,<br />
            젊은 예술가들의 현실은 어떤가요?
          </h2>

          {/* 두 목소리 — 가운데 점선을 사이에 두고 마주 본다 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-y-12 md:gap-x-10 mb-20">
            <div data-sr="up" data-d="1">
              <h3 className="text-[16px] mb-6">팬의 목소리</h3>
              <p className="statement type-m mb-6">
                “작품을 사는 게 작가님께 가장 큰 도움이 된다는 걸 우리도 알아요.<br />
                그래도 매번 작품을 살 수는 없잖아요. 그럼 우리는 미술을 좋아하면 안 되나요?”
              </p>
              <p className="text-[16px] md:text-[17px] leading-[1.85] text-muted">
                완성작을 사기에는 부담스럽고, SNS 좋아요나 팔로우 만으로는 아무것도 전해지지 않는 것 같아 아쉽습니다.
              </p>
            </div>
            <hr className="dots-x md:hidden" />
            <div className="dots-y hidden md:block" aria-hidden="true" />
            <div data-sr="up" data-d="2">
              <h3 className="text-[16px] mb-6">작가의 현실</h3>
              <p className="statement type-m mb-6">
                화려한 전시장에서 꽃다발 가득 축하를 받고, 다시 캄캄한 작업실에 돌아와 다음 작업을 위한 재료비를 걱정합니다.
              </p>
              <p className="text-[16px] md:text-[17px] leading-[1.85] text-muted mb-3">
                새 작업을 시작하고, 전시를 열기 위해서는 재료비가 먼저 나갑니다. 작품에 대한 고민을 하기도 전에 생계를 먼저 생각하게 됩니다.
              </p>
              <p className="text-[16px] md:text-[17px] leading-[1.85] text-muted">
                그럼에도 작업을 이어 갈 수 있는 건 작품을 기다려주고 전시를 보러와주는 분들이 있기 때문입니다.
              </p>
            </div>
          </div>

          <p data-sr="up" className="statement type-xl">
            THEO는 그 사이를 잇는 새로운 방법을 만들어나갑니다.
          </p>
        </Row>

        {/* ═══ 4. HOW IT WORKS — 실제 순서이므로 숫자를 크게 ═══ */}
        <Row label="How it works" id="how">
          <h2 data-sr="up" className="statement type-l mb-14">
            당신의 물감 선물은 하나의 작품을 함께 완성시키는 일입니다.
          </h2>

          <div>
            {STEPS.map((s) => (
              <div key={s.n}>
                <hr className="dots-x" />
                <div className="grid grid-cols-[auto_1fr] md:grid-cols-[8.5rem_16rem_1fr] lg:grid-cols-[11rem_19rem_1fr] gap-x-5 md:gap-x-10 gap-y-6 py-8 md:py-12">
                  <p className="type-numeral" aria-hidden="true">{s.n}</p>
                  <div data-sr="up" className="relative aspect-[4/3] md:aspect-[4/5] overflow-hidden bg-surface-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div data-sr="up" data-d="1" className="col-span-2 md:col-span-1">
                    <p className="type-label mb-4"><span className="sr-only">{s.n}. </span>{s.label}</p>
                    <h3 className="statement type-m mb-6">{s.title}</h3>
                    <ul className="space-y-2">
                      {s.items.map((it) => (
                        <li key={it} className="flex gap-3 text-[16px] md:text-[17px] leading-[1.75] text-muted">
                          <span aria-hidden="true">–</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Row>

        {/* ═══ 5. ARTISTS ═══ */}
        <section className="px-[var(--gap)]" id="projects">
          <div className="flex flex-col md:flex-row pt-16 md:pt-24 pb-10 md:pb-14 gap-6 md:gap-0">
            <div className={LEFT}>
              <span className="type-section">Artists</span>
            </div>
            <div className={`${RIGHT} flex flex-wrap items-end justify-between gap-x-8 gap-y-4`}>
              <h2 data-sr="up" className="statement type-l">테오와 함께하는 작가님들</h2>
              <Link href="/atelier" className="link-line text-[16px]">
                {t("projects_btn")} →
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12 pb-16 md:pb-24">
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
            <div data-sr="up" className="relative aspect-[1/1.1] overflow-hidden bg-surface-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/how/step-4.jpg" alt="팝업 전시 [CONTINUE]" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div data-sr="up" data-d="1">
              <p className="type-label mb-5">Pop-up Exhibition</p>
              <h2 className="mb-8 leading-[.9]" style={{ fontSize: "clamp(40px, 5.6vw, 92px)" }}>[CONTINUE]</h2>
              <hr className="dots-x" />
              <p className="text-[16px] md:text-[18px] leading-[1.8] py-3">2026. 11. 28 (토) – 11. 29 (일)</p>
              <hr className="dots-x" />
              <p className="text-[16px] md:text-[18px] leading-[1.8] py-3">서울 종로구 창덕궁길 83-1</p>
              <hr className="dots-x mb-8" />
              <Link href="/show" className="link-line text-[16px]">Read More →</Link>
            </div>
          </div>
        </Row>

        {/* ═══ 7. ARTY ═══ */}
        <Row label="Arty" id="community" rule={false}>
          <h2 data-sr="up" className="statement type-xl mb-14">
            내가 함께 만든 작품 앞에서<br />
            우리가 만납니다
          </h2>

          <div>
            {PROGRAMS.map((p) => (
              <div key={p.name}>
                <hr className="dots-x" />
                <Link href="/community" className="row-fill flex items-baseline justify-between gap-4 py-5 md:py-6">
                  <span className="font-display type-l">{p.name}</span>
                  <span className="text-[15px] md:text-[17px] text-muted shrink-0">2026. {p.date}</span>
                </Link>
              </div>
            ))}
            <hr className="dots-x" />
          </div>
        </Row>

        {/* ═══ 8. CONTACT — 잉크 블록 ═══ */}
        <Row label="Contact" tone="ink">
          <h2 data-sr="up" className="statement type-xl mb-12 max-w-[44rem]">
            {t("cta_h2").split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <a
            data-sr="up" data-d="1"
            href={NOTION_URL} target="_blank" rel="noopener noreferrer"
            onClick={() => trackNotionClick("landing_cta")}
            className="nb-btn px-8 py-3 text-[16px]"
          >
            {t("cta_btn")} →
          </a>
        </Row>
      </main>
    </div>
  );
}
