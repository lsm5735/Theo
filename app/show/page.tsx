import Header from "@/components/Header";
import BigTitle from "@/components/BigTitle";
import Link from "next/link";
import Image from "next/image";
import artists from "@/data/artists.json";

export const metadata = {
  title: "Show — Theo",
  description: "팝업 전시 [CONTINUE]",
};

const INFO = [
  { label: "전시명", value: "CONTINUE : What comes Next?" },
  { label: "일정", value: "2026. 11. 28 (토) – 11. 29 (일)" },
  { label: "장소", value: "서울 종로구 창덕궁길 83-1" },
];

const PROGRAM = [
  {
    date: "11. 28",
    day: "토",
    items: [
      {
        times: ["2:00 – 3:30 pm"],
        title: "진형 오픈 스튜디오",
        desc: "진형 작가님의 작업실이 이곳에 열립니다. 작품이 만들어지는 과정을 지켜보세요.",
      },
      {
        times: ["4:00 – 5:30 pm"],
        title: "이동구 라이브 페인팅",
        desc: "선물한 재료로 채워지는 캔버스를 눈앞에서 라이브로 만나보세요.",
      },
      {
        times: ["1회차  6:00 – 7:00 pm", "2회차  7:00 – 8:00 pm"],
        title: "Theo 아트 나이트",
        desc: "웰컴드링크와 함께 작가와 가까이에서 이야기 나눠보세요.",
        note: "sponsored by 하이네켄 코리아",
      },
    ],
  },
  {
    date: "11. 29",
    day: "일",
    items: [
      {
        times: [] as string[],
        title: "자유관람",
        desc: "",
      },
    ],
  },
];

const GUIDE = [
  {
    title: "물감을 선물해 보세요",
    desc: "전시가 시작되기 전, 좋아하는 작가에게 꽃다발 대신 물감을 선물해 보세요.\n작가의 아틀리에 페이지에서 선물할 수 있어요.",
    badge: "11. 16 – 26 얼리버드 · 배송비 무료, 할인",
    badgeHref: "https://smartstore.naver.com/atheoart",
  },
  {
    title: "응원 메시지를 남겨요",
    desc: "아틀리에 담벼락은 작가와 여러분이 함께 채워가요.\n여러 소식들이 올라오니 기대해주세요.",
  },
  {
    title: "전시장에서 만나요",
    desc: "현장에서 선물 구매를 인증해 주시면 리워드를 드려요. (엽서, 포스터)\n다양한 행사 초대장도 보내드려요!",
  },
  {
    title: "작품이 완성되길 기다려요",
    desc: "내가 선물한 물감이 작가의 작업실에 도착하고, 작품이 되어가는 모습이 아틀리에에 올라와요.\n당신이 고른 색은 어떤 장면이 될까요?",
  },
];

const LEFT = "md:w-[calc((100vw-var(--gap)*2)*0.25-1.5rem)] shrink-0";
const RIGHT = "w-full md:w-[calc((100vw-var(--gap)*2)*0.75)]";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="px-[var(--gap)]">
      <div className="flex flex-col md:flex-row py-12 md:py-16 gap-6 md:gap-0">
        <div className={LEFT}>
          <span className="type-section">{label}</span>
        </div>
        <div className={RIGHT}>{children}</div>
      </div>
      <hr className="dots-x" />
    </section>
  );
}

export default function ShowPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        <section className="px-[var(--gap)] pt-10 md:pt-16">
          <div data-sr="fade" className="pr-0 md:pr-[var(--gap)] pb-8 md:pb-14">
            <BigTitle text="[CONTINUE]" />
          </div>
          <hr className="dots-x" />
        </section>

        {/* 전시 이미지 */}
        <section className="pb-12 md:pb-16">
          {/* 이미 반으로 나뉜 포스터 두 장(왼쪽 = 작품 4점 1437×904, 오른쪽 = CONTINUE·작가·장소 1432×863)을 가로로 나란히 붙인다. 화면 폭 끝까지 꽉 채운다. 두 칸의 높이를 같게 맞추기 위해 비율은 오른쪽(글자가 있는 쪽)에 맞추고, 왼쪽 작품 이미지를 살짝 위·아래로 자른다. 폰(md 미만)에서는 위·아래로 이어 붙인다 */}
          <div data-sr="up" role="img" aria-label="[CONTINUE] 전시 포스터" className="grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden bg-surface-card">
            <div className="relative aspect-[1432/863] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/show-poster-left.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
            </div>
            <div className="relative aspect-[1432/863] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/show-poster-right.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
          <div className="px-[var(--gap)]"><hr className="dots-x mt-12 md:mt-16 max-md:hidden" /></div>
        </section>

        <Row label="Info">
          <dl>
            {INFO.map((i, n) => (
              <div key={i.label}>
                {n > 0 && <hr className="dots-x" />}
                <div data-sr="up" className="grid grid-cols-[4.25rem_1fr] md:grid-cols-[10rem_1fr] gap-3 md:gap-4 py-5">
                  <dt className="type-label text-muted pt-2">{i.label}</dt>
                  <dd className="type-m">{i.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Row>

        <Row label="Program">
          <div className="space-y-10 md:space-y-12">
            {PROGRAM.map((d) => (
              <div key={d.date}>
                <div data-sr="up" className="flex items-baseline gap-3 pb-4">
                  <span className="type-m font-bold">{d.date}</span>
                  <span className="type-label text-muted">({d.day})</span>
                </div>
                <hr className="dots-x" />
                <ul>
                  {d.items.map((p, n) => (
                    <li key={p.title}>
                      {n > 0 && <hr className="dots-x" />}
                      <div data-sr="up" className="grid grid-cols-1 md:grid-cols-[13rem_1fr] gap-2 md:gap-4 py-5">
                        <div className="type-label text-muted md:pt-1.5 space-y-1">
                          {p.times.map((t) => (
                            <div key={t}>{t}</div>
                          ))}
                        </div>
                        <div>
                          <h3 className="text-[19px] max-md:text-[17px] font-bold leading-snug">{p.title}</h3>
                          {p.desc && (
                            <p className="mt-2 text-[16px] max-md:text-[14.5px] leading-[1.8] text-muted" style={{ wordBreak: "keep-all" }}>
                              {p.desc}
                            </p>
                          )}
                          {p.note && <p className="mt-1.5 type-label text-muted">{p.note}</p>}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Row>

        <Row label="About">
          <p data-sr="up" className="type-m max-md:font-bold max-md:text-[21px]! max-w-[44rem] mb-8" style={{ wordBreak: "keep-all" }}>
            당신의 색으로 만들어질 다음 장면은 무엇일까요?
          </p>
          <div className="space-y-8 max-w-[56rem]">
            <p data-sr="up" className="text-[16.5px] max-md:text-[14.5px] leading-[1.95] text-muted whitespace-pre-line max-md:whitespace-normal" style={{ wordBreak: "keep-all" }}>
              {"그림이 태어나는 과정을 보러 오세요.\n이곳에서 관객은 꽃다발 대신 물감을 보냅니다.\n당신이 고른 색은 작가에게 도착하고, 작가의 손을 거쳐 새로운 장면이 됩니다.\n누군가의 마음이 재료가 되고, 그 재료는 하나의 작품으로 피어납니다."}
            </p>
            <p data-sr="up" className="text-[16.5px] max-md:text-[14.5px] leading-[1.95] text-muted whitespace-pre-line max-md:whitespace-normal" style={{ wordBreak: "keep-all" }}>
              {"전시장은 작가의 아틀리에로 변합니다.\n벽과 캐비닛에는 스케치, 메모, 습작, 재료, 작가의 작업 과정이 놓여 있습니다.\n이를 통해 관람객은 작품이 수많은 시도와 망설임, 선택과 우연을 지나 지금의 모습에 이르렀음을 마주하게 됩니다."}
            </p>
          </div>
        </Row>

        <Row label="Guide">
          <p data-sr="up" className="type-m max-md:font-bold max-md:text-[21px]! mb-8 md:mb-10">전시 사용 설명서</p>
          <ol>
            {GUIDE.map((g, n) => (
              <li key={g.title}>
                <hr className="dots-x" />
                <div data-sr="up" className="grid grid-cols-[2.75rem_1fr] md:grid-cols-[5rem_1fr] gap-3 md:gap-4 py-6 md:py-7">
                  <span className="type-label text-muted pt-2">{String(n + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[19px] max-md:text-[17px] font-bold leading-snug">{g.title}</h3>
                    <p
                      className="mt-2 text-[16px] max-md:text-[14.5px] leading-[1.8] text-muted whitespace-pre-line max-md:whitespace-normal max-w-[44rem]"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {g.desc}
                    </p>
                    {g.badge && g.badgeHref && (
                      <a
                        href={g.badgeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block bg-sv px-3 py-1.5 type-label underline-offset-4 hover:underline"
                        style={{ color: "var(--ink)" }}
                      >
                        {g.badge} ↗
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Row>

        <Row label="Artists">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {artists.map((a, i) => (
              <li key={a.id} data-sr="up" data-d={String((i % 4) + 1)}>
                <Link href={`/atelier/${a.slug}`} className="group block text-center">
                  <span className="relative block aspect-square w-full max-w-[12rem] mx-auto overflow-hidden rounded-full bg-surface-card transition-transform duration-300 group-hover:scale-[1.04]">
                    <Image src={a.profileImage} alt={a.name} fill sizes="12rem" className="object-cover" />
                  </span>
                  <span className="mt-4 block text-[18px] max-md:text-[16px] font-bold group-hover:underline underline-offset-4">{a.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Row>

        <section className="px-[var(--gap)] py-12 md:py-16">
          <div className="flex flex-col md:flex-row gap-6 md:gap-0">
            <div className={LEFT} />
            <div className={RIGHT}>
              {/* 두 열이 같은 크기(1fr)를 공유 → 더 긴 버튼 너비에 맞춰 두 버튼이 동일해진다 */}
              <div className="grid w-fit grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/community" className="nb-btn px-7 py-3 text-[15px] max-md:text-[13px]">함께하는 프로그램 보기</Link>
                <Link href="/atelier" className="nb-btn-outline px-7 py-3 text-[15px] max-md:text-[13px]">작가 아틀리에 보기</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
