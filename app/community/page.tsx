"use client";

import Header from "@/components/Header";
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

const TYPE_STYLE: Record<ProgramType, { dot: string; badgeBg: string; badgeText: string }> = {
  "팝업 전시":       { dot: "#517CA4", badgeBg: "#EBF0F4", badgeText: "#376590" },
  "오픈 스튜디오":   { dot: "#20517E", badgeBg: "#DDE5EE", badgeText: "#1B3A5C" },
  "라이브 페인팅":   { dot: "#0D3B66", badgeBg: "#D4DCE8", badgeText: "#0D3B66" },
  "Theo 아트 나이트": { dot: "#C2A43F", badgeBg: "#F4E8C0", badgeText: "#58450E" },
};

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

      {/* Hero */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pt-14 pb-10">
        <p data-sr="fade" className="nb-tag mb-5">
          COMMUNITY
        </p>
        <h1 data-sr="up" className="text-[34px] md:text-[52px] font-semibold text-ink leading-[1.1]">
          작가와 직접 만나는 시간
        </h1>
        <p data-sr="up" data-d="1" className="text-muted text-sm md:text-base mt-3 leading-relaxed max-w-[560px]">
          팝업 전시, 오픈 스튜디오, 라이브 페인팅, Theo 아트 나이트.
          <br className="hidden md:block" />
          선물 너머 작가의 창작 현장에 함께할 수 있는 프로그램입니다.
        </p>
      </section>

      {/* 카드 그리드 */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROGRAMS.map((prog, index) => {
            const s = TYPE_STYLE[prog.type];
            const multi = prog.artists.length !== 1;
            return (
              <article
                key={prog.id}
                data-sr="up"
                data-d={String((index % 4) + 1)}
                className="bg-card border border-line rounded-2xl overflow-hidden flex flex-col"
              >
                {/* 커버 이미지 */}
                <div className="relative w-full h-44 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={prog.coverImage} alt={prog.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
                  <span
                    className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full"
                    style={{ background: s.badgeBg, color: s.badgeText }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
                    {prog.type}
                  </span>
                  {prog.capacity !== null && (
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-bold bg-black/75 text-white px-2 py-1 rounded-full">
                      정원 {prog.capacity}명
                    </span>
                  )}
                </div>

                {/* 내용 */}
                <div className="p-4 flex flex-col flex-1">
                  {/* 작가 */}
                  {prog.artists.length > 0 && <div className="flex items-center gap-2 mb-2.5">
                    <div className="flex -space-x-1.5 shrink-0">
                      {prog.artists.map((a) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={a.slug}
                          src={a.image}
                          alt={a.name}
                          className="w-6 h-6 rounded-full object-cover border border-white"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-navy-500 font-semibold leading-snug">
                      {prog.artists.map((a) => a.name).join(" · ")} 작가
                    </span>
                  </div>}

                  <h2 className="text-[14.5px] font-bold text-ink leading-snug mb-1.5">{prog.title}</h2>

                  <p className="text-[12px] text-navy-600 leading-[1.75] mb-3 flex-1">{prog.description}</p>

                  {/* 일정·장소 */}
                  <div className="bg-navy-100 rounded-lg px-3 py-2.5 mb-3 space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="text-[9.5px] font-bold tracking-[0.1em] text-navy-400 uppercase shrink-0 pt-px w-7">날짜</span>
                      <span className="text-[11px] text-navy-800 font-medium leading-snug">{prog.date}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[9.5px] font-bold tracking-[0.1em] text-navy-400 uppercase shrink-0 pt-px w-7">장소</span>
                      <span className="text-[11px] text-navy-800 font-medium leading-snug">{prog.location}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={multi ? "/atelier" : `/atelier/${prog.artists[0].slug}/apply`}
                    className="block w-full text-center text-[11.5px] font-bold bg-navy-900 text-white py-2 rounded-lg hover:bg-navy-800 transition-colors"
                  >
                    {multi ? (prog.artists.length ? "참여 작가 보기" : "아틀리에 보기") : "신청하기"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* 하단 안내 */}
        <div className="mt-12 text-center">
          <p className="text-[12px] text-navy-400 leading-relaxed">
            프로그램 신청 및 문의는 각 작가 아틀리에 페이지에서 가능합니다.
            <br />
            선물한 테오만 신청할 수 있는 프로그램이 있을 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
