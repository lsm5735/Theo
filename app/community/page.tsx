"use client";

import Header from "@/components/Header";
import BigTitle from "@/components/BigTitle";
import Link from "next/link";
import artistsData from "@/data/artists.json";

type ProgramType = "팝업 전시" | "오픈 스튜디오" | "라이브 페인팅" | "Theo 아트 나이트";

interface Participant {
  name: string;
  slug: string;
  image: string;
}

interface Program {
  id: string;
  type: ProgramType;
  artists: Participant[];
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number | null;
  coverImage: string;
}

const DATE = "2026. 11. 28 (토)";
const DATE_POPUP = "2026. 11. 28 (토) – 11. 29 (일)";
const LOCATION = "서울 종로구 창덕궁길 83-1";

const byName = (name: string): Participant => {
  const a = artistsData.find((x) => x.name === name)!;
  return { name: a.name, slug: a.slug, image: a.profileImage };
};
const cover = (name: string) => artistsData.find((x) => x.name === name)!.coverImage.replace("w=1200&h=480", "w=800&h=500");

const PROGRAMS: Program[] = [
  {
    id: "prog_000",
    type: "팝업 전시",
    artists: [],
    title: "팝업 전시 [CONTINUE]",
    description: "작품이 완성되고 나서도 이어지는 창작의 시간을 전시로 만나는 이틀입니다.",
    date: DATE_POPUP,
    location: LOCATION,
    capacity: null,
    coverImage: "/hero-museum.jpg",
  },
  {
    id: "prog_001",
    type: "오픈 스튜디오",
    artists: [byName("진형")],
    title: "진형 작가 오픈 스튜디오",
    description: "작가의 작업 공간을 열어 작업 과정과 재료를 가까이에서 보고, 작가와 직접 이야기를 나눌 수 있는 시간입니다.",
    date: DATE,
    location: LOCATION,
    capacity: null,
    coverImage: cover("진형"),
  },
  {
    id: "prog_002",
    type: "라이브 페인팅",
    artists: [byName("이동구")],
    title: "이동구 작가 라이브 페인팅",
    description: "작가가 현장에서 한 점의 그림을 그려 나가는 과정을 처음부터 끝까지 함께 지켜볼 수 있습니다.",
    date: DATE,
    location: LOCATION,
    capacity: null,
    coverImage: cover("이동구"),
  },
  {
    id: "prog_003",
    type: "Theo 아트 나이트",
    artists: ["김동형", "이동구", "전예진", "진형"].map(byName),
    title: "Theo 아트 나이트",
    description: "김동형·이동구·전예진·진형, 네 작가가 함께하는 저녁입니다. 작가들과 테오가 한자리에서 만납니다.",
    date: DATE,
    location: LOCATION,
    capacity: null,
    coverImage: "/hero-museum.jpg",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        <section className="px-[var(--gap)] pt-10 md:pt-16">
          <div data-sr="fade" className="pr-[calc(var(--gap)*0.5)] md:pr-[var(--gap)] pb-8 md:pb-14">
            <BigTitle text="Community" />
          </div>
          <hr className="dots-x" />
        </section>

        {/* 소개 */}
        <section className="px-[var(--gap)]">
          <div className="flex flex-col md:flex-row py-12 md:py-16 gap-6 md:gap-0">
            <div className="md:w-[calc((100vw-var(--gap)*2)*0.25-1.5rem)] shrink-0">
              <span className="type-section">Programs</span>
            </div>
            <div className="w-full md:w-[calc((100vw-var(--gap)*2)*0.75)]">
              <p data-sr="up" className="type-m max-w-[36rem]" style={{ wordBreak: "keep-all" }}>
                작가와 직접 만나는 시간. 선물 너머 작가의 창작 현장에 함께할 수 있는 프로그램입니다.
              </p>
            </div>
          </div>
          <hr className="dots-x" />
        </section>

        {/* 프로그램 목록 — 2×2 카드. 카드에 마우스를 올리면 노랗게 채워진다 */}
        <section className="px-[var(--gap)] py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-[rgba(7,34,60,.25)] border-y border-[rgba(7,34,60,.25)]">
            {PROGRAMS.map((prog, i) => {
              const multi = prog.artists.length !== 1;
              return (
                <article key={prog.id} data-sr="up" data-d={String((i % 4) + 1)} className="prog-card bg-paper flex flex-col p-5">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-card mb-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prog.coverImage} alt={prog.title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>

                  <div className="flex flex-col gap-1 mb-3">
                    <span className="type-section">{prog.type}</span>
                    <span className="text-[14px] text-muted">{prog.date}</span>
                  </div>
                  <h2 className="type-m mb-4" style={{ fontFamily: "'PT Serif','Noto Sans KR',serif", fontWeight: 400, wordBreak: "keep-all" }}>
                    {prog.title}
                  </h2>
                  {prog.artists.length > 0 && (
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex -space-x-2 shrink-0">
                        {prog.artists.map((a) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={a.slug} src={a.image} alt={a.name} className="w-9 h-9 rounded-full object-cover border-2 border-paper" />
                        ))}
                      </div>
                      <span className="text-[15px]">{prog.artists.map((a) => a.name).join(" · ")} 작가</span>
                    </div>
                  )}
                  <p className="text-[15px] leading-[1.75] text-muted max-w-[34rem] mb-4" style={{ wordBreak: "keep-all" }}>
                    {prog.description}
                  </p>
                  <p className="text-[14px] mb-5">{prog.location}</p>
                  <Link
                    href={multi ? (prog.artists.length ? "/atelier" : "/show") : `/atelier/${prog.artists[0].slug}/apply`}
                    className="nb-btn px-6 py-2.5 text-[14px] self-start mt-auto"
                  >
                    {multi ? (prog.artists.length ? "참여 작가 보기" : "전시 보기") : "신청하기"} →
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="px-[var(--gap)] py-12 text-[14px] text-muted leading-relaxed">
          프로그램 신청 및 문의는 각 작가 아틀리에 페이지에서 가능합니다. 선물한 테오만 신청할 수 있는 프로그램이 있을 수 있습니다.
        </section>
      </main>
    </div>
  );
}
