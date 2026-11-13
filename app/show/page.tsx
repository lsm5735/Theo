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
          <div data-sr="fade" className="pr-[calc(var(--gap)*0.5)] md:pr-[var(--gap)] pb-8 md:pb-14">
            <BigTitle text="[CONTINUE]" />
          </div>
          <hr className="dots-x" />
        </section>

        {/* 전시 이미지 */}
        <section className="pb-12 md:pb-16">
          {/* 포스터(843×1191)를 위·아래 반(843×595)으로 나눠 가로로 나란히 붙인다: 왼쪽 = 위쪽 절반, 오른쪽 = 아래쪽 절반. 화면 폭 끝까지 꽉 채운다 */}
          <div data-sr="up" role="img" aria-label="[CONTINUE] 전시 포스터" className="grid grid-cols-2 w-full overflow-hidden bg-surface-card">
            <div className="relative aspect-[843/595.5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/show-poster.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <div className="relative aspect-[843/595.5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/show-poster.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-bottom" />
            </div>
          </div>
          <div className="px-[var(--gap)]"><hr className="dots-x mt-12 md:mt-16" /></div>
        </section>

        <Row label="Info">
          <dl>
            {INFO.map((i, n) => (
              <div key={i.label}>
                {n > 0 && <hr className="dots-x" />}
                <div data-sr="up" className="grid grid-cols-[6rem_1fr] md:grid-cols-[10rem_1fr] gap-4 py-5">
                  <dt className="type-label text-muted pt-2">{i.label}</dt>
                  <dd className="type-m">{i.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Row>

        <Row label="About">
          <p data-sr="up" className="type-m max-w-[44rem] mb-8" style={{ wordBreak: "keep-all" }}>
            당신의 색으로 만들어질 다음 장면은 무엇일까요?
          </p>
          <div className="space-y-8 max-w-[56rem]">
            <p data-sr="up" className="text-[16.5px] leading-[1.95] text-muted whitespace-pre-line" style={{ wordBreak: "keep-all" }}>
              {"그림이 태어나는 과정을 보러 오세요.\n이곳에서 관객은 꽃다발 대신 물감을 보냅니다.\n당신이 고른 색은 작가에게 도착하고, 작가의 손과 시간을 지나 새로운 장면이 됩니다.\n누군가의 마음이 재료가 되고, 그 재료는 하나의 작품으로 피어납니다."}
            </p>
            <p data-sr="up" className="text-[16.5px] leading-[1.95] text-muted whitespace-pre-line" style={{ wordBreak: "keep-all" }}>
              {"전시장은 갤러리가 아니라 작가의 아틀리에입니다.\n벽과 캐비닛에는 스케치, 메모, 습작, 재료, 작업 기록이 그대로 놓여 있습니다.\n이를 통해 관람객은 작품이 한순간에 완성되지 않았음을, 수많은 시도와 망설임, 선택과 우연을 지나 지금의 모습에 이르렀음을 마주하게 됩니다."}
            </p>
          </div>
        </Row>

        <Row label="Artists">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {artists.map((a, i) => (
              <li key={a.id} data-sr="up" data-d={String((i % 4) + 1)}>
                <Link href={`/atelier/${a.slug}`} className="group block text-center">
                  <span className="relative block aspect-square w-full max-w-[12rem] mx-auto overflow-hidden rounded-full bg-surface-card transition-transform duration-300 group-hover:scale-[1.04]">
                    <Image src={a.profileImage} alt={a.name} fill sizes="12rem" className="object-cover" />
                  </span>
                  <span className="mt-4 block text-[18px] font-bold group-hover:underline underline-offset-4">{a.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Row>

        <section className="px-[var(--gap)] py-12 md:py-16">
          <div className="flex flex-col md:flex-row gap-6 md:gap-0">
            <div className={LEFT} />
            <div className={`${RIGHT} flex flex-wrap gap-3`}>
              <Link href="/community" className="nb-btn px-7 py-3 text-[15px]">함께하는 프로그램 보기 →</Link>
              <Link href="/atelier" className="nb-btn-outline px-7 py-3 text-[15px]">작가 아틀리에 보기 →</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
