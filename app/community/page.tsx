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
  time: string;
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
    id: "prog_001",
    type: "오픈 스튜디오",
    artists: [byName("진형")],
    title: "진형 작가 오픈 스튜디오",
    description:
      "진형 작가의 작업실 문이 열립니다.\n\n작가님의 작업실에 놀러 온 것처럼 어깨너머로 작가님이 그리는 모습을 지켜보세요.\n완성된 작품은 다른 곳에서도 볼 수 있지만 그리는 순간은 그 자리에 있어야만 만날 수 있어요.",
    date: DATE,
    time: "2:00 - 3:30 pm",
    location: LOCATION,
    capacity: null,
    coverImage: "/community-open-studio.jpg",
  },
  {
    id: "prog_002",
    type: "라이브 페인팅",
    artists: [byName("이동구")],
    title: "이동구 작가 라이브 페인팅",
    description:
      "선물한 재료로 채워지는 캔버스를 눈앞에서 라이브로 만나보세요.\n\n한 사람의 내면에 여러 모습이 함께 살듯이 그림 속 인물의 얼굴에도 여러 표정이 깃들어 있습니다. 이동구 작가의 손에서 태어나는 그 표정들을 가장 가까이에서 만나보세요.",
    date: DATE,
    time: "4:00 - 5:30 pm",
    location: LOCATION,
    capacity: null,
    coverImage: "/community-live-painting.jpg",
  },
  {
    id: "prog_003",
    type: "Theo 아트 나이트",
    artists: ["김동형", "이동구", "전예진", "진형"].map(byName),
    title: "Theo 아트 나이트",
    description:
      "Sponsored by HEINEKEN Korea (하이네켄 코리아)\n\n웰컴드링크(맥주)를 마시면서 작가와 가까이에서 이야기 나눠보세요.\n김동형·이동구·전예진·진형 네 작가가 함께하는 저녁입니다.",
    date: DATE,
    time: "1회차 6:00 - 7:00 pm / 2회차 7:00 - 8:00 pm",
    location: LOCATION,
    capacity: null,
    coverImage: "/community-art-night.jpg",
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
              <p data-sr="up" className="type-m max-w-[60rem] whitespace-pre-line" style={{ wordBreak: "keep-all" }}>
                {"작가와 직접 만나는 시간.\n선물 너머 작가의 과정에 함께할 수 있는 프로그램을 준비했습니다."}
              </p>
            </div>
          </div>
          <hr className="dots-x" />
        </section>

        {/* 프로그램 목록 — 2×2 카드. 카드에 마우스를 올리면 노랗게 채워진다 */}
        <section className="px-[var(--gap)] py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[rgba(7,34,60,.25)] border-y border-[rgba(7,34,60,.25)]">
            {PROGRAMS.map((prog, i) => {
              const multi = prog.artists.length !== 1;
              return (
                <article key={prog.id} data-sr="up" data-d={String((i % 4) + 1)} className="prog-card bg-paper flex flex-col p-5 md:last:col-span-2 xl:last:col-span-1">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-card mb-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prog.coverImage} alt={prog.title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>

                  <h2 className="type-m mb-4" style={{ fontFamily: "'PT Serif','Noto Sans KR',serif", fontWeight: 700, wordBreak: "keep-all" }}>
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
                  {(() => {
                    // 설명의 첫 줄은 굵게 (작가 이름 바로 아래 한 줄)
                    const [head, ...rest] = prog.description.split("\n");
                    return (
                      <p className="text-[15px] leading-[1.75] text-muted max-w-[34rem] mb-4 whitespace-pre-line" style={{ wordBreak: "keep-all" }}>
                        <strong className="font-bold text-ink">{head}</strong>
                        {rest.length > 0 ? "\n" + rest.join("\n") : ""}
                      </p>
                    );
                  })()}
                  {/* 주소와 버튼을 카드 맨 아래에 붙여서, 카드마다 주소 위치가 같게 한다 */}
                  <div className="mt-auto pt-10 flex flex-col items-start">
                    <p className="text-[15px] md:text-[14px] text-ink mb-1.5">
                      {prog.date} {prog.time}
                    </p>
                    <p className="text-[15px] md:text-[14px] text-ink mb-5">{prog.location}</p>
                    <Link
                      href={multi ? (prog.artists.length ? "/atelier" : "/show") : `/atelier/${prog.artists[0].slug}/apply`}
                      className="nb-btn px-6 py-2.5 text-[15px] md:text-[14px]"
                    >
                      신청하기 →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="px-[var(--gap)] py-12 text-[15px] md:text-[14px] text-muted leading-relaxed">
          프로그램 신청 및 문의는 각 작가 아틀리에 페이지에서 가능합니다. 선물한 테오만 신청할 수 있는 프로그램이 있을 수 있습니다.
        </section>
      </main>
    </div>
  );
}
